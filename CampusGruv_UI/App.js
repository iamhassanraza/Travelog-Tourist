import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import 'react-native-gesture-handler';
import PostIcon from 'react-native-vector-icons/Foundation';
import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PeopleIcon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeIcon from 'react-native-vector-icons/Feather';
import ProfileIcon from 'react-native-vector-icons/Feather';
import NotiIcon from 'react-native-vector-icons/Feather';
import AddIcon from 'react-native-vector-icons/Octicons';
import Logo from './Assets/Images/logo.png';
import HomeScreen from './Screens/HomeScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {StackActions, NavigationActions} from 'react-navigation';
import SelectNewChat from './Screens/SelectNewChat';
import PostDetail from './Screens/PostDetail';
import CreatePost from './Screens/CreateNewPost';
import PostsList from './Components/PostsList';
import CategoryList from './Screens/CategoryList';
import {
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation-tabs';
import inbox from './Screens/Inbox';
import chat from './Screens/chat';
import NotificationScreen from './Screens/NotificationScreen';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import ForgotPassword from './Screens/ForgotPassword';
import UserProfile from './Screens/UserProfile';
import EditProfile from './Screens/ProfileEdit';
import AuthLoading from './Screens/AuthLoading';
import AddPost from './Screens/AddNewPost';
import Searching from './Screens/Searching';
import RecoveryCode from './Screens/RecoveryCode';
import ResetPassword from './Screens/ResetPassword';
import UserSettings from './Screens/UserSettings';
import EmailVerification from './Screens/EmailVerification';
import Followers from './Screens/Followers';
import Following from './Screens/Following';
import FollowersPosts from './Screens/FollowersPosts';
import InboxComponent from './Components/InboxComponent';
import ReportPost from './Screens/ReportPost';
import MainTabNavigation from './Screens/MainTabNavigation';
import IconBadge from 'react-native-icon-badge';
import mystore from './index';
import {clearNoti} from './ReduxStore/Actions/index';
import CategoryPosts from './Screens/CategoryPosts';

// const state = mystore.getState();

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null,
    },
  },
  RecoveryCode: {
    screen: RecoveryCode,
    navigationOptions: {
      header: null,
    },
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null,
    },
  },
});

const CreatePostStack = createStackNavigator(
  {
    AddPost: {
      screen: AddPost,
    },
    PostDetail,
    CreatePost: {
      screen: CreatePost,
    },
  },
  {
    initialRouteName: 'AddPost',
    navigationOptions: {
      tabBarVisible: false,
    },
  },
);

const ProfileStack = createStackNavigator(
  {
    UserProfile: {
      screen: UserProfile,
    },
    EditProfile: {
      screen: EditProfile,
    },
    Followers: {
      screen: Followers,
    },
    Following: {
      screen: Following,
    },
    UserSettings: {
      screen: UserSettings,
      navigationOptions: {
        header: props => (
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
                  Settings
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  padding: 2,
                  alignSelf: 'center',
                  left: 8,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('UserProfile');
                  }}>
                  <Icon name="arrow-back" color="white" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),
      },
    },
  },
  {
    navigationOptions: props => {
      return {
        // tabBarVisible:
        //   props.navigation.state.routes[props.navigation.state.index]
        //     .routeName === 'Followers' ||
        //   props.navigation.state.routes[props.navigation.state.index]
        //     .routeName === 'Following'
        //     ? false
        //     : true,
      };
    },
    initialRouteName: 'UserProfile',
  },
);

