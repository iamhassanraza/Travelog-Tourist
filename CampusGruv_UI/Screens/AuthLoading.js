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
import { CreateUserDetails } from "../ReduxStore/Actions/index";

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;



class AuthLoading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
    // this.props.CreateUserDetails({name:'hassan',id:'asndas'})
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('TOKEN');
    const campus_id = await AsyncStorage.getItem('CAMPUS_ID');
    const isverified = await AsyncStorage.getItem('isverified');
    const email = await AsyncStorage.getItem('email');
   
    console.log(userToken,'===========token id')
    console.log(isverified,'===========verified?')
    console.log(campus_id,'===========campus id')
    console.log(email,'===================email')

        if(userToken)   //means logged in hai
        { 
          if(isverified !== '1')
          {
            this.props.navigation.navigate('RecoveryCode',{
              type:'verify_email',
              email:email
            })
          }
          else if(isverified === '1' && campus_id === 'nahi_hai'){
            this.props.navigation.navigate('EditProfile')
          }
          else if(isverified === '1' && campus_id !== 'nahi_hai'){
            this.props.navigation.navigate('App')
          }

        }
        else
        {  
          this.props.navigation.navigate('Auth')
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
    console.log(this.props.User,'============ userr prp')
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

mapStateToProps = (state)=>{ //this state will contain FULL redux store all the reducers data


  //use your required reducer data in props i.e reducer1
  
  return { User : state.User}  //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
  
  }


export default connect(mapStateToProps,{ CreateUserDetails })(AuthLoading);


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

