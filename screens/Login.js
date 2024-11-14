import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  // State for email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle login
  const handleLogin = () => {
    let isValid = true;

    // Email validation
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation (simple check for non-empty field)
    if (password.trim() === '') {
      setPasswordError('Please enter a valid password.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // If both email and password are valid, navigate to the SearchScreen
    if (isValid) {
      navigation.navigate('DrawerNavigator');
    }
  };

  return (
    <View style={styles.container}>
      {/* App Name */}
      <Text style={styles.appName}>Yalla!</Text>

      {/* Login / Sign in Text */}
      <Text style={styles.loginText}>Sign In</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password Input with Eye Icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible} // Toggle visibility
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'eye' : 'eye-slash'}
            size={24}
            color="#aaa"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Horizontal Line Break */}
      <View style={styles.lineBreak} />

      {/* Instagram Login Button */}
      <TouchableOpacity style={styles.instagramButton}>
        <Icon name="instagram" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.instagramButtonText}>Login with Instagram</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('create-account')}>
          <Text style={[styles.signUpText, styles.underlineText]}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ff7f00',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f7f5f0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f7f5f0',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    color: 'black',
    paddingVertical: 15,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#ff7f00',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    color: '#333',
    fontSize: 16,
  },
  underlineText: {
    textDecorationLine: 'underline',
    color: '#ff7f00',
  },
  lineBreak: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 30,
  },
  instagramButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c13584',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  instagramButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
