import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import image from '../Assets/Images/lahore.jpg';

export default class Feedback extends Component {

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
                      fontSize:17
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
                      fontSize:17
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
    if(this.state.type===1){
        return <Text style={styles.description}>iska description pta karlo tw wo dalega yahan</Text>
    }
    else if(this.state.type===2){
        return <Text style={styles.description}>Briefly explain what happened. How do you reproduce the issue?</Text>
    }
    else if(this.state.type===3){
        return  <Text style={styles.description}>Briefly explain what you love, or what could important</Text>
    }
    else if(this.state.type===4){
        return <Text style={styles.description}>iska description pta karlo tw wo dalega yahan</Text>
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.heading}>{this.state.name}</Text>
          {this.renderDescription()}
        </View>
        <View style={styles.inputContainer}>
          <FastImage
            source={image}
            style={{height: 40, width: 40, borderRadius: 20,marginRight:4}}
          />
          <TextInput
            value={this.state.message}
            scrollEnabled={false}
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
    marginTop: 5,
    justifyContent:'center'
  },
  input: {
    color: 'grey',
    width: '80%',
    borderColor: 'grey',
    borderRadius: 8,
    borderWidth: 0.1,
    textAlignVertical: 'top',
  },
});