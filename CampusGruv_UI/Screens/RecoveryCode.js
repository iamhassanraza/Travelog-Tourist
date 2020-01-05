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
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import HeaderTitle from './Heading';
import Colors from '../Assets/Colors';
import {withNavigation} from 'react-navigation';
import LogoutButton from '../Components/LogoutButton';

class RecoverCode extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }

  checkOTP = async () => {
    const type = await this.props.navigation.getParam('type', 'forgotPassword');
    const email = await this.props.navigation.getParam('email', 'no email');

    if (this.state.code !== '') {
      if (type === 'verify_email') {
        const Response = await fetch(
          `https://campus-gruv-heroku.herokuapp.com/api/v1/user/verify_otp?otp=${this.state.code}&type=email&email=${email}`,
        );
        const JsonResponse = await Response.json();
        console.log(JsonResponse, '======== response ');
        if (parseInt(Response.status) === 404) {
          alert(JsonResponse.message);
        } else if (parseInt(Response.status) === 200) {
          alert(JsonResponse.message);
          this.setState({code: ''});
          await AsyncStorage.setItem('isVerified', '1');
          this.props.navigation.navigate('EditProfile');
        } else {
          alert('something went wront');
        }
      } else {
        //type === forgotpassword
        const Response = await fetch(
          `https://campus-gruv-heroku.herokuapp.com/api/v1/user/verify_otp?otp=${this.state.code}&type=reset_password&email=${email}`,
        );
        const JsonResponse = await Response.json();
        console.log(JsonResponse, '======== response ');
        if (parseInt(Response.status) === 404) {
          alert(JsonResponse.message);
        } else if (parseInt(Response.status) === 200) {
          this.props.navigation.navigate('ResetPassword', {
            OTP: this.state.code,
          });
          this.setState({code: ''});
        } else {
          alert('something went wront');
        }
      }
    } else {
      alert('Enter CODE');
    }
  };

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
            <View style={{flex: 0.5, marginTop: -10}}>
              <HeaderTitle />
            </View>

            <View style={{flex: 1.5}}>
              <Text
                style={{
                  width: '95%',
                  marginLeft: '2.5%',
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 25,
                }}>
                Enter Code
              </Text>

              <View
                style={{
                  width: '90%',
                  marginLeft: '5%',
                  marginTop: 10,
                  borderColor: '#C4C4C4',
                  backgroundColor: 'white',
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}>
                <TextInput
                  autoCapitalize="none"
                  style={{
                    width: '90%',
                    fontSize: 20,
                    color: '#ACACAC',
                    paddingLeft: '30%',
                  }}
                  onChangeText={text => this.setState({code: text})}
                  value={this.state.code}
                />
              </View>

              <TouchableOpacity onPress={() => this.checkOTP()}>
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
      <LogoutButton style={{   alignSelf: 'center',
            position: 'absolute',
            bottom: 50,
            borderWidth: 0.5,
            padding: 5,
            color: 'white',
            borderColor: 'white',
            fontWeight: 'bold'}}></LogoutButton>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.overlayColor,
  },
});

export default withNavigation(RecoverCode);
