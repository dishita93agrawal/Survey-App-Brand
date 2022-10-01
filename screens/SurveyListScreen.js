import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ListItem, Avatar, Header, Icon } from 'react-native-elements';
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
  Ionicons,
} from '@expo/vector-icons';

export default class SurveyDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.uid,
      allSurveys: [],
    };
  }

  componentDidMount = () => {
    db.collection('surveys').onSnapshot((snapshot) => {
      var allS = [];
      snapshot.docs.map((doc) => {
        var survey = doc.data();
        survey['docId'] = doc.id;
        allS.push(survey);
      });
      this.setState({ allSurveys: allS });
    });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.flatlistContainer}
      onPress={() => {
        this.props.navigation.navigate('SurveyDetails', { details: item });
      }}>
      <Image
        style={{
          width: 45,
          height: 45,
          borderWidth: 1,
          borderColor: '#eee',
          alignSelf: 'center',
          marginLeft: 10,
        }}
        source={{ uri: item.brandImage }}
      />
      <View style={{ marginLeft: 20, padding: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 5,
          }}>
          <Octicons name="feed-tag" size={14} color="#0059D4" />
          <Text style={[styles.titleText, { fontSize: 16, fontWeight: '700' }]}>
            {item.brandName.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 5,
            }}>
            <MaterialIcons name="title" size={14} />
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 5,
              backgroundColor: '#0059D4aa',
              padding: 10,
              borderRadius: 5,
            }}>
            <MaterialIcons name="category" size={14} />
            <Text style={[styles.titleText, { color: 'white' }]}>
              {item.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: '#0059D4',
          }}>
          <Text
            style={{
              marginLeft: 10,
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop:20
            }}>
            Welcome Back..!
          </Text>
          <TouchableOpacity
            style={{ position: 'absolute', top: 30, right: 20 }}
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Ionicons name="person-circle" size={27} color="#ffffff"></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              padding: 20,
              marginLeft: 10,
              color: '#0059D4',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            List of surveys
          </Text>
          {this.state.allSurveys.length !== 0 ? (
            <FlatList
              data={this.state.allSurveys}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          ) : (
            <Image
              source={require('../assets/nolist.png')}
              style={{ width: '50%', height: 200, alignSelf: 'center' }}
            />
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.props.navigation.navigate('AddSurvey');
            }}
            style={styles.touchableOpacityStyle}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 30,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0062E9',
    borderRadius: 25,
  },
  fabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  titleText: {
    color: 'black',
    fontSize: 14,
    marginLeft: 5,
  },
  flatlistContainer: {
    //borderBottomWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    borderColor: '#0059D4AA',
  },
});
/*  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },*/
