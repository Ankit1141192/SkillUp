
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import backGroundImage from '../assets/backGround.png';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await auth().currentUser.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      Alert.alert('Registration Successful!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image
        source={backGroundImage}
        style={[styles.backgroundImage, { width, height }]}
      />

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>Create Your Account ✨</Text>
        <Text style={styles.subtitle}>Join SkillUP and start your journey 🚀</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  content: {
    marginTop: "50%",
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  registerBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    marginBottom: 25,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 10,
    color: '#0066cc',
    fontWeight: '500',
  },
});
