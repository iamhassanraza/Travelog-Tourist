import React, {Component} from 'react';
import {Text, View, ScrollView, AsyncStorage} from 'react-native';
import InboxComponent from '../Components/InboxComponent';
import {FlatList} from 'react-native-gesture-handler';
import {clearMsgs} from '../ReduxStore/Actions/index';
import mystore from '../index';
// import Ws from '@adonisjs/websocket-client'

export default class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      store: mystore,
    };
  }

  fetchData = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    const Response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/chat/history`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    this.setState({
      data: JsonResponse,
    });
  };

  async componentDidMount() {
    this.fetchData();

    this.focusListener2 = this.props.navigation.addListener('willFocus', () => {
      this.fetchData();
    });
    this.focusListener = this.props.navigation.addListener('didBlur', () => {
      this.state.store.dispatch(clearMsgs());
    });
  }

  render() {
    return (
      <>
        <View style={{flex: 1}}>
          <ScrollView>
            <FlatList
              style={{marginTop: 10}}
              data={this.state.data}
              renderItem={({item}) => (
                <InboxComponent
                  user_id={item.id}
                  uri={item.profile_pic_url}
                  title={item.first_name + ' ' + item.last_name}
                  subtitle={item.message}
                  //time={item.time}
                />
              )}
            />
          </ScrollView>
        </View>
      </>
    );
  }
}
