import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  TextInput,
  AsyncStorage
} from 'react-native';
import HeaderTitle from './Heading';
import Colors from '../Assets/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {Container, Item, Content, Input} from 'native-base';
import { connect } from "react-redux";
import { CreateUserDetails } from "../ReduxStore/Actions/index";
const API_BASE_URL = 'https://campus-gruv-heroku.herokuapp.com/api/v1';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

class Signup extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      resta: [],
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      first_nameError: false,
      last_nameError: false,
      emailError: false,
      passwordError: false,
      spinner:false
    };
  }

  validateForm = () => {
    if (this.state.first_name.length < 1) {
      this.setState(
        {
          first_nameError: true,
        },
        () => {
          setTimeout(() => this.setState({first_nameError: false}), 1000);
        },
      );

      return false;
    }

    if (this.state.last_name.length < 1) {
      this.setState(
        {
          last_nameError: true,
        },
        () => {
          setTimeout(() => this.setState({last_nameError: false}), 1000);
        },
      );

      return false;
    }

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

  ////////////////FETCH FUNCTION

  
  





  submitForm = () => {

    var status = undefined


    if (!this.validateForm()) {
      console.log('sendng req .....');
    } else {
      // /////////////////////FETCH
      this.setState({spinner:true})
      fetch(`${API_BASE_URL}/user/signup`, {
        method: 'POST',
        body: JSON.stringify({
          //userId: uuidv4(),
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password,
        
          // email_verified:'0',
          // active:'0',
        }),
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => res.json())
        .then(response => {
          console.log('=====>>>', response);
          
          if (response) {
            
            console.log('=====>>>', response);
            if (response.message ) {
              alert(response.message);
          
            }
            if(response.message==='Signup success'){
              // this.props.navigation.navigate('Login')
              //===================================================

              fetch(`${API_BASE_URL}/user/signin`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: this.state.email,
                  password: this.state.password,
                }),
              })
                .then(res => {
                  status = res.status
                  return res.json();
                })
                .then(async (response) => {
                  if (status === 200) {
                    //good to go
                    // console.log(response,'============respines e =============')
                    this.props.CreateUserDetails(response)
                     await AsyncStorage.setItem('TOKEN', response.token);
                     await AsyncStorage.setItem('email', response.email);
                     await AsyncStorage.setItem('USER_ID', response.id.toString());
                     await AsyncStorage.setItem('isverified', response.email_verified.toString());
                    //  AsyncStorage.setItem('CAMPUS_ID', response.campus_id.toString());
                     await AsyncStorage.setItem('CAMPUS_ID', 'nahi_hai');
                     this.setState({
                      spinner:false
                    })
                    
                    this.props.navigation.navigate('EmailVerification',{
                      email:response.email
                    })
                  } else if (status === 401) {
                    //user not found with credentials
                    alert(response.message.split(':')[1]);
                  }
                })
                .catch(error => {
                  console.log(error);
                });


              //===============================================
            }
            else{
              this.setState({
                spinner:false
              })
            }
          } 
        })
        .catch(error => {
          console.log(error);
    
        });
    
    }
  };


  render() {
    // const { navigate } = this.props.navigation;
    return (
      <Container style={{height: '100%'}}>
      <ImageBackground
        style={styles.container}
        source={require('../Assets/Images/background.png')}
        resizeMode="cover">
        <Text
          style={{color: 'white', fontSize: 16, marginLeft: 10, marginTop:Platform.OS=='ios'? 40:20,}}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          Back
        </Text>
            <Content style={{}}>
              {/* MAIN TITLE */}
              <View style={{justifyContent: 'center', height: '30%'}}>
                <HeaderTitle />
              </View>

              <View style={{}}>
                {/* 

                {/* First name FIELD */}
                <View
                  style={{
                    width: '90%',
                    marginLeft: '5%',
                    borderColor: '#C4C4C4',
                    backgroundColor: 'white',
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}>
                  <TextInput
                    style={{
                      width: '90%',
                      height:Platform.OS=='ios'? 40:50,
                      marginLeft: 10,
                      fontSize: 20,
                      color: '#ACACAC',
                    }}
                    placeholder="First name"
                    value={this.state.first_name}
                    onChangeText={first_name => this.setState({first_name})}
                  />
                </View>
                {/* First name ERROR TEXT */}
                {this.state.first_nameError ? (
                  <Text style={{color: 'red', fontSize: 13, marginLeft: 20}}>
                    First Name Required
                  </Text>
                ) : null}

                {/* Last name FIELD */}
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
                    style={{
                      width: '90%',
                      height:Platform.OS=='ios'? 40:50,
                      marginLeft: 10,
                      fontSize: 20,
                      color: '#ACACAC',
                    }}
                    placeholder="Last name"
                    value={this.state.last_name}
                    onChangeText={last_name => this.setState({last_name})}
                  />
                </View>
                {/* Last name ERROR TEXT */}
                {this.state.last_nameError ? (
                  <Text style={{color: 'red', fontSize: 13, marginLeft: 20}}>
                    Last Name Required
                  </Text>
                ) : null}
                {/* Email FIELD */}
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
                    style={{
                      width: '90%',
                      height:Platform.OS=='ios'? 40:50,
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
                {/* Email ERROR TEXT */}
                {this.state.emailError ? (
                  <Text style={{color: 'red', fontSize: 13, marginLeft: 20}}>
                    Invalid email address
                  </Text>
                ) : null}
                {/* Password FIELD */}
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
                    style={{
                      width: '90%',
                      height:Platform.OS=='ios'? 40:50,
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
                {/* Password ERROR TEXT */}
                {this.state.passwordError ? (
                  <Text style={{color: 'red', fontSize: 13, marginLeft: 20}}>
                    Minimum 8 characters required
                  </Text>
                ) : null}

                {/* Sign up BUTTON */}
                <View style={styles.butt}>
                  <TouchableOpacity onPress={this.submitForm}>
                    {this.state.spinner ? (
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
                        Sign up
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              </Content>
      </ImageBackground>
      </Container>
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
    marginBottom: 25,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 0.6,
  },
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

export default connect(null,{ CreateUserDetails })(Signup)
