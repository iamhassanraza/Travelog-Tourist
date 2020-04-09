import React, {Component} from 'react';
import {Text, View, ScrollView, AsyncStorage} from 'react-native';
import InboxComponent from '../Components/InboxComponent';
import {FlatList} from 'react-native-gesture-handler';
import {clearMsgs} from '../ReduxStore/Actions/index';
import mystore from '../index';
import {connect} from 'react-redux';
// import Ws from '@adonisjs/websocket-client'

  class Inbox extends Component {
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
      `${require('../config').default.production}api/v1/chat/history`,
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
              renderItem={({item}) => {
                console.log('item',item.id, this.props.User.id)
                if(item.id !== this.props.User.id)
                 return (
                <InboxComponent
                  user_id={item.id}
                  uri={item.profile_pic_url}
                  title={item.first_name + ' ' + item.last_name}
                  subtitle={item.message}
                  //time={item.time}
                />
              )
            }
                 }
            />
          </ScrollView>
        </View>
      </>
    );
  }
}

mapStateToProps = (state) => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(mapStateToProps, null)(Inbox);