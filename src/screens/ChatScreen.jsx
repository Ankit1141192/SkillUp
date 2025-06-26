import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const currentUser = auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatMessages(msgs);
      });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (message.trim() === '') return;

    await firestore().collection('messages').add({
      text: message,
      senderId: currentUser?.uid,
      senderEmail: currentUser?.email,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    setMessage('');
  };

  const renderItem = ({ item }) => {
    const isUser = item.senderId === currentUser?.uid;
    return (
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.otherBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.sender}>{isUser ? 'You' : item.senderEmail}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={chatMessages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        inverted
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    backgroundColor: '#34A853',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  sender: {
    fontSize: 10,
    color: '#555',
    marginTop: 5,
  },
});
