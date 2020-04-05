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
import ContentLoader, {Rect} from 'react-content-loader/native';
import NewMessageComponent from '../Components/NewMessageComponent';

export default class SelectNewChat extends Component {
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
      `https://campus-gruv-heroku.herokuapp.com/api/v1/search/user?type=user&description=${text}&page=1`,
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
        <Content>
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
                renderItem={({item}) => (
                  <NewMessageComponent
                    id={item.id}
                    profile_pic_url={item.profile_pic_url}
                    first_name={item.first_name}
                    last_name={item.last_name}
                    navigationProps={this.props.navigation}
                  />
                )}
              />
            </ScrollView>
          ) : (
            <View>
              <ContentLoader
                height={450}
                speed={0.2}
                height={Dimensions.get('window').height * 1}>
                <Rect x="10" y="10" rx="5" ry="5" width="85%" height="45" />
                <Rect x="10" y="60" rx="5" ry="5" width="85%" height="45" />
                <Rect x="10" y="110" rx="5" ry="5" width="85%" height="45" />
                <Rect x="10" y="160" rx="5" ry="5" width="85%" height="45" />
                <Rect x="10" y="210" rx="5" ry="5" width="85%" height="45" />
                <Rect x="10" y="260" rx="5" ry="5" width="85%" height="45" />
                <Rect x="10" y="310" rx="5" ry="5" width="85%" height="45" />
                <Rect x="10" y="360" rx="5" ry="5" width="85%" height="45" />
                {/* <Rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
                    <Rect x="550" y="160" rx="5" ry="5" width="260" height="280" /> */}
              </ContentLoader>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}
