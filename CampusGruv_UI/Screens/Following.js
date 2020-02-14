import React, {Component} from 'react';
import {Text, View, FlatList, TextInput, TouchableOpacity,Platform,
  AsyncStorage,
  TouchableHighlightBase,} from 'react-native';
import {withNavigation} from 'react-navigation'
import AvatarUserStatus from '../Components/AvatarUserStatus';
import Icon from 'react-native-vector-icons/Octicons';
import i1 from '../Assets/Images/lahore.jpg'
import i2 from '../Assets/Images/book.jpg'
import i3 from '../Assets/Images/ema.jpg'
import i4 from '../Assets/Images/mansehra.jpg'
import i5 from '../Assets/Images/samandarkatha.jpg'
import SearchInput, { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['name', 'subject'];

class Following extends Component {

    state ={
        search :null,
    }


  DATA = [
    {name: 'Jack Jones', follow: true, pic: i1},
    {name: 'Frenkie De Jong', follow: true , pic : i2},
    {name: 'Lucas Morra', follow: true , pic : i3},
    {name: 'Arturo Vidal', follow: true, pic: i4},
    {name: 'Lukas Modric', follow: true , pic : i5},
    {name: 'De Ligt', follow: true , pic : i3},
    {name: 'Sam Tadic', follow: true, pic: i4},
    {name: 'Sergio Busquets', follow: true , pic : i2},
    {name: 'Eden Hazzard', follow: true , pic : i5},
    {name: 'Greame Smith', follow: true, pic: i3},
    {name: 'Mark Boucher', follow: true , pic : i2},
    {name: 'Steven Gerrad', follow: true , pic : i4}
  ];

  componentDidMount() {
    navId = this.props.navigation.getParam('postUserId', null)
    this.getFollowing();
    console.log('asdasdsa');
  }

  getFollowing = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    const user_id = await AsyncStorage.getItem('USER_ID');
    const Response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/getfollowings?user_id=${navId}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    //   console.log('response',JsonResponse,'JsonResponse',Response,'JsonResponse',Response.json())
    this.setState({
      search: JsonResponse.data,
    });
  };


  render() {

    console.log(this.state.search,"this.props.postUserId",navId);

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
              first_name={item.first_name+ " " + item.last_name}
              userFollowing={item.userFollowing[0] ? true : false}
              pic={item.profile_pic_url}></AvatarUserStatus>
            )}
          />
        </View>
      </View>
    );
  }
}


export default withNavigation(Following);