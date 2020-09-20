import React, {Component, PureComponent} from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
  AsyncStorage,
  TouchableHighlightBase,
  SafeAreaView,
} from 'react-native';
import NoticationComponent from '../Components/NoticationComponent';
import {Header} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import mystore from '../index';
import {clearNoti} from '../ReduxStore/Actions/index';
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
import {ThemeBlue} from '../Assets/Colors';

const dummyNotis = [
  {
    active: 1,
    comments: [],
    created_at: '2020-06-13 11:33:15',
    id: 424,
    isFollowing: true,
    notification_by: 822,
    notification_message: 'has reviewed your tour "Gilgit Baltistan"',
    postDetail: [],
    post_id: 24,
    posts: null,
    updated_at: '2020-06-13 00:00:00',
    userNotification: {
      account_type_id: 1,
      bio: 'null',
      campus: [],
      campus_id: 1,
      contact_no: '03492037045',
      created_at: '2020-03-02 00:00:00',
      dob: '1999-02-26T00:00:00.000Z',
      email: 'faraznaqvi99@gmail.com',
      email_verified: 1,
      fcm_token:
        'dszgyP_cQLSxSY32TEe7dm:APA91bGev_Sl7mZaeRYv-URmrT6eaezjNHe3fNQIn-g53sAEBboDreeJT5iNSrOuXpfXBy2NSHlJsdcmS_uxpVAFYes4p_YaIvegK2tZDizL5ptK31cKCsGZIKUVDrKjKOlXs6z3Qs9y',
      first_name: 'Faraz',
      graduate_year: 2021,
      id: 822,
      last_name: 'Ali',
      major: 'Software Engineering',
      organization_type: null,
      profile_pic_url:
        'https://cgusersprod.s3.amazonaws.com/d82912fd-f0f1-4b40-8897-8055d71a3028/IMG_20200527_013730_261.jpg',
      socket_id: '',
      updated_at: '2020-09-08 13:45:17',
      uuid: 'd82912fd-f0f1-4b40-8897-8055d71a3028',
      website: 'null',
    },
    userSavedPost: [],
    userWiseLike: [],
    user_id: 825,
  },
  {
    active: 1,
    comments: [],
    created_at: '2020-06-03 15:44:30',
    id: 380,
    isFollowing: false,
    notification_by: 825,
    notification_message: 'has liked your tour "Trip to Hunza.." ',
    postDetail: [],
    post_id: 41,
    posts: {
      created_at: '2020-04-09 00:00:00',
      description: 'Image testing',
      id: 41,
      likes_count: 0,
      price: null,
      title: 'Testing',
      updated_at: '2020-04-09 00:00:00',
      user_id: 825,
      view_count: 28,
    },
    updated_at: '2020-06-03 00:00:00',
    userNotification: {
      account_type_id: 1,
      bio: null,
      campus: [],
      campus_id: 1,
      contact_no: 'null',
      created_at: '2020-03-03 00:00:00',
      dob: null,
      email: 'M.h.raxa1@gmail.com',
      email_verified: 1,
      fcm_token:
        'cesuYKdSSM2QiNajgYa22j:APA91bHRA_89mXgVqjS_XCH9FnxExhqP1Oh2x9uYGvTrJRRXC0TMlDPpyvkbkR3jDaU7U0KW42iLXN3v19JnK65FPY3Xg_PrKEZYp3Em3AY2pLftP0XQKqoBfMulwAMuKYoivpvQMGXb',
      first_name: 'Hassan',
      graduate_year: null,
      id: 825,
      last_name: 'Raza',
      major: 'null',
      organization_type: null,
      profile_pic_url:
        'https://cgusersprod.s3.amazonaws.com/4179b090-9615-4f04-bbf3-af1606e688de/Screenshot_20200407-191342_Instagram.jpg',
      socket_id: '_rgh2fphZoXKzkUtAAA_',
      updated_at: '2020-09-14 09:05:34',
      uuid: '4179b090-9615-4f04-bbf3-af1606e688de',
      website: null,
    },
    userSavedPost: [],
    userWiseLike: [],
    user_id: 825,
  },
  {
    active: 1,
    comments: [],
    created_at: '2020-06-03 15:44:30',
    id: 380,
    isFollowing: false,
    notification_by: 825,
    notification_message: 'has reported your tour "SWAT TOUR" ',
    postDetail: [],
    post_id: 41,
    posts: {
      created_at: '2020-04-09 00:00:00',
      description: 'Image testing',
      id: 41,
      likes_count: 0,
      price: null,
      title: 'Testing',
      updated_at: '2020-04-09 00:00:00',
      user_id: 825,
      view_count: 28,
    },
    updated_at: '2020-06-03 00:00:00',
    userNotification: {
      account_type_id: 1,
      bio: null,
      campus: [],
      campus_id: 1,
      contact_no: 'null',
      created_at: '2020-03-03 00:00:00',
      dob: null,
      email: 'M.h.raxa1@gmail.com',
      email_verified: 1,
      fcm_token:
        'cesuYKdSSM2QiNajgYa22j:APA91bHRA_89mXgVqjS_XCH9FnxExhqP1Oh2x9uYGvTrJRRXC0TMlDPpyvkbkR3jDaU7U0KW42iLXN3v19JnK65FPY3Xg_PrKEZYp3Em3AY2pLftP0XQKqoBfMulwAMuKYoivpvQMGXb',
      first_name: 'Ali',
      graduate_year: null,
      id: 825,
      last_name: 'Mehdi',
      major: 'null',
      organization_type: null,
      profile_pic_url:
        'https://www.hindipro.com/wp-content/uploads/2019/12/always-be-happy.png',
      socket_id: '_rgh2fphZoXKzkUtAAA_',
      updated_at: '2020-09-14 09:05:34',
      uuid: '4179b090-9615-4f04-bbf3-af1606e688de',
      website: null,
    },
    userSavedPost: [],
    userWiseLike: [],
    user_id: 825,
  },
];

