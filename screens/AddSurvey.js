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

import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
export default class CreateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      title: '',
      category: '',
      isModalVisible: false,
      allQuestions: [],
      brandName: '',
      brandImage: '',
      email: firebase.auth().currentUser.email,
      open: false,
      value: null,
      items: [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Footwear', value: 'Footwear' },
        { label: 'Fashion', value: 'Fashion' },
        { label: 'Tools', value: 'Tools' },
        { label: 'Others', value: 'Others' },
      ],
    };
  }

  componentDidMount() {
    db.collection('brands')
      .where('email', '==', this.state.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var brand = doc.data();
          this.setState({ brandName: brand.name, brandImage: brand.image });
        });
      });
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
  addSurvey = () => {
    if (
      this.state.title.length !== 0 &&
      this.state.category.length !== 0 &&
      this.state.allQuestions.length !== 0
    ) {
      var uniqueId = this.createUniqueId();
      db.collection('surveys').add({
        title: this.state.title,
        category: this.state.category,
        questions: this.state.allQuestions,
        brandName: this.state.brandName,
        brandImage: this.state.brandImage,
        brandEmail: this.state.email,
        surveyId: uniqueId,
        responsers: [],
        date: new Date().toDateString(),
      });
      alert('Survey added !');
      this.props.navigation.navigate('SurveyListScreen');
    } else {
      alert('Fill the surevy details properly');
    }
  };
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        isVisible={this.state.isModalVisible}
        backDropOpacity={0.1}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>
            Add your question below
          </Text>
          <TextInput
            style={styles.textinput}
            placeholder={'Question'}
            onChangeText={(text) => {
              this.setState({
                question: text,
              });
            }}
            value={this.state.question}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'Option1'}
            onChangeText={(text) => {
              this.setState({
                option1: text,
              });
            }}
            value={this.state.option1}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'Option2'}
            onChangeText={(text) => {
              this.setState({
                option2: text,
              });
            }}
            value={this.state.option2}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'Option3'}
            onChangeText={(text) => {
              this.setState({
                option3: text,
              });
            }}
            value={this.state.option3}
          />
          <TextInput
            style={styles.textinput}
            placeholder={'Option4'}
            onChangeText={(text) => {
              this.setState({
                option4: text,
              });
            }}
            value={this.state.option4}
          />
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              try {
                var allq = [...this.state.allQuestions];
                var question = {
                  question: this.state.question,
                  option1: this.state.option1,
                  option2: this.state.option2,
                  option3: this.state.option3,
                  option4: this.state.option4,
                };
                allq.push(question);
                this.setState({
                  allQuestions: allq,
                  isModalVisible: false,
                  question: '',
                  option1: '',
                  option2: '',
                  option3: '',
                  option4: '',
                });
              } catch (e) {
                console.log(e);
              }
            }}>
            <Text style={styles.buttonText}>Add </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({
                isModalVisible: false,
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
              });
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 15,
                fontSize: 16,
              }}>
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Header
            centerComponent={{
              text: 'Add Survey ',
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
          {this.showModal()}
          <TextInput
            style={styles.textinput}
            placeholder={'Survey Title'}
            maxLength={15}
            onChangeText={(text) => {
              this.setState({
                title: text,
              });
            }}
            value={this.state.title}
          />

          <DropDownPicker
            items={this.state.items}
            open={this.state.open}
            value={this.state.category}
            setOpen={() => {
              this.setState({ open: !this.state.open });
            }}
            onSelectItem={(val) => {
              this.setState({ category: val.label });
            }}
            style={{
              width: '75%',
              height: 40,
              alignSelf: 'center',
              backgroundColor: 'white',
              marginTop: 20,
            }}
            textStyle={{ color: 'black' }}
            labelStyle={{
              fontWeight: 'bold',
              color: 'black',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 10,
              padding: 10,
            }}>
            <Text>Start adding questions</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}
              style={styles.touchableOpacityStyle}>
              <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.allQuestions}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#0059D4',
              borderRadius: 5,
              marginBottom: 20,
              width: '50%',
              padding: 10,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            onPress={() => {
              this.addSurvey();
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'white',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  updateButton: {
    width: '60%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#0059D4',
    padding: 10,
    borderRadius: 5,
  },
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
  touchableOpacityStyle: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0062e9',
    borderRadius: 10,
  },
  fabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
