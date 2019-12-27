import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Avatar, Icon } from "react-native-elements";
import SettingComponent from '../Components/SettingComponent';
import { FlatList } from 'react-native-gesture-handler';




export default class Setting extends Component {
    state =
        {

            list: [
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    subtitle: 'Vice Chairman'
                },
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    subtitle: 'Vice Chairman'
                },
            ]
        }
    render() {


        return (
            <View>

                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        data={this.state.list}
                        horizontal={true}
                        renderItem={({ item }) => { return <Image source={{ uri: item.avatar_url }} style={{ width: 30, height: 30, borderRadius: 50, marginLeft: 25 }}></Image> }}
                    />
                </View>


                <SettingComponent title="Account" type="material-community" name="account-circle-outline" />
                <SettingComponent title="Create Organization Account" type="material-community" name="account-circle-outline" />
                <SettingComponent title="Notifications" type="ionicon" name="ios-notifications-outline" />
                <SettingComponent title="Help and Support" type="ionicon" name="md-help-circle-outline" />
                <SettingComponent title="About" type="evilicon" name="exclamation" />


            </View>
        )
    }
}
