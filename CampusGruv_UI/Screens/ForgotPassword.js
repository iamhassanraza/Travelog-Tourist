import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  StatusBar,
  ImageBackground,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import HeaderTitle from './Heading';
import Colors from '../Assets/Colors';
import {withNavigation} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import {BarIndicator} from 'react-native-indicators';

class ForgetPassword extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      resta: [],
      email: undefined,
      error: '',
      spinner: false,
    };
  }

  sendOTP = async () => {
    if (this.validate(this.state.email)) {
      this.setState({spinner: true});
      const Response = await fetch(
        `${require('../config').default.production}api/v1/user/send_otp?email=${
          this.state.email
        }&type=reset_password`,
      );
      const JsonResponse = await Response.json();
      this.setState({spinner: false});
      console.log(JsonResponse);
      if (parseInt(Response.status) === 404) {
        alert(JsonResponse.message);
      } else if (parseInt(Response.status) === 200) {
        this.props.navigation.navigate('RecoveryCode', {
          email: this.state.email,
        });
      } else {
        alert('something went wrong');
      }
    }
  };

  validate = text => {
    console.log(text);
    let check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (check.test(text) === false) {
      console.log('Email is Not Correct');
      this.setState({email: text, error: 'Email is not correct'});

      return false;
    } else {
      this.setState({email: text, error: ''});
      console.log('Email is Correct');
      return true;
    }
  };

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <>
        {Platform.OS === 'ios' ? (
          <StatusBar translucent={true} barStyle="light-content" />
        ) : null}
        <ImageBackground
          style={styles.container}
          source={require('../Assets/Images/background.png')}
          resizeMode="cover">
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              margin: 10,
              marginTop: Platform.OS == 'ios' ? 40 : 20,
            }}
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
                    fontSize: 20,
                  }}>
                  Forgot your password? Please enter your email below and you
                  will receive an email to reset your password
                </Text>
                {/* <InputView ph="Email" mt={20} /> */}

                <View
                  style={{
                    width: '90%',
                    marginLeft: '5%',
                    marginTop: 20,
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
                      paddingLeft: '3%',
                      height: Platform.OS == 'ios' ? 40 : 50,
                    }}
                    placeholder="Email"
                    // onChangeText={text => this.validate(text)}
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                  />
                </View>

                <TouchableOpacity onPress={() => this.sendOTP()}>
                  {this.state.error ? (
                    <View>
                      <Text
                        style={{
                          marginLeft: '7%',
                          color: '#fa2a57',
                          fontSize: 15,
                        }}>
                        {this.state.error}
                      </Text>
                    </View>
                  ) : null}

                  <View style={{marginBottom: 10}}>
                    {/* <ButtonSignInUp butt="Continue" /> */}
                    {this.state.spinner ? (
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
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'white',
                          }}>
                          Loading{' '}
                        </Text>
                        <BarIndicator
                          style={{flex: 0}}
                          count={3}
                          size={20}
                          color={'white'}
                        />
                      </View>
                    ) : (
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
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: Colors.overlayColor,
  },
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  signupOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 0,
  },
  heading: {
    fontSize: 50,
    color: 'white',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  buttonStyle: {
    height: 40,
    width: 200,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 15,
    color: 'white',
  },
});

export default withNavigation(ForgetPassword);
