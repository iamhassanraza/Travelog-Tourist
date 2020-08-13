import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import InputView from '../Components/ProfileEdit/InputViews';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Item, Picker, Content, Input} from 'native-base';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import img from '../Assets/Images/lahore.jpg';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import Spinner from 'react-native-loading-spinner-overlay';
import {UIActivityIndicator} from 'react-native-indicators';
import {ThemeBlue} from '../Assets/Colors';
import {connect} from 'react-redux';
import {CreateUserDetails} from '../ReduxStore/Actions/index';

const {width, height} = Dimensions.get('window');

class EditOrganization extends Component {
  static navigationOptions = props => {
    tabBarVisibile = false;
    const {params = {}} = props.navigation.state;
    return {
      header: (
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
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Edit Organization Account
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

  state = {
    imageUri: '',
    campuses: [],
    currentCampus: {},
    selectedCampus: null,
    selectedId: null,
    text: 'hello',
    organizationName: '',
    organizationEmail: '',
    organizationWebsite: '',
    organizationMembers: [],
    focused: false,
    Spinner: false,
    imageName: '',
    imageURL: '',
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
      response => {
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

  componentDidMount() {
    this.setState({
      organizationName: this.props.User.first_name,
      organizationEmail: this.props.User.email,
      imageURL: this.props.User.profile_pic_url,
      organizationWebsite: this.props.User.website,
      selectedOrgType: this.props.User?.organization_type,
    });
    this.props.navigation.setParams({
      handleThis: () => {
        this.editOrganization();
      },
    });
  }

  editOrganization = async () => {
    this.setState({Spinner: true});
    const Token = await AsyncStorage.getItem('TOKEN');
    //const Campusid = await AsyncStorage.getItem('CAMPUS_ID');
    console.log('api ran');
    let response = await fetch(
      `${require('../config').default.production}api/v1/organization/update`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Token}`,
        },
        body: this.createFormData(this.state.imageUri, {
          first_name: this.state.organizationName,
          email: this.state.organizationEmail,
          organization_type: this.state.selectedOrgType,
          last_name: '',
        }),
      },
    );

    const postMasterResponse = await response.json();
    console.log(postMasterResponse);

    this.setState({Spinner: false});
    this.props.CreateUserDetails(postMasterResponse);
    this.setState({imageUri: ''});
    this.props.navigation.navigate('UserProfile');
  };

  createFormData = (images, body) => {
    const data = new FormData();
    if (this.state.imageUri !== '') {
      data.append('profile_pic', {
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

  render() {
    console.log(this.state.selectedOrgType);
    return (
      <Container>
        <Spinner
          visible={this.state.Spinner}
          textStyle={{color: ThemeBlue}}
          customIndicator={<UIActivityIndicator color={'black'} size={50} />}
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
              source={
                this.state.imageUri === '' &&
                this.props.User.profile_pic_url === ''
                  ? defaultAvatar
                  : {
                      uri:
                        this.state.imageUri !== ''
                          ? this.state.imageUri.uri
                          : this.props.User.profile_pic_url,
                    }
              }
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

          <View>
            <View
              style={{
                borderTopColor: '#C4C4C4',
                borderTopWidth: 0.5,
                paddingBottom: 40,
                backgroundColor: '#f9fdfe',
                marginTop: Dimensions.get('window').height > 800 ? 50 : 20,
              }}>
              <InputView
                name="Organization"
                ph="enter organization"
                value={this.state.organizationName}
                changestate={text => {
                  this.setState({organizationName: text});
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 15,
                    marginLeft: 10,
                    width: width / 3.1,
                  }}>
                  Org. Type
                </Text>
                <View
                  style={{
                    width: width / 1.8,
                    marginTop: 5,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#C4C4C4',
                  }}>
                  <Picker
                    style={{height: 40, marginBottom: -5}}
                    textStyle={{fontSize: 20, paddingLeft: 0}}
                    selectedValue={this.state.selectedOrgType}
                    onValueChange={itemValue => {
                      this.setState({
                        selectedOrgType: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label="Student organization"
                      value="Student organization"
                    />
                    <Picker.Item
                      label="University department"
                      value="University department"
                    />
                    <Picker.Item
                      label="Alumni association"
                      value="Alumni association"
                    />
                  </Picker>
                </View>
                <Icon
                  name="pencil"
                  color="#C4C4C4"
                  size={26}
                  style={{width: width / 10, marginTop: 15}}
                />
              </View>
              {/* <View
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
                    textStyle={{paddingLeft: 0}}
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
                  style={{width: '10%', marginTop: 15}}
                />
              </View> */}
              <InputView
                name="Email"
                ph="Enter email"
                value={this.state.organizationEmail}
                changestate={text => {
                  this.setState({organizationEmail: text});
                }}
              />

              {/* <InputView
                multiline={true}
                name="Website"
                ph="Enter your website"
                value={this.state.organizationWebsite}
                changestate={text => {
                  this.setState({organizationWebsite: text});
                }}
              /> */}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('AddMembers', {
                    org_id: this.props.User.id,
                  })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 15,
                      marginLeft: 10,
                      width: width / 3.1,
                    }}>
                    Members
                  </Text>
                  <View
                    style={{
                      width: width / 1.8,
                      marginTop: 10,
                      borderBottomWidth: 0.5,
                      borderBottomColor: '#C4C4C4',
                    }}>
                    <Text style={{fontSize: 20}}>Add Members</Text>
                  </View>
                  <Icon
                    name="pencil"
                    color="#C4C4C4"
                    size={26}
                    style={{width: width / 10, marginTop: 15}}
                  />
                </View>
                {/* <InputView
                  name="Members"
                  ph="Add Users"
                  changestate={text => {
                    this.props.navigation.navigate('AddMembers', {
                      searched: text,
                    });
                  }}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
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
)(EditOrganization);
