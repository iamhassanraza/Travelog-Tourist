import React, { Component } from 'react'
import { Text, View } from 'react-native'
// import HomeScreen from './Screens/HomeScreen'
import 'react-native-gesture-handler'
// import Screen1 from './Screens/CreatePost'
// import Screen2 from './Screens/Screen1'
import Screen3 from './Components/Post'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import AddIcon from 'react-native-vector-icons/Entypo'
import HomeScreen from './Screens/HomeScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PostDetail from './Screens/PostDetail'
import CreatePost from './Screens/CreateNewPost'
import PostsList from './Components/PostsList'
import CategoryList from './Screens/CategoryList'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const TabNavigator = createMaterialTopTabNavigator(
  {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Icon name="home" color={tintColor}  style={{fontSize:22}}/>
            ),
            tabBarLabel: "Home"
          }
      },
      Notifications: {
        screen: PostDetail,
        navigationOptions: {
            //header: null,
            tabBarIcon: ({tintColor}) => (
                <Icon2 name="bell-ring"color={tintColor}  style={{fontSize:22}}/>
            ),
            tabBarLabel: "Notifications"
        }
    }, 
      AddPost: {
          screen: CreatePost,
          navigationOptions: {
              tabBarIcon: ({tintColor}) => (
                  <AddIcon name="squared-plus" color={tintColor} style={{fontSize:22}}/>
              ),
              tabBarLabel: 'Add Post'
          }
      },
      Settings: {
        screen: Screen3,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon2 name="email-outline" color={tintColor}  style={{fontSize:22}}/>
            ),
            tabBarLabel: "Messages"
        }
    },
      Profile: {
          screen: Screen3,
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
    TabContainer,
   
    PostsList,
    HomeScreen,
    CreatePost,
    CategoryList
},
{
    initialRouteName:'TabContainer',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        header: (
            <View style={{height:50, backgroundColor: '#1192d1', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <View style={{marginLeft:'5%'}}>
                <Text style={{fontSize:25,fontWeight:'bold', color: 'white'}}>CampusGruv</Text>
            </View>
            <View style={{width:25, height:25,justifyContent:'center', marginRight:'4%',backgroundColor:'#1192d1', borderRadius:50}}>
                <Icon name="search" size={20} color={'white'} style={{alignSelf:'center'}}></Icon>
            </View>
            </View>
        )
    }

}
);


const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
       <AppContainer/>
    //<PostDetail></PostDetail>
    )
  }
}
