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
  StatusBar,
} from 'react-native';
import HeaderTitle from './Heading';
import Colors from '../Assets/Colors';
import {withNavigation} from 'react-navigation';
import {BarIndicator} from 'react-native-indicators';

class ResetPassword extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      error: '',
      Spinner: false,
    };
  }

  changePassword = async () => {
    this.setState({
      Spinner: true,
    });
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/user/reset_password?otp=${this.props.navigation.getParam(
        'OTP',
        '000',
      )}&password=${
        this.state.confirmPassword
      }&email=${this.props.navigation.getParam('email', 'no email')}`,
    );
    const JsonResponse = await Response.json();
    if (parseInt(Response.status) === 400) {
      alert(JsonResponse.message);
    } else if (parseInt(Response.status) === 200) {
      alert(JsonResponse.message);
      this.props.navigation.navigate('Login');
      this.setState({error: ''});
    }
  };

  render() {
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
              <View style={{marginTop: '10%', height: '30%'}}>
                <HeaderTitle />
              </View>

              <View style={{flex: 1.5}}>
                <Text
                  style={{
                    marginLeft: '7%',
                    color: 'white',
                    fontSize: 18,
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
                    secureTextEntry
                    autoCapitalize="none"
                    style={{
                      width: '90%',
                      fontSize: 20,
                      color: '#ACACAC',
                      paddingLeft: '3%',
                      height: Platform.OS == 'ios' ? 40 : 50,
                    }}
                    onChangeText={text => this.setState({newPassword: text})}
                    value={this.state.newPassword}
                  />
                </View>

                <Text
                  style={{
                    marginLeft: '7%',
                    marginTop: '3%',
                    color: 'white',
                    fontSize: 18,
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
                    secureTextEntry
                    autoCapitalize="none"
                    style={{
                      width: '90%',
                      fontSize: 20,
                      color: '#ACACAC',
                      paddingLeft: '3%',
                      height: Platform.OS == 'ios' ? 40 : 50,
                    }}
                    onChangeText={text =>
                      this.setState({confirmPassword: text})
                    }
                    value={this.state.confirmPassword}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    {
                      this.state.newPassword.length < 8
                        ? this.setState({
                            error: 'Minimum 8 characters required',
                          })
                        : this.state.newPassword != this.state.confirmPassword
                        ? this.setState({error: 'Password Not Match'})
                        : this.changePassword();
                    }

                    console.log(this.state.error, 'error?');
                  }}>
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

                  {this.state.Spinner ? (
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
                          flexDirection: 'row',
                          alignItems: 'center',
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
                          Loading{' '}
                        </Text>
                        <BarIndicator
                          style={{flex: 0, margin}}
                          count={3}
                          size={20}
                          color={'white'}
                        />
                      </View>
                    </View>
                  ) : (
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
                  )}
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
    backgroundColor: Colors.overlayColor,
  },
});

export default withNavigation(ResetPassword);
