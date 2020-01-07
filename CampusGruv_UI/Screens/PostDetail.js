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
  AsyncStorage,
  PermissionsAndroid,
  Dimensions,
  AppState
} from 'react-native';
import {ThemeConsumer} from 'react-native-elements';
import Comment from '../Components/Comment'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {ThemeBlue} from '../Assets/Colors';
import Modal from 'react-native-modal';

import { connect } from "react-redux";
import { CreateUserDetails } from "../ReduxStore/Actions/index";
	
import RNFetchBlob from 'rn-fetch-blob';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


const IconGrey = '#b4b8bf';

class PostDetail extends Component {
  state = {
    comments: this.props.navigation.getParam('PostData', 'no comments').comments,
    currentComment: '',
    dp: this.props.navigation.getParam('PostData', 'no dp').dp,
    username: this.props.navigation.getParam('PostData', 'no username').username,
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

  renderAddComment = (dp, postId) => {
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
            source={{uri: this.props.User.profile_pic_url}}
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
        <TouchableOpacity 
          onPress={()=>{
            //CALL API FOR COMMENT , USER ID ,POST ID , COMMENT DESCRIPTION 
            this.postComment(postId)
          }}
        >
        <Text
          style={{
           //fontSize: 17,
            color: 'grey',
            paddingLeft: '2%',
          }}>
          Post
        </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderAllComments = (dp) => {
    return (
      <FlatList
              data={this.state.comments}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <Comment 
                    dp={item.user.dp}
                    name={item.user.first_name}
                    comment={item.description}
                  />
                );
              }}
              keyExtractor={item => item}
            />
    );
  };




  postComment = async (postId) => {

    const Token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USER_ID');
    console.log('postid ------' ,postId)
    const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/comment/create`, {
      method: 'POST',
      body: JSON.stringify({
        post_id: postId,
        user_id: userId,
        description: this.state.currentComment
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    });

    const JsonResponse = await Response.json();
    console.log(JsonResponse[0])
    if(parseInt(Response.status) === 400) {
        alert(JsonResponse.message);
    }
    else if (parseInt(Response.status) === 200){
        alert(JsonResponse.id,'comment created');
        const comments = this.state.comments
        comments.push({...JsonResponse,user:{first_name: this.props.User.first_name, dp: this.props.User.profile_pic_url}})
        await this.setState({
          comments: comments
        })
    }
    else {
      alert('something went wrong')
    }
    console.log('postcomment tw khtm horha hai')
  }




  render() {
    const data = this.props.navigation.getParam('PostData', 'nothing to render');
    console.log(data.comments[0],'============================= post detail me received data ================== ')
    
    return (
        <View style={{height: Dimensions.get('window').height-125}}>
            {this.renderHeader(data.userAvatar, data.username,data.uri)}
           
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-110} style={{flex: 1}}>  
          <ScrollView style={{flex: 1}}>
            {this.renderImage(data.uri)}
            {this.renderTitle(data.title)}
            {this.renderDescription(data.description)}
            {this.renderAllComments(data.userAvatar, data.comments)}
            </ScrollView> 
            </KeyboardAvoidingView>
                {this.renderAddComment(data.userAvatar, data.postId)}
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


mapStateToProps = (state)=>{ //this state will contain FULL redux store all the reducers data


  //use your required reducer data in props i.e reducer1
  
  return { User : state.User}  //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
  
  }

export default connect(mapStateToProps,null)(PostDetail);

