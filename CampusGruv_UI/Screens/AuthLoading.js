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

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;



class AuthLoading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('TOKEN');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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