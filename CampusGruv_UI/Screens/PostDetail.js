import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {ThemeConsumer} from 'react-native-elements';

export default class PostDetail extends Component {
  state = {
    Allcomments: [],
    currentComment: '',
  };

  changeCurrentCommentState = comment => {
    this.setState({
      currentComment: comment,
    });
  };

  renderHeader = (userdp,username) => {
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
            source={{uri:userdp}}
            style={{width: 40, height: 40, borderRadius: 50}}></Image>
          <Text style={{marginLeft: '7%', color: 'grey'}}>{username}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: '3%', color: 'grey'}}>Edit Post</Text>
        </View>
      </View>
    );
  };

  renderImage = (image) => {
    return (
      <View>
        <ImageBackground
          source={{uri:image}}
          style={{width: '100%', height: 200}}></ImageBackground>
      </View>
    );
  };

  renderTitle = (title) => {
    return (
      <View style={{alignItems: 'center', marginTop:7}}>
        <Text style={{fontSize: 18}}>
       {title}
        </Text>
      </View>
    );
  };

  renderDescription = (description) => {
    return (
      <View style={{alignItems: 'center', marginLeft: '5%', marginRight: '5%'}}>
        <Text style={{fontSize: 14,padding:5,color:'grey'}}>
          {description}
        </Text>
      </View>
    );
  };

  renderAddComment = (dp) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          height: 50,
          alignItems: 'center',
          paddingLeft: '2%',
        }}>
        <Image
          source={{uri:dp}}
          style={{width: 35, height: 35, borderRadius: 50}}></Image>

        <TextInput
          placeholder="Add your comment"
          style={{
            paddingLeft: '3%',
            marginLeft: '3%',
            width: '73%',
            height: 35,
            borderRadius: 9,
            borderWidth: 0.5,
            borderColor: 'grey',
          }}
          onChangeText={text => {
            this.changeCurrentCommentState(text);
          }}></TextInput>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 17,
            color: 'grey',
            paddingLeft: '2%',
          }}>
          Post
        </Text>
      </View>
    );
  };

  renderAllComments = (dp) => {
    return (
      <View style={{   flex: 1,paddingRight: '7%', marginTop: '2%'}}>
        <View
          style={{
            width: '100%',
         
            backgroundColor: '#e6e4e1',
            marginLeft: '4%',
            flexDirection: 'row',
            paddingTop: '2%',
            paddingLeft: '3%',
            borderRadius: 9,
            paddingBottom:"2%"
          }}>
          <Image
            source={{uri:dp}}
            style={{width: 30, height: 30, borderRadius: 50}}></Image>

          <View style={{flexDirection: 'column', width: 270, marginLeft: '2%'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'grey'}}>
              Mansehra Boy
            </Text>
            <Text style={{fontSize: 11, marginTop: '-1%', color: 'grey'}}>
            Mansehrian boy is not doing good 
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const data = this.props.navigation.getParam('PostData', 'nothing to render');
    
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{}}>
          {this.renderHeader(data.userAvatar,data.username)}
        
        </View>
        <ScrollView style={{height: 300}}>
        {this.renderImage(data.uri)}
          {this.renderTitle(data.title)}
          {this.renderDescription(data.description)}
          {this.renderAllComments(data.userAvatar)}
          {this.renderAllComments(data.userAvatar)}
        </ScrollView>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-380}>
          <View style={{}}>{this.renderAddComment(data.userAvatar)}</View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
