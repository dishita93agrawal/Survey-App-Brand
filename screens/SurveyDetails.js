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
export default class SurveyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.details.title,
      category: this.props.route.params.details.category,
      allQuestions: this.props.route.params.details.questions,
      date: this.props.route.params.details.date,
      docId: this.props.route.params.details.docId,
      brandName: '',
      brandImage: '',
      email: firebase.auth().currentUser.email,
    };
  }

  renderItem = ({ item }) => (
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
        <Text style={{ flex: 0.5, fontSize: 14 }}>1: {item.option1}</Text>
        <Text style={{ flex: 0.5, fontSize: 14 }}>2: {item.option2}</Text>
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
        <Text style={{ flex: 0.5, fontSize: 14 }}>3: {item.option3}</Text>
        <Text style={{ flex: 0.5, fontSize: 14 }}>4: {item.option4}</Text>
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
              text: 'Survey Details',
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
            rightComponent={
              <Icon
                name="delete"
                type="AntDesign"
                color="#ffffff"
                onPress={() => {
                  db.collection('surveys').doc(this.state.docId).delete();
                  this.props.navigation.goBack();
                }}></Icon>
            }
            backgroundColor="#0059D4"
          />

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 5,
              padding: 5,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <MaterialIcons name="title" size={14} />
            <Text style={{ fontSize: 14, marginLeft: 10 }}>
              {this.state.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 5,
              padding: 5,
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
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 5,
              padding: 5,
              alignItems: 'center',
            }}>
            <Fontisto name="date" size={14} />

            <Text style={{ fontSize: 14, marginLeft: 10 }}>
              {this.state.date}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
              padding: 10,
            }}>
            <Text>Questions</Text>
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
