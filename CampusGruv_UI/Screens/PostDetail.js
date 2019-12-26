import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {ThemeConsumer} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {ThemeBlue} from '../Assets/Colors';
import Modal from 'react-native-modal';

const IconGrey = '#b4b8bf';

export default class PostDetail extends Component {
  state = {
    Allcomments: [],
    currentComment: '',
    followed: true,
    saved: false,
    isModalVisible: true,
  };

  changeCurrentCommentState = comment => {
    this.setState({
      currentComment: comment,
    });
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  renderHeader = (userdp, username) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 11,
            marginBottom: 5,
            marginTop: 5,
          }}>
          <View>
            <BackIcon
              name="ios-arrow-back"
              onPress={() => alert('Back')}
              style={{
                marginRight: 8,
                fontSize: 28,
                color: IconGrey,
                paddingLeft: 3,
                paddingRight: 3,
              }}></BackIcon>
          </View>

          <Image
            source={{uri: userdp}}
            style={{width: 40, height: 40, borderRadius: 50}}></Image>
          <Text style={{marginLeft: '7%', color: IconGrey}}>{username}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={{marginRight: '3%', color: 'grey', borderWidth: 1}}>
            Edit Post
          </Text> */}

          <Icon
            name={this.state.followed ? 'star' : 'star-outline'}
            style={{
              fontSize: 28,
              color: this.state.followed ? ThemeBlue : IconGrey,
              paddingRight: 3,
            }}
            onPress={() => {
              this.setState(prevState => ({
                followed: !prevState.followed,
              }));
            }}></Icon>

          <Icon
            name="content-save-outline"
            style={{
              fontSize: 28,
              paddingRight: 3,
              color: this.state.saved ? ThemeBlue : IconGrey,
            }}
            onPress={() => {
              this.setState(prevState => ({
                saved: !prevState.saved,
              }));
            }}></Icon>

          <IconFeather
            name="send"
            style={{fontSize: 25, color: IconGrey, paddingRight: 3}}
            onPress={() => alert('Share')}></IconFeather>

          <View>
            <Icon
              name="dots-horizontal"
              style={{fontSize: 30, color: IconGrey, paddingRight: 3}}
              onPress={this.toggleModal}></Icon>

            <View>
              <Modal
              style={{margin:0}}
                isVisible={this.state.isModalVisible}
                onBackdropPress={() => this.setState({isModalVisible: false})}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  


                  <View style={styles.modalOptions}>
                  <Icon name="flag-variant-outline" style={styles.optionIcon}></Icon>
                  <Text
                    onPress={() => alert('Report Post')}
                    style={styles.TextWithNavigation}>
                    Report Post
                  </Text>
                  </View>

                  <View style={styles.modalOptions}>
                  <IconFeather name="download" style={styles.optionIcon}></IconFeather>
                  <Text
                    onPress={() => alert('Download Post')}
                    style={styles.TextWithNavigation}>
                    Download Post
                  </Text>
                  </View>

                  <View style={styles.modalOptions}>
                  <Icon name="share-variant" style={styles.optionIcon}></Icon>
                  <Text
                    onPress={() => alert('Share Post')}
                    style={styles.TextWithNavigation}>
                    Share Post
                  </Text>
                  </View>

                 
                  {/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
    );
  };


  renderImage = image => {
    return (
      <View>
        <ImageBackground
          source={{uri: image}}
          style={{width: '100%', height: 200}}></ImageBackground>
      </View>
    );
  };

  renderTitle = title => {
    return (
      <View style={{alignItems: 'center', margin: 7}}>
        <Text style={{fontSize: 18}}>{title}</Text>
      </View>
    );
  };

  renderDescription = description => {
    return (
      <View style={{alignItems: 'center', marginLeft: '5%', marginRight: '5%'}}>
        <Text style={{fontSize: 15, textAlign: 'justify'}}>{description}</Text>
      </View>
    );
  };

  renderAddComment = dp => {
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
          source={{uri: dp}}
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

  renderAllComments = dp => {
    return (
      <View style={{flex: 1, paddingRight: '7%', marginTop: '2%'}}>
        <View
          style={{
            width: '100%',

            backgroundColor: '#e6e4e1',
            marginLeft: '4%',
            flexDirection: 'row',
            paddingTop: '2%',
            paddingLeft: '3%',
            borderRadius: 9,
            paddingBottom: '2%',
          }}>
          <Image
            source={{uri: dp}}
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
    const data = this.props.navigation.getParam(
      'PostData',
      'nothing to render',
    );
    console.log(data);
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{}}>
          {this.renderHeader(data.userAvatar, data.username)}
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

const styles = StyleSheet.create({
  TextWithNavigation: {
    color: 'black',
    backgroundColor:"white",
    width:"100%",
    fontSize: 17,
    paddingLeft:'2%',
    paddingBottom:20
  },
  modalOptions : {
    backgroundColor:"white",
    flexDirection:"row"
  },
  optionIcon : {
    paddingLeft:"3%",
    fontSize:25
  }
});
