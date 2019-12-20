import React, { useState, useEffect } from 'react';
import { Text, Image,ImageBackground, View, StyleSheet, Dimensions, Platform,TextInput } from 'react-native';
import InputView from './ProfileInputView'
import HeaderTitle from './Heading'
import Colors from '../Assets/Colors';
import ButtonSignInUp from './ButtonSignInUp'

class ForgetPassword extends React.Component {
  static navigationOptions = {
    header: null
  }
    constructor(props) {
      super(props);
      this.state = {
        resta: []
      };
    }
    render() {
      // const { navigate } = this.props.navigation;
      return (
        <ImageBackground 
        style={styles.container}
        source={require('../Assets/Images/background.png')}
        resizeMode='cover'
        >
                    <Text style={{color:'white',fontSize:16,margin:10,marginTop:20}} onPress={()=>{
    this.props.navigation.goBack()
  }}>Back</Text>
  <View style={{flex:1,}}>

             <View style={{flex:0.5}}>
         <HeaderTitle  />
             </View>

         <View style={{flex:1.5}}>


<Text style={{width:'95%',marginLeft:'2.5%',textAlign:'center',color:'white',fontSize:20}}>Forgot your password? Please enter your email below and you will receive an email to reset your password</Text>
<InputView ph='Email' mt={20}/>

<ButtonSignInUp butt='Continue'/>

         </View>


</View>
</ImageBackground>
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
        ...StyleSheet.absoluteFillObject
      },
      signupOptions: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 0
      },
      heading: {
        fontSize: 50,
        color: 'white',
      },
      textStyle: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10  
      },
      buttonStyle: {
          height: 40,
          width: 200, 
          borderColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 15,
          marginVertical: 10
      },
      btnText: {
          fontSize: 15,
          color: 'white',
      },
  });
  
 
  
    export default ForgetPassword;