import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

// Helper functions for validations
const validateUsername = username => {
  const usernameRegex = /^[a-zA-Z0-9._]{4,}$/;
  return usernameRegex.test(username);
};

const validateEmail = email => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const validatePassword = password => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|\:;'<>?,.\/`~]).{8,}$/;
  return passwordRegex.test(password);
};

const SettingsScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [feedbackError, setFeedbackError] = useState('');

  // States to toggle password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = () => {
    let isValid = true;

    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setFeedbackError('');

    if (!validateUsername(username)) {
      setUsernameError(
        'Username must be at least 4 characters and contain only alphabets, numbers, dots or underscores',
      );
      isValid = false;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must have at least 8 characters with one uppercase letter, one digit, and one special character.',
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    if (isValid) {
      alert('Details Updated');
    }
  };

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) {
      setFeedbackError('Feedback cannot be empty.');
    } else {
      setFeedbackError('');
      alert('Feedback Submitted');
      setFeedback('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Yalla!</Text>
      <ScrollView>
        <Text style={styles.sectionTitle}>Edit User Details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />
          {usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Icon
                name={passwordVisible ? 'eye' : 'eye-slash'}
                size={24}
                color="#aaa"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry={!confirmPasswordVisible}
            />
            <TouchableOpacity
              onPress={() =>
                setConfirmPasswordVisible(!confirmPasswordVisible)
              }>
              <Icon
                name={confirmPasswordVisible ? 'eye' : 'eye-slash'}
                size={24}
                color="#aaa"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Update Details</Text>
        </TouchableOpacity>

        <View style={styles.lineBreak} />

        <Text style={styles.sectionTitle}>Submit Feedback or Issues</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Feedback</Text>
          <TextInput
            style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Enter your feedback, suggestions, or issues"
            multiline
          />
          {feedbackError ? (
            <Text style={styles.errorText}>{feedbackError}</Text>
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleFeedbackSubmit}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#ff7f00', // Orange color
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#ff7f00', // Orange theme color
    paddingVertical: 12,
    marginBottom:20,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  lineBreak: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: 'black',
  },
  eyeIcon: {
    marginLeft: 10,
  },
});

export default SettingsScreen;
