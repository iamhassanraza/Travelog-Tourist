import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import HeaderTitle from './Heading';

import Colors from '../Assets/Colors';

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;

export default class UploadDp extends Component {
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
