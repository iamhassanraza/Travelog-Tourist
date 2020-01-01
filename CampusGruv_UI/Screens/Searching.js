import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {ThemeBlue} from '../Assets/Colors';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import AvatarCampusStatus from '../Components/AvatarCampusStatus';
import PostList from '../Components/PostsList'
import HomeScreen from './HomeScreen';
import i1 from '../Assets/Images/lahore.jpg'
import i2 from '../Assets/Images/book.jpg'
import i3 from '../Assets/Images/ema.jpg'
import i4 from '../Assets/Images/mansehra.jpg'
import i5 from '../Assets/Images/samandarkatha.jpg'

export default class Searching extends React.PureComponent {
  state = {
    selection: 'Feed',
  };

  dataUsers = [
    {name: 'Jack Jones', follow: false, pic: i1},
    {name: 'Frenkie De Jong', follow: true , pic : i2},
    {name: 'Lucas Morra', follow: false , pic : i3},
    {name: 'Arturo Vidal', follow: false, pic: i4},
    {name: 'Lukas Modric', follow: true , pic : i5},
    {name: 'De Ligt', follow: false , pic : i3},
    {name: 'Sam Tadic', follow: false, pic: i4},
    {name: 'Sergio Busquets', follow: true , pic : i2},
    {name: 'Eden Hazzard', follow: false , pic : i5},
    {name: 'Greame Smith', follow: false, pic: i3},
    {name: 'Mark Boucher', follow: true , pic : i2},
    {name: 'Steven Gerrad', follow: false , pic : i4}
  ];

  dataCampuses = [
    {name: 'Jack Jones', current: false, pic: i1},
    {name: 'Frenkie De Jong', current: true , pic : i2},
    {name: 'Lucas Morra', current: false , pic : i3},
    {name: 'Arturo Vidal', current: false, pic: i4},
    {name: 'Lukas Modric', current: false , pic : i5},
    {name: 'De Ligt', current: false , pic : i3},
    {name: 'Sam Tadic', current: false, pic: i4},
    {name: 'Sergio Busquets', current: false , pic : i2},
    {name: 'Eden Hazzard', current: false , pic : i5},
    {name: 'Greame Smith', current: false, pic: i3},
    {name: 'Mark Boucher', current: false , pic : i2},
    {name: 'Steven Gerrad', current: false , pic : i4}
  ];

  renderFeed = () => {

    return (
      <View>
        <PostList></PostList>
      </View>
    );
  };

  renderUsers = () => {
    return (
      <View>
        <FlatList
          vertical
          data={this.dataUsers}
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <AvatarUserStatus name={item.name} status={item.follow} pic={item.pic}></AvatarUserStatus>
          )}
        />
      </View>
    );
  };

  renderCampuses = () => {
    return (
      <View>
        <FlatList
          vertical
          data={this.dataCampuses}
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <AvatarCampusStatus name={item.name} status={item.current} pic={item.pic}></AvatarCampusStatus>
          )}
        />
      </View>
    );
  };

  render() {
    console.log(this.state);
    return (
      <View>
        <View
          style={{
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            elevation: 3,
            borderColor: '#d4cfc1',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({selection: 'Feed'});
            }}>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: this.state.selection === 'Feed' ? ThemeBlue : 'grey',
                  borderBottomWidth: this.state.selection === 'Feed' ? 1 : 0,
                  borderBottomColor: ThemeBlue,
                  marginBottom: 6,
                  marginTop: 8,
                }}>
                Feed
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({selection: 'Users'});
            }}>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: this.state.selection === 'Users' ? ThemeBlue : 'grey',
                  borderBottomWidth: this.state.selection === 'Users' ? 1 : 0,
                  borderBottomColor: ThemeBlue,
                  marginBottom: 6,
                  marginTop: 8,
                }}>
                Users
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({selection: 'Campuses'});
            }}>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color:
                    this.state.selection === 'Campuses' ? ThemeBlue : 'grey',
                  borderBottomWidth:
                    this.state.selection === 'Campuses' ? 1 : 0,
                  borderBottomColor: ThemeBlue,
                  marginBottom: 6,
                  marginTop: 8,
                }}>
                Campuses
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {this.state.selection === 'Feed' ? this.renderFeed() : null}
          {this.state.selection === 'Users' ? this.renderUsers() : null}
          {this.state.selection === 'Campuses' ? this.renderCampuses() : null}
        </ScrollView>
      </View>
    );
  }
}