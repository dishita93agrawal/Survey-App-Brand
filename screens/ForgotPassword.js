import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import firebase from 'firebase';
export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/backgroundImage.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Feather
          name="arrow-left"
          size={19}
          color="white"
          onPress={() => this.props.navigation.goBack()}
          style={{ padding: 30 }}
        />

        <Text style={styles.appText}>Reset Password!!</Text>
        <Text style={styles.appText2}>
          Enter your Email Id to Reset Password!
        </Text>
        <View style={styles.textContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(email) => {
                this.setState({ email });
              }}
              value={this.state.email.trim()}
            />
          </View>
          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => {
              firebase
                .auth()
                .sendPasswordResetEmail(this.state.email)
                .then(() => {
                  alert('Password reset email sent');
                  this.props.navigation.navigate('Login');
                })
                .catch((error) => {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  alert(errorMessage);
                });
            }}>
            <Text style={styles.routeText}>Send mail</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  appText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  appText2: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 18,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  routeCard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: '70%',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: '#0059D4',
  },
  routeText: {
    fontSize: 18,
    color: 'white',
  },
  inputContainer: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 5,
    alignSelf: 'center',
    width: '90%',
    height: 70,
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    marginBottom: '30%',
  },
  input: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'left',
    borderBottomColor: 'black',
  },
  label: {
    padding: 5,
    fontSize: 18,
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
