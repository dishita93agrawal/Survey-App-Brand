import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Icon, Avatar } from 'react-native-elements';
import db from '../config';

import * as ImagePicker from 'expo-image-picker';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      name: '',
      image: 'http://cdn.onlinewebfonts.com/svg/img_568656.png',
      docId: '',
    };
  }
  logoutUser = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.props.navigation.replace('Loginscreen');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      Alert.alert('An error occured. Please try again later.');
    }
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.setState({ image: uri });
      console.log('Worked' + this.state.image);
    }
  };
  updateUser = async () => {
    var response = await fetch(this.state.image);
    var blob = await response.blob();
    try {
      await firebase
        .storage()
        .ref()
        .child('brands/' + this.state.userId)
        .put(blob)
        .then(() => {
          this.fetchImage();
        });
    } catch (e) {
      console.log(e);
    }
  };

  fetchImage = () => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('brands/' + this.state.userId);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
        db.collection('brands')
          .doc(this.state.docId)
          .update({ name: this.state.name, image: this.state.image });
        alert('Profile Updated');
      })
      .catch((error) => {
        console.log('error' + error);
        alert('Something went wrong in media uplaod, try again');
        this.setState({
          image: 'https://dummyimage.com/600x400/000/fff',
        });
      });
  };
  getUserDetails = () => {
    db.collection('brands')
      .where('email', '==', this.state.userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().name,
            image: doc.data().image,
            docId: doc.id,
          });
        });
        console.log(this.state.image);
      })

      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };
  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#0059D4',
        }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              backgroundColor: '#0059D4',
              height: 200,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <View style={{ padding: 10, flexDirection: 'row', marginTop:20 }}>
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}></Icon>

              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 50,
                }}>
                Profile
              </Text>
            </View>

            <Avatar
              rounded
              size={'large'}
              source={{ uri: this.state.image }}
              onPress={() => {
                this.selectPicture();
              }}
              containerStyle={{ position: 'absolute', top: 150, left: '40%' }}
            />
          </View>
          <Text
            style={{ textAlign: 'center', color: '#0059D4', marginTop: 50 }}>
            {this.state.userId}
          </Text>
          <Text style={{ marginLeft: 10, color: '#0059D4', marginTop: 10 }}>
            Name:
          </Text>
          <TextInput
            style={{
              padding: 5,
              color: '#0059D4',
              borderBottomWidth: 1,
              marginHorizontal: 10,
            }}
            onChangeText={(name) => {
              this.setState({ name: name });
            }}
            value={this.state.name}
          />

          <TouchableOpacity
            onPress={() => {
              this.updateUser();
            }}
            style={{
              flexDirection: 'row',
              padding: 5,
              alignSelf: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#0059D4',
              marginTop: 10,
            }}>
            <Ionicons
              name="checkmark-done"
              size={27}
              color="#0059D4"></Ionicons>
            <Text style={{ color: '#0059D4', fontSize: 16 }}>Update</Text>
          </TouchableOpacity>

          <View style={styles.ss3}>
            <Ionicons name="log-out" size={27} color="#0059D4"></Ionicons>
            <TouchableOpacity
              onPress={() => {
                this.logoutUser();
              }}
              style={styles.sss}>
              <Text style={{ color: '#0059D4', fontSize: 16 }}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ss3: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },
  sss: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1.5,
    justifyContent: 'center',
    borderBottomColor: '#0059D4',
    marginHorizontal: 10,
  },
});
