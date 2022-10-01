import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "abc@gmail.com",
      password: "qwertyui",
      showPassword: false,
    };
  }
  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        var errorcode = error.code;
        var errorM = error.message;
        alert(errorM);
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={require("../assets/backgroundImage.png")}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                alignSelf: "center",
              }}
              source={require("../assets/logo.png")}
            />
            <Text style={styles.weltext}>Welcome Back Dear!</Text>
            <Text style={styles.text}>We are glad to see you back!!</Text>
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
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
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
                        ? "ios-eye-sharp"
                        : "ios-eye-off-sharp"
                    }
                    size={24}
                    color="black"
                    onPress={() => {
                      if (this.state.showPassword === false) {
                        this.setState({ showPassword: true });
                      } else if (this.state.showPassword === true) {
                        this.setState({ showPassword: false });
                      }
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.signUpTxt}>
                  Having Trouble Signing in? Reset Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signin}
                onPress={() => {
                  this.login(this.state.email, this.state.password);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: 8,
                    fontSize: 16,
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SigninScreen")}
              >
                <Text style={styles.createAcc}>
                  Don't have an account yet? Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weltext: {
    fontSize: 20,
    marginTop: 50,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  textContainer: {
    padding: 10,
    margin: 20,
    marginBottom: "30%",
    marginTop: 50,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  signUpTxt: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    color: "black",
  },
  signin: {
    backgroundColor: "#0059D4",
    marginTop: 10,
    width: "70%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
  },
  createAcc: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    color: "red",
  },
  inputContainer: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginTop: 5,
    alignSelf: "center",
    width: "90%",
    height: 70,
  },

  input: {
    fontSize: 16,
    color: "#000000",
    textAlign: "left",
    borderBottomColor: "black",
  },
  label: {
    padding: 5,
    fontSize: 18,
    color: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginTop: 25,
    color: "white",
    marginLeft: 10,
  },
});
