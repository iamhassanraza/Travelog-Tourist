import React from 'react';
import {AsyncStorage} from 'react-native';
import {
  Text,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderTitle from './Heading';
import Colors, {ThemeBlue} from '../Assets/Colors';
const API_BASE_URL = `${require('../config').default.production}api/v1`;
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';

import {BarIndicator} from 'react-native-indicators';
import {Container, Content} from 'native-base';

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      resta: [],
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      Spinner: false,
    };
  }

  validateForm = () => {
    if (
      !this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      this.setState(
        {
          emailError: true,
        },
        () => {
          setTimeout(() => this.setState({emailError: false}), 1000);
        },
      );
      return false;
    }
    if (this.state.password.length < 8) {
      this.setState(
        {
          passwordError: true,
        },
        () => {
          setTimeout(() => this.setState({passwordError: false}), 1000);
        },
      );

      return false;
    }
    return true;
  };

  submitForm = () => {
    var status = '';
    if (!this.validateForm()) {
      console.log('sendng req .....');
    } else {
      // /////////////////////FETCH
      this.setState({
        Spinner: true,
      });
      fetch(`${API_BASE_URL}/user/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          account_type_id: 2,
        }),
      })
        .then(res => {
          status = res.status;
          this.setState({
            Spinner: false,
          });

          return res.json();
        })
        .then(async response => {
          if (status === 200) {
            //good to go
            console.log(response, 'response');
            this.props.CreateUserDetails(response);
            await AsyncStorage.setItem('TOKEN', response.token);
            await AsyncStorage.setItem('USERTOKEN', response.token);
            await AsyncStorage.setItem('email', response.email);
            console.log(response.email_verified.toString());
            await AsyncStorage.setItem(
              'isverified',
              response.email_verified.toString(),
            );
            await AsyncStorage.setItem('USER_ID', response.id.toString());
            await AsyncStorage.setItem('selected', response.id.toString());
            await AsyncStorage.setItem('accountType', 'user');
            if (response.campus_id === null) {
              await AsyncStorage.setItem('CAMPUS_ID', 'nahi_hai');
            } else {
              AsyncStorage.setItem('CAMPUS_ID', response.campus_id.toString());
            }
            console.log('WTF');
            this.props.navigation.navigate('AuthLoading');
          } else if (status === 401) {
            //user not found with credentials
            alert(response.message.split(':')[1]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <>
        {Platform.OS === 'ios' ? (
          <StatusBar translucent={true} barStyle="light-content" />
        ) : null}
        <Container>
          <ImageBackground
            style={styles.container}
            source={require('../Assets/Images/background.png')}
            resizeMode="cover">
            <Content>
              <View
                style={{
                  width: screenwidth,
                  height: screenheight,
                }}>
                {/* MAIN TITLE */}
                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: Platform.OS === 'ios' ? 30 : 0,
                    height: '30%',
                  }}>
                  <HeaderTitle />
                </View>

                <View
                  style={{
                    marginTop: Platform.OS === 'ios' ? 30 : 0,
                  }}>
                  {/* EMAIL FIELD */}
                  <View
                    style={{
                      width: '90%',
                      marginLeft: '5%',
                      //marginTop: -30,
                      borderColor: '#C4C4C4',
                      backgroundColor: 'white',
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}>
                    <TextInput
                      style={{
                        width: '90%',
                        height: Platform.OS == 'ios' ? 40 : 50,
                        marginLeft: 10,
                        fontSize: 20,
                        color: '#ACACAC',
                      }}
                      placeholder="Email"
                      value={this.state.email}
                      onChangeText={email => this.setState({email})}
                      keyboardType="email-address"
                    />
                  </View>
                  {/* EMAIL ERROR TEXT */}
                  {this.state.emailError ? (
                    <Text style={{color: 'red', fontSize: 13, marginLeft: 20}}>
                      Invalid email address
                    </Text>
                  ) : null}

                  {/* PASSWORD FIELD */}
                  <View
                    style={{
                      width: '90%',
                      height: Platform.OS == 'ios' ? 40 : 50,
                      marginLeft: '5%',
                      marginTop: 20,
                      borderColor: '#C4C4C4',
                      backgroundColor: 'white',
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}>
                    <TextInput
                      style={{
                        width: '90%',
                        height: Platform.OS == 'ios' ? 40 : 50,
                        marginLeft: 10,
                        fontSize: 20,
                        color: '#ACACAC',
                      }}
                      placeholder="Password"
                      value={this.state.password}
                      onChangeText={password => this.setState({password})}
                      secureTextEntry
                    />
                  </View>
                  {/* PASSWORD ERROR TEXT */}
                  {this.state.passwordError ? (
                    <Text style={{color: 'red', fontSize: 13, marginLeft: 20}}>
                      Minimum 8 characters required
                    </Text>
                  ) : null}
                  {/* LOG IN BUTTON */}
                  <View style={styles.butt}>
                    <TouchableOpacity onPress={this.submitForm}>
                      {this.state.Spinner ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: 18,
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
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'white',
                          }}>
                          Log in
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: ThemeBlue,
                      textAlign: 'center',
                      fontSize: 18,
                      marginTop: Platform.OS === 'ios' ? 20 : 15,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('ForgotPassword');
                    }}>
                    Forgot your login details ?
                  </Text>
                </View>

                {/* SIGN UP NAVIGATION */}
                <View>
                  <View
                    style={{
                      marginTop: Platform.OS === 'ios' ? '45%' : '25%',
                    }}>
                    <Text
                      style={{
                        color: ThemeBlue,
                        textAlign: 'center',
                        fontSize: 18,
                      }}>
                      Don't have an account ?
                    </Text>
                    <Text
                      style={{
                        color: ThemeBlue,
                        textAlign: 'center',
                        fontSize: 18,
                        marginTop: 10,
                        fontWeight: 'bold',
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('SignUp');
                      }}>
                      Sign Up
                    </Text>
                  </View>
                </View>
              </View>
            </Content>
          </ImageBackground>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  butt: {
    height: 40,
    width: '50%',
    marginLeft: '25%',
    borderRadius: 10,
    marginTop: 40,
    justifyContent: 'center',
    backgroundColor: ThemeBlue,
    borderColor: 'white',
    borderWidth: 0.6,
  },
  container: {
    width: screenwidth,
    // marginTop: 50,
    height: screenheight,
    // backgroundColor: 'white',
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
    color: 'black',
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
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

export default connect(
  null,
  {CreateUserDetails},
)(Login);
