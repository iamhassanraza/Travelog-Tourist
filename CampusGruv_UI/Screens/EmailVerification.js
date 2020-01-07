import React from 'react';
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
import {
  BarIndicator,
 
} from 'react-native-indicators';
import HeaderTitle from './Heading';
import Colors from '../Assets/Colors';
import {withNavigation} from 'react-navigation';
import LogoutButton from '../Components/LogoutButton';

class EmailVerification extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      spinner: false,
    };
  }

  checkOTP = async () => {
      this.setState({
          spinner:true
      })
    const email = await this.props.navigation.getParam('email', 'no email');

    if (this.state.code !== '') {
      const Response = await fetch(
        `https://campus-gruv-heroku.herokuapp.com/api/v1/user/verify_otp?otp=${this.state.code}&type=email&email=${email}`,
      );
      const JsonResponse = await Response.json();
      console.log(JsonResponse, '======== response ');
      this.setState({spinner:false});
      if (parseInt(Response.status) === 404) {
        alert(JsonResponse.message);
      } else if (parseInt(Response.status) === 200) {
        this.setState({code:''});
        alert(JsonResponse.message);
     
        await AsyncStorage.setItem('isverified', '1');
        this.props.navigation.navigate('EditProfile');
      } else {
        alert('something went wront');
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
                  fontSize: 15,
                  marginBottom: 10,
                }}>
                {' '}
                A code has been sent to email{' '}
                {this.props.navigation.getParam('email', 'no email')} ,kindly
                check your email and enter the code below.
              </Text>
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
                        borderWidth: 0.6,flexDirection:'row',justifyContent:'center',
                        alignItems:'center'
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
        <LogoutButton
          style={{
            alignSelf: 'center',
            position: 'absolute',
            bottom: 50,
            borderWidth: 0.5,
            padding: 5,
            color: 'white',
            borderColor: 'white',
            fontWeight: 'bold',
          }}></LogoutButton>
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

export default withNavigation(EmailVerification);
