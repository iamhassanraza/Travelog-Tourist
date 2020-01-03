import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
  ImageBackground
} from 'react-native';
import Colors from '../Assets/Colors'
import HeaderTitle from './Heading';

import { connect } from "react-redux";
import { CreateUserDetails } from "../ReduxStore/Actions/index"
const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;



class AuthLoading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('TOKEN');
    const campus_id = await AsyncStorage.getItem('CAMPUS_ID');

    console.log(campus_id,'===========campus id')
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if(userToken && campus_id !== 'nahi_hai')
    {
      this.props.navigation.navigate('App')
    }
    else if(userToken && campus_id === 'nahi_hai')
    {
      this.props.navigation.navigate('EditProfile')

    }
    else{
      this.props.navigation.navigate('Auth')
    }



    // this.props.navigation.navigate(userToken && campus_id !== '' ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('../Assets/Images/background.png')}
        resizeMode="cover">
        <View style={{marginTop: '55%'}}>
          <HeaderTitle></HeaderTitle>
        </View>
      </ImageBackground>
   
    );
  }
}

export default AuthLoading;


const styles = StyleSheet.create({
  container: {
    width: screenwidth,
    height: screenheight / 1,
    backgroundColor: Colors.overlayColor,
  },
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  }
});