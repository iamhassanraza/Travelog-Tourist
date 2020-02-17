import React, {Component} from 'react';
import {Text, View, Image, AsyncStorage} from 'react-native';
import {ThemeBlue} from '../Assets/Colors';
import {withNavigation} from 'react-navigation'
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';

class AvatarUserStatus extends Component {
  state = {
    followed: this.props.userFollowing,

  };

  followButton = async () => {
    console.log('id -------------->',this.props.id)
    this.setState(prevState => ({
      followed: !prevState.followed,
    }));
    const Token = await AsyncStorage.getItem('TOKEN');
    const userId = await AsyncStorage.getItem('USER_ID');
    const id = this.props.id
    var Response = null
    console.log('followed ==========> ',this.state.followed,id)
    if(this.state.followed) {
      Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/user/follow?user_id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
    }
    else {
      Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/user/unfollow?user_id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
    }
    const JsonResponse = await Response.json();
    if(parseInt(Response.status) === 400) {
      console.log('400')
      alert(JsonResponse.message);
    }
    else if (parseInt(Response.status) === 200){
      console.log('200',JsonResponse)
      alert(JsonResponse.message);
    }
    else {
      alert('something is wrong')
    }
  }


  render() {
    //console.log(this.props.userFollowing,'this.props')
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '1%'
            // paddingBottom: '2%',
            // paddingTop: '2%',
            // paddingLeft: '2%',
            // paddingRight: '2%',
        }}
      >
        <View style={{flex: 4}}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.push('UserProfile', {
                userNavId: this.props.id,
                userNavDp: this.props.pic,
                userNavFirstName: this.props.first_name,
                userNavLastName: this.props.last_name,
                userCampus: this.props.campus,
                userFollowing:this.state.followed
            })}>
            <View style={{flexDirection: 'row', padding: '1%'}}>
              <Image
                source={{uri : this.props.pic}}
                style={{height: 40, width: 40, borderRadius: 50}}>
              </Image>
              <Text style={{ fontSize: 18,alignSelf: 'center', fontWeight: 'bold', color: 'grey', paddingLeft:"2%"}}>
                {this.props.first_name + ' ' + this.props.last_name }
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableOpacity
          onPress={() => {
            //this.setState({follow: !this.state.follow});
            this.followButton()
          }}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              flexDirection: 'row',
              height: 27,
              width: 62,
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderColor: this.state.followed ? 'black' : 'grey',
            }}>
            <Text
              style={{
                color: this.state.followed ? 'black' : 'grey',
                fontSize: 12,
              }}>
              {this.state.followed ? 'Following' : 'Follow'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      // </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(AvatarUserStatus)
