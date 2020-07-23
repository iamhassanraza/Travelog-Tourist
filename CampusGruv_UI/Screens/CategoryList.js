import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Category from '../Components/CategoryComp';
import {withNavigation} from 'react-navigation';
import Logo from '../Assets/Images/logo.png';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import PeopleIcon from 'react-native-vector-icons/FontAwesome5';

export default class CategoryList extends Component {
  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header: (
        <View>
          {Platform.OS == 'ios' ? (
            <View style={{backgroundColor: '#0C91CF'}}>
              <View
                style={{
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
                    left: 8,
                  }}>
                  <BackIcon
                    name="ios-arrow-back"
                    onPress={() => props.navigation.goBack()}
                    style={{
                      marginRight: 8,
                      fontSize: 28,
                      color: 'white',
                      paddingLeft: 3,
                      paddingRight: 3,
                    }}
                  />
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    Categories
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    padding: 2,
                    alignSelf: 'center',
                    right: 8,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('HomeScreen');
                    }}>
                    <Text style={{color: 'white', padding: 2, fontSize: 16}}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={{backgroundColor: '#0C91CF'}}>
              <View
                style={{
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
                    left: 8,
                  }}>
                  <BackIcon
                    name="ios-arrow-back"
                    onPress={() => props.navigation.goBack()}
                    style={{
                      marginRight: 8,
                      fontSize: 28,
                      color: 'white',
                      paddingLeft: 3,
                      paddingRight: 3,
                    }}
                  />
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                    Categories
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    padding: 2,
                    alignSelf: 'center',
                    right: 8,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('HomeScreen');
                    }}>
                    <Text style={{color: 'white', padding: 2, fontSize: 16}}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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
      this.props.navigation.navigate('CategoryPosts', {
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
    fetch(`${require('../config').default.production}api/v1/post/categories`, {
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
      <>
        <View style={{flex: 1, backgroundColor: '#f9fdfe'}}>
          {this.state.loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator
                color="#0C91CF"
                size={50}
                style={{marginBottom: '5%'}}
              />
              <Text>Loading Categories</Text>
            </View>
          ) : (
            <FlatList
              style={{paddingHorizontal: 10, paddingVertical: 10}}
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
                  />
                );
              }}
            />
          )}
        </View>
      </>
    );
  }
}
