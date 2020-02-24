import React, { Component } from 'react'
import { Text, View, TextInput, Image, TouchableOpacity,Platform } from 'react-native'
// import HomeScreen from './Screens/HomeScreen'
import 'react-native-gesture-handler'
// import Screen1 from './Screens/CreatePost'
// import Screen2 from './Screens/Screen1'
import Screen3 from './Components/Post'
import PostIcon from 'react-native-vector-icons/Foundation'
import { Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import OptionsIcon from 'react-native-vector-icons/SimpleLineIcons'
import MenuIcon from 'react-native-vector-icons/Feather'
import PeopleIcon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import AddIcon from 'react-native-vector-icons/Entypo'
import Logo from './Assets/Images/logo.png'
import HomeScreen from './Screens/HomeScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StackActions, NavigationActions } from 'react-navigation';
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
import EditProfile from './Screens/ProfileEdit'
import AuthLoading from './Screens/AuthLoading'
import AddPost from './Screens/AddNewPost'
import Searching from './Screens/Searching'
import RecoveryCode from './Screens/RecoveryCode'
import ResetPassword from './Screens/ResetPassword'
import UserSettings from './Screens/UserSettings'
import { TouchableHighlight } from 'react-native-gesture-handler'
import NoPost from './Components/NoPost'
import EmailVerification from './Screens/EmailVerification'
import Followers from './Screens/Followers'
import Following from './Screens/Following'
import { Header } from 'react-native-elements'
import FollowersPosts from './Screens/FollowersPosts'
import InboxComponent from './Components/InboxComponent'
import ReportPost from './Screens/ReportPost'


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
                },
                RecoveryCode: {
                    screen: RecoveryCode,
                    navigationOptions: {
                        header: null }
                    },
                    ResetPassword: {
                        screen: ResetPassword,
                        navigationOptions: {
                            header: null }
                        }


})

const CreatePostStack = createStackNavigator({
    AddPost: {
        screen: AddPost
    },
    PostDetail,
    CreatePost: {
        screen: CreatePost,
        // navigationOptions: {
        //     header: (props) => (
        //         <View style={{height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center'}}>
        //             <View style={{position: 'absolute', padding:2, alignSelf: 'center', left: 8}}>
        //                 <TouchableOpacity 
        //                     onPress = {() => {
        //                         props.navigation.navigate("AddPost");
        //                     }}
        //                 >
        //                     <Icon name="arrow-back" color="white" size={25} />
        //                 </TouchableOpacity>
        //             </View>
        //             <View style={{alignSelf: 'center'}}>
        //                 <Text style={{color: 'white', fontSize:20, fontWeight:'bold'}}>New post</Text>
        //             </View>
        //             <View style={{position: 'absolute', padding:2, alignSelf: 'center', right: 8}}>
        //                 <TouchableOpacity 
        //                     onPress = {() => {
        //                         props.navigation.dispatch(StackActions.popToTop());
        //                         props.navigation.navigate('HomeScreen')
        //                     }}
        //                 >
        //                     <Text style={{color: 'white', padding: 2}}>
        //                         Close
        //                     </Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View> 
        //     )
        // },
    }
},
    {
        initialRouteName: 'AddPost',
        navigationOptions: {
            tabBarVisible: false,
        },
    }
)