class NotificationScreen extends PureComponent {
  state = {
    notification: [],
    pageNo: 1,
    loading: false,
    store: mystore,
    onEndReachedCalledDuringMomentum: true,
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      //The screen is focused
      this.setState(
        {
          pageNo: 1,
        },
        () => this.getNoti(),
      );
    });
    this.focusListener = this.props.navigation.addListener('didBlur', () => {
      this.state.store.dispatch(clearNoti());
    });
  }

  //${require('../config').default.production}

  loadMore = ({distanceFromEnd}) => {
    console.log('end reached');
    if (
      !this.state.onEndReachedCalledDuringMomentum &&
      this.state.notification.length < this.state.total
    ) {
      console.log('fetch more');
      const pageNo = this.state.pageNo;
      this.setState(
        {
          endReached: true,
          onEndReachedCalledDuringMomentum: true,
          pageNo: pageNo + 1,
        },
        async () => {
          const Token = await AsyncStorage.getItem('TOKEN');

          const Response = await fetch(
            `${
              require('../config').default.production
            }api/v1/user/notifications?user_id=${this.props.User.id}&page=${
              this.state.pageNo
            }`,
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            },
          );
          const JsonResponse = await Response.json();
          this.setState(prevState => ({
            notification: [...prevState.notification, ...JsonResponse.data],
            endReached: false,
          }));
        },
      );
    }
  };

  getNoti = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    this.setState({
      loading: true,
    });
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/user/notifications?user_id=${this.props.User.id}&page=${
        this.state.pageNo
      }`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    console.log(JsonResponse.data);
    this.setState({
      notification: dummyNotis,
      totalNotis: JsonResponse.data.length,
      total: JsonResponse.total,
      loading: false,
    });
  };
  render() {
    return (
      <>
        <View style={{height: '100%', flex: 1, backgroundColor: '#f9fdfe'}}>
          {Platform.OS == 'ios' ? (
            <View style={{backgroundColor: '#0C91CF'}}>
              <View
                style={{
                  height: 50,
                  backgroundColor: '#0C91CF',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    Activity
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                marginTop: 0,
                height: 50,
                backgroundColor: '#0C91CF',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: Platform.OS == 'ios' ? 30 : 0,
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Activity
                </Text>
              </View>
            </View>
          )}
          {/* {this.state.notification[0] ? */
          this.state.total === undefined ? (
            <UIActivityIndicator color={ThemeBlue} />
          ) : (
            <View style={{flex: 1}}>
              <FlatList
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => {
                  this.setState({onEndReachedCalledDuringMomentum: false});
                }}
                vertical
                data={this.state.notification}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <NoticationComponent
                    userdp={item.userNotification.profile_pic_url}
                    postId={item.posts !== null ? item.posts.id : null}
                    comments={item.comments}
                    description={
                      item.posts !== null ? item.posts.description : null
                    }
                    first_name={item.userNotification.first_name}
                    last_name={item.userNotification.last_name}
                    userId={item.userNotification.id}
                    userWiseLike={item.userWiseLike}
                    userCampus={item.userNotification.campus.description}
                    userSavedPost={item.userSavedPost}
                    isFollowing={item.isFollowing}
                    title={item.posts !== null ? item.posts.title : null}
                    views={item.posts !== null ? item.posts.view_count : null}
                    imageurl={
                      item.postDetail.length > 0
                        ? item.postDetail[0].image_url
                        : 'https://travelog-pk.herokuapp.com/images/default.png'
                    }
                    uri={item.userNotification.profile_pic_url}
                    unread={
                      index <= this.props.Notifications.qty ? true : false
                    }
                    time={new Date(item.created_at.replace(' ', 'T'))}
                    activity={item.notification_message}
                  />
                )}
              />
            </View>
          )}
          {this.state.endReached ? (
            <View
              style={{
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <UIActivityIndicator size={20} />
            </View>
          ) : null}
        </View>
      </>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {Notifications: state.Notifications, User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(mapStateToProps)(NotificationScreen);
