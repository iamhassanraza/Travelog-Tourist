import React, {Component} from 'react';
import {
  Text,
  KeyboardAvoidingView,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Button,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {StackActions, NavigationActions} from 'react-navigation';
import {Header} from 'react-native-elements';

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
        <View style={{backgroundColor: '#1192d1'}}>
          <View
            style={{
              height: 50,
              backgroundColor: '#1192d1',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
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
                <Text style={{color: 'white', padding: 2}}>Close</Text>
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
            this.setState({
              Images: response,
              imageSource: source,
            });
            //setImagess(Imagess.concat(response.fileName));
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
            marginTop: Platform.OS == 'ios' ? '20%' : '10%',
            borderRadius: 10,

            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={this.selectPhoto}>
            <ImageBackground
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
            marginTop: Platform.OS == 'ios' ? '20%' : '10%',
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={this.selectPhoto}>
            <ImageBackground
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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Icon
          name="delete"
          style={{fontSize: 30, color: 'grey'}}
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
      <TouchableWithoutFeedback
        style={{height: Dimensions.get('window').height}}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={100}
          style={{flex: 1}}>
          <ScrollView>
            {this.state.Images != null ? (
              <ImageBackground
                style={{
                  height: 200,
                  width: 200,
                  marginTop: 30,
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
                marginTop: Platform.OS == 'ios' ? '25%' : 20,
                fontSize: 22,
                color: 'grey',
              }}>
              Title
            </Text>
            <TextInput
              style={{
                marginTop: 10,
                marginLeft: '5%',
                width: '90%',
                height: 45,
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

            {/* <Button title="Next" onPress={()=>{
      // this.uploadPhoto
    
      if(this.state.Images && this.state.title !== ''){
        this.setState({Images:undefined,title:'',imageSource:null})
        this.props.navigation.navigate('CreatePost',{
          Images: this.state.Images,
          title: this.state.title
        })
      }
     
    }}></Button> */}
            <TouchableOpacity
              style={{alignItems: 'center', marginTop: '3%'}}
              onPress={() => {
                if (this.state.Images && this.state.title !== '') {
                  this.setState({error: ''});
                  this.props.navigation.navigate('CreatePost', {
                    Images: this.state.Images,
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
                  height: 45,
                  justifyContent: 'center',
                  backgroundColor: '#1192d1',
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
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