const ProfileStack = createStackNavigator({
    UserProfile: {
        screen: UserProfile,
        navigationOptions: {
            header: (props) => (
                // <Header 
                // centerComponent={{text:"CAMPUS GRUV",style:{color:"#FFF",fontWeight:'bold'}}}
                // rightComponent={(
                //     <TouchableOpacity onPress={() => props.navigation.navigate('UserSettings')} >
                //         <Icon name="settings" color="white" size={23} />
                //     </TouchableOpacity>
                // )}
                // />
                <View style={{backgroundColor: '#1192d1',}}>

                <View style={{marginTop:Platform.OS=='ios'? 38:0,height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center'}}>
                    <View style={{alignSelf: 'center'}}>
                        <Image
                            source={Logo}
                            style={{ width: 150, alignSelf: 'flex-start', height: '90%' }}
                            resizeMode="contain"
                            />
                        </View>
                    <View style={{position: 'absolute', padding:2, alignSelf: 'center', right: 8}}>
                        <TouchableOpacity 
                            onPress = {() => {
                                props.navigation.navigate('UserSettings')
                            }}
                            >
                            <Icon name="settings" color="white" size={23}/>
                        </TouchableOpacity>
                            </View>
                    </View>
                </View>
            )
        },
    },
    EditProfile: {
        screen: EditProfile,
    },
    Followers :{
        screen : Followers,
    },
    Following :{
        screen : Following,
    },
    UserSettings : {
        screen: UserSettings,
        navigationOptions: {
            header: (props) => (
                <View style={{backgroundColor: '#1192d1',}}>
                <View style={{marginTop:Platform.OS=='ios'?38:0,height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center'}}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={{color: 'white', fontSize: 25, fontWeight:'bold'}}>
                            Settings
                        </Text>
                        </View>
                    <View style={{position: 'absolute', padding:2, alignSelf: 'center', left: 8}}>
                        <TouchableOpacity 
                            onPress = {() => {
                                props.navigation.navigate('UserProfile')
                            }}
                            >
                            <Icon name="arrow-back" color="white" size={25}/>
                        </TouchableOpacity>
                    </View>
                            </View>
                </View>
            )
        }
    }
}, 
{
    navigationOptions: (props) => {
        return {
            tabBarVisible: props.navigation.state.index < 1 ? true : false
        }
    },
    initialRouteName: 'UserProfile'
}
)

const HomeStack = createStackNavigator({
    HomeScreen,
    FollowersPosts,
    UserProfile: {
        screen: UserProfile,
        navigationOptions: {
            header: (props) => (
                <View style={{ backgroundColor: '#1192d1',}}>

                    <View style={{marginTop:Platform.OS=='ios'? 38:0,height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center'}}>
                        <View style={{alignSelf: 'center'}}>
                        <Image
                                        source={Logo}
                                        style={{ width: 150, alignSelf: 'flex-start', height: '100%' }}
                                        resizeMode="contain"
                                        />
                        </View>
                        <View style={{position: 'absolute', padding:2, alignSelf: 'center', left: 8}}>
                            <TouchableOpacity 
                                onPress = {() => {
                                    props.navigation.goBack()
                                }}
                                >
                                <Icon name="arrow-back" color="white" size={28}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{position: 'absolute', padding:2, alignSelf: 'center', right: 8}}>
                            <TouchableOpacity 
                                onPress = {() => {
                                    props.navigation.goBack()
                                }}
                                >
                                <MenuIcon name="more-vertical" color="white" fontWeight='bold' size={26}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ),
        }
    },
    PostDetail: {
        screen: PostDetail,
        navigationOptions: {
            header: null
        }
    },
    CategoryList,
    Searching: {
        screen : Searching,
        navigationOptions: {
            header: null
        }
    },
    ReportPost : {
        screen : ReportPost,
        navigationOptions: {
            header: null
        }
    }
},
    {
        navigationOptions: (props) => {
            return {
                tabBarVisible: props.navigation.state.routes[props.navigation.state.index].routeName === 'PostDetail' ? false : true
            }
        },
        defaultNavigationOptions: {
        header: props =>
        <View style={{backgroundColor: '#1192d1'}}>

    
        <View style={{ marginTop:Platform.OS == 'ios' ? 38:0,height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1192d1' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex:10 }}>
                <View style={{ marginLeft: '2%', flexDirection: 'row', alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={()=> props.navigation.navigate('Searching')}
                    >
                        <View style={{ height: 30, padding: 0, flexDirection: 'row', alignItems: 'center', width: 250, backgroundColor: '#F0F0F0', borderRadius: 10 }}>
                            <View style={{ marginLeft: '2%' }}>
                                <Icon
                                    name="search"
                                    color="#1192d1"
                                    size={20}
                                />
                            </View>
                            <View style={{ height: 20 }}>
                                <Image
                                    source={Logo}
                                    style={{ width: 150, alignSelf: 'flex-start', height: '100%' }}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginLeft: 5}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('CategoryList')}>
                        <Icon2
                            name="view-grid"
                            color="white"
                            size={28}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex:1}}>
                <TouchableOpacity style={{paddingRight:5}} onPress={() => params.handleThis()}>
                    <PeopleIcon name="users" color="white" size={20} />
                </TouchableOpacity>
            </View>
                {/* <View style={{ marginRight: '2%' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('CategoryList')}>
                        <Icon2
                            name="view-grid"
                            color="white"
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => props.navigation.push('TabContainer', {
                    categorySelected: true
                })}>
                    <PeopleIcon name="users" color="white" size={20} />
                </TouchableOpacity>
            </View> */}
        </View>
        </View>
        
        }
    }
)

const MessageStack = createStackNavigator({
    InboxComponent,
    inbox: {
        screen: inbox,
        navigationOptions: {
            header: (props) => (
                <View style={{backgroundColor: '#1192d1'}}>
                <View style={{marginTop:Platform.OS == 'ios' ? 38:0, height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center'}}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={{color: 'white', fontSize:20, fontWeight:'bold'}}>Messages</Text>
                    </View>
                    <View style={{position: 'absolute', padding:2, alignSelf: 'center', right: 8}}>
                        <TouchableOpacity 
                            onPress = {() => {
                                props.navigation.push('inbox')
                            }}
                        >
                            <PostIcon name="clipboard-pencil" color="white" size={25}/>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            ),
        },
    },
    chat: {
        screen: chat
    },
},
    {
        initialRouteName: 'inbox',
        navigationOptions: props => {
            return {
                tabBarVisible: props.navigation.state.index === 0
            } 
        }
    },


)

const androidTabBarOptions = {
    style: {
        backgroundColor: "white",
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
        backgroundColor: '#1192d1',
        height: 2,
    },
    upperCaseLabel: false,
    inactiveTintColor: 'grey',
    activeTintColor: '#1192d1',
    showIcon: true,
    showLabel: false
}    
const iosTabBarOptions = {
    style: {
        backgroundColor: "white",
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
        backgroundColor: '#1192d1',
        height: 2,
    },
    upperCaseLabel: false,
    inactiveTintColor: 'grey',
    activeTintColor: '#1192d1',
    showIcon: true,
    showLabel: false
}   

const TabNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="home" color={tintColor} style={{ fontSize: 27 }} />
                ),
                tabBarLabel: "Home"
            }
        },
        Notifications: {
            screen: NotificationScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon2 name="bell-ring" color={tintColor} style={{ fontSize: 27 }} />
                ),
                tabBarLabel: "Notifications"
            },
        },
        AddPost: {
            screen: CreatePostStack,
            navigationOptions: {
                initialRouteName: 'AddPost',
                tabBarIcon: ({ tintColor }) => (
                    <AddIcon name="squared-plus" color={tintColor} style={{ fontSize: 27 }} />
                ),
                tabBarLabel: 'Add Post'
            }
        },
        messages: {
            screen: MessageStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon2 name="email-outline" color={tintColor} style={{ fontSize: 27 }} />
                ),
                tabBarLabel: "Messages",
                hederMode: 'none'
            }
        },
        Profile: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="person" color={tintColor} style={{ fontSize: 27 }} />
                ),
                tabBarLabel: "Profile"
            }
        }
    },
    {
        initialRouteName: 'Home',
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        defaultNavigationOptions: {
            tabBarOnPress: ({navigation, defaultHandler}) => {
                navigation.dispatch(StackActions.popToTop());
                defaultHandler();
            },
        },
        tabBarOptions: {
            style: {
                backgroundColor: "white",
                height:Platform.OS == 'ios' ?60 : 50,
             
            },
            iconStyle: {               
               marginBottom: Platform.OS == 'ios' ? "5%" :  0,
            },
            labelStyle: {
                fontSize: 8,
                width: '100%',
                alignSelf: 'center',
                marginTop: -2,
            },
            indicatorStyle: {
                backgroundColor: '#1192d1',
                height: 2,
            },
            upperCaseLabel: false,
            inactiveTintColor: 'grey',
            activeTintColor: '#1192d1',
            showIcon: true,
            showLabel: false
        } 
        // Platform.OS=='ios'? iosTabBarOptions : androidTabBarOptions
    }
);
const TabContainer = createAppContainer(TabNavigator);
// const RootStack = createStackNavigator({

