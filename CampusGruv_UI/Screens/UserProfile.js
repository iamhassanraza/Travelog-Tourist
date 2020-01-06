import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderCards from '../Components/RenderCards';
import NoPosts from '../Components/NoPost'
import ContentLoader, {Rect} from 'react-content-loader/native';


class UserProfile extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      total: undefined,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      // The screen is focused
      this.fetchdata();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  fetchdata = async () => {
    console.log('calling');
    const userId = await AsyncStorage.getItem('USER_ID');
    const Token = await AsyncStorage.getItem('TOKEN');
    const response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/search/user?type=post&user_id=${userId}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const jsonresponse = await response.json();
    console.log(jsonresponse)
    this.setState({
      posts: jsonresponse.data,
      total: jsonresponse.total,
    });
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };


renderPost = () =>{
  console.log("renderpost");
  return(
    <View style={{paddingTop: 10}}>
          <RenderCards posts={this.state.posts}></RenderCards>
          </View>
  )
}

renderNoPost = () => {
  console.log("nopost");
  return(
<View style={{paddingTop:30, height:"100%"}}>
      <NoPosts></NoPosts>
      </View>
  )
}



renderLoading = () => {
  return(
    <View>
    <ContentLoader
      height={450}
      width={820}
      speed={0.2}
      height={Dimensions.get('window').height * 1}>
      <Rect x="10" y="10" rx="5" ry="5" width="185" height="220" />
      <Rect x="200" y="10" rx="5" ry="5" width="200" height="280" />
      <Rect x="10" y="240" rx="5" ry="5" width="185" height="250" />
      <Rect x="200" y="300" rx="5" ry="5" width="200" height="280" />
      {/* <Rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
              <Rect x="550" y="160" rx="5" ry="5" width="260" height="280" /> */}
    </ContentLoader>
  </View>
  )
}


  render() {
    // const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        {/* EDIT PROFILE BUTTON */}
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              this.props.navigation.navigate('EditProfile');
            }}>
            <Text
              style={{
                color: '#ACACAC',
                borderWidth: 0.5,
                padding: 5,
                borderColor: '#ACACAC',
                borderRadius: 10,
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableHighlight
            style={{
              marginLeft: 5,
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
            onPress={this._signOutAsync}>
            <Text
              style={{
                color: '#ACACAC',
                borderWidth: 0.5,
                padding: 5,
                borderColor: '#ACACAC',
                borderRadius: 10,
              }}>
              Logout
            </Text>
          </TouchableHighlight>
        </View>

        {/* IMAGE and NAME  */}
        <View style={{flexDirection: 'row', marginLeft: 5, alignItems:"center"}}>
          <Image
            source={{
              uri:
                'https://img.freepik.com/free-photo/beautiful-girl-stands-near-walll-with-leaves_8353-5378.jpg',
            }}
            style={{width: 80, height: 80, borderRadius: 50}}
          />
          <View style={{ marginLeft: 5}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#727272'}}>
              Jessica Z.
            </Text>
            <Text style={{fontSize: 13, color: '#727272'}}>
              University of Pittsurgh
            </Text>
          </View>
        </View>

        {/* FOLLORWERS */}
        <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
          <Text style={{color: '#727272', fontSize: 13, fontWeight: 'bold'}}>
            75{' '}
          </Text>
          <Text style={{color: '#B4B8BA', fontSize: 13, fontWeight: 'bold'}}>
            Posts{' '}
          </Text>
          <Text style={{color: '#727272', fontSize: 13, fontWeight: 'bold'}}>
            1204{' '}
          </Text>
          <Text style={{color: '#B4B8BA', fontSize: 13, fontWeight: 'bold'}}>
            Followers{' '}
          </Text>
          <Text style={{color: '#727272', fontSize: 13, fontWeight: 'bold'}}>
            1204{' '}
          </Text>
          <Text style={{color: '#B4B8BA', fontSize: 13, fontWeight: 'bold'}}>
            Following{' '}
          </Text>
        </View>

        {/* SEARCH AND POST */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-around',
            alignItems:"center"
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#C4C4C4',
              width: '65%',
              marginLeft: 0,
              borderRadius: 12,
              paddingTop:"2%",
              paddingLeft:"2%",
              height:"75%"
            }}>
            <Icon
              name="search"
              color="#C4C4C4"
              size={20}
              style={{}}
            />
            <TextInput
              style={{width: '100%', fontSize: 15, color: '#ACACAC', paddingTop:0}}
              placeholder="Search"
              // value={this.state.password}
              // onChangeText={password => this.setState({ password })}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: 0, marginLeft: 0, alignItems:"center", height:"70%",paddingRight:"3%",paddingLeft:"1%"}}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#0C91CF'}}>
              Posts{' '}
            </Text>
            <View
              style={{
                height: 20,
                width: 2,
                borderColor: '#B4B8BA',
                borderWidth: 1,
                backgroundColor: '#B4B8BA',
              }}
            />
            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#B4B8BA'}}>
              {' '}
              Saves
            </Text>
          </View>
        </View>

{/* {this.state.total === 0 ? <View style={{height:"70%"}}><NoPosts></NoPosts></View> : <Text>Loader</Text>}
{this.state.total > 0 ? <View style={{paddingTop: 10}}>
          <RenderCards posts={this.state.posts}></RenderCards>
        </View> : <Text>Loader>>></Text>} */}
 
{this.state.total === 0 ? this.renderNoPost() : (this.state.total > 0 ? this.renderPost() : this.renderLoading())}
      
<View style={{paddingTop: 10}}>
          <RenderCards posts={this.state.posts}></RenderCards>
          </View>
      </ScrollView>
    );
  }
}

export default UserProfile;
