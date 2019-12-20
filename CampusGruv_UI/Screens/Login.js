
import React, { useState, useEffect } from 'react';
import {AsyncStorage} from 'react-native';
import { Text, Image,ImageBackground, View, StyleSheet,KeyboardAvoidingView,TouchableOpacity, Dimensions, Platform,TextInput } from 'react-native';
import HeaderTitle from './Heading'
import Colors from '../Assets/Colors';
const API_BASE_URL = "https://campus-gruv-heroku.herokuapp.com/api/v1"
class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
    constructor(props) {
      super(props);
      this.state = {
        resta: [],
          email: '',
          password: '',
          emailError:false,
          passwordError:false,
      };
    }

     validateForm = () => {
      if (!this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
this.setState({
emailError:true
},()=>{
  setTimeout(() => this.setState({emailError: false}), 1000)
})
return false;
      }
      if (this.state.password.length < 8) {
        this.setState({
          passwordError:true
          },()=>{
            setTimeout(() => this.setState({passwordError: false}), 1000)
          })
       
        return false;
      }
      return true;
    }

    submitForm = () => {
      if(!this.validateForm()){
        console.log('sendng req .....');
      }
      else{

// /////////////////////FETCH
fetch(`${API_BASE_URL}/user/signin`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json"},
  body: JSON.stringify({
    email: this.state.email,
    password: this.state.password
  })
})
.then(res =>  res.json())
  .then(response => {


    if(response){
      console.log("=====>>>", response);
      if(response.message){
        alert(response.message);
      }
      else{
        alert('login Success')
        console.log(response.token)
        AsyncStorage.setItem('TOKEN',response.token);
        this.props.navigation.navigate('otherScreens')
      
      }
    }


    else{
      alert('User not Authorized');
    }

    // callback(response);

  })
  .catch(error => {
    console.log(error);
    // callback(null);
  });
// /////////////////////FETCH
      }

    }

    render() {
    
  
      
      return (
        <ImageBackground 
        style={styles.container}
        source={require('../Assets/Images/background.png')}
        resizeMode='cover'
        >
  <View style={{flex:1,justifyContent:'space-between'}}>
  <KeyboardAvoidingView  style={{ flex: 1}}  behavior="padding" enabled>

{/* MAIN TITLE */}
             <View >
         <HeaderTitle  />
             </View>

         <View style={{marginTop:60}}>

           {/* EMAIL FIELD */}
<View style={{width:'90%',marginLeft:'5%',marginTop:-20,borderColor:'#C4C4C4',backgroundColor:'white',borderWidth:0.5,borderRadius:10}}>
<TextInput
        style={{width:'90%',marginLeft:10,fontSize:20,color:'#ACACAC'}}
        placeholder='Email'
        value={this.state.email}
        onChangeText={email => this.setState({ email })}
        keyboardType='email-address'
    />
                    </View> 
                               {/* EMAIL ERROR TEXT */}
                    {
this.state.emailError ?
                      <Text style={{color: 'red', fontSize: 13,marginLeft:20}}>Invalid email address</Text>
                    :null
                    }

                               {/* PASSWORD FIELD */}
<View style={{width:'90%',marginLeft:'5%',marginTop:20,borderColor:'#C4C4C4',backgroundColor:'white',borderWidth:0.5,borderRadius:10}}>
<TextInput
        style={{width:'90%',marginLeft:10,fontSize:20,color:'#ACACAC'}}
        placeholder='Password'
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
        secureTextEntry
    />
                    </View> 
                               {/* PASSWORD ERROR TEXT */}
                    {
this.state.passwordError ?
                      <Text style={{color: 'red', fontSize: 13,marginLeft:20}}>Minimum 8 characters required</Text>
                    :null
                    }
                    {/* LOG IN BUTTON */}
<View    style={styles.butt}>
  <TouchableOpacity    onPress={this.submitForm}>
      <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'white'}}>Log in</Text>
  </TouchableOpacity>
        </View>
<Text style={{color:'white',textAlign:'center',fontSize:18,marginTop:20}} onPress={()=>{
    this.props.navigation.navigate('ForgotPassword')
  }}>Forgot your login details ?</Text>

         </View>

{/* SIGN UP NAVIGATION */}
<View style={{marginTop:120}}>
  <View />
  <View >
  <Text style={{color:'white',textAlign:'center',fontSize:18,marginTop:10}}>Don't have an account ?</Text>
  <Text style={{color:'white',textAlign:'center',fontSize:18,marginTop:10,fontWeight:'bold'}} onPress={()=>{
    this.props.navigation.navigate('SignUp')
  }}>Sign Up</Text>
  </View>
</View>


</KeyboardAvoidingView>
</View>
</ImageBackground>
        );
      }
    }

    const styles = StyleSheet.create({
      butt:{height:40,width:'50%',marginLeft:'25%',borderRadius:10,marginTop:40,justifyContent:'center',backgroundColor:'transparent',borderColor:'white',borderWidth:0.6},
      container: {
        flex: 1,
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
  
 
  
    export default Login;