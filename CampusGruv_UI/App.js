import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HomeScreen from './Screens/HomeScreen'
import 'react-native-gesture-handler'
import Screen1 from './Screens/CreatePost'
import Screen2 from './Screens/Screen1'
import Screen3 from './Components/Post'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import AddIcon from 'react-native-vector-icons/Entypo'

import { createAppContainer } from 'react-navigation';

import CreatePost from './Screens/CreatePost'

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const TabNavigator = createMaterialTopTabNavigator(
  {
      Home: {
          screen: Screen1,
          navigationOptions: {
              tabBarIcon: ({tintColor}) => (
                  <Icon name="home" color={tintColor}  style={{fontSize:22}}/>
              ),
              tabBarLabel: "Home"
          }
      },
      Notifications: {
        screen: Screen3,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon2 name="bell-ring"color={tintColor}  style={{fontSize:22}}/>
            ),
            tabBarLabel: "Notifications"
        }
    }, 
      followups: {
          screen: Screen1,
          navigationOptions: {
              tabBarIcon: ({tintColor}) => (
                  <AddIcon name="squared-plus" color={tintColor} style={{fontSize:22}}/>
              ),
              tabBarLabel: 'Add Post'
          }
      },
      Settings: {
        screen: Screen1,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon2 name="email-outline" color={tintColor}  style={{fontSize:22}}/>
            ),
            tabBarLabel: "Messages"
        }
    },
      Profile: {
          screen: Screen1,
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
              backgroundColor: "white",
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
          inactiveTintColor: 'grey',
          activeTintColor: 'black',
          showIcon: true,
          showLabel: false
          }
      }
);

const AppContianer = createAppContainer(TabNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContianer></AppContianer>
    )
  }
}
