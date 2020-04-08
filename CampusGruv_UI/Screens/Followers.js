import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  Platform,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlightBase,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NoPost from '../Components/NoPost';

class Followers extends Component {
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
                  Followers
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
                Followers
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
    data: [],
    search: null,
  };

  componentDidMount() {
    navId = this.props.navigation.getParam('postUserId', null);
    this.getFollower();

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

  getFollower = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/follower/users?user_id=${navId}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    this.setState({
      data: JsonResponse.data,
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
      (this.state.data.length)   ?
    
      <View>
        <View style={{padding: 5}}>
          <FlatList
            vertical
            data={this.state.data}
            keyExtractor={(item) => item.name}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <AvatarUserStatus
                id={item.id}
                first_name={item.first_name}
                last_name={item.last_name}
                userFollowing={item.userFollowing[0] ? true : false}
                pic={item.profile_pic_url}></AvatarUserStatus>
            )}
          />
        </View>
      </View>
      :
      <View>
       {this.renderNoPost('No one is following you')}
     </View>
    );
  }
}

export default withNavigation(Followers);
