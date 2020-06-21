import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  AsyncStorage,
} from 'react-native';
import {ThemeBlue} from '../Assets/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UIActivityIndicator} from 'react-native-indicators';
import NoPost from '../Components/NoPost';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import AddMember from '../Components/AddMember';
import FastImage from 'react-native-fast-image';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';

export default class AddMembers extends Component {
  state = {
    search: '',
    loadingUsers: false,
    totalUsers: undefined,
    Users: [],
    added: false,
    org_id: this.props.navigation.getParam('org_id', null)
  };

  fetchUsers = async text => {
    this.setState({loadingUsers: true});
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/search/user?type=user&description=${text}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    // console.log('follow data arha ya nhi ----------------> ',JsonResponse.data)

    if (parseInt(Response.status) === 400) {
      this.setState({error: true, totalUsers: 0});
      console.log(Response);
    } else if (parseInt(Response.status) === 200) {
      if (JsonResponse.total > 0) {
        this.setState({
          Users: JsonResponse.data,
          totalUsers: JsonResponse.total,
          loadingUsers: false,
        });
        console.log(Response);
      } else if (JsonResponse.total === 0) {
        this.setState({totalUsers: 0});
        console.log(Response);
      }
    }
  };

  

  SearchItems = text => {
    if (text) {
      this.fetchUsers(text);
      console.log('fetch karo');
    } else {
      console.log('nahi chalay');
    }
  };

  renderUsers = () => {
    if (this.state.loadingUsers === false) {
      return (
        <ScrollView style={{backgroundColor: '#f9fdfe'}}>
          <FlatList
            vertical
            data={this.state.Users}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <AddMember
                  id={item.id}
                  first_name={item.first_name}
                  last_name={item.last_name}
                  userFollowing={item.isFollowing ? true : false}
                  item={item}
                  campus={item.campus.description}
                  status={true}
                  pic={item.profile_pic_url}
                  org_id={this.state.org_id}
                />
              );
            }}
          />
        </ScrollView>
      );
    } else if (this.state.loadingUsers === true) {
      return <UIActivityIndicator color={ThemeBlue} />;
    }
  };

  render() {
    console.log(this.state.org_id);
    return (
      <View style={{backgroundColor: '#f9fdfe'}}>
        <View
          style={{
            backgroundColor: ThemeBlue,
          }}>
          <View
            style={{
              backgroundColor: ThemeBlue,
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: 30,
                width: '65%',
                backgroundColor: 'white',
                marginLeft: 10,
                borderRadius: 8,
              }}>
              <Icon
                name="search"
                style={{
                  alignSelf: 'center',
                  fontSize: 20,
                  paddingLeft: '3%',
                  color: 'grey',
                }}
              />
              <TextInput
                placeholder="Search"
                style={{height: '90%', width: '100%', paddingVertical: 0}}
                value={this.state.search}
                onChangeText={text => {
                  this.setState({search: text});
                  this.SearchItems(text);
                }}
              />
            </View>
          </View>

          {this.state.totalUsers === 0
            ? this.renderNoPost('No Users Availiable')
            : this.renderUsers()}
        </View>
      </View>
    );
  }
}
