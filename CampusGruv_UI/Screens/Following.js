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
  StyleSheet,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import Icon from 'react-native-vector-icons/Ionicons';
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
import {ThemeBlue} from '../Assets/Colors';
import {connect} from 'react-redux';

import SearchInput, {createFilter} from 'react-native-search-filter';
import SearchIcon from 'react-native-vector-icons/Feather';

const KEYS_TO_FILTERS = ['id', 'first_name', 'last_name'];

class Following extends Component {
  searchUpdated(term) {
    this.setState({searchTerm: term});
  }

  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header:
        Platform.OS === 'ios' ? (
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
                  <Icon name="ios-arrow-back" color="white" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
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
                <Icon name="ios-arrow-back" color="white" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        ),
    };
  };

  state = {
    search: [],
    loading: true,
    searchTerm: '',
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
    const Response = await fetch(
      `${
        require('../config').default.production
      }api/v1/following/users?user_id=${navId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();

    this.setState({
      search: JsonResponse,
      loading: false,
    });
  };

  renderNoPost = text => {
    return (
      <View style={{paddingTop: '35%'}}>
        <NoPost name={text} />
      </View>
    );
  };

  render() {
    const filtereddata = this.state.search.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS),
    );
    return this.state.loading ? (
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <BarIndicator count={4} color={ThemeBlue} />
      </View>
    ) : this.state.search.length ? (
      <View style={{flex: 1, backgroundColor: '#f9fdfe'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: '20%',
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
              this.searchUpdated(term);
            }}
            style={styles.searchInput}
            placeholder="Search"
          />
        </View>
        <View style={{padding: 5}}>
          <FlatList
            vertical
            data={filtereddata}
            keyExtractor={item => item.name}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <AvatarUserStatus
                id={item.id}
                first_name={item.first_name}
                last_name={item.last_name}
                userFollowing={item.userFollowing[0] ? true : false}
                pic={item.profile_pic_url}
              />
            )}
          />
        </View>
      </View>
    ) : (
      <View>{this.renderNoPost('Not Following Anyone')}</View>
    );
  }
}
mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default withNavigation(
  connect(
    mapStateToProps,
    null,
  )(Following),
);

const styles = StyleSheet.create({
  searchInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    marginLeft: 5,
    paddingBottom: 0,
    width: 250,
    color: '#C4C4C4',
  },
});