//     TabContainer: {
//         screen: TabContainer
//         // navigationOptions: {
//         //     header: props =>
//         //         <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1192d1' }}>
//         //             <View style={{ flexDirection: 'row', alignItems: 'center', flex: 10 }}>
//         //                 <View style={{ marginLeft: '2%', flexDirection: 'row', alignSelf: 'center' }}>
//         //                     <View style={{ height: 30, padding: 0, flexDirection: 'row', alignItems: 'center', width: 250, backgroundColor: '#F0F0F0', borderRadius: 10 }}>
//         //                         <View style={{ marginLeft: '2%' }}>
//         //                             <Icon
//         //                                 name="search"
//         //                                 color="#1192d1"
//         //                                 size={20}
//         //                             />
//         //                         </View>
//         //                         <View style={{ height: 20 }}>
//         //                             <Image
//         //                                 source={Logo}
//         //                                 style={{ width: 150, alignSelf: 'flex-start', height: '100%' }}
//         //                                 resizeMode="contain"
//         //                             />
//         //                         </View>
//         //                     </View>
//         //                 </View>
//         //                 <View style={{ marginLeft: '2%' }}>
//         //                     <TouchableOpacity onPress={() => props.navigation.push('CategoryList')}>
//         //                         <Icon2
//         //                             name="view-grid"
//         //                             color="white"
//         //                             size={25}
//         //                         />
//         //                     </TouchableOpacity>
//         //                 </View>
//         //             </View>
//         //             <View style={{ flex: 1 }}>
//         //                 <TouchableOpacity onPress={() => props.navigation.push('TabContainer', {
//         //                     categorySelected: true
//         //                 })}>
//         //                     <PeopleIcon name="users" color="white" size={20} />
//         //                 </TouchableOpacity>
//         //             </View>
//         //         </View>
//         // }
//     },

