import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

class Feedback extends Component {
  static navigationOptions = props => {
    tabBarVisibile = false;
    const {params = {}} = props.navigation.state;
    return {
      header: (
        <View
          style={{
            height: 50,
            backgroundColor: '#0C91CF',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              padding: 2,
              alignSelf: 'center',
              left: 8,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('UserSettings');
              }}>
              <Text
                style={{
                  color: 'white',
                  padding: 2,
                  fontSize: 17,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 21,
                fontWeight: 'bold',
              }}>
              Feedback
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              padding: 2,
              alignSelf: 'center',
              right: 8,
            }}>
            <TouchableOpacity onPress={() => params.handleThis()}>
              <Text
                style={{
                  color: 'white',
                  padding: 2,
                  fontSize: 17,
                }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    };
  };

  state = {
    type: this.props.navigation.getParam('type', null),
    name: this.props.navigation.getParam('name', null),
    message: '',
  };

  renderDescription = () => {
    if (this.state.type === 1) {
      return (
        <Text style={styles.description}>
          Briefly explain your issue in the form below.
        </Text>
      );
    } else if (this.state.type === 2) {
      return (
        <Text style={styles.description}>
          Briefly explain what happened. How do you reproduce the issue?
        </Text>
      );
    } else if (this.state.type === 3) {
      return (
        <Text style={styles.description}>
          Briefly explain what you love, or what could be important.
        </Text>
      );
    } else if (this.state.type === 4) {
      return (
        <Text style={styles.description}>
          If you found a quality issue in images/videos, let us know.
        </Text>
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.heading}>{this.state.name}</Text>
          {this.renderDescription()}
        </View>
        <View style={styles.inputContainer}>
          <FastImage
            source={{uri: this.props.User.profile_pic_url}}
            style={{height: 40, width: 40, borderRadius: 20, marginLeft: 4}}
          />
          <TextInput
            value={this.state.message}
            scrollEnabled={false}
            placeholder="Type your message"
            multiline={true}
            style={styles.input}
            onChangeText={text => {
              this.setState({message: text});
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 18,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
  },
  input: {
    paddingVertical: 3,
    marginLeft: '2%',
    color: 'grey',
    width: '80%',
    borderColor: 'grey',
    borderRadius: 8,
    borderWidth: 0.8,
    textAlignVertical: 'center',
  },
});

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  null,
)(Feedback);
