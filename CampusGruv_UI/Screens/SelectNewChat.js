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
import SearchIcon from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';

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

  getFollowing = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/following/users?user_id=${this.props.User.id}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    console.log(JsonResponse, 'resssss');
    this.setState({
      users: JsonResponse,
      loadingUsers: false,
    });
  };

  componentDidMount() {
    this.getFollowing();
    //this.fetchUsers('a');
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
          <View
            style={{
              flexDirection: 'row',
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
                this.updateSearch(term);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 0,
                marginLeft: 5,
                paddingBottom: 0,
                width: 250,
                color: '#C4C4C4',
              }}
              placeholder="Search"
            />
          </View>
          {/* <SearchBar
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 0,
              marginLeft: 5,
              paddingBottom: 0,
              width: 250,
              color: '#C4C4C4',
            }}
            //platform="ios"
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.text}
            onCancel={() => {
              this.setState({text: ''});
            }}
            clearIcon={false}
          /> */}
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
            <View style={{height: 500}}>
              <UIActivityIndicator color={ThemeBlue} />
            </View>
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
