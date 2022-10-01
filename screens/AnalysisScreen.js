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

export default class ResponsesAnalysis extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
        <Header
          centerComponent={{
            text: 'Response Analysis',
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
        <Image
          style={{
            width: 200,
            height: 200,
            marginTop:200,
            alignSelf: 'center',
          }}
          source={require('../assets/image.png')}
        />
      </View>
    );
  }
}
