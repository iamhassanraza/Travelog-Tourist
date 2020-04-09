import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  AsyncStorage,
  TouchableHighlightBase,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchInput, {createFilter} from 'react-native-search-filter';
import NoPost from '../Components/NoPost';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import { ThemeBlue } from '../Assets/Colors';
import {connect} from 'react-redux';


const KEYS_TO_FILTERS = ['name', 'subject'];

class Following extends Component {
  static navigationOptions = (props) => {
    const {params = {}} = props.navigation.state;
    return {
      header:
        Platform.OS === 'ios' ? (
          <View style={{backgroundColor: '#1192d1'}}>
            <View
              style={{
                marginTop: 38,
                height: 50,
                backgroundColor: '#1192d1',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View style={{alignSelf: 'center'}}>
                <Text
                  style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                  Following
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
                  <Icon name="arrow-back" color="white" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              height: 50,
              backgroundColor: '#1192d1',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                Following
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
                <Icon name="arrow-back" color="white" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        ),
    };
  };

  state = {
    search: [],
    loading: true
  };

  componentDidMount() {
    navId = this.props.navigation.getParam('postUserId', null);
    this.getFollowing();

    this.props.navigation.setParams({
      handleThis: () => {
        this.props.navigation.navigate('UserProfile', {
          userNavId: this.props.navigation.getParam('postUserId', null),
          userNavDp: this.props.navigation.getParam('postUserDp', null),
          userNavFirstName: this.props.navigation.getParam(
            'postUserFirstName',
            null,
          ),
          userNavLastName: this.props.navigation.getParam(
            'postUserLastName',
            null,
          ),
          userCampus: this.props.navigation.getParam('postUserCampus', null),
          userFollowing: this.props.navigation.getParam('isFollowing', null),
        });
      },
    });
  }

  getFollowing = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/following/users?user_id=${navId}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    this.setState({
      search: JsonResponse.data,
      loading: false
    });
  };


  renderNoPost = (text) => {
    return (
      <View style={{paddingTop: '35%'}}>
        <NoPost name={text}></NoPost>
      </View>
    );
  };








  render() {
    return (
    this.state.loading ?   <View style={{justifyContent: 'center',alignSelf:"center"}}>
    <BarIndicator count={4} color={ThemeBlue} />
  </View> :
      (this.state.search.length)  ?
      <View>
        <View style={{padding: 5}}>
          <FlatList
            vertical
            data={this.state.search}
            keyExtractor={(item) => item.name}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                  <AvatarUserStatus
                    id={item.id}
                    first_name={item.first_name}
                    last_name={item.last_name}
                    userFollowing={item.userFollowing[0] ? true : false}
                    pic={item.profile_pic_url}
                  />
                )
              }
          />
        </View>
      </View>
      :
       <View>
       {this.renderNoPost('Not Following Anyone')}
     </View>
    );
  }
}
mapStateToProps = (state) => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default withNavigation(connect(mapStateToProps, null)(Following))