const HomeStack = createStackNavigator(
  {
    HomeScreen,
    FollowersPosts,
    UserProfile: {
      screen: UserProfile,
    },
    Followers,
    Following,
    PostDetail: {
      screen: PostDetail,
      navigationOptions: {
        header: null,
      },
    },
    CategoryList,
    CategoryPosts,
    Searching: {
      screen: Searching,
      navigationOptions: {
        header: null,
      },
    },
    ReportPost: {
      screen: ReportPost,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    navigationOptions: props => {
      return {
        tabBarVisible:
          props.navigation.state.routes[props.navigation.state.index]
            .routeName === 'PostDetail' ||
          props.navigation.state.routes[props.navigation.state.index]
            .routeName === 'ReportPost' ||
          props.navigation.state.routes[props.navigation.state.index]
            .routeName === 'Followers' ||
          props.navigation.state.routes[props.navigation.state.index]
            .routeName === 'Following'
            ? false
            : true,
      };
    },
    defaultNavigationOptions: {
      header: props => (
        <View style={{backgroundColor: '#0C91CF'}}>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#0C91CF',
            }}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', flex: 10}}>
              <View
                style={{
                  marginLeft: '2%',
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Searching')}>
                  <View
                    style={{
                      height: 30,
                      padding: 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 250,
                      backgroundColor: '#F0F0F0',
                      borderRadius: 10,
                    }}>
                    <View style={{marginLeft: '2%'}}>
                      <Icon name="search" color="#0C91CF" size={20} />
                    </View>
                    <View style={{height: 20}}>
                      <Image
                        source={Logo}
                        style={{
                          width: 150,
                          alignSelf: 'flex-start',
                          height: '100%',
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 5}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('CategoryList')}>
                  <Icon2 name="view-grid" color="white" size={28} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{paddingRight: 5}}
                onPress={() => params.handleThis()}>
                <PeopleIcon name="users" color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ),
    },
  },
);

const NotificationStack = createStackNavigator(
  {
    NotificationScreen,
    PostDetail,
    UserProfile,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const MessageStack = createStackNavigator(
  {
    InboxComponent,
    SelectNewChat: {
      screen: SelectNewChat,
      navigationOptions: {
        header: props => (
          <View style={{backgroundColor: '#0C91CF'}}>
            <View
              style={{
                height: 50,
                backgroundColor: '#0C.91CF',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  New Message
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  padding: 2,
                  alignSelf: 'center',
                  left: 8,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('inbox');
                  }}>
                  <Icon name="arrow-back" color="white" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),
      },
    },

    inbox: {
      screen: inbox,
      navigationOptions: {
        header: props => (
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
                  Messages
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  padding: 2,
                  alignSelf: 'center',
                  right: 8,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.push('SelectNewChat');
                  }}>
                  <PostIcon name="clipboard-pencil" color="white" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ),
      },
    },
    chat: {
      screen: chat,
    },
  },
  {
    initialRouteName: 'inbox',
    navigationOptions: props => {
      return {
        tabBarVisible: props.navigation.state.index === 0,
      };
    },
  },
);

