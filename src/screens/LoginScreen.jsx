import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';
import backGroundImage from '../assets/backGround.png';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const googleIcon = {
    uri: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png',
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '440843993927-xxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
    });
  }, []);

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Google Login Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      <Image
        source={backGroundImage}
        style={[styles.backgroundImage, { width, height }]}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to SkillUP</Text>
        <Text style={styles.subtitle}>Learn. Grow. Shine. Your journey starts here!</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
          <Image source={googleIcon} style={styles.googleIcon} />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Don’t have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    paddingTop: "55%",
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
  forgotText: {
    color: '#0066cc',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 25,
  },
  loginBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    marginBottom: 25,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '80%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  registerText: {
    marginTop: 20,
    color: '#0066cc',
    fontWeight: '500',
  },
});
