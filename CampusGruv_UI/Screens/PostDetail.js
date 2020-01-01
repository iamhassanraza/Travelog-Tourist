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
  PermissionsAndroid,
  Dimensions
} from 'react-native';
import {ThemeConsumer} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {ThemeBlue} from '../Assets/Colors';
import Modal from 'react-native-modal';
	
import RNFetchBlob from 'rn-fetch-blob';


const IconGrey = '#b4b8bf';

export default class PostDetail extends Component {
  state = {
    Allcomments: [],
    currentComment: '',
    followed: false,
    saved: false,
    isModalVisible: false,
  };

  changeCurrentCommentState = comment => {
    this.setState({
      currentComment: comment,
    });
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };


  getExtention = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
      undefined;
  }

  downloadImage = (image_URL) => {
    this.setState({isModalVisible: false})
    var date = new Date();
    var ext = this.getExtention(image_URL);
    ext = "." + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + "/image_" + Math.floor(date.getTime()
          + date.getSeconds() / 2) + ext,
        description: 'Image'
      }
    }
    config(options).fetch('GET', image_URL).then((res) => {
      alert('Download Complete')
  
    });
  }



  renderHeader = (userdp, username,image_URL) => {
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
              onPress={() => this.props.navigation.goBack()}
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
                style={{margin: 0}}
                isVisible={this.state.isModalVisible}
                onBackdropPress={() => this.setState({isModalVisible: false})}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom:30,borderTopRightRadius:23, borderTopLeftRadius:23
                    }}>
                    <CrossIcon
                      name="cancel"
                      onPress={() => this.setState({isModalVisible: false})}
                      style={{
                        flex: 0.65,
                        paddingLeft:5,
                        fontSize: 20,
                        paddingTop:4,
                        color:IconGrey
                      }}></CrossIcon>
                    <View
                      style={{flex: 10, alignItems: 'center', paddingTop:3}}>
                      <Text style={{fontSize:20, fontWeight:"bold", borderTopWidth:2, borderTopColor:IconGrey}} >
                        More Options
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalOptions}>
                    <Icon
                      name="flag-variant-outline"
                      style={styles.optionIcon}></Icon>
                    <Text
                      onPress={() => alert('Report Post')}
                      style={styles.TextWithNavigation}>
                      Report Post
                    </Text>
                  </View>

                  <View style={styles.modalOptions}>
                    <IconFeather
                      name="download"
                      style={styles.optionIcon}></IconFeather>
                    <Text
                      onPress={() => this.downloadImage(image_URL)}
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
      <View style={{}}>
        <Image
          source={{uri:image}}
          resizeMode='contain'
          style={{width: '100%', height:250}}></Image>
      </View>
    );
  };

  renderTitle = title => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 18}}>
       {title}
        </Text>
      </View>
    );
  };

  renderDescription = description => {
    return (
      <View style={{alignItems: 'center', marginLeft: '5%', marginRight: '5%'}}>
        <Text style={{fontSize: 14, marginTop:'2%', color:'grey',marginBottom:10}}>
          {description}
        </Text>
      </View>
    );
  };

  renderAddComment = dp => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          alignItems: 'center',
          //height: 60,
          //paddingLeft: '2%',
          //paddingTop:'1%',
          //paddingBottom:'1%',
          marginTop:'2%'
        }}>

        <View style={{marginLeft:'2%', width: 40, height: 40}}>
          <Image
            source={{uri: dp}}
            style={{width:'100%', borderRadius: 50, height: '100%'}}>
          </Image>
        </View>

        {/* <TextInput
          placeholder="Add your comment"
          multiline={true}
          style={{
            padding: 1,
            alignSelf: 'center',
            paddingLeft:'2%',
            marginLeft: '3%',
            width: '73%',
            borderRadius: 9,
            //borderWidth: 0.2,
            borderColor: 'grey',
          }} */}
          <View style={{width:'73%', marginLeft:'2%'}}>
          <TextInput 
            multiline={true}
            placeholder="Add a comment"
            style={{ borderRadius: 7, borderWidth:0.2, borderColor:'grey'}}
            onChangeText={text => {
            this.changeCurrentCommentState(text);
          }}></TextInput>
          </View>
        <View>
        <Text onPress={()=>{
          //CALL API FOR COMMENT , USER ID ,POST ID , COMMENT DESCRIPTION 
          alert('call api')
        }}
          style={{
           //fontSize: 17,
            color: 'grey',
            paddingLeft: '2%',
          }}>
          Post
        </Text>
        </View>
      </View>
    );
  };

  renderAllComments = dp => {
    return (
      <View style={{paddingRight: '7%', marginTop: '1%', 
      //marginBottom:'1%'
    }}>
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
            <Text style={{fontSize: 11,marginTop: '-1%', color: 'grey'}}>
              Mansehrian boy is not doing good
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const data = this.props.navigation.getParam('PostData', 'nothing to render');
    console.log(data,'============================= post detail me received data ================== ')
    
    return (
        <View style={{height: Dimensions.get('window').height-125}}>
            {this.renderHeader(data.userAvatar, data.username,data.uri)}
           
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-110} style={{flex: 1}}>  
          <ScrollView style={{flex: 1}}>
            {this.renderImage(data.uri)}
            {this.renderTitle(data.title)}
            {this.renderDescription(data.description)}
            {this.renderAllComments(data.userAvatar)}
            {this.renderAllComments(data.userAvatar)}
            {/* {this.renderAllComments(data.userAvatar)}
            {this.renderAllComments(data.userAvatar)}
            {this.renderAllComments(data.userAvatar)}
            {this.renderAllComments(data.userAvatar)}
            {this.renderAllComments(data.userAvatar)}
            {this.renderAllComments(data.userAvatar)} */}
            </ScrollView> 
            </KeyboardAvoidingView>
                {this.renderAddComment(data.userAvatar)}
        </View>
    );
  }
}

//style={{height: Dimensions.get('window').height-215}}

const styles = StyleSheet.create({
  TextWithNavigation: {
    color: 'black',
    backgroundColor: 'white',
    width: '100%',
    fontSize: 17,
    paddingLeft: '4%',
    paddingBottom: 20,
  },
  modalOptions: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  optionIcon: {
    paddingLeft: '3%',
    fontSize: 25,
  
  },
});