const androidTabBarOptions = {
  style: {
    backgroundColor: 'white',
    height: 50,
  },
  iconStyle: {
    //marginBottom: 7,
  },
  labelStyle: {
    fontSize: 8,
    width: '100%',
    alignSelf: 'center',
    marginTop: -2,
  },
  indicatorStyle: {
    backgroundColor: '#0C91CF',
    height: 2,
  },
  upperCaseLabel: false,
  inactiveTintColor: 'grey',
  activeTintColor: '#0C91CF',
  showIcon: true,
  showLabel: false,
};
const iosTabBarOptions = {
  style: {
    backgroundColor: 'white',
    height: 60,
  },
  iconStyle: {
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 8,
    width: '100%',
    alignSelf: 'center',
    marginTop: -2,
  },
  indicatorStyle: {
    backgroundColor: '#0C91CF',
    height: 2,
  },
  upperCaseLabel: false,
  inactiveTintColor: 'grey',
  activeTintColor: '#0C91CF',
  showIcon: true,
  showLabel: false,
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <HomeIcon name="home" color={tintColor} style={{fontSize: 25}} />
        ),
        tabBarLabel: 'Home',
      },
    },
    Notifications: {
      screen: NotificationStack,
      navigationOptions: props => {
        store = mystore;
        state = store.getState();
        //console.log('state', state);
        return {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            navigation.dispatch(StackActions.popToTop());
            defaultHandler();
          },
          tabBarIcon: ({tintColor}) => {
            return (
              <IconBadge
                MainElement={
                  <NotiIcon
                    name="bell"
                    color={tintColor}
                    style={{fontSize: 25}}
                  />
                }
                BadgeElement={
                  <Text style={{color: 'white'}}>
                    {props.screenProps.Notifications.qty + 1 > 0
                      ? props.screenProps.Notifications.qty + 1
                      : null}
                  </Text>
                }
                Hidden={props.screenProps.Notifications.qty + 1 === 0}
              />
            );
          },
          tabBarLabel: 'Notifications',
        };
      },
    },
    AddPost: {
      screen: CreatePostStack,
      navigationOptions: {
        tabBarOnPress: ({navigation, defaultHandler}) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        },
        initialRouteName: 'AddPost',
        tabBarIcon: ({tintColor}) => (
          <AddIcon name="diff-added" color={tintColor} style={{fontSize: 25}} />
        ),
        tabBarLabel: 'Add Post',
      },
    },
    messages: {
      screen: MessageStack,
      navigationOptions: props => {
        store = mystore;
        state = store.getState();
        return {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            navigation.dispatch(StackActions.popToTop());
            defaultHandler();
          },
          tabBarIcon: ({tintColor}) => {
            return (
              <IconBadge
                MainElement={
                  <Icon2
                    name="email-outline"
                    color={tintColor}
                    style={{fontSize: 25}}
                  />
                }
                BadgeElement={
                  <Text style={{color: 'white'}}>
                    {props.screenProps.unreadMsgs.qty + 1 > 0
                      ? props.screenProps.unreadMsgs.qty + 1
                      : null}
                  </Text>
                }
                Hidden={props.screenProps.unreadMsgs.qty + 1 === 0}
              />
            );
            // <Icon2 name="email-outline" color={tintColor} style={{ fontSize: 27 }} />
          },
          tabBarLabel: 'Messages',
          hederMode: 'none',
        };
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarOnPress: ({navigation, defaultHandler}) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        },
        tabBarIcon: ({tintColor}) => (
          <ProfileIcon name="user" color={tintColor} style={{fontSize: 25}} />
        ),
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    defaultNavigationOptions: {
      // tabBarOnPress: ({navigation, defaultHandler}) => {
      //   navigation.dispatch(StackActions.popToTop());
      //   defaultHandler();
      // },
    },
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
      iconStyle: {
        width: '100%',
      },
      labelStyle: {
        fontSize: 8,
        width: '100%',
        alignSelf: 'center',
      },
      indicatorStyle: {
        backgroundColor: '#0C91CF',
        height: 0,
      },
      upperCaseLabel: false,
      inactiveTintColor: '#C4C4C4',
      activeTintColor: '#0C91CF',
      showIcon: true,
      showLabel: false,
    },
    // Platform.OS=='ios'? iosTabBarOptions : androidTabBarOptions
  },
);
const TabContainer = createAppContainer(TabNavigator);

const RootStackNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoading,
    },
    Auth: {
      screen: AuthNavigator,
    },
    App: {
      screen: MainTabNavigation,
    },
    EditProfile: {
      screen: createStackNavigator({EditProfile}),
    },
    EmailVerification: {
      screen: EmailVerification,
    },
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const AppContainer = createAppContainer(RootStackNavigator);

class App extends Component {
  constructor(props) {
    super(props);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.state = {
      isVisible: true,
    };
  }

  UNSAFE_componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    this.setState({
      isVisible: false,
    });
  };

  keyboardWillHide = event => {
    this.setState({
      isVisible: true,
    });
  };

  render() {
    return <AppContainer />;
  }
}

export {App, TabContainer};
