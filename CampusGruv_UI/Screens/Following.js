import React, {Component} from 'react';
import {Text, View, FlatList, TextInput, TouchableOpacity,Platform,
  AsyncStorage,
  TouchableHighlightBase,} from 'react-native';
import {withNavigation} from 'react-navigation'
import AvatarUserStatus from '../Components/AvatarUserStatus';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SearchInput, { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['name', 'subject'];

class Following extends Component {

  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header: (
          Platform.OS==='ios'?
          <View style={{backgroundColor:'#1192d1'}}>
          <View style={{marginTop:38,height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center'}}>
          <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 25, fontWeight:'bold'}}>
                  Following
              </Text>
              </View>
          <View style={{position: 'absolute', padding:2, alignSelf: 'center', left: 8}}>
              <TouchableOpacity 
                  onPress = {() => {
                    params.handleThis()
                  }}
              >
                  <Icon name="arrow-back" color="white" size={25}/>
              </TouchableOpacity>
          </View>
          </View>
          </View>
          :
          <View style={{height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center'}}>
              <View style={{alignSelf: 'center'}}>
                  <Text style={{color: 'white', fontSize: 25, fontWeight:'bold'}}>
                      Following
                  </Text>
                  </View>
              <View style={{position: 'absolute', padding:2, alignSelf: 'center', left: 8}}>
                  <TouchableOpacity 
                      onPress = {() => {
                        params.handleThis()
                      }}
                  >
                      <Icon name="arrow-back" color="white" size={25}/>
                  </TouchableOpacity>
              </View>
          </View>
      )
    }
  }


    state ={
        search :null,
    }


  componentDidMount() {
    navId = this.props.navigation.getParam('postUserId', null)
    this.getFollowing();

    this.props.navigation.setParams({
      handleThis: () => {
        this.props.navigation.navigate('UserProfile', {
          userNavId: this.props.navigation.getParam('postUserId', null),
          userNavDp: this.props.navigation.getParam('postUserDp', null),
          userNavFirstName: this.props.navigation.getParam('postUserFirstName', null),
          userNavLastName: this.props.navigation.getParam('postUserLastName', null),
          userCampus: this.props.navigation.getParam('postUserCampus', null),
          userFollowing: this.props.navigation.getParam('isFollowing', null)
        })
      }
  });
  }

  getFollowing = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    const Response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/follower/users?user_id=${navId}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    console.log('following data',JsonResponse.data)
    this.setState({
      search: JsonResponse.data,
    });
  };


  render() {

    return (
        <View>
        <View
        style={{
          marginTop: '1%',
          marginLeft: '2%',
          paddingRight: '13%',
          flexDirection: 'row',
          borderWidth: 0.5,
          borderRadius: 12,
          borderColor: 'grey',
          marginRight: '20%',
          height: 30,
        }}>
        <Icon
          name="search"
          style={{
            color: 'grey',
            fontSize: 16,

            alignSelf: 'center',
            paddingLeft: '2%',
            marginRight: '1%',
          }}></Icon>

        <TextInput
          style={{
            width: '100%',
            alignSelf: 'center',
            fontSize: 16,
            padding: 0,
          }}
          placeholder="Search"
          onChangeText={text => this.setState({search: text})}></TextInput>
      </View>

        <View>
          <FlatList
            vertical
            data={this.state.search}
            keyExtractor={item => item.name}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <AvatarUserStatus
              id={item.id}
              first_name={item.first_name}
              last_name={item.last_name}
              userFollowing={item.userFollowing[0] ? true : false}
              pic={item.profile_pic_url}/>
            )}
          />
        </View>
      </View>
    );
  }
}


export default withNavigation(Following);