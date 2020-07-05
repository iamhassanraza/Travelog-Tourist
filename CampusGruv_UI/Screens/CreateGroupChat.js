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
import {Content, Container, Icon} from 'native-base';
import {SearchBar} from 'react-native-elements';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import NewMessageComponent from '../Components/NewMessageComponent';
import {connect} from 'react-redux';
import {UIActivityIndicator} from 'react-native-indicators';
import {ThemeBlue} from '../Assets/Colors';
import SearchIcon from 'react-native-vector-icons/Feather';
import SearchInput, {createFilter} from 'react-native-search-filter';
import NewGroupMessage from '../Components/NewGroupMessage';
import FastImage from 'react-native-fast-image';

class CreateGroupChat extends Component {
  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header: (
        <View style={{backgroundColor: '#0C91CF'}}>
          <View
            style={{
              shadowOffset: {height: 5, width: 0},
              shadowColor: 'rgba(0,0,0,0.25)',
              elevation: 5,
              height: 50,
              backgroundColor: '#0C91CF',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                padding: 2,
                alignSelf: 'center',
                right: 8,
              }}>
              <TouchableOpacity
                onPress={() => {
                  params.handleThis();
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 15,
                    padding: 2,
                  }}>
                  Create
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Create group chat
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                padding: 2,
                alignSelf: 'center',
                left: 8,
              }}>
              <TouchableOpacity
                onPress={() => {
                  params.handleThis();
                }}>
                <Icon
                  name="ios-arrow-back"
                  type="Ionicons"
                  style={{color: 'white', fontSize: 25}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      loadingUsers: false,
      selected: [],
      users: [],
      room_id: null,
    };
  }

  getFollowing = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
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
    this.setState({
      users: JsonResponse,
      loadingUsers: false,
    });
  };

  componentDidMount() {
    this.getFollowing();

    this.props.navigation.setParams({
      handleThis: () => {
        alert('handle this');
      },
    });
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

  addSelected = obj => {
    this.setState(prevState => {
      return {
        selected: [...prevState.selected, obj],
      };
    });
  };

  removeSelected = obj => {
    this.setState(prevState => {
      return {
        selected: prevState.selected.filter(user => user.id !== obj.id),
      };
    });
  };

  render() {
    console.log('selected array', this.state.selected);
    return (
      <Container>
        <Content style={{backgroundColor: '#f9fdfe'}}>
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
          {this.state.selected.length >= 1 ? (
            <FlatList
              style={{marginTop: 15}}
              horizontal
              data={this.state.selected}
              renderItem={({item}) => (
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingTop: 15,
                    // borderWidth: 1,
                    alignItems: 'center',
                  }}>
                  <FastImage
                    source={{uri: item.dp}}
                    style={{
                      height: 50,
                      borderWidth: 2,
                      borderColor: 'black',
                      width: 50,
                      borderRadius: 50,
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      textAlign: 'center',
                      marginTop: 2,
                      width: 60,
                      fontSize: 12,
                    }}>
                    {item.name}
                  </Text>
                  <Icon
                    onPress={() => {
                      this.removeSelected(item);
                    }}
                    type="MaterialCommunityIcons"
                    name="close-circle"
                    style={{
                      position: 'absolute',
                      right: 1,

                      color: 'grey',
                    }}
                  />
                </View>
              )}
            />
          ) : null}
          {!this.state.loadingUsers ? (
            <ScrollView style={{}}>
              <FlatList
                style={{marginTop: 5}}
                vertical
                data={this.state.users}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  if (item.id !== this.props.User.id) {
                    return (
                      <NewGroupMessage
                        addSelected={this.addSelected}
                        removeSelected={this.removeSelected}
                        id={item.id}
                        profile_pic_url={item.profile_pic_url}
                        first_name={item.first_name}
                        last_name={item.last_name}
                        navigationProps={this.props.navigation}
                        selected={this.state.selected}
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
)(CreateGroupChat);
