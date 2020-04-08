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
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView,
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

//cam_id === 'nahi_hai'
class ProfilePage extends React.Component {
  static navigationOptions = (props) => {
    tabBarVisibile = false;
    const {params = {}} = props.navigation.state;
    return {
      header:
        params.cam_id === 'nahi_hai' ? (
          <View
            style={{
              height: Platform.OS == 'ios' ? 80 : 50,
              backgroundColor: '#1192d1',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {/* <View style={{position: 'absolute', padding:2, alignSelf: 'center', left: 8}}>
                <TouchableOpacity 
                    // onPress = {() => {
                    //     props.navigation.navigate("UserProfile");
                    // }}
                >
                    <Text style={{color: 'white', padding: 2}}>
                        back
                    </Text>
                </TouchableOpacity>
            </View> */}
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: Platform.OS == 'ios' ? 25 : 0,
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
                    marginTop: Platform.OS == 'ios' ? 25 : 0,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              height: Platform.OS == 'ios' ? 80 : 50,
              backgroundColor: '#1192d1',
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
                    marginTop: Platform.OS == 'ios' ? 25 : 0,
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
                  marginTop: Platform.OS == 'ios' ? 25 : 0,
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
                    marginTop: Platform.OS == 'ios' ? 25 : 0,
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
      dob:
        this.props.User.dob === null ? '' : this.props.User.dob.split('T')[0],
    });
    this.setState({major: this.props.User.major});
    this.setState({name: this.props.User.first_name});
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
      .then((res) => res.json())
      .then(async (res) => {
        //console.log(campusId)
        // const campuses = [this.state.campuses,...res]
        if (campusId === 'nahi_hai') {
          const cam = [...[{description: 'select campus'}], ...res];
          //console.log('no campus')
          this.setState({
            campuses: cam,
          });
        } else {
          await res.filter((campus) => {
            if (campus.id === parseInt(campusId)) {
              const cam = [...[campus], ...res];
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
      .catch((err) => console.log('error is', err));

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
    focused: false,
    Spinner: false,
  };

  uploadProfilePicture = () => {
    ImagePicker.showImagePicker(
      {
        maxWidth: 1000,
        maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
          cameraRoll: true,
          waitUntilSaved: true,
        },
      },
      (response) => {
        if (response.didCancel) {
          console.log('cancelled');
        } else if (response.error) {
          console.log('error is:', response.error);
        } else {
          const source = {uri: response.uri};
          const fileTypes = /jpeg|jpg|png|gif/;
          const allowedImgSize = 1024 * 1024 * 10;
          if (!fileTypes.test(response.type)) {
            alert(
              'Uploaded file is not a valid image. \n(allowed file types: jpeg, jpg, png, gif)',
            );
          } else if (response.fileSize > allowedImgSize) {
            alert('Uploaded file is too large \n(allowed file size is 10MB)');
          } else {
            console.log(response, 'uri uri');
            this.setState({
              imageUri: response,
              imageURL: response.uri,
            });
          }
        }
      },
    );
  };

  createFormData = (images, body) => {
    const data = new FormData();
    if (this.state.imageUri !== '') {
      data.append('profile_pic', {
        name: images.fileName,
        type: images.type,
        uri:
          Platform.OS === 'android'
            ? images.uri
            : images.uri.replace('file://', ''),
      });
    }

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  UpdateProfile = async () => {
    this.setState({Spinner: true});
    const Token = await AsyncStorage.getItem('TOKEN');
    //const Campusid = await AsyncStorage.getItem('CAMPUS_ID');

    let response = await fetch(
      `${require('../config').default.production}api/v1/edit/profile`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Token}`,
        },
        body: this.createFormData(this.state.imageUri, {
          campus_id: this.state.selectedId,
          dob: this.state.dob,
          major: this.state.major,
          first_name: this.state.name,
          contact_no: this.state.phone,
          graduate_year: this.state.gradutationYear,
        }),
      },
    );

    const postMasterResponse = await response.json();
    this.setState({Spinner: false});
    this.props.CreateUserDetails(postMasterResponse);
    this.setState({imageUri: ''});
    await AsyncStorage.setItem('CAMPUS_ID', this.state.selectedId.toString());
    const campusId=await AsyncStorage.getItem('CAMPUS_ID');
    console.log('campussssss',campusId)
    //his.props.navigation.navigate('HomeScreen')
    this.state.currentCampus === 'nahi_hai'? this.props.navigation.navigate('AuthLoading') : this.props.navigation.navigate('HomeScreen');
    // AsyncStorage.getItem('CAMPUS_ID') === 'nahi_hai'
      // ? this.props.navigation.navigate('App')
      // : this.props.navigation.navigate('HomeScreen');
    console.log(postMasterResponse, 'patch request');
  };

  renderDatePicker = () => {
    return (
      <View style={{flexDirection: 'row', marginTop: '5%'}}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 15,
            marginLeft: 10,
            width: '25%',
            marginRight: '0.5%',
          }}>
          Birthday
        </Text>

        <DatePicker
          style={{
            width: '70%',
            color: '#ACACAC',
            justifyContent: 'center',
            alignSelf: 'center',
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
            dateInput: {
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
              borderBottomColor: '#C4C4C4',
              borderBottomWidth: 0.5,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            this.setState({dob: date});
          }}
        />
      </View>
    );
  };

  renderPhoneNo = () => {
    return (
      <View style={{marginTop: '5%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text
            style={{fontSize: 20, marginTop: 15, marginLeft: 10, width: '25%'}}>
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
              width: '60%',
              borderBottomColor: '#C4C4C4',
              borderBottomWidth: 0.5,
              fontSize: 20,
              color: '#ACACAC',
            }}
            value={this.state.phone}
            placeholder="XXX-XXX-XXXXX"
            onChangeText={(text) => this.setState({phone: text})}
          />
          <Icon
            name="pencil"
            color={this.state.focused ? '#1192d1' : '#C4C4C4'}
            size={26}
            style={{width: '10%', marginTop: 15}}
          />
        </View>
      </View>
    );
  };

  renderGradYear = () => {
    return (
      <View style={{marginTop: '5%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text
            style={{fontSize: 20, marginTop: 15, marginLeft: 10, width: '25%'}}>
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
              width: '60%',
              borderBottomColor: '#C4C4C4',
              borderBottomWidth: 0.5,
              fontSize: 20,
              color: '#ACACAC',
            }}
            placeholder="2020"
            value={this.state.gradutationYear}
            onChangeText={(text) => this.setState({gradutationYear: text})}
          />
          <Icon
            name="pencil"
            color={this.state.focused ? '#1192d1' : '#C4C4C4'}
            size={26}
            style={{width: '10%', marginTop: 15}}
          />
        </View>
      </View>
    );
  };

  render() {
    let pickerItems = this.state.campuses[0]
      ? this.state.campuses.map((s, i) => {
          return <Picker.Item key={i} value={s.id} label={s.description} />;
        })
      : null;

    // console.log(this.state.imageUri,'==================major============')
    //const { navigate } = this.props.navigation;
    return (
      <Container>
        <Spinner
          visible={this.state.Spinner}
          textContent={'Uploading...'}
          textStyle={{color: 'black'}}
          customIndicator={<BarIndicator count={5} />}
        />
        <ScrollView>
          {/* EDIT PROFILE IMAGE */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Image
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

          <View style={{borderBottomColor: '#C4C4C4', marginTop: 10}}>
            <InputView
              name="Name"
              ph="Enter name"
              value={this.state.name}
              changestate={(text) => {
                this.setState({name: text});
              }}
            />
            {/* <InputView name='Campus' ph='University of Pittsburgh'/> */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 15,
                  marginLeft: 10,
                  width: '25%',
                }}>
                Campus
              </Text>
              <View
                style={{
                  width: '60%',
                  marginTop: 5,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#C4C4C4',
                }}>
                <Picker
                  selectedValue={this.state.selectedId}
                  onValueChange={(itemValue) => {
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
                style={{width: '10%', marginTop: 15}}
              />
            </View>
            <InputView
              name="Major"
              ph="Major"
              value={this.state.major}
              changestate={(text) => {
                this.setState({major: text});
              }}
            />
            {/* <InputView name='Birth Date' ph='MM/DD/YY' changestate={(text)=>{this.setState({dob:text})}} /> */}
            {this.renderDatePicker()}
            {this.renderPhoneNo()}
            {/* <InputView name='Phone' ph='XXX-XXXXX-XXXX' changestate={(text)=>{this.setState({phone:text})}} /> */}
            {/* <InputView
              name="Grad Year"
              ph="2019"
              changestate={text => {
                this.setState({gradutationYear: text});
              }}
            /> */}

            {this.renderGradYear()}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

mapStateToProps = (state) => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(mapStateToProps, {CreateUserDetails})(ProfilePage);
