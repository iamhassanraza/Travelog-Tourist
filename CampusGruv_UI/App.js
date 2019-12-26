import React, { Component } from 'react'
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
// import HomeScreen from './Screens/HomeScreen'
import  'react-native-gesture-handler'
// import Screen1 from './Screens/CreatePost'
// import Screen2 from './Screens/Screen1'
import Screen3 from './Components/Post'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PeopleIcon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import AddIcon from 'react-native-vector-icons/Entypo'
import Logo from './Assets/Images/logo.png'
import HomeScreen from './Screens/HomeScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PostDetail from './Screens/PostDetail'
import CreatePost from './Screens/CreateNewPost'
import PostsList from './Components/PostsList'
import CategoryList from './Screens/CategoryList'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import inbox from './Screens/Inbox';
import chat from './Screens/chat';
import NotificationScreen from './Screens/NotificationScreen'
import Login from './Screens/Login'
import SignUp from './Screens/SignUp'
import ForgotPassword from './Screens/ForgotPassword'
import UserProfile from './Screens/UserProfile'
import editprofile from './Screens/ProfileEdit'
import AuthLoading from './Screens/AuthLoading'
import AddPost from './Screens/AddNewPost'

const AuthNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                header: null }
            },
            ForgotPassword: {
                screen: ForgotPassword,
                navigationOptions: {
                    header: null }
                }

           

})

const CreatePostStack = createStackNavigator({
    AddPost,
    CreatePost,
    PostDetail

},

{
    defaultNavigationOptions:{
        header:null
    }
     }

)


const ProfileStack = createStackNavigator({
    UserProfile,
    editprofile
},{
    defaultNavigationOptions:{
        header:null
    }
})

const HomeStack = createStackNavigator({
    HomeScreen,
    PostDetail,
    CategoryList
},
{
    defaultNavigationOptions:{
        header:null
    }
     }
)

const MessageStack = createStackNavigator({
    inbox,
    chat,
},
{
    defaultNavigationOptions:{
        header:null
    }
     }


)
const TabNavigator = createMaterialTopTabNavigator(
  {
      Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Icon name="home" color={tintColor}  style={{fontSize:22}}/>
            ),
            tabBarLabel: "Home"
          }
      },
      Notifications: {
        screen: NotificationScreen,
        navigationOptions: {
            //header: null,
            tabBarIcon: ({tintColor}) => (
                <Icon2 name="bell-ring"color={tintColor}  style={{fontSize:22}}/>
            ),
            tabBarLabel: "Notifications"
        }
    }, 
      AddPost: {
          screen: CreatePostStack,
          navigationOptions: {
              tabBarIcon: ({tintColor}) => (
                  <AddIcon name="squared-plus" color={tintColor} style={{fontSize:22}}/>
              ),
              tabBarLabel: 'Add Post'
          }
      },
      messages: {
        screen: MessageStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon2 name="email-outline" color={tintColor}  style={{fontSize:22}}/>
            ),
            tabBarLabel: "Messages"
        }
    },
      Profile: {
          screen: ProfileStack,
          navigationOptions: {
              tabBarIcon: ({tintColor}) => (
                  <Icon name="person" color={tintColor}  style={{fontSize:22}}/>
              ),
              tabBarLabel: "Profile"
          }
      }     
    },
  {
      initialRouteName: 'Home',
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      tabBarOptions: {
          style: {
              backgroundColor: "#1192d1",
              height: 50,
          },
          iconStyle: {
             // marginTop: -7,
          },
          labelStyle: {
              fontSize: 8,
              width:'100%',
              alignSelf:'center',
              marginTop: -2,
          },
          indicatorStyle: {
              backgroundColor: 'black',
              height:2,
          },
          upperCaseLabel: false,
          inactiveTintColor: 'white',
          activeTintColor: 'black',
          showIcon: true,
          showLabel: false
          }
      }
);
const TabContainer = createAppContainer(TabNavigator);

const RootStack = createStackNavigator({
   
    TabContainer : {
        screen: TabContainer,
        navigationOptions: {
            // headerRight: (
            //     <View style={{backgroundColor:'#1192d1', borderRadius:50, marginRight:10, width:25, justifyContent:'center', height: 25}}>
            //         <Icon name='filter-list' size={22} color={'white'} style={{fontWeight:'bold', alignSelf:'center'}}/>
            //     </View>
            // ) 
            header: props => 
                <View style={{height:50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1192d1'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 10}}>
                        <View style={{marginLeft:'2%', flexDirection: 'row', alignSelf:'center'}}>
                            <View style={{height:30, padding: 0, flexDirection: 'row' , alignItems:'center', width: 250, backgroundColor:'#F0F0F0', borderRadius: 10}}>
                                <View style={{marginLeft:'2%'}}>
                                    <Icon 
                                        name="search" 
                                        color="#1192d1" 
                                        size={20}
                                    />
                                </View>
                                <View style={{height:20}}>
                                    <Image
                                        source={Logo}
                                        style={{width: 150,alignSelf:'flex-start', height: '100%'}}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{marginLeft: '2%'}}>
                            <TouchableOpacity onPress={() => props.navigation.push('CategoryList')}>
                                <Icon2 
                                    name="view-grid" 
                                    color="white" 
                                    size={25}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => props.navigation.push('TabContainer', {
                            categorySelected: true
                        })}>
                            <PeopleIcon name="users" color="white" size={20}/>
                        </TouchableOpacity>
                    </View>
                </View>
            
        }
    },
  
 

},
{
    initialRouteName:'TabContainer',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#1192d1'
        },
        headerTitle:'CAMPUSGRUV',
        headerTitleStyle: {
            fontSize:25,
            fontWeight:'bold',
            color: 'white'
        }
        
        // header: (
        //     <View style={{height:50, backgroundColor: '#1192d1', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        //     <View style={{}}>
        //         <Text style={{fontSize:25,fontWeight:'bold', color: 'white'}}>CampusGruv</Text>
        //     </View>
        //     <View style={{width:25, height:25,justifyContent:'center', marginRight:'4%',backgroundColor:'#1192d1', borderRadius:50}}>
        //         <Icon name="search" size={20} color={'white'} style={{alignSelf:'center'}}></Icon>
        //     </View>
        //     </View>
        // )
    }

}
);

const RootStackNavigator = createSwitchNavigator({
    AuthLoading:{
        screen:AuthLoading
    },
    Auth:{
        screen:AuthNavigator
    },
    App:{
        screen:RootStack
    }

},
{
    initialRouteName: 'AuthLoading',
  }
)

const AppContainer = createAppContainer(RootStackNavigator);

export default class App extends Component {
  render() {
    return (
        // <NotificationScreen/>
       <AppContainer/>
//   <Login></Login>
    )
  }
}
