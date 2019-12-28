import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import HeaderTitle from './Heading';
import Colors from '../Assets/Colors';

class ResetPassword extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      newPassword:"",
      confirmPassword:"",
      error:""
    };
  }

  

  render() {
  
    return (
      <ImageBackground
        style={styles.container}
        source={require('../Assets/Images/background.png')}
        resizeMode="cover">
        <Text
          style={{color: 'white', fontSize: 16, margin: 10, marginTop: 20}}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          Back
        </Text>
       
       <ScrollView style={{flex: 1}}>
       <KeyboardAvoidingView positon="padding">
          <View style={{flex: 0.5, marginTop: -20}}>
            <HeaderTitle />
          </View>

          <View style={{flex: 1.5}}>
            <Text
              style={{
                marginLeft: '7%',
                color: 'white',
                fontSize: 18
              }}>
              New Password
            </Text>

            <View
              style={{
                width: '90%',
                marginLeft: '5%',
                marginTop: 5,
                borderColor: '#C4C4C4',
                backgroundColor: 'white',
                borderWidth: 0.5,
                borderRadius: 10,
              }}>
              <TextInput
                style={{width: '90%', fontSize: 20, color: '#ACACAC', paddingLeft:"3%"}}
                onChangeText={text => this.setState({newPassword:text})}
                value={this.state.newPassword}
              />
            </View>

            <Text
              style={{
                marginLeft: '7%',
                marginTop:"3%",
                color: 'white',
                fontSize: 18
              }}>
              Confirm Password
            </Text>

            <View
              style={{
                width: '90%',
                marginLeft: '5%',
                marginTop: 5,
                borderColor: '#C4C4C4',
                backgroundColor: 'white',
                borderWidth: 0.5,
                borderRadius: 10,
              }}>
              <TextInput
                style={{width: '90%', fontSize: 20, color: '#ACACAC', paddingLeft:"3%"}}
                onChangeText={text => this.setState({confirmPassword:text})}
                value={this.state.confirmPassword}
              />
            </View>

            <TouchableOpacity onPress={()=> {
                
               { this.state.newPassword != this.state.confirmPassword ? this.setState({error:"Password Not Match"}) : this.setState({error:""})}
               console.log(this.state.error);
                }}>

 {this.state.error ? <View><Text style={{marginLeft: '7%',color:"#fa2a57", fontSize:15}}>{this.state.error}</Text></View> : null}


              <View style={{marginBottom: 10}}>
            
                <View
                  style={{
                    height: 40,
                    width: '50%',
                    marginLeft: '25%',
                    borderRadius: 10,
                    marginTop: 40,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                    borderWidth: 0.6,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Continue
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.overlayColor,
  }
});

export default ResetPassword;
