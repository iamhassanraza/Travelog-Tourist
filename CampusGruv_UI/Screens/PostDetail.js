import React, {Component} from 'react';
import {Text, View, Image, ImageBackground, TextInput} from 'react-native';
import {ThemeConsumer} from 'react-native-elements';

export default class PostDetail extends Component {
  renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 35,
            marginBottom: 5,
            marginTop: 5,
          }}>
          <Image
            source={require('../Assets/Images/ema.jpg')}
            style={{width: 40, height: 40, borderRadius: 50}}></Image>
          <Text style={{marginLeft: '7%', color: 'grey'}}>Mindy Z</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: '3%', color: 'grey'}}>Edit Post</Text>
        </View>
      </View>
    );
  };

  renderImage = () => {
    return (
      <View>
        <ImageBackground
          source={require('../Assets/Images/samandarkatha.jpg')}
          style={{width: '100%', height: 200}}></ImageBackground>
      </View>
    );
  };

  renderTitle = () => {
    return (
      <View style={{alignItems: 'center', margin: 7}}>
        <Text style={{fontSize: 18}}>
          Photos from the dance concert last night!
        </Text>
      </View>
    );
  };

  renderDescription = () => {
    return (
      <View style={{alignItems: 'center', marginLeft: '5%', marginRight: '5%'}}>
        <Text style={{fontSize: 15, textAlign: 'justify'}}>
          Good luck on finals this season! Come join Macy and I on the first
          floor of the Cathedral of learning to meet many other therapy dogs!
        </Text>
      </View>
    );
  };

  renderAddComment = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../Assets/Images/ema.jpg')}
          style={{width: 35, height: 35, borderRadius: 50}}>
          </Image>

          <TextInput placeholder="Add your comment" 
          style={{
            paddingLeft: '3%',
            marginLeft: '3%',
            width: "73%",
            height: 35,
            borderRadius: 9,
            borderWidth: 0.5,
            borderColor: 'grey',
          }}></TextInput>
           <Text style={{alignSelf:"center",fontSize:17, color: 'grey', paddingLeft:"2%"}}>Post</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex:1, justifyContent:"space-between"}}>
        <View style={{flex:8}}>
        {this.renderHeader()}
        {this.renderImage()}
        </View>
        <View style={{flex:8}}>
        {this.renderTitle()}
        {this.renderDescription()}
        </View>

        <View style={{flex:1.5}}>
        {this.renderAddComment()}

        </View>
       
      </View>
    );
  }
}
