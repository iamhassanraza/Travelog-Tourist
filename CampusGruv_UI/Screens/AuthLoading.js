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

import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';
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
    postDetail: undefined,
  };

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  // handleOpenURL(event) {
  //   console.log(event.url);
  //   const route = e.url.replace('campusgruv://post', '');
  //   console.log('route');
  //   // do something with the url, in our case navigate(route)
  // }

  async componentDidMount() {
    // Subscribe
    const initialUrl = await Linking.getInitialURL();
    console.log('initial url', initialUrl);
    if (initialUrl) {
      this.setState({postNav: true});
      const route = initialUrl.replace(/.*?:\/\/post\//g, '');
      console.log('initial url', route);
      let Token = await AsyncStorage.getItem('TOKEN');
      let USER = await AsyncStorage.getItem('USER_ID');
      var response = await fetch(
        `${
          require('../config').default.production
        }api/v1/get/post?post_id=${route}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      let JsonResponse = await response.json();
      this.setState({postDetail: JsonResponse});
      console.log(JsonResponse, 'Post details lamo');
    }

    // if (initialUrl !== null || initialUrl !== '') {
    //   console.log('if ran');
    //   this.setState({postNav: true});
    //   const route = initialUrl.replace(/.*?:\/\/post\//g, '');
    //   console.log('initial url', route);
    //   let Token = await AsyncStorage.getItem('TOKEN');
    //   let USER = await AsyncStorage.getItem('USER_ID');
    //   var response = await fetch(
    //     `${
    //       require('../config').default.production
    //     }api/v1/get/post?post_id=${route}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${Token}`,
    //       },
    //     },
    //   );
    //   let JsonResponse = await response.json();
    //   this.setState({postDetail: JsonResponse});
    //   console.log(JsonResponse, 'Post details lamo');
    // }
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
    var response = await fetch(
      `${
        require('../config').default.production
      }api/v1/get/user?user_id=${USER}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    let JsonResponse = await response.json();
    console.log(JsonResponse, 'POPOP');
    this.props.CreateUserDetails(JsonResponse);
  };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      await this.fetchUser();
      const userToken = await AsyncStorage.getItem('TOKEN');
      const campus_id = await AsyncStorage.getItem('CAMPUS_ID');
      const isverified = await AsyncStorage.getItem('isverified');
      const email = await AsyncStorage.getItem('email');

      // console.log(userToken,'===========token id')
      // console.log(isverified,'===========verified?')
      // console.log(campus_id,'===========campus id')
      // console.log(email,'===================email')

      if (userToken) {
        //means logged in hai
        if (isverified !== '1') {
          this.props.navigation.navigate('EmailVerification', {
            email: email,
          });
        } else if (isverified === '1' && campus_id === 'nahi_hai') {
          this.props.navigation.navigate('EditProfile');
        } else if (isverified === '1' && campus_id !== 'nahi_hai') {
          console.log('post nav', this.state.postNav);
          this.state.postNav
            ? this.props.navigation.navigate('App', {
                postDetail: this.state.postDetail,
              })
            : this.props.navigation.navigate('App');
        }
      } else {
        console.log('else ran');
        this.props.navigation.navigate('Auth');
      }
    } catch (e) {
      alert(e + '. Check connectivity');
    }

    // This will switch to the App screen or Auth screen and this loading
    // // screen will be unmounted and thrown away.
    // if(userToken && campus_id !== 'nahi_hai')
    // {
    //   this.props.navigation.navigate('App')
    // }
    // else if(userToken && campus_id === 'nahi_hai')
    // {
    //   this.props.navigation.navigate('EditProfile')

    // }
    // else{
    //   this.props.navigation.navigate('Auth')
    // }

    // this.props.navigation.navigate(userToken && campus_id !== '' ? 'App' : 'Auth');
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

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  {CreateUserDetails},
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
