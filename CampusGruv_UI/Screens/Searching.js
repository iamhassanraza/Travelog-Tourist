import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  TextInput,
  AsyncStorage,
  Dimensions,
  Image,
} from 'react-native';
import {ThemeBlue} from '../Assets/Colors';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import AvatarCampusStatus from '../Components/AvatarCampusStatus';
import PostList from '../Components/PostsList';
import HomeScreen from './HomeScreen';
import i1 from '../Assets/Images/lahore.jpg';
import i2 from '../Assets/Images/book.jpg';
import i3 from '../Assets/Images/ema.jpg';
import i4 from '../Assets/Images/mansehra.jpg';
import i5 from '../Assets/Images/samandarkatha.jpg';
import RenderCards from '../Components/RenderCards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NoPost from '../Components/NoPost';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {connect} from 'react-redux';
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
import NoCategory from '../Assets/Images/NoCategory.png';
import NoFollower from '../Assets/Images/NoFollower.png';
import SearchIcon from '../Assets/Images/SearchIcon.png';
import YesFollower from '../Assets/Images/YesFollower.png';

class Searching extends React.PureComponent {
  state = {
    selection: 'Feed',
    posts: [],
    refreshing: false,
    loading: false,
    loadmore: false,
    error: false,
    totalFeed: undefined,
    totalUsers: undefined,
    totalCampuses: undefined,
    Users: [],
    //text: undefined,
    Campuses: [],
    search: undefined,
    loadingFeed: undefined,
    loadingUsers: undefined,
    loadingCampuses: undefined,
    pageNo: 1,
    currentCampus: undefined,
  };

