import React, {Component} from 'react';
import {
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Button,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';

import Icon from 'react-native-vector-icons/AntDesign';
import {StackActions, NavigationActions} from 'react-navigation';
import {Header} from 'react-native-elements';
import {Container, Content, Input} from 'native-base';
import FastImage from 'react-native-fast-image';

const options = {
  title: 'Select Photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1,
  error: '',
};

export default class AddNewPost extends Component {
  static navigationOptions = props => {
    const {params = {}} = props.navigation.state;
    return {
      header: (
        <View style={{backgroundColor: '#0C91CF'}}>
          <View
            style={{
              height: 50,
              backgroundColor: '#0C91CF',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                New Post
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
                  params.handleThis();
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 15,
                    padding: 2,
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ),
    };
  };

  state = {
    imageSource: null,
    data: null,
    title: '',
    file: '',
    Images: undefined,
    imgCount: 0,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleThis: () => {
        this.deleteItems();
      },
    });
  }

  selectPhoto = () => {
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
        } else if (response.error) {
        } else {
          const source = {uri: response.uri};
          const fileTypes = /jpeg|jpg|png|gif/;
          const allowedImgSize = 1024 * 1024 * 10;
          // console.log('response image: ', response);
          if (!fileTypes.test(response.type)) {
            alert(
              'Uploaded file is not a valid image. \n(allowed file types: jpeg, jpg, png, gif)',
            );
          } else if (response.fileSize > allowedImgSize) {
            alert('Uploaded file is too large \n(allowed file size is 10MB)');
          } else {
            this.state.imgCount++;
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
                Images: response,
                imageSource: source,
              });
            } else {
              this.setState({
                imageName: response.fileName,
                Images: response,
                imageSource: source,
              });
            }
          }
        }
      },
    );
  };

  openCamera = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchCamera(options, response => {});
  };

  renderOptions = () => {
    return (
      <View>
        <View
          style={{
            width: 170,
            height: 140,
            backgroundColor: '#0C91CF',
            alignSelf: 'center',
            marginTop: Platform.OS == 'ios' ? '10%' : '10%',
            borderRadius: 10,
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 4,
            shadowColor: 'rgba(0,0,0,0.25)',
            borderRadius: 7,
            elevation: 5,
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={this.selectPhoto}>
            <FastImage
              source={require('../Assets/Images/picture.png')}
              style={{width: 100, height: 100, alignSelf: 'center'}}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                alignSelf: 'center',
                fontWeight: 'bold',
                marginTop: '-4%',
              }}>
              Choose Photo
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 170,
            height: 140,
            backgroundColor: '#0C91CF',
            alignSelf: 'center',
            marginTop: Platform.OS == 'ios' ? '10%' : '10%',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 4,
            shadowColor: 'rgba(0,0,0,0.25)',
            borderRadius: 7,
            elevation: 5,
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={this.selectPhoto}>
            <FastImage
              source={require('../Assets/Images/photo-camera.png')}
              style={{
                width: 100,
                height: 100,
                color: 'white',
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                marginTop: '-4%',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Take Photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderDeleteIcon = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          marginTop: '2%',
          alignItems: 'center',
        }}>
        <Icon
          name="delete"
          style={{fontSize: 20, color: 'grey'}}
          onPress={() => {
            this.setState({Images: undefined});
          }}
        />
      </View>
    );
  };

  deleteItems = () => {
    this.setState({Images: undefined, title: ''});
  };

  render() {
    return (
      <Container>
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset={
              Dimensions.get('window').height > 800 ? -250 : -170
            }
            behavior="padding">
            <Content style={{backgroundColor: '#f9fdfe'}}>
              {this.state.Images != null ? (
                <ImageBackground
                  style={{
                    height: Dimensions.get('window').height / 3,
                    width: Dimensions.get('window').width - 80,
                    marginTop: '10%',
                    alignSelf: 'center',
                  }}
                  source={this.state.imageSource}
                />
              ) : null}

              {this.state.Images
                ? this.renderDeleteIcon()
                : this.renderOptions()}

              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: Platform.OS == 'ios' ? '15%' : 20,
                  fontSize: 22,
                  color: 'grey',
                }}>
                Title
              </Text>
              <Input
                style={{
                  marginTop: 10,
                  marginLeft: '5%',
                  width: '90%',
                  height: 35,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: '#B4B8BA',
                }}
                placeholder=" Title"
                value={this.state.title}
                onChangeText={text => {
                  this.setState({title: text});
                }}
              />

              <TouchableOpacity
                style={{alignItems: 'center', marginTop: '3%'}}
                onPress={() => {
                  if (this.state.Images && this.state.title !== '') {
                    this.setState({error: ''});
                    this.props.navigation.navigate('CreatePost', {
                      Images: this.state.Images,
                      imageName: this.state.imageName,
                      title: this.state.title,
                      deleteItems: this.deleteItems,
                    });
                  } else if (
                    this.state.Images === undefined &&
                    this.state.title === ''
                  ) {
                    this.setState({error: 'Select image and title'});
                  }
                }}>
                <View
                  style={{
                    width: '90%',
                    borderRadius: 10,
                    height: 35,
                    justifyContent: 'center',
                    backgroundColor: '#0C91CF',
                    alignSelf: 'center',
                    marginTop: Platform.OS == 'ios' ? 25 : 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      alignSelf: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    NEXT
                  </Text>
                </View>
                {this.state.error === 'Select image and title' ? (
                  <Text style={{color: 'red'}}>{this.state.error}</Text>
                ) : null}
              </TouchableOpacity>
            </Content>
          </KeyboardAvoidingView>
        ) : (
          <Content>
            {this.state.Images != null ? (
              <ImageBackground
                style={{
                  height: 200,
                  width: 200,
                  marginTop: 20,
                  marginBottom: 20,
                  alignSelf: 'center',
                }}
                source={this.state.imageSource}
              />
            ) : null}

            {this.state.Images ? this.renderDeleteIcon() : this.renderOptions()}

            <Text
              style={{
                alignSelf: 'center',
                marginTop: Platform.OS == 'ios' ? '15%' : 20,
                fontSize: 22,
                color: 'grey',
              }}>
              Title
            </Text>
            <Input
              style={{
                marginTop: 10,
                marginLeft: '5%',
                width: '90%',
                alignItems: 'center',
                textAlignVertical: 'center',
                paddingTop: 0,
                paddingBottom: 0,
                justifyContent: 'center',
                height: 35,
                borderRadius: 7,
                borderWidth: 1,
                borderColor: '#B4B8BA',
              }}
              placeholder=" Title"
              value={this.state.title}
              onChangeText={text => {
                this.setState({title: text});
              }}
            />

            <TouchableOpacity
              style={{alignItems: 'center', marginTop: '3%'}}
              onPress={() => {
                if (this.state.Images && this.state.title !== '') {
                  this.setState({error: ''});
                  this.props.navigation.navigate('CreatePost', {
                    Images: this.state.Images,
                    imageName: this.state.imageName,
                    title: this.state.title,
                    deleteItems: this.deleteItems,
                  });
                } else if (
                  this.state.Images === undefined &&
                  this.state.title === ''
                ) {
                  this.setState({error: 'Select image and title'});
                }
              }}>
              <View
                style={{
                  width: '90%',
                  borderRadius: 10,
                  height: 35,
                  justifyContent: 'center',
                  backgroundColor: '#0C91CF',
                  alignSelf: 'center',
                  marginTop: Platform.OS == 'ios' ? 25 : 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  NEXT
                </Text>
              </View>
              {this.state.error === 'Select image and title' ? (
                <Text style={{color: 'red'}}>{this.state.error}</Text>
              ) : null}
            </TouchableOpacity>
          </Content>
        )}
      </Container>
    );
  }
}
