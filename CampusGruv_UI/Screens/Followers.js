import React, {Component} from 'react';
import {Text, View, FlatList, TextInput} from 'react-native';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import Icon from 'react-native-vector-icons/Octicons';
import i1 from '../Assets/Images/lahore.jpg';
import i2 from '../Assets/Images/book.jpg';
import i3 from '../Assets/Images/ema.jpg';
import i4 from '../Assets/Images/mansehra.jpg';
import i5 from '../Assets/Images/samandarkatha.jpg';

export default class Followers extends Component {
  state = {
    search: '',
  };

  DATA = [
    {name: 'Jack Jones', follow: false, pic: i1},
    {name: 'Frenkie De Jong', follow: true, pic: i2},
    {name: 'Lucas Morra', follow: false, pic: i3},
    {name: 'Arturo Vidal', follow: false, pic: i4},
    {name: 'Lukas Modric', follow: true, pic: i5},
    {name: 'De Ligt', follow: false, pic: i3},
    {name: 'Sam Tadic', follow: false, pic: i4},
    {name: 'Sergio Busquets', follow: true, pic: i2},
    {name: 'Eden Hazzard', follow: false, pic: i5},
    {name: 'Greame Smith', follow: false, pic: i3},
    {name: 'Mark Boucher', follow: true, pic: i2},
    {name: 'Steven Gerrad', follow: false, pic: i4},
  ];

  render() {
    console.log(this.state.search);

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
            data={this.DATA}
            keyExtractor={item => item.name}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <AvatarUserStatus
                name={item.name}
                status={item.follow}
                pic={item.pic}></AvatarUserStatus>
            )}
          />
        </View>
      </View>
    );
  }
}