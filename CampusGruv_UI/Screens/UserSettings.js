import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/SimpleLineIcons';
import i1 from '../Assets/Images/lahore.jpg';
import i2 from '../Assets/Images/book.jpg';
import i3 from '../Assets/Images/ema.jpg';
import AccPic from '../Components/MultipleAccountsPic';
import Modal from 'react-native-modal';
import CrossIcon from 'react-native-vector-icons/MaterialIcons';
import LogoutButton from '../Components/LogoutButton';
import {NavigationActions} from 'react-navigation';

export default class UserSettings extends Component {
  state = {
    isModalVisible: false,
  };

  accounts = [{pic: i1}, {pic: i2}, {pic: i3}];

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: '3%',
            marginTop: '3%',
            marginBottom: '2%',
          }}>
          <AccPic img={i1}></AccPic>
          <AccPic img={i2}></AccPic>
          <AccPic img={i3}></AccPic>

          <View style={{margin: '2%'}}>
            <IconFeather
              onPress={this.toggleModal}
              name="more-horizontal"
              size={30}
              style={{
                color: 'grey',
                borderWidth: 1,
                borderRadius: 50,
                borderColor: 'grey',
              }}></IconFeather>

            <View>
              <Modal
                style={{margin: 0}}
                isVisible={this.state.isModalVisible}
                onBackdropPress={() => this.setState({isModalVisible: false})}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 30,
                      borderTopRightRadius: 23,
                      borderTopLeftRadius: 23,
                    }}>
                    <CrossIcon
                      name="cancel"
                      onPress={() => this.setState({isModalVisible: false})}
                      style={{
                        flex: 0.65,
                        paddingLeft: 5,
                        fontSize: 20,
                        paddingTop: 4,
                        color: 'grey',
                      }}></CrossIcon>
                    <View
                      style={{flex: 10, alignItems: 'center', paddingTop: 3}}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          borderTopWidth: 2,
                          marginLeft: '-7%',
                          borderTopColor: 'grey',
                        }}>
                        Accounts
                      </Text>
                    </View>
                  </View>
                  <View style={{backgroundColor: 'white'}}>
                    <AccPic img={i1} name="Dancers of Pitt"></AccPic>
                    <AccPic img={i2} name="Kyle A."></AccPic>
                    <AccPic img={i3} name="Pitt Biology Club"></AccPic>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>

        <View>
          <View
            style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
            <Icon
              name="account-circle-outline"
              style={{
                flex: 1,
                alignSelf: 'center',
                paddingLeft: -1,
                fontSize: 35,
              }}></Icon>
            <Text
              style={{
                flex: 8,
                alignSelf: 'center',
                fontSize: 19,
                paddingLeft: '2%',
              }}>
              Account
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
            <IconFA
              name="organization"
              style={{
                flex: 1,
                alignSelf: 'center',
                paddingLeft: '2%',
                fontSize: 30,
              }}></IconFA>
            <Text
              style={{
                flex: 8,
                alignSelf: 'center',
                fontSize: 19,
              }}>
              Create Organization Account
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
            <Icon
              name="bell-outline"
              style={{
                flex: 1,
                alignSelf: 'center',
                paddingLeft: '2%',
                fontSize: 35,
              }}></Icon>
            <Text style={{flex: 8, alignSelf: 'center', fontSize: 19}}>
              Notifications
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
            <Icon
              name="help-circle-outline"
              style={{
                flex: 1,
                alignSelf: 'center',
                paddingLeft: '2%',
                fontSize: 35,
              }}></Icon>
            <Text style={{flex: 8, alignSelf: 'center', fontSize: 19}}>
              Help & Support
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', marginLeft: '2%', marginTop: '3%'}}>
            <Icon
              name="exclamation"
              style={{
                flex: 1,
                alignSelf: 'center',
                paddingLeft: '2%',
                fontSize: 35,
              }}></Icon>
            <Text style={{flex: 8, alignSelf: 'center', fontSize: 19}}>
              About
            </Text>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            height: 50,
            left: 10,
            bottom: 10,
            justifyContent: 'center',
          }}>
          <View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={async () => {
                await AsyncStorage.clear();
                this.props.screenProps.rootNavigation.navigate('Login');
                console.log('Logged Out');
              }}>
              <IconFeather
                name="log-out"
                style={{
                  paddingLeft: '2%',
                  fontSize: 30,
                }}></IconFeather>
              <Text style={{fontSize: 19, paddingLeft: 5, paddingRight: 5}}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
          {/* <LogoutButton style={{fontSize: 19, paddingLeft: 5, paddingRight: 5}}/> */}
        </View>
      </View>
    );
  }
}
