import React, {Component} from 'react';
import {Text, View, ScrollView, AsyncStorage, StyleSheet} from 'react-native';
import InboxComponent from '../Components/InboxComponent';
import {FlatList} from 'react-native-gesture-handler';
import {clearMsgs} from '../ReduxStore/Actions/index';
import mystore from '../index';
import {connect} from 'react-redux';

import SearchInput, {createFilter} from 'react-native-search-filter';
import SearchIcon from 'react-native-vector-icons/Feather';

const KEYS_TO_FILTERS = ['id', 'first_name', 'last_name'];

// import Ws from '@adonisjs/websocket-client'

class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      store: mystore,
      searchTerm: '',
    };
  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  fetchData = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
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
    const filtereddata = this.state.data.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS),
    );
    return (
      <>
        <View style={{flex: 1, backgroundColor: '#f9fdfe'}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: '2%',
                marginLeft: '2%',
                borderColor: '#C4C4C4',
                borderWidth: 1,
                borderRadius: 9,
                height: 30,
                marginTop: 10,
              }}>
              <SearchIcon
                name="search"
                style={{
                  alignSelf: 'center',
                  fontSize: 20,
                  color: '#C4C4C4',
                  paddingLeft: '2%',
                }}
              />
              <SearchInput
                onChangeText={term => {
                  this.searchUpdated(term);
                }}
                style={styles.searchInput}
                placeholder="Search"
              />
            </View>
            <FlatList
              style={{marginTop: 10}}
              data={filtereddata}
              renderItem={({item}) => {
                if (item.id !== this.props.User.id)
                  return (
                    <InboxComponent
                      user_id={item.id}
                      uri={item.profile_pic_url}
                      title={
                        item.first_name + ' ' + item.last_name.charAt(0) + '.'
                      }
                      subtitle={item.message}
                      time={new Date(item.created_at.replace(' ', 'T'))}
                      //time={5}
                    />
                  );
              }}
            />
          </ScrollView>
        </View>
      </>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  null,
)(Inbox);

const styles = StyleSheet.create({
  searchInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    marginLeft: 5,
    paddingBottom: 0,
    color: '#C4C4C4',
    width: 330,
  },
});
