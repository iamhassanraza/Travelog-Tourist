import React, { useState, useEffect } from 'react';
import { 
  Text, 
  Image, 
  ScrollView, 
  View, TouchableOpacity,
  StyleSheet, Dimensions, Platform,TextInput, KeyboardAvoidingView } from 'react-native';
import InputView from '../Components/ProfileEdit/InputViews'
import ImagePicker from 'react-native-image-picker'
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg'
import { TouchableHighlight } from 'react-native-gesture-handler';
class ProfilePage extends React.Component {

    state = {
        resta: [],
        imageUri: 'https://www.bluefrosthvac.com/wp-content/uploads/2019/08/default-person.png' 
      };

    uploadProfilePicture = () => {
      ImagePicker.showImagePicker((response) => {
        if (response.didCancel) { console.log('cancelled')} 
        else if (response.error) { console.log('error is:', response.error) }
        else {
          const source = {uri: response.uri};
          const fileTypes = /jpeg|jpg|png|gif/;
          const allowedImgSize = 1024*1024*10;
          if(!fileTypes.test(response.type)) {
            alert('Uploaded file is not a valid image. \n(allowed file types: jpeg, jpg, png, gif)')
          } 
          else if (response.fileSize > allowedImgSize) {
            alert('Uploaded file is too large \n(allowed file size is 10MB)')
          } 
          else {
          this.setState({
            imageUri : response.uri 
          })
          }
        }
      });
    }
    render() {
      //const { navigate } = this.props.navigation;
      return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
          <ScrollView>
              {/* EDIT PROFILE IMAGE */}
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
              <Image source={{ uri: this.state.imageUri}} style={{width:150, height:150, borderColor:'grey',borderWidth:0.9,borderRadius:80}} />
            </View>
            <TouchableOpacity
              onPress = {this.uploadProfilePicture}
            >
              <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                <Text style={{color:'#0C91CF',fontWeight:'bold',fontSize:20}}>Change Profile Picture</Text>
              </View>
            </TouchableOpacity>
    
        {/* OPTIONS */}

            <View style={{borderBottomColor:'#C4C4C4',borderBottomWidth:1,marginTop:20}}>
              <InputView name='Name' ph='Jessica Z'/>
              <InputView name='Campus' ph='University of Pittsburgh'/>
              <InputView name='Major' ph='Major'/>
              <InputView name='Birth Date' ph='MM/DD/YY'/>
              <InputView name='Phone' ph='XXX-XXXXX-XXXX'/>
              <InputView name='Grad Year' ph='2019'/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    );
    }
}

    export default ProfilePage;