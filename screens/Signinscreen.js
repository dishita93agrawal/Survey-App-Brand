import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import db from '../config';
export default class SigninScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      showConfirmPassword: false,
      showPassword: false,
      contact: '',
    };
  }
  signUp = (email, password, confirmPassword) => {
    if (password != confirmPassword) {
      alert("Passwords don't match");
    } else {
      //calling firebase signUp function
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('brands').add({
            name: this.state.name,
            email: this.state.email.toLowerCase(),
            image:"#",
            contact:this.state.contact
    
          });
          alert('User added successfully');
          this.props.navigation.navigate('Loginscreen');
        })
        .catch((error) => {
          var errorcode = error.code;
          var errorM = error.message;
          console.log(errorM);
          alert(errorM);
        });
    }
  };
  render() {
    return (
      <ImageBackground
        source={require('../assets/backgroundImage.png')}
        style={styles.background_img}>
        <ScrollView style={{ flex: 1, marginBottom: 50 }}>
          <View>
            <Text style={styles.apptitleText}>Sign Up!</Text>
            <Text style={styles.apptext}>We are happy to see you here!</Text>
          </View>
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
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={
                    this.state.showPassword === false ? true : false
                  }
                  onChangeText={(password) => {
                    this.setState({ password });
                  }}
                  value={this.state.password.trim()}
                />
                <Ionicons
                  name={
                    this.state.showPassword
                      ? 'ios-eye-sharp'
                      : 'ios-eye-off-sharp'
                  }
                  size={24}
                  color="black"
                  onPress={() => {
                    console.log('HICP');
                    if (this.state.showPassword === false) {
                      this.setState({ showPassword: true });
                    } else if (this.state.showPassword === true) {
                      this.setState({ showPassword: false });
                    }
                  }}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={
                    this.state.showConfirmPassword === false ? true : false
                  }
                  onChangeText={(confirmPassword) => {
                    this.setState({ confirmPassword });
                  }}
                  value={this.state.confirmPassword.trim()}
                />

                <Ionicons
                  name={
                    this.state.showConfirmPassword
                      ? 'ios-eye-sharp'
                      : 'ios-eye-off-sharp'
                  }
                  size={24}
                  color="black"
                  onPress={() => {
                    if (this.state.showConfirmPassword === false) {
                      this.setState({ showConfirmPassword: true });
                    } else if (this.state.showConfirmPassword === true) {
                      this.setState({ showConfirmPassword: false });
                    }
                  }}
                />
              </View>
            </View>
            <View style={[styles.inputContainer, { marginTop: 10 }]}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  this.setState({
                    name: text,
                  });
                }}
                value={this.state.name}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contact</Text>
              <TextInput
                style={styles.input}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
                value={this.state.contact}
              />
            </View>
           
            <TouchableOpacity
              style={styles.signin}
              onPress={() => {
                this.signUp(
                  this.state.email,
                  this.state.password,
                  this.state.confirmPassword
                );
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  padding: 8,
                  fontSize: 16,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginBottom: 20,
              }}
              onPress={() => {
                this.props.navigation.navigate('Loginscreen');
              }}>
              <Text style={styles.logintext}>Already a user? Sign in here</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  background_img: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  apptitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    marginTop: 30,
  },
  apptext: {
    marginTop: 5,
    marginLeft: 15,
    fontSize: 18,
    color: '#ffffff',
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 50,
    marginHorizontal: 20,
  },
  signin: {
    backgroundColor: '#0059D4',
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
  },
  inputContainer: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 15,
    alignSelf: 'center',
    width: '90%',
    height: 70,
  },

  input: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'left',
    borderBottomColor: '#000000',
  },
  label: {
    padding: 5,
    fontSize: 18,
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logintext: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: 'red',
  },
});
