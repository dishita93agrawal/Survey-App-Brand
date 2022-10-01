import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Header, Icon, Avatar } from 'react-native-elements';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';

export default class UpdateUserDetailScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      name: '',
      contact: '',
      address: '',
      docID: '',
    };
  }
  updateDetails = async () => {
    try {
      db.collection('users').doc(this.state.docID).update({
        name: this.state.name,
        contact: this.state.contact,
        address: this.state.address,
      });
      Alert.alert('Profile Updated');
      alert('Profile updated');
    } catch (e) {
      console.log(e);
    }
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUserDetails = () => {
    var email = this.state.email;
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            email: data.email,
            name: data.name,
            contact: data.contact,
            address: data.address,
            docID: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
   
        </View>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  imageContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
  updateButton: {
    width: '80%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#60CC9A',
    borderRadius: 20,
  },
  textinput: {
    marginTop: 5,
    marginBottom: 5,
    width: '85%',
    height: 50,
    borderColor: 'black',
    borderRadius: 20,
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});
