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
import ViewsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import { CreateUserDetails } from "../ReduxStore/Actions/index";
import RNFetchBlob from 'rn-fetch-blob';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share'



const IconGrey = '#b4b8bf';

class PostDetail extends Component {
  state = {
    comments: this.props.navigation.getParam('PostData', 'no comments').comments,
    currentComment: null,
    dp: this.props.navigation.getParam('PostData', 'no dp').dp,
    username: this.props.navigation.getParam('PostData', 'no username').username,
    liked: this.props.navigation.getParam('PostData', 'no like status').likeStatus,
    saved: this.props.navigation.getParam('PostData', 'no save status').saveStatus,
    isModalVisible: false,
    post_id: undefined
  };

componentDidMount(){

this.incrementView();

}

incrementView = async () => {

  const DATA = this.props.navigation.getParam('PostData', 'nothing to render');
  const Token = await AsyncStorage.getItem('TOKEN');
  const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/view/count?post_id=${DATA.postId}`,{
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

}




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
    const options = {
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

  createPDF = async (first_name, last_name, image_URL, userAvatar , postTitle) => {
    this.setState({isModalVisible: false})

    const pdfOptions = {
      html: 
        `<img src="${userAvatar}"></img>
         <h1>post by ${first_name} ${last_name}</h1>
         <img src="${image_URL}" alt="post image"></img>
        `,
      fileName: postTitle,
      directory: 'Documents',
    };
 
    let file = await RNHTMLtoPDF.convert(pdfOptions)
    alert('downloaded on location:' + '\n' + file.filePath);

    //alert(file.filePath);
  }


  sharePost = (first_name, postTitle) => {

    let  text = `Checkout this post by ${first_name}: \n`
        if(Platform.OS === 'android')
            text = text.concat('https://campus-gruv-heroku.herokuapp.com/Android')
        else
            text = text.concat('http://itunes.apple.com/app/id1453977874')


    const options = {
      title: 'share via',
      message: text,
      //url: `app://`,
    }
    Share.open(options)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
  }


  renderHeader = (userdp, postId, first_name, last_name, image_URL, userId, postTitle) => {
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

          <TouchableOpacity 
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => this.props.navigation.push('UserProfile', {
              userNavId: userId,
              userNavDp: userdp,
              userNavFirstName: first_name,
              userNavLastName: last_name
            })}
          >
            <Image
              source={{uri: userdp}}
              style={{width: 40, height: 40, borderRadius: 50}}>
            </Image>
            <Text style={{marginLeft: '7%', color: IconGrey}}>
              {first_name + ' ' + last_name}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={{marginRight: '3%', color: 'grey', borderWidth: 1}}>
            Edit Post
          </Text> */}

          <Icon
            name={this.state.liked ? 'star' : 'star-outline'}
            style={{
              fontSize: 28,
              color: this.state.liked ? ThemeBlue : IconGrey,
              paddingRight: 3,
            }}
            onPress={() => {
              // this.setState(prevState => ({
              //   liked: !prevState.liked,
              // }));
              this.likePost(postId, userId)
            }}></Icon>

          <Icon
            name="content-save-outline"
            style={{
              fontSize: 28,
              paddingRight: 3,
              color: this.state.saved ? ThemeBlue : IconGrey,
            }}
            onPress={() => {
              // this.setState(prevState => ({
              //   saved: !prevState.saved,
              // }));
              this.savePost(postId)
            }}></Icon>

          <IconFeather
            name="send"
            style={{fontSize: 25, color: IconGrey, paddingRight: 3}}
            onPress={() => 
              this.sharePost(first_name, postTitle)
            }
          ></IconFeather>

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
                      onPress={() => 
                        this.createPDF(first_name, last_name, image_URL, userdp, postTitle)
                      }
                      style={styles.TextWithNavigation}>
                      Download post
                    </Text>
                  </View>

                  <View style={styles.modalOptions}>
                    <IconFeather
                      name="download"
                      style={styles.optionIcon}></IconFeather>
                    <Text
                      onPress={() => this.downloadImage(image_URL)}
                      style={styles.TextWithNavigation}>
                      Download post image
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

  renderTitle = (title,views) => {
    return (
      <View style={{marginLeft:"3%",flexDirection:"row", justifyContent:"space-between"}}>
       <View>
       <Text style={{fontSize: 20}}>
       {title}
        </Text>
       </View>

        <View style={{marginRight:"3%",}}>
        <ViewsIcon color="grey" name="eye" style={{fontSize:17}}/>
              <Text style={{fontSize: 9, color: 'grey', marginTop: -2,alignSelf:"center"}}>
                {views}
              </Text>
        </View>

      </View>
    );
  };

  renderDescription = description => {
    return (
      <View style={{ marginLeft: '3%', marginRight: '5%'}}>
        <Text style={{fontSize: 14, marginTop:'1%', color:'grey',marginBottom:10}}>
          {description}
        </Text>
      </View>
    );
  };

  renderAddComment = (dp, postId, userId) => {
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
            ref= {input => { this.commentInput = input }}
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
            this.postComment(postId, userId)
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
      <View style={{marginLeft: '4%'}}>
        <Text style={{color: 'grey', fontSize: 12}}>View all comments</Text>
        <FlatList
                data={this.state.comments}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <Comment 
                      dp={item.user.profile_pic_url}
                      name={item.user.first_name}
                      comment={item.description}
                    />
                  );
                }}
                keyExtractor={item => item}
        />
      </View>
    );
  };




  postComment = async (postId, postUserId) => {
    console.log('hello jee',this.state.currentComment)
    if(this.state.currentComment !== null || this.state.currentComment != '')
    {
      const Token = await AsyncStorage.getItem('TOKEN');
      const userId = await AsyncStorage.getItem('USER_ID');
      console.log('postid ------' ,postId)
      const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/comment/create`, {
        method: 'POST',
        body: JSON.stringify({
          post_id: postId,
          user_id: userId,
          post_created_by: postUserId,
          description: this.state.currentComment
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });

      const JsonResponse = await Response.json();
      // console.log(JsonResponse[0])
      if(parseInt(Response.status) === 400) {
          alert(JsonResponse.message);
      }
      else if (parseInt(Response.status) === 200){
          alert('comment created');
          const comments = this.state.comments
          comments.push({...JsonResponse,user:{first_name: this.props.User.first_name, profile_pic_url: this.props.User.profile_pic_url}})
          await this.setState({
            comments: comments,
            currentComment: ''
          })
          this.commentInput.clear()
      }
      else {
        alert('something went wrong')
      }
    }
    else {
      alert("comment can't be empty")
    }
  }


  likePost = async (postId, postUserId) => {

    this.setState(prevState => ({
      liked: !prevState.liked,
    }));
    const Token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USER_ID');
    console.log('hello jeeeeeee user id', userId)
    console.log('post id is -----',postId)
    var Response = null
    if(this.state.liked) {
      Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/post/like`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          post_id: postId,
          post_created_by: postUserId
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
    }
    else {
      Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/post/unlike`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          post_id: postId,
          post_created_by: postUserId
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
    }
      const JsonResponse = await Response.json();
      console.log(JsonResponse)
      if(parseInt(Response.status) === 400) {
        console.log('400')
        // alert(JsonResponse.message);
      }
      else if (parseInt(Response.status) === 201){
        console.log('200')
        // alert(JsonResponse.message);
      }
      else {
        alert('something is wrong')
      }
  }

  savePost = async (postId) => {

    this.setState(prevState => ({
      saved: !prevState.saved,
    }));
    const Token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USER_ID');
    console.log('hello jeeeeeee user id', userId)
    console.log('post id is -----',postId)
    var Response = null
    if(this.state.saved) {
      Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/user/save/post?post_id=${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
    }
    else {
      Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/user/unsave/post?post_id=${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
    }
    const JsonResponse = await Response.json();
    console.log(JsonResponse)
    if(parseInt(Response.status) === 400) {
      console.log('400')
      // alert(JsonResponse.message);
    }
    else if (parseInt(Response.status) === 200){
      console.log('200')
      // alert(JsonResponse.message);
    }
    else {
      alert('something is wrong')
    }
  }

  render() {
    const data = this.props.navigation.getParam('PostData', 'nothing to render');
    return (
        <View style={{height: Dimensions.get('window').height-75}}>
            {this.renderHeader(data.userAvatar, data.postId, data.first_name, data.last_name, data.uri, data.userId, data.title)}
           
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-200} style={{ flex: 1}}>  
          <ScrollView style={{flex: 1}}>
            {this.renderImage(data.uri)}
            {this.renderTitle(data.title, data.views)}
            {this.renderDescription(data.description)}
            { this.state.comments[0] ? 
              this.renderAllComments(data.userAvatar, data.comments) : 
              <View style={{height: 130, justifyContent: 'center'}}>
                <Text style={{color: 'grey',fontSize:25, opacity:0.5, alignSelf: 'center'}}>
                  No comments yet!
                </Text>
              </View>
            }
            </ScrollView> 
            </KeyboardAvoidingView>
                {this.renderAddComment(data.userAvatar, data.postId, data.userId)}
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

