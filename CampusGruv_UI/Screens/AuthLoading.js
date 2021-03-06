import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  StatusBar,
  StyleSheet,
  Linking,
  View,
  ImageBackground,
  Text,
} from 'react-native';
import Colors, {ThemeBlue} from '../Assets/Colors';
import HeaderTitle from './Heading';
import messaging from '@react-native-firebase/messaging';
import io from 'socket.io-client';

import {connect} from 'react-redux';
import {CreateUserDetails, connectSocket} from '../ReduxStore/Actions/index';
import NetInfo from '@react-native-community/netinfo';
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
import {getStatusBarHeight} from 'react-native-status-bar-height';
const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

class AuthLoading extends React.Component {
  state = {
    postDetail: [],
  };

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  async componentDidMount() {
    var initialUrl = null;
    if (Platform.OS === 'android') {
      initialUrl = this.props.screenProps.url;
    } else {
      initialUrl = await Linking.getInitialURL();
    }
    if (initialUrl) {
      const route = initialUrl.replace(
        Platform.OS === 'android'
          ? 'https://www.campusgruv.com/post/'
          : 'campusgruv://post/',
        '',
      );
      let Token = await AsyncStorage.getItem('TOKEN');
      let USER = await AsyncStorage.getItem('USER_ID');
      var response = await fetch(
        `${
          require('../config').default.production
        }api/v1/get/post?post_id=${route}&user_id=${this.props.User.id}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      let JsonResponse = await response.json();
      this.setState({postDetail: JsonResponse});
    }

    //Linking.addEventListener('url', this.handleOpenURL);
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      {
        state.isConnected
          ? this._bootstrapAsync()
          : alert('No Internet Connection! Restart the App');
      }
    });
  }

  fetchUser = async () => {
    let Token = await AsyncStorage.getItem('TOKEN');
    let USER = await AsyncStorage.getItem('USER_ID');
    let accountType = await AsyncStorage.getItem('accountType');
    let selected = await AsyncStorage.getItem('selected');
    var response = await fetch(
      `${
        require('../config').default.production
      }api/v1/get/user?user_id=${selected}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    let JsonResponse = await response.json();

    this.props.CreateUserDetails(JsonResponse);
  };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      // await this.fetchUser();
      const userToken = await AsyncStorage.getItem('TOKEN');
      const campus_id = await AsyncStorage.getItem('CAMPUS_ID');
      const isverified = await AsyncStorage.getItem('isverified');
      const email = await AsyncStorage.getItem('email');

      // console.log(userToken,'===========token id')
      // console.log(isverified,'===========verified?')
      // console.log(campus_id,'===========campus id')
      // console.log(email,'===================email')

      if (userToken) {
        await this.fetchUser();

        //means logged in hai
        if (isverified !== '1') {
          this.props.navigation.navigate('EmailVerification', {
            email: email,
          });
        } else if (isverified === '1' && campus_id === 'nahi_hai') {
          this.props.navigation.navigate('EditProfile');
        } else if (isverified === '1' && campus_id !== 'nahi_hai') {
          this.socket = io(`${require('../config').default.pro_chat}`, {
            query: `token=${userToken}`,
            transports: ['websocket'],
          });
          this.socket.on('connect', () => {
            console.log('hello jee connection established');
            this.props.connectSocket(this.socket);
            this.socket.emit('isLoggedIn');
            const postDetail = this.state.postDetail;
            postDetail.length > 0
              ? this.props.navigation.navigate('App', {
                  postDetail: this.state.postDetail,
                })
              : this.props.navigation.navigate('App');
          });
        }
      } else {
        this.props.navigation.navigate('Auth');
      }
    } catch (e) {
      alert(e + '. Check connectivity');
    }
  };

  // Render any loading content that you like here
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
          <View style={{marginTop: '55%'}}>
            <HeaderTitle />
          </View>
          <View style={{justifyContent: 'center'}}>
            <DotIndicator count={3} color={'white'} />
          </View>
        </ImageBackground>
      </>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User, socket: state.socket}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  {CreateUserDetails, connectSocket},
)(AuthLoading);

const styles = StyleSheet.create({
  container: {
    width: screenwidth,
    height: screenheight / 1,
    backgroundColor: Colors.overlayColor,
  },
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
