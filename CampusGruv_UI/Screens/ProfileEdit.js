import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import InputView from '../Components/ProfileEdit/InputViews';
import ImagePicker from 'react-native-image-picker';
import {Container, Item, Picker, Content, Input} from 'native-base';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';
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
import FastImage from 'react-native-fast-image';
import {ThemeBlue} from '../Assets/Colors';

const {width, height} = Dimensions.get('window');

//cam_id === 'nahi_hai'
class ProfilePage extends React.Component {
  static navigationOptions = props => {
    tabBarVisibile = false;
    const {params = {}} = props.navigation.state;
    return {
      header:
        params.cam_id === 'nahi_hai' ? (
          <View
            style={{
              height: Dimensions.get('window').height > 800 ? 50 : 50,
              marginTop: Dimensions.get('window').height > 800 ? 50 : 0,
              borderColor: 'red',
              backgroundColor: '#0C91CF',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Edit profile
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                padding: 2,
                alignSelf: 'center',
                right: 8,
              }}>
              <TouchableOpacity onPress={() => params.handleThis()}>
                <Text
                  style={{
                    color: 'white',
                    padding: 2,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
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
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('UserProfile');
                }}>
                <Text
                  style={{
                    color: 'white',
                    padding: 2,
                  }}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Edit profile
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                padding: 2,
                alignSelf: 'center',
                right: 8,
              }}>
              <TouchableOpacity onPress={() => params.handleThis()}>
                <Text
                  style={{
                    color: 'white',
                    padding: 2,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ),
    };
  };

  componentDidMount = async () => {
    this.setState({
      dob: !this.props.User.dob ? '' : this.props.User.dob.split('T')[0],
    });
    this.setState({major: this.props.User?.major});
    this.setState({website: this.props.User?.website});
    this.setState({bio: this.props.User?.bio});
    this.setState({name: this.props.User.first_name});
    // this.setState({last_name: this.props.User.last_name});
    this.setState({phone: this.props.User.contact_no});
    this.setState({gradutationYear: this.props.User.graduate_year});

    const Token = await AsyncStorage.getItem('TOKEN');
    const campusId = await AsyncStorage.getItem('CAMPUS_ID');
    await this.setState({currentCampus: campusId});
    fetch(`${require('../config').default.production}api/v1/fetch/campuses`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then(res => res.json())
      .then(async res => {
        //console.log(campusId)
        // const campuses = [this.state.campuses,...res]
        if (campusId === 'nahi_hai') {
          const cam = [...[{description: 'select city'}], ...res];
          //console.log('no campus')
          this.setState({
            campuses: cam,
          });
        } else {
          await res.filter(campus => {
            if (campus.id === parseInt(campusId)) {
              const allcampuses = res.filter(
                campus => campus.id !== parseInt(campusId),
              );
              const cam = [...[campus], ...allcampuses];
              console.log(campus, 'campus');
              this.setState({
                selectedId: campus.id,
                campuses: cam,
              });
            } else {
              return null;
            }
          });
        }
      })
      .catch(err => console.log('error is', err));

    this.props.navigation.setParams({
      handleThis: () => {
        if (this.state.selectedId) {
          this.UpdateProfile();
        } else alert('no campus selected');
      },
      cam_id: this.state.currentCampus,
    });
  };

  state = {
    //resta: [],
    imageUri: '',
    campuses: [],
    currentCampus: {},
    selectedCampus: null,
    selectedId: null,
    text: 'hello',
    major: '',
    dob: '',
    phone: '',
    gradutationYear: '',
    name: '',
    last_name: '',
    focused: false,
    Spinner: false,
  };

  uploadProfilePicture = () => {
    ImagePicker.showImagePicker(
      {
        maxWidth: 500,
        maxHeight: 500,
        allowsEditing: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
          cameraRoll: true,
          waitUntilSaved: true,
        },
      },
      response => {
        if (response.didCancel) {
          console.log('cancelled');
        } else if (response.error) {
          console.log('error is:', response.error);
        } else {
          const source = {uri: response.uri};
          const fileTypes = /jpeg|jpg|png|gif/;
          const allowedImgSize = 1024 * 1024 * 5;
          if (!fileTypes.test(response.type)) {
            alert(
              'Uploaded file is not a valid image. \n(allowed file types: jpeg, jpg, png, gif)',
            );
          } else if (response.fileSize > allowedImgSize) {
            alert('Uploaded file is too large \n(allowed file size is 10MB)');
          } else {
            if (
              typeof response.fileName === 'undefined' ||
              response.fileName === null
            ) {
              // on iOS, using camera returns undefined fileName and camera roll returns  null. This fixes that issue, so API can work.
              var getFilename = response.uri.split('/');
              imgName = getFilename[getFilename.length - 1];
              console.log(response, 'uri uri');
              this.setState({
                imageName: imgName,
                imageUri: response,
                imageURL: response.uri,
              });
            } else {
              this.setState({
                imageName: response.fileName,
                imageUri: response,
                imageURL: response.uri,
              });
            }
          }
        }
      },
    );
  };