  componentDidMount() {
    this.checkCampus();
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      console.log('searching is gong tpo be focused');
      this.setState({
        posts: [],
        Users: [],
        campuses: [],
        search: undefined,
        totalFeed: undefined,
        totalUsers: undefined,
        totalCampuses: undefined,
      });
    });
  }

  fetchFeed = async text => {
    this.setState({loadingFeed: true});
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/search/post?type=post_search&description=${text}&page=${
        this.state.pageNo
      }`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );

    const JsonResponse = await Response.json();
    console.log(JsonResponse.data.length, 'response =============== >');

    if (parseInt(Response.status) === 400) {
      this.setState({error: true, totalFeed: 0});
    } else if (parseInt(Response.status) === 200) {
      // console.log("YE Feeed AGAYE ::::::::",JsonResponse.data)
      if (JsonResponse.total > 0) {
        this.setState({
          posts: JsonResponse.data,
          totalFeed: JsonResponse.total,
          loadingFeed: false,
        });
      } else if (JsonResponse.total === 0) {
        this.setState({totalFeed: 0});
      }
    }
  };

  fetchUsers = async text => {
    this.setState({loadingUsers: true});
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/search/user?type=user&description=${text}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    // console.log('follow data arha ya nhi ----------------> ',JsonResponse.data)

    if (parseInt(Response.status) === 400) {
      this.setState({error: true, totalUsers: 0});
    } else if (parseInt(Response.status) === 200) {
      // console.log("YE USERS AGAYE :::::::::::===========================:::::",JsonResponse.data)
      if (JsonResponse.total > 0) {
        this.setState({
          Users: JsonResponse.data,
          totalUsers: JsonResponse.total,
          loadingUsers: false,
        });
      } else if (JsonResponse.total === 0) {
        this.setState({totalUsers: 0});
      }
    }
  };

  fetchCampuses = async text => {
    this.setState({loadingCampuses: true});
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/search/campus?description=${text}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    console.log(JsonResponse, 'JsonResponse', Response, 'Response');
    if (parseInt(Response.status) === 400) {
      this.setState({error: true, totalCampuses: 0});
    } else if (parseInt(Response.status) === 200) {
      // console.log("YE CAMPUS AGAYE ::::::::",JsonResponse.data)
      if (JsonResponse.total > 0) {
        this.setState({
          Campuses: JsonResponse.data,
          totalCampuses: JsonResponse.total,
          loadingCampuses: false,
        });
      } else if (JsonResponse.total === 0) {
        this.setState({totalCampuses: 0});
      }
    }
  };

  SearchItems = text => {
    if (text) {
      this.fetchFeed(text);
      this.fetchUsers(text);
      this.fetchCampuses(text);
      console.log('ye chalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    } else {
      console.log('teeno nahi chalay');
    }
  };

  getToken = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    return Token;
  };

  renderFeed = () => {
    if (this.state.loadingFeed === false) {
      return (
        <ScrollView
          style={{backgroundColor: '#f9fdfe'}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onPageRefresh}
            />
          }>
          <RenderCards
            posts={this.state.posts}
            loadMore={this.loadmore}
            loadstate={this.state.loadmore}
            totalPosts={this.state.totalFeed}
          />
        </ScrollView>
      );
    } else if (this.state.loadingFeed === true) {
      return <UIActivityIndicator color={ThemeBlue} />;
    }
  };

  renderUsers = () => {
    if (this.state.loadingUsers === false) {
      return (
        <ScrollView style={{backgroundColor: '#f9fdfe'}}>
          <FlatList
            style={{}}
            vertical
            data={this.state.Users}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              if (item.id !== this.props.User.id) {
                return (
                  <AvatarUserStatus
                    id={item.id}
                    first_name={item.first_name}
                    last_name={item.last_name}
                    userFollowing={item.isFollowing ? true : false}
                    item={item}
                    campus={item.campus.description}
                    status={true}
                    pic={item.profile_pic_url}
                  />
                );
              }
            }}
          />
        </ScrollView>
      );
    } else if (this.state.loadingUsers === true) {
      return <UIActivityIndicator color={ThemeBlue} />;
    }
  };

  checkCampus = async () => {
    const campus_id = JSON.parse(await AsyncStorage.getItem('otherCampus'))
      ? JSON.parse(await AsyncStorage.getItem('otherCampus'))
      : JSON.parse(await AsyncStorage.getItem('CAMPUS_ID'));
    this.setState({
      currentCampus: campus_id,
    });
  };

  renderCampuses = () => {
    if (this.state.loadingCampuses === false) {
      return (
        <FlatList
          style={{backgroundColor: '#f9fdfe'}}
          vertical
          data={this.state.Campuses}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <AvatarCampusStatus
                name={item.description}
                status={
                  parseInt(this.state.currentCampus) === parseInt(item.id)
                    ? true
                    : false
                }
                pic={i4}
                navigation={this.props.navigation}
                newCampusId={item.id}
              />
            );
          }}
        />
      );
    } else if (this.state.loadingCampuses === true) {
      return <UIActivityIndicator color={ThemeBlue} />;
    }
  };

  renderNoPost = text => {
    return (
      <View style={{paddingTop: '35%'}}>
        <NoPost name={text} />
      </View>
    );
  };

  loadmore = () => {
    console.log('load more running --------');

    this.setState(
      previousState => {
        return {pageNo: previousState.pageNo + 1, loadmore: true};
      },
      async () => {
        console.log('calling loadmore api.');
        const Token = await AsyncStorage.getItem('TOKEN');
        const Response = await fetch(
          `${
            require('../config').default.production
          }api/v1/search/post?type=post_search&description=${
            this.state.search
          }&page=${this.state.pageNo}`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          },
        );

        const JsonResponse = await Response.json();
        console.log(JsonResponse.message, 'hello jeeeeeeeeeeeeee');

        if (parseInt(Response.status) === 400) {
          this.setState({error: true, totalFeed: 0});
        } else if (parseInt(Response.status) === 200) {
          if (JsonResponse.total > 0) {
            this.setState(previousState => {
              return {
                posts: [...previousState.posts, ...JsonResponse.data],
                totalFeed: JsonResponse.total,
                loadingFeed: false,
                loadmore: false,
              };
            });
          } else if (JsonResponse.total === 0) {
            this.setState({totalFeed: 0});
          }
        }
      },
    );
  };

  render() {
    return (
      <View style={{backgroundColor: '#0C91CF'}}>
        <View
          style={{
            backgroundColor: ThemeBlue,
          }}>
          <View
            style={{
              backgroundColor: ThemeBlue,
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 30,
                width: '65%',
                backgroundColor: 'white',
                marginLeft: 10,
                borderRadius: 8,
              }}>
              <Icon
                name="search"
                style={{
                  alignSelf: 'center',
                  fontSize: 20,
                  paddingLeft: '3%',
                  color: 'grey',
                }}
              />
              <TextInput
                placeholder="Search"
                style={{height: '90%', width: '100%', paddingVertical: 0}}
                value={this.state.search}
                onChangeText={text => {
                  this.setState({search: text});
                  this.SearchItems(text);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CategoryList')}
              style={{position: 'absolute', right: 70}}>
              {/* <Icon2 name="view-grid" color="#00527a" size={28} /> */}
              <View
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                }}>
                <Image source={NoCategory} style={{height: 25, width: 30}} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('FollowersPosts')}
              style={{position: 'absolute', right: 5}}>
              {/* <PeopleIcon name="users" color="#00527a" size={20} /> */}
              <View
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                }}>
                <Image source={NoFollower} style={{height: 25, width: 30}} />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 3,
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              elevation: 3,
              borderColor: '#d4cfc1',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({selection: 'Feed'});
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: this.state.selection === 'Feed' ? ThemeBlue : 'grey',
                    borderBottomWidth:
                      this.state.selection === 'Feed' ? 1.5 : 0,
                    borderBottomColor: ThemeBlue,
                    marginBottom: 6,
                    marginTop: 8,
                  }}>
                  Feed
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({selection: 'Users'});
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color:
                      this.state.selection === 'Users' ? ThemeBlue : 'grey',
                    borderBottomWidth:
                      this.state.selection === 'Users' ? 1.5 : 0,
                    borderBottomColor: ThemeBlue,
                    marginBottom: 6,
                    marginTop: 8,
                  }}>
                  Users
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({selection: 'Campuses'});
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color:
                      this.state.selection === 'Campuses' ? ThemeBlue : 'grey',
                    borderBottomWidth:
                      this.state.selection === 'Campuses' ? 1.5 : 0,
                    borderBottomColor: ThemeBlue,
                    marginBottom: 6,
                    marginTop: 8,
                  }}>
                  Campuses
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: '#f9fdfe',
              height: Dimensions.get('window').height - 170,
            }}>
            {this.state.selection === 'Feed'
              ? this.state.totalFeed === 0
                ? this.renderNoPost('No posts available')
                : this.renderFeed()
              : null}
            {this.state.selection === 'Users'
              ? this.state.totalUsers === 0
                ? this.renderNoPost('No Users Availiable')
                : this.renderUsers()
              : null}
            {this.state.selection === 'Campuses'
              ? this.state.totalCampuses === 0
                ? this.renderNoPost('No Campuses Availiable')
                : this.renderCampuses()
              : null}
          </View>
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  null,
)(Searching);
