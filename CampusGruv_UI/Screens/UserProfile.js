import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { connect } from 'react-redux';
import { CreateUserDetails } from '../ReduxStore/Actions/index';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class UserProfile extends React.Component {
  static navigationOptions =  {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      total: undefined,
      otherUserId: null,
      otherUserFirstName: null,
      otherUserLastName: null,
      otherUserDp: null,
      active: 'posts',
      spinner: false,
      loadmore: false,
      pageNo: 1
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('willFocus', () => {
      // The screen is focused
      userNavId = this.props.navigation.getParam('userNavId', null)
      userNavFirstName = this.props.navigation.getParam('userNavFirstName', null)
      userNavLastName = this.props.navigation.getParam('userNavLastName', null)
      userNavDp = this.props.navigation.getParam('userNavDp', null)
      this.setState({
        otherUserId: userNavId,
        otherUserDp: userNavDp,
        otherUserFirstName: userNavFirstName,
        otherUserLastName: userNavLastName
      })
      this.fetchdata(userNavId ? userNavId : this.props.User.id);
      // this.fetchdata(this.state.otherUserId)
    });
  }


  componentWillUnmount() {
    // Remove the event listener
    this.setState({
      otherUserData: null
    })
    this.focusListener.remove();
    //this.anotherFocusListener.remove();
  }


  loadmore = () => {
      userId = this.state.otherUserId ? this.state.otherUserId : this.props.User.id
      console.log('load more user id --------',userId)
      this.setState(
        previousState => {
          return {pageNo: previousState.pageNo + 1, loadmore: true};
        },
        async () => {
          console.log('calling load more api');
          console.log('user Id inside asyc ---------------',userId)
          const Token = await AsyncStorage.getItem('TOKEN');
          const Response = await fetch(
            `https://campus-gruv-heroku.herokuapp.com/api/v1/search/user?type=post&user_id=${userId}&page=${this.state.pageNo}`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            },
          );
  
          const JsonResponse = await Response.json();
          console.log(JsonResponse, 'responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee-----')
  
          if (parseInt(Response.status) === 401) {
            alert(JsonResponse.message);
          } 
          else if (parseInt(Response.status) === 200) {
            this.setState(previousState => {
              return {
                posts: [...previousState.posts, ...JsonResponse.data],
                total: JsonResponse.total,
                spinner: false,
                loadmore: false,
              }
            });
          }
        },
      );
  }


  fetchdata = async (userId) => {
    console.log('calling');
    this.setState({ spinner: true })
    if (this.state.active === 'posts') {
      // const userId = await AsyncStorage.getItem('USER_ID');
      const Token = await AsyncStorage.getItem('TOKEN');
      const response = await fetch(
        `https://campus-gruv-heroku.herokuapp.com/api/v1/search/user?type=post&user_id=${userId}&page=${this.state.pageNo}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const jsonresponse = await response.json();
      // console.log('profile -------------------------', jsonresponse.data[0]);
      this.setState({
        spinner: false,
        posts: jsonresponse.data,
        total: jsonresponse.total,
      });
    } else {
      const Token = await AsyncStorage.getItem('TOKEN');
      const response = await fetch(
        `https://campus-gruv-heroku.herokuapp.com/api/v1/fetch/saved/posts`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      const jsonresponse = await response.json();
      console.log(jsonresponse);
      this.setState({
        spinner: false,
        posts: jsonresponse.data,
        total: jsonresponse.total,
      });
    }
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  renderPost = () => {
    console.log('renderpost');
    return (
      <View style={{ paddingTop: 10 }}>
        <RenderCards 
          posts={this.state.posts}
          loadMore = {this.loadmore}
          loadstate = {this.state.loadmore}
        ></RenderCards>
      </View>
    );
  };

  renderNoPost = () => {
    console.log('nopost');
    return (
      <View style={{ paddingTop: 30, height: '100%' }}>
        <NoPosts></NoPosts>
      </View>
    );
  };

  renderLoading = () => {
    return (
      <View>
        <ContentLoader
          height={450}
          width={820}
          speed={0.2}
          height={Dimensions.get('window').height * 1}>
          <Rect x="10" y="10" rx="5" ry="5" width="185" height="220" />
          <Rect x="200" y="10" rx="5" ry="5" width="200" height="280" />
          <Rect x="10" y="240" rx="5" ry="5" width="185" height="250" />
          <Rect x="200" y="300" rx="5" ry="5" width="200" height="280" />
          {/* <Rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
              <Rect x="550" y="160" rx="5" ry="5" width="260" height="280" /> */}
        </ContentLoader>
      </View>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    navId = this.props.navigation.getParam('id', null)
    console.log(navId,'nav ID -----------')
    console.log(this.props.User.id, 'user id ------------')
    console.log(this.state.otherUserId, 'other user id ---------')
    const postUserId = this.state.otherUserId ? this.state.otherUserId : this.props.User.id
    const postUserFirstName = this.state.otherUserFirstName ? this.state.otherUserFirstName : this.props.User.first_name
    const postUserLastName = this.state.otherUserLastName ? this.state.otherUserLastName : this.props.User.last_name
    const postUserDp = this.state.otherUserDp ? this.state.otherUserDp : this.props.User.profile_pic_url
    console.log(postUserId,postUserFirstName,postUserLastName,postUserDp, 'postuser ------')
    
    return (
      <ScrollView>
        {/* EDIT PROFILE BUTTON */}
        { postUserId === this.props.User.id ?
          <View>
            <TouchableOpacity
              style={{
                marginTop: 5,
                marginRight: 8, 
                width: 80,
                alignSelf: 'flex-end'
              }}
              onPress={() => {
                this.props.navigation.navigate('EditProfile');
              }}>
              <Text
                style={{
                  color: '#ACACAC',
                  borderWidth: 0.5,
                  padding: 5,
                  borderColor: '#ACACAC',
                  borderRadius: 10,
                }}>
                Edit Profile
            </Text>
            </TouchableOpacity>
          </View> : 
          <View>
            <TouchableOpacity
              style={{
                marginTop: 5,
                marginRight: 0,
                width: 60,
                alignSelf: 'flex-end',
                flexDirection: 'row'
              }}
              onPress={() => {
                //this.props.navigation.navigate('EditProfile');
              }}>
              <Text
                style={{
                  color: '#ACACAC',
                  borderWidth: 0.5,
                  padding: 5,
                  borderColor: '#ACACAC',
                  borderRadius: 10
                }}>
                Follow
              </Text>
            </TouchableOpacity>
          </View>
        }
        {/* IMAGE and NAME  */}
        <View
          style={{ flexDirection: 'row', marginLeft: 5, alignItems: 'center' }}>
          <Image
            source={{
              // uri: this.props.User.profile_pic_url,
              uri: postUserDp
            }}
            style={{ width: 80, height: 80, borderRadius: 50 }}
          />
          <View style={{ marginLeft: 5 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#727272' }}>
              {postUserFirstName + ' ' + postUserLastName}
            </Text>
            <Text style={{ fontSize: 13, color: '#727272' }}>
              {/* {this.props.User.campuses.description} */}
              {/* {console.log(this.props.User)} */}
            </Text>
          </View>
        </View>

        {/* FOLLORWERS */}
        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
          <Text style={{ color: '#727272', fontSize: 13, fontWeight: 'bold' }}>
            75{' '}
          </Text>
          <Text style={{ color: '#B4B8BA', fontSize: 13, fontWeight: 'bold' }}>
            Posts{' '}
          </Text>
          <Text style={{ color: '#727272', fontSize: 13, fontWeight: 'bold' }}>
            1204{' '}
          </Text>
          <Text style={{ color: '#B4B8BA', fontSize: 13, fontWeight: 'bold' }}>
            Followers{' '}
          </Text>
          <Text style={{ color: '#727272', fontSize: 13, fontWeight: 'bold' }}>
            1204{' '}
          </Text>
          <Text style={{ color: '#B4B8BA', fontSize: 13, fontWeight: 'bold' }}>
            Following{' '}
          </Text>
        </View>

        {/* SEARCH AND POST */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#C4C4C4',
              width: '65%',
              marginLeft: 0,
              borderRadius: 12,
              paddingTop: '2%',
              paddingLeft: '2%',
              height: '75%',
            }}>
            <Icon name="search" color="#C4C4C4" size={20} style={{}} />
            <TextInput
              style={{
                width: '100%',
                fontSize: 15,
                color: '#ACACAC',
                paddingTop: 0,
              }}
              placeholder="Search"
            // value={this.state.password}
            // onChangeText={password => this.setState({ password })}
            />
          </View>

          { postUserId === this.props.User.id ?
            <View
            style={{
              flexDirection: 'row',
              marginTop: 0,
              marginLeft: 0,
              alignItems: 'center',
              height: '70%',
              paddingRight: '3%',
              paddingLeft: '1%',
            }}>
            <Text
              onPress={() => {
                this.setState({ active: 'posts' }, () => {
                  this.fetchdata(postUserId)
                });

              }}
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: this.state.active === 'posts' ? '#0C91CF' : '#B4B8BA',
              }}>
              Posts{' '}
            </Text>
            <View
              style={{
                height: 20,
                width: 2,
                borderColor: '#B4B8BA',
                borderWidth: 1,
                backgroundColor: '#B4B8BA',
              }}
            />
            <Text
              onPress={() => {
                this.setState({ active: 'saves' }, () => {
                  this.fetchdata(postUserId)
                });
              }}
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: this.state.active === 'saves' ? '#0C91CF' : '#B4B8BA',
              }}>
              {' '}
              Saved
            </Text>
          </View> : null
          }
        </View>

        {/* {this.state.total === 0 ? <View style={{height:"70%"}}><NoPosts></NoPosts></View> : <Text>Loader</Text>}
{this.state.total > 0 ? <View style={{paddingTop: 10}}>
          <RenderCards posts={this.state.posts}></RenderCards>
        </View> : <Text>Loader>>></Text>} */}
        {this.state.spinner ? this.renderLoading() : (this.state.total === 0 ? this.renderNoPost() : this.renderPost())}


      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return { User: state.User }; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(mapStateToProps, null)(UserProfile);
