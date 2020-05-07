import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AddIcon from 'react-native-vector-icons/Entypo';

const TabNavigator = createMaterialTopTabNavigator();

export default class TabNavigatorScreen extends React.Component {
  render() {
    return (
      <>
        <TabNavigator.navigator
          initialRouteName="Home"
          tabBarPosition="bottom"
          swipeEnabled={false}
          defaultNavigationOptions={{
            tabBarOnPress: ({navigation, defaultHandler}) => {
              navigation.dispatch(StackActions.popToTop());
              defaultHandler();
            },
          }}
          tabBarOptions={{
            style: {
              backgroundColor: 'white',
              height: Platform.OS == 'ios' ? 60 : 50,
            },
            iconStyle: {
              marginBottom: Platform.OS == 'ios' ? '5%' : 0,
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
          }}>
          <TabNavigator.Screen
            name="Home"
            component={Feed}
            options={{
              tabBarIcon: ({tintColor}) => (
                <Icon name="home" color={tintColor} style={{fontSize: 27}} />
              ),
              tabBarLabel: 'Home',
            }}
          />
          <TabNavigator.Screen
            name="Notifications"
            component={Feed}
            options={{
              tabBarIcon: ({tintColor}) => (
                <Icon2
                  name="bell-ring"
                  color={tintColor}
                  style={{fontSize: 27}}
                />
              ),
              tabBarLabel: 'Notifications',
            }}
          />
          <TabNavigator.Screen
            name="AddPost"
            component={Feed}
            options={{
              initialRouteName: 'AddPost',
              tabBarIcon: ({tintColor}) => (
                <AddIcon
                  name="squared-plus"
                  color={tintColor}
                  style={{fontSize: 27}}
                />
              ),
              tabBarLabel: 'Add Post',
            }}
          />
          <TabNavigator.Screen
            name="Messages"
            component={Feed}
            options={{
              tabBarIcon: ({tintColor}) => (
                <Icon2
                  name="email-outline"
                  color={tintColor}
                  style={{fontSize: 27}}
                />
              ),
              tabBarLabel: 'Messages',
              hederMode: 'none',
            }}
          />
          <TabNavigator.Screen
            name="Profile"
            component={Feed}
            options={{
              tabBarIcon: ({tintColor}) => (
                <Icon name="person" color={tintColor} style={{fontSize: 27}} />
              ),
              tabBarLabel: 'Profile',
            }}
          />
        </TabNavigator.navigator>
      </>
    );
  }
}

// const TabNavigator = createMaterialTopTabNavigator(
//     {
//         Home: {
//             screen: HomeStack,
//             navigationOptions: {
//                 tabBarIcon: ({ tintColor }) => (
//                     <Icon name="home" color={tintColor} style={{ fontSize: 27 }} />
//                 ),
//                 tabBarLabel: "Home"
//             }
//         },
//         Notifications: {
//             screen: NotificationScreen,
//             navigationOptions: {
//                 tabBarIcon: ({ tintColor }) => (
//                     <Icon2 name="bell-ring" color={tintColor} style={{ fontSize: 27 }} />
//                 ),
//                 tabBarLabel: "Notifications"
//             },
//         },
//         AddPost: {
//             screen: CreatePostStack,
//             navigationOptions: {
//                 initialRouteName: 'AddPost',
//                 tabBarIcon: ({ tintColor }) => (
//                     <AddIcon name="squared-plus" color={tintColor} style={{ fontSize: 27 }} />
//                 ),
//                 tabBarLabel: 'Add Post'
//             }
//         },
//         messages: {
//             screen: MessageStack,
//             navigationOptions: {
//                 tabBarIcon: ({ tintColor }) => (
//                     <Icon2 name="email-outline" color={tintColor} style={{ fontSize: 27 }} />
//                 ),
//                 tabBarLabel: "Messages",
//                 hederMode: 'none'
//             }
//         },
//         Profile: {
//             screen: ProfileStack,
//             navigationOptions: {
//                 tabBarIcon: ({ tintColor }) => (
//                     <Icon name="person" color={tintColor} style={{ fontSize: 27 }} />
//                 ),
//                 tabBarLabel: "Profile"
//             }
//         }
//     },
//     {
//         initialRouteName: 'Home',
//         tabBarPosition: 'bottom',
//         swipeEnabled: false,
//         defaultNavigationOptions: {
//             tabBarOnPress: ({ navigation, defaultHandler }) => {
//                 navigation.dispatch(StackActions.popToTop());
//                 defaultHandler();
//             },
//         },
//         tabBarOptions: {
//             style: {
//                 backgroundColor: "white",
//                 height: Platform.OS == 'ios' ? 60 : 50,

//             },
//             iconStyle: {
//                 marginBottom: Platform.OS == 'ios' ? "5%" : 0,
//             },
//             labelStyle: {
//                 fontSize: 8,
//                 width: '100%',
//                 alignSelf: 'center',
//                 marginTop: -2,
//             },
//             indicatorStyle: {
//                 backgroundColor: '#0C91CF',
//                 height: 2,
//             },
//             upperCaseLabel: false,
//             inactiveTintColor: 'grey',
//             activeTintColor: '#0C91CF',
//             showIcon: true,
//             showLabel: false
//         }
//         // Platform.OS=='ios'? iosTabBarOptions : androidTabBarOptions
//     }
// );
