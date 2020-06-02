import React, {Component} from 'react';
import {Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import InputView from '../Components/ProfileEdit/InputViews';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Item, Picker, Content, Input} from 'native-base';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import img from '../Assets/Images/lahore.jpg'
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';

export default class CreateOrganization extends Component {
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


  render() {
    let pickerItems = this.state.campuses[0]
      ? this.state.campuses.map((s, i) => {
          // if (s.id !== this.state.selectedId)
          return <Picker.Item key={i} value={s.id} label={s.description} />;
        })
      : null;
    return (
      <Container>
        <Content>
          {/* EDIT PROFILE IMAGE */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <FastImage
              source={this.state.imageUri === '' ? defaultAvatar : {
                uri:
                  this.state.imageUri !== ''
                    ? this.state.imageUri.uri
                    : null,
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
                ph="Enter Organization"
                value={this.state.organizationName}
                changestate={text => {
                  this.setState({organizationName: text});
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
              </View>
              <InputView
                multiline={true}
                name="Email"
                ph="Enter email"
                value={this.state.organizationEmail}
                changestate={text => {
                  this.setState({organizationEmail: text});
                }}
              />
              <InputView
                multiline={true}
                name="Website"
                ph="Enter your website"
                value={this.state.organizationWebsite}
                changestate={text => {
                  this.setState({organizationWebsite: text});
                }}
              />
              <InputView
                name="Members"
                ph="Add Users"
                value={this.state.organizationMembers}
                changestate={text => {
                  this.setState({organizationMembers: text});
                }}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
