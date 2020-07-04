import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import FastImage from 'react-native-fast-image';
import image from '../Assets/Images/lahore.jpg';

export default class Feedback extends Component {
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