// },
//     {
//         initialRouteName: 'TabContainer',
//         headerLayoutPreset: 'center',
//         headerMode:'none',
//         defaultNavigationOptions: {
//             headerStyle: {
//                 backgroundColor: '#1192d1'
//             },
//             headerTitle: 'CAMPUSGRUV',
//             headerTitleStyle: {
//                 fontSize: 25,
//                 fontWeight: 'bold',
//                 color: 'white'
//             },
//             header: props =>
//                     <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1192d1' }}>
//                         <View style={{ flexDirection: 'row', alignItems: 'center', flex: 10 }}>
//                             <View style={{ marginLeft: '2%', flexDirection: 'row', alignSelf: 'center' }}>
//                                 <View style={{ height: 30, padding: 0, flexDirection: 'row', alignItems: 'center', width: 250, backgroundColor: '#F0F0F0', borderRadius: 10 }}>
//                                     <View style={{ marginLeft: '2%' }}>
//                                         <Icon
//                                             name="search"
//                                             color="#1192d1"
//                                             size={20}
//                                         />
//                                     </View>
//                                     <View style={{ height: 20 }}>
//                                         <Image
//                                             source={Logo}
//                                             style={{ width: 150, alignSelf: 'flex-start', height: '100%' }}
//                                             resizeMode="contain"
//                                         />
//                                     </View>
//                                 </View>
//                             </View>
//                             <View style={{ marginLeft: '2%' }}>
//                                 <TouchableOpacity onPress={() => props.navigation.navigate('CategoryList')}>
//                                     <Icon2
//                                         name="view-grid"
//                                         color="white"
//                                         size={25}
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                         <View style={{ flex: 1 }}>
//                             <TouchableOpacity onPress={() => props.navigation.navigate('TabContainer', {
//                                 categorySelected: true
//                             })}>
//                                 <PeopleIcon name="users" color="white" size={20} />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//         },  
//     }
// );

const RootStackNavigator = createSwitchNavigator({
    AuthLoading: {
        screen: AuthLoading
    },
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: TabContainer,
    },
    EditProfile:{
        screen:createStackNavigator({EditProfile})
    },
    EmailVerification:{
        screen:EmailVerification
    }

},
    {
        initialRouteName: 'AuthLoading',
    }
)

const AppContainer = createAppContainer(RootStackNavigator);

export default class App extends Component {

    constructor(props) {
        super(props)
        this.keyboardWillShow = this.keyboardWillShow.bind(this)
        this.keyboardWillHide = this.keyboardWillHide.bind(this)
        this.state = {
          isVisible: true
        }
    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
    }

    keyboardWillShow = event => {
        this.setState({
          isVisible: false
        })
    }
    
    keyboardWillHide = event => {
        this.setState({
          isVisible: true
        })
    }

    render() {
        return ( 
          <AppContainer></AppContainer>
        )
    }
}
