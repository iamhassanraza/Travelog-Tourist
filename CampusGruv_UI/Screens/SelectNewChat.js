import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Content, Container} from 'native-base';
import {SearchBar} from 'react-native-elements';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import NewMessageComponent from '../Components/NewMessageComponent';
import {connect} from 'react-redux';
import {UIActivityIndicator} from 'react-native-indicators';
import {ThemeBlue} from '../Assets/Colors';

class SelectNewChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      loadingUsers: false,
      users: [],
      room_id: null,
    };
  }

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
    // console.log('users: ', JsonResponse.data);

    if (parseInt(Response.status) === 400) {
      this.setState({error: true, loadingUsers: false, totalUsers: 0});
    } else if (parseInt(Response.status) === 200) {
      if (JsonResponse.total > 0) {
        this.setState({
          users: JsonResponse.data,
          totalUsers: JsonResponse.total,
          loadingUsers: false,
        });
      } else if (JsonResponse.total === 0) {
        this.setState({totalUsers: 0, loadingUsers: false});
      }
    }
  };

  updateSearch = e => {
    this.setState({text: e});
    this.fetchUsers(e);
  };

  render() {
    return (
      <Container>
        <Content style={{backgroundColor: '#f9fdfe'}}>
          <SearchBar
            platform="ios"
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.text}
            onCancel={() => {
              this.setState({text: ''});
            }}
            clearIcon={false}
          />
          {!this.state.loadingUsers ? (
            <ScrollView style={{}}>
              <FlatList
                style={{}}
                vertical
                data={this.state.users}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  if (item.id !== this.props.User.id) {
                    return (
                      <NewMessageComponent
                        id={item.id}
                        profile_pic_url={item.profile_pic_url}
                        first_name={item.first_name}
                        last_name={item.last_name}
                        navigationProps={this.props.navigation}
                      />
                    );
                  }
                }}
              />
            </ScrollView>
          ) : (
            <UIActivityIndicator color={ThemeBlue} />
          )}
        </Content>
      </Container>
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
)(SelectNewChat);
