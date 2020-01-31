import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image, Platform } from 'react-native'
import { Header } from "react-native-elements";
import Logo from '../Assets/Images/logo.png'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import PeopleIcon from 'react-native-vector-icons/FontAwesome5'
export default class MyHeader extends Component {
    render() {

        const leftComponent = (
            <View style={{ flexDirection: 'row', flex: 10,marginTop:Platform.OS=='ios'? 0:-20 }}>
                <View style={{ marginLeft: '2%', flexDirection: 'row', alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Searching')}
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
            </View>
        )

        const rightComponent = (
            <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:Platform.OS=='ios'? 0:-20}}>
                {/* <View style={{ marginLeft: '2%' }}> */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CategoryList')} style={{marginRight:10}}>
                        <Icon2
                            name="view-grid"
                            color="white"
                            size={25}
                        />
                    </TouchableOpacity>
                {/* </View> */}
                <TouchableOpacity onPress={() => this.props.params.handleThis()}>
                    <PeopleIcon name="users" color="white" size={20} />
                </TouchableOpacity>
            </View>
        )

        return (
            <Header containerStyle={{height:Platform.OS=='ios'? 80:60}} leftComponent={leftComponent} rightComponent={rightComponent} />
        )
    }
}