  createFormData = (images, body) => {
    const data = new FormData();
    if (this.state.imageUri !== '') {
      data.append('profile_pic', {
        // name: images.fileName,
        name: this.state.imageName,
        type: images.type,
        uri:
          Platform.OS === 'android'
            ? images.uri
            : images.uri.replace('file://', ''),
      });
    }

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  UpdateProfile = async () => {
    console.log('state', this.state.bio, this.state.website);
    this.setState({Spinner: true});
    const Token = await AsyncStorage.getItem('TOKEN');
    let response = null;
    //const Campusid = await AsyncStorage.getItem('CAMPUS_ID');
    if (this.props.User.account_type_id === 2) {
      response = await fetch(
        `${require('../config').default.production}api/v1/edit/profile`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Token}`,
          },
          body: this.createFormData(this.state.imageUri, {
            campus_id: this.state.selectedId,
            // dob: this.state.dob,
            bio: this.state.bio,
            website: this.state.website,
            major: this.state.major,
            first_name: this.state.name,
            // last_name: this.state.last_name,
            contact_no: this.state.phone,
            // graduate_year: this.state.gradutationYear,
          }),
        },
      );
    } else {
      alert('update ord profile');
    }

    const postMasterResponse = await response.json();
    console.log('post postMasterResponse', postMasterResponse);
    this.setState({Spinner: false});
    this.props.CreateUserDetails(postMasterResponse);
    this.setState({imageUri: ''});
    await AsyncStorage.setItem('CAMPUS_ID', this.state.selectedId.toString());
    const campusId = await AsyncStorage.getItem('CAMPUS_ID');
    console.log('campussssss', campusId);
    //his.props.navigation.navigate('HomeScreen')
    this.state.currentCampus === 'nahi_hai'
      ? this.props.navigation.navigate('AuthLoading')
      : this.props.navigation.navigate('UserProfile');

    console.log(postMasterResponse, 'patch request');
  };

  renderDatePicker = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 15,
            marginLeft: 10,
            width: width / 3.1,
          }}>
          Birthday
        </Text>

        <DatePicker
          style={{
            width: width / 1.54,
          }}
          date={this.state.date}
          mode="date"
          placeholder={this.state.dob ? this.state.dob : 'Select Date'}
          format="YYYY-MM-DD"
          minDate="1950-01-01"
          maxDate="2010-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'relative',

              right: 0,
              top: 4,
            },
            placeholderText: {
              fontSize: 20,
              color: 'black',
              marginBottom: -10,
            },
            dateInput: {
              alignItems: 'flex-start',
              marginLeft: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
              borderBottomColor: '#C4C4C4',
              borderBottomWidth: 0.5,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({dob: date});
          }}
        />
      </View>
    );
  };

  renderPhoneNo = () => {
    return (
      <View style={{}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Text
            style={{
              fontSize: 20,
              marginTop: 15,
              marginLeft: 10,
              width: width / 3.1,
            }}>
            Phone
          </Text>
          <TextInput
            onFocus={() => {
              this.setState({focused: true});
            }}
            onBlur={() => {
              this.setState({focused: false});
            }}
            keyboardType="numeric"
            style={{
              width: width / 1.8,
              borderBottomColor: '#C4C4C4',
              paddingBottom: 1,
              marginTop: 15,

              borderBottomWidth: 0.5,
              fontSize: 20,
            }}
            value={this.state.phone}
            placeholder="XXX-XXX-XXXXX"
            onChangeText={text => this.setState({phone: text})}
          />
          <Icon
            name="pencil"
            color={this.state.focused ? '#0C91CF' : '#C4C4C4'}
            size={26}
            style={{width: width / 10, marginTop: 15}}
          />
        </View>
      </View>
    );
  };

  renderGradYear = () => {
    return (
      <View style={{}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Text
            style={{
              fontSize: 20,
              marginTop: 15,
              marginLeft: 10,
              width: width / 3.1,
            }}>
            Grad Year
          </Text>
          <TextInput
            onFocus={() => {
              this.setState({focused: true});
            }}
            onBlur={() => {
              this.setState({focused: false});
            }}
            keyboardType="numeric"
            style={{
              width: width / 1.8,
              borderBottomColor: '#C4C4C4',
              paddingBottom: 1,
              marginTop: 15,
              borderBottomWidth: 0.5,
              fontSize: 20,
            }}
            placeholder="2020"
            placeholderTextColor="black"
            value={this.state.gradutationYear}
            onChangeText={text => this.setState({gradutationYear: text})}
          />
          <Icon
            name="pencil"
            color="#C4C4C4"
            size={26}
            style={{width: width / 10, marginTop: 15}}
          />
        </View>
      </View>
    );
  };

  render() {
    let pickerItems = this.state.campuses[0]
      ? this.state.campuses.map((s, i) => {
          // if (s.id !== this.state.selectedId)
          return <Picker.Item key={i} value={s.id} label={s.description} />;
        })
      : null;

    return (
      <>
        {Platform.OS === 'ios' && getStatusBarHeight() > 800 ? (
          // <View
          //   style={{
          //     height: getStatusBarHeight(),
          //     backgroundColor: ThemeBlue,
          //   }}>
          <StatusBar />
        ) : // </View>
        null}
        {/* <Container> */}
        {/* <SafeAreaView style={{flex: 1, borderWidth: 1}}> */}
        <Spinner
          visible={this.state.Spinner}
          textStyle={{color: ThemeBlue}}
          customIndicator={<UIActivityIndicator color={ThemeBlue} />}
        />
        <Content>
          {/* EDIT PROFILE IMAGE */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <FastImage
              source={{
                uri:
                  this.state.imageUri !== ''
                    ? this.state.imageUri.uri
                    : this.props.User.profile_pic_url,
              }}
              style={{
                width: 120,
                height: 120,
                borderColor: 'grey',
                borderWidth: 0.9,
                borderRadius: 80,
              }}
            />
          </View>
          <TouchableOpacity onPress={this.uploadProfilePicture}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{color: '#0C91CF', fontWeight: 'bold', fontSize: 20}}>
                Change Profile Picture
              </Text>
            </View>
          </TouchableOpacity>

          {/* OPTIONS */}

          <View
            style={{
              borderTopColor: '#C4C4C4',
              borderTopWidth: 0.5,
              paddingBottom: 40,
              backgroundColor: '#f9fdfe',
              marginTop: Dimensions.get('window').height > 800 ? 50 : 20,
            }}>
            <InputView
              name="Name"
              ph="edit name"
              value={this.state.name}
              changestate={text => {
                this.setState({name: text});
              }}
            />
            {/* <InputView
              name="Last name"
              ph="Edit last name"
              value={this.state.last_name}
              changestate={text => {
                this.setState({last_name: text});
              }}
            /> */}
            {/* <InputView name='Campus' ph='University of Pittsburgh'/> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 15,
                  marginLeft: 10,
                  width: width / 3.1,
                }}>
                City
              </Text>
              <View
                style={{
                  width: width / 1.8,
                  marginTop: 5,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#C4C4C4',
                }}>
                <Picker
                  textStyle={{fontSize: 20, paddingLeft: 0}}
                  style={{
                    height: 40,
                    marginBottom: -5,
                  }}
                  selectedValue={this.state.selectedId}
                  onValueChange={itemValue => {
                    if (itemValue !== 'select campus') {
                      this.setState({
                        selectedId: itemValue,
                      });
                    }
                  }}>
                  {pickerItems}
                </Picker>
              </View>
              <Icon
                name="pencil"
                color="#C4C4C4"
                size={26}
                style={{width: width / 10, marginTop: 15}}
              />
            </View>
            <InputView
              multiline={true}
              name="Bio"
              ph="enter bio"
              value={this.state.bio}
              changestate={text => {
                this.setState({bio: text});
              }}
            />
            <InputView
              multiline={true}
              name="Website"
              ph="enter your website"
              value={this.state.website}
              changestate={text => {
                this.setState({website: text});
              }}
            />
            <InputView
              name="Address"
              ph="Address"
              value={this.state.major}
              changestate={text => {
                this.setState({major: text});
              }}
            />
            {/* <InputView name='Birth Date' ph='MM/DD/YY' changestate={(text)=>{this.setState({dob:text})}} /> */}
            {/* {this.renderDatePicker()} */}
            {this.renderPhoneNo()}
            {/* <InputView name='Phone' ph='XXX-XXXXX-XXXX' changestate={(text)=>{this.setState({phone:text})}} /> */}
            {/* <InputView
              name="Grad Year"
              ph="2019"
              changestate={text => {
                this.setState({gradutationYear: text});
              }}
            /> */}

            {/* {this.renderGradYear()} */}
          </View>
        </Content>
        {/* </SafeAreaView> */}
        {/* </Container> */}
      </>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  {CreateUserDetails},
)(ProfilePage);
