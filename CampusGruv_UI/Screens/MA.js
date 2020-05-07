import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import BGIMAGE from '../Assets/Images/background.png';
import {TextInput} from 'react-native-gesture-handler';

export default class MA extends Component {
  render() {
    return (
      <View style={{flex: 1, borderWidth: 2, borderColor: 'red'}}>
        <ImageBackground
          source={BGIMAGE}
          style={{width: '100%', height: '100%', backgroundColor: '#0C91CF'}}>
          <View behavior="height" style={{borderWidth: 3}}>
            <View style={{}}>
              <Image
                source={require('../Assets/Images/logo.png')}
                resizeMode="contain"
                style={{width: 300, alignSelf: 'center'}}
              />
            </View>
            <KeyboardAvoidingView behavior="height">
              <View style={{borderWidth: 3}}>
                <View style={{paddingBottom: 20}}>
                  <TextInput
                    placeholder="Enter Email"
                    style={{
                      width: '90%',
                      height: 50,
                      borderWidth: 1,
                      backgroundColor: 'white',
                      alignSelf: 'center',
                      borderRadius: 20,
                    }}
                  />
                </View>
                <View style={{paddingBottom: 20}}>
                  <TextInput
                    placeholder="Enter Email"
                    style={{
                      width: '90%',
                      height: 50,
                      borderWidth: 1,
                      backgroundColor: 'white',
                      alignSelf: 'center',
                      borderRadius: 20,
                    }}
                  />
                </View>
                <View style={{paddingBottom: 20}}>
                  <TextInput
                    placeholder="Enter Email"
                    style={{
                      width: '90%',
                      height: 50,
                      borderWidth: 1,
                      backgroundColor: 'white',
                      alignSelf: 'center',
                      borderRadius: 20,
                    }}
                  />
                </View>
                <View style={{paddingBottom: 20}}>
                  <TextInput
                    placeholder="Enter Email"
                    style={{
                      width: '90%',
                      height: 50,
                      borderWidth: 1,
                      backgroundColor: 'white',
                      alignSelf: 'center',
                      borderRadius: 20,
                    }}
                  />
                </View>
                <View style={{paddingBottom: 20}}>
                  <TextInput
                    placeholder="Enter Email"
                    style={{
                      width: '90%',
                      height: 50,
                      borderWidth: 1,
                      backgroundColor: 'white',
                      alignSelf: 'center',
                      borderRadius: 20,
                    }}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
            <View style={{}}>
              <Button title={'sigin up'} />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
