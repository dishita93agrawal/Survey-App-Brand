import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaProvider,
  FlatList,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Avatar, Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class ResponsesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allResponses: [],
      brandEmail: firebase.auth().currentUser.email,
    };
  }
  componentDidMount = () => {
    try {
      db.collection('responses')
        .where('brandEmail', '==', this.state.brandEmail)
        .onSnapshot((snapshot) => {
          var allS = [];
          snapshot.docs.map((doc) => {
            var survey = doc.data();
            allS.push(survey);
          });
          this.setState({ allResponses: allS });
        });
    } catch (e) {
      console.log(e);
    }
  };
  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.flatlistContainer}
      onPress={() => {
        this.props.navigation.navigate('ResponsesDetails', { details: item });
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 5,
        }}>
        <Ionicons name="person" size={14} />
        <Text style={[styles.titleText, { fontSize: 16, fontWeight: '700' }]}>
          {item.userId}
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
          <Text style={[styles.titleText, { fontSize: 16, fontWeight: '700' }]}>
            {item.title.toUpperCase()}
          </Text>
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
    </TouchableOpacity>
  );
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
        <Header
          centerComponent={{
            text: 'Responses List',
            style: {
              margin: 2,
              padding: 2,
              fontWeight: 'bold',
              fontSize: 19,
              color: '#fff',
            },
          }}
          backgroundColor={'#0062E9'}
        />
        {this.state.allResponses.length !== 0 ? (
          <FlatList
            data={this.state.allResponses}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        ) : (
          <Image
            source={require('../assets/nolist.png')}
            style={{ width: '50%', height: 200, alignSelf: 'center' }}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontSize: 14,
    marginLeft: 15,
  },
  flatlistContainer: {
    borderBottomWidth: 1,
    padding: 10,
    margin: 2,
  },
});
