import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,Platform
} from 'react-native';
import Category from '../Components/CategoryComp';
import {withNavigation} from 'react-navigation';
import Logo from '../Assets/Images/logo.png';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import PeopleIcon from 'react-native-vector-icons/FontAwesome5';

export default class CategoryList extends Component {
  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header: (
        <View>

        {
          Platform.OS =='ios' ?
          <View
          style={{
            height: 80,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#1192d1',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 10,marginTop:30}}>
            <View
              style={{
                marginLeft: '2%',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Searching')}>
                <View
                  style={{
                    height: 30,
                    padding: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                    backgroundColor: '#F0F0F0',
                    borderRadius: 10,
                  }}>
                  <View style={{marginLeft: '2%'}}>
                    <Icon name="search" color="#1192d1" size={20} />
                  </View>
                  <View style={{height: 20}}>
                    <Image
                      source={Logo}
                      style={{
                        width: 150,
                        alignSelf: 'flex-start',
                        height: '100%',
                      }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: '2%'}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('CategoryList')}>
                <Icon2 name="view-grid" color="white" size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1,marginTop:30}}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('FollowersPosts')
              }>
              <PeopleIcon name="users" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
          :
          <View
          style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#1192d1',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 10}}>
            <View
              style={{
                marginLeft: '2%',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Searching')}>
                <View
                  style={{
                    height: 30,
                    padding: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                    backgroundColor: '#F0F0F0',
                    borderRadius: 10,
                  }}>
                  <View style={{marginLeft: '2%'}}>
                    <Icon name="search" color="#1192d1" size={20} />
                  </View>
                  <View style={{height: 20}}>
                    <Image
                      source={Logo}
                      style={{
                        width: 150,
                        alignSelf: 'flex-start',
                        height: '100%',
                      }}
                      resizeMode="contain"
                      />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: '2%'}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('CategoryList')}>
                <Icon2 name="view-grid" color="white" size={25} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('FollowersPosts')
              }>
              <PeopleIcon name="users" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      }
      </View>
        ),
    };
  };

  state = {
    Data: undefined,
    Category_id: undefined,
    CategoryName: '',
    loading: false,
  };

  selectCategory = cat => {
    this.setState({Category_id: cat}, () => {
      this.props.navigation.navigate('HomeScreen', {
        CategoryID: this.state.Category_id,
        CategoryName: this.state.CategoryName,
      });
    });
  };

  // move = (cat_id,cat_name) =>{

  // }

  componentDidMount = async () => {
    this.setState({loading: true});
    const Token = await AsyncStorage.getItem('TOKEN');
    fetch('https://campus-gruv-heroku.herokuapp.com/api/v1/post/categories', {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('response==========>', responseJson);
        this.setState({Data: responseJson, loading: false});
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    // console.log(this.state.Category_id);
    return (
      <View style={{flex: 1}}>
        {this.state.loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              color="#1192d1"
              size={50}
              style={{marginBottom: '5%'}}></ActivityIndicator>
            <Text>Loading Categories</Text>
          </View>
        ) : (
          <FlatList
            style={{margin: 10}}
            numColumns={2}
            data={this.state.Data}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              console.log(item.id);
              return (
                <Category
                  description={item.description}
                  color={item.rgba_colors}
                  image={item.category_image}
                  cat_id={item.id}
                  onSelect1={this.selectCategory}
                  // onSelect2={this.move}
                />
              );
            }}
          />
        )}
      </View>
    );
  }
}
