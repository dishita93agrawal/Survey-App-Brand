import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
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
import Modal from 'react-native-modal';
export default class ResponsesDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.details.title,
      category: this.props.route.params.details.category,
      allQuestions: this.props.route.params.details.questions,
      allResponses: this.props.route.params.details.responses,
      date: this.props.route.params.details.date,
      docId: this.props.route.params.details.docId,
      userId: this.props.route.params.details.userId,
      name: '',
      gender: '',
      age: '',
      brandName: '',
      brandImage: '',
      email: firebase.auth().currentUser.email,
    };
    console.log(this.state.userId);
  }
  getUserInfo = () => {
    db.collection('users')
      .where('email', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var user = doc.data();
          console.log(user);
          this.setState({
            name: user.name,
            contact: user.contact,
            age: user.age,
            gender: user.gender,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserInfo();
  }

  renderItem = ({ item, index }) => (
    <View
      style={{
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginVertical: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#0059D4',
      }}>
      <View style={{ backgroundColor: '#0059D4', padding: 5 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: 'white',
            textAlign: 'center',
          }}>
          {item.question}?
        </Text>
      </View>
      <Text style={{ padding: 2, marginVertical: 2 }}>Options:</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginHorizontal: 5,
          marginVertical: 5,
          alignItems: 'flex-start',
          padding: 5,
          flexShrink: 1,
        }}>
        <Text
          style={{
            backgroundColor:
              this.state.allResponses[index] === item.option1
                ? '#0059D4aa'
                : 'white',
            flex: 0.5,
            fontSize: 14,
            color:
              this.state.allResponses[index] === item.option1
                ? 'white'
                : 'black',
          }}>
          1: {item.option1}
        </Text>
        <Text
          style={{
            backgroundColor:
              this.state.allResponses[index] === item.option2
                ? '#0059D4aa'
                : 'white',
            flex: 0.5,
            fontSize: 14,
            color:
              this.state.allResponses[index] === item.option2
                ? 'white'
                : 'black',
          }}>
          2: {item.option2}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginHorizontal: 5,
          marginVertical: 5,
          padding: 5,
          flexShrink: 1,
        }}>
        <Text
          style={{
            backgroundColor:
              this.state.allResponses[index] === item.option3
                ? '#0059D4aa'
                : 'white',
            flex: 0.5,
            fontSize: 14,
            color:
              this.state.allResponses[index] === item.option3
                ? 'white'
                : 'black',
          }}>
          3: {item.option3}
        </Text>
        <Text
          style={{
            backgroundColor:
              this.state.allResponses[index] === item.option4
                ? '#0059D4aa'
                : 'white',
            flex: 0.5,
            fontSize: 14,
            color:
              this.state.allResponses[index] === item.option4
                ? 'white'
                : 'black',
          }}>
          4: {item.option4}
        </Text>
      </View>
    </View>
  );
  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Response Details',
              style: {
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 20,
              },
            }}
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}></Icon>
            }
            backgroundColor="#0059D4"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              marginVertical: 10,
              padding: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcons name="title" size={14} />
              <Text style={{ fontSize: 14, marginLeft: 10 }}>
                {this.state.title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcons name="category" size={14} />
              <View
                style={{
                  backgroundColor: '#0059D4AA',
                  borderRadius: 5,
                  padding: 5,
                  marginLeft: 10,
                }}>
                <Text style={{ fontSize: 14, color: '#fff' }}>
                  {this.state.category}
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ fontSize: 14, marginLeft: 10, fontWeight: '500' }}>
            Responder's Details
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              padding: 10,
              borderRadius: 5,
              borderWidth: 1,
            }}>
            <Text
              style={{
                fontSize: 14,
                marginLeft: 10,
                marginTop: 5,
                textAlign: 'center',
              }}>
              Name: {this.state.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 5,
                padding: 10,
              }}>
              <Text style={{ fontSize: 14, marginLeft: 10 }}>
                Gender : {this.state.gender}
              </Text>
              <Text style={{ fontSize: 14, marginLeft: 10 }}>
                Age : {this.state.age}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
              
            }}>
            <Text style={{fontWeight:"500", fontSize:14}}>Responses</Text>
          </View>
          <FlatList
            data={this.state.allQuestions}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  textinput: {
    marginTop: 5,
    marginBottom: 5,
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderBottomWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});
