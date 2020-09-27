import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Button,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  PermissionsAndroid,
  FlatList,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import {withNavigation, StackActions} from 'react-navigation';
import CategoryButton from '../Components/CategoryButton';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import RNFetchBlob from 'rn-fetch-blob';
// import {Container, Item, Content, Input} from 'native-base';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import {connect} from 'react-redux';

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
import {TouchableOpacity} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;

class CreateNewPost extends Component {
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
            <View
              style={{
                position: 'absolute',
                padding: 2,
                alignSelf: 'center',
                left: 8,
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('AddPost');
                }}>
                <BackIcon name="ios-arrow-back" color="white" size={25} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Details
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
                  props.navigation.dispatch(StackActions.popToTop());
                  props.navigation.navigate('HomeScreen');
                  params.handleThis();
                }}>
                <Text
                  style={{
                    color: 'white',
                    padding: 2,
                    fontWeight: 'bold',
                    fontSize: 15,
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
    Category: 1,
    CategoryEventDate: '',
    Title: '',
    description: '',
    price: '',
    seats: '',
    speciality: '',
    days: '',
    spinner: false,
    imageDetails: this.props.navigation.getParam('imageDetails', null),
    PicAndTitle: this.props.navigation.getParam(
      'deleteItems',
      'nothing to render',
    ),
    Images: '',
    DATA: undefined,
    loadingCategory: false,
  };

  componentDidMount = () => {
    // this.getCategories();
    this.setState({
      Images: this.props.navigation.getParam('Images', 'nothing to render'),
      imageName: this.props.navigation.getParam(
        'imageName',
        'nothing to render',
      ),
      Title: this.props.navigation.getParam('title', 'nothing to render'),
    });
    //set navigation params
    this.props.navigation.setParams({
      handleThis: () => {
        this.state.PicAndTitle();
      },
    });
  };

  getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  downloadImage = () => {
    var date = new Date();
    var image_URL =
      'https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg';
    var ext = this.getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        Alert.alert('Image Downloaded Successfully.');
      });
  };

  changeState = cat => {
    this.setState({
      Category: cat,
    });
  };

  changeTitleState = title => {
    this.setState({
      Title: title,
    });
  };

  changeDescriptionState = desc => {
    this.setState({
      Description: desc,
    });
  };

  changePriceState = price => {
    this.setState({
      Price: price,
    });
  };

  getCategories = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');

    const Response = await fetch(
      `${require('../config').default.production}api/v1/post/categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      },
    );

    const JsonResponse = await Response.json();

    if (parseInt(Response.status) === 401) {
      alert('Error');
    } else if (parseInt(Response.status) === 200) {
      console.log('API called Successfully', JsonResponse);
      this.setState({DATA: JsonResponse});
    }
  };

  renderCategories = () => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          //height: Dimensions.get('window').height / 4,
          marginTop: 10,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <FlatList
          style={{alignSelf: 'center'}}
          vertical
          numColumns={3}
          data={this.state.DATA}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <CategoryButton
              title={item.description}
              cat_id={item.id}
              bgclr={
                this.state.Category === item.id
                  ? `rgba(${item.rgba_colors}, 4)`
                  : `rgba(${item.rgba_colors}, 0.8)`
              }
              shadow={this.state.Category === item.id ? true : false}
              // bold={this.state.Category === item.id ? 'bold' : 'normal'}
              onSelect={this.changeState}
            />
          )}
        />
      </View>
    );
  };

  renderDatePicker = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
          marginRight: '5%',
        }}>
        <Text style={{fontSize: 16, marginLeft: '5%'}}>Departure</Text>
        <DatePicker
          style={{width: '60%', justifyContent: 'center', alignSelf: 'center'}}
          date={this.state.date}
          mode="date"
          placeholder={
            this.state.tourDate ? this.state.tourDate : 'Select Date'
          }
          format="YYYY-MM-DD"
          minDate="2019-05-04"
          maxDate="2022-05-04"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
            },
            dateInput: {
              paddingLeft: 2,
              borderRadius: 8,
              borderColor: '#c5d1c8',
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({tourDate: date});
          }}
        />
      </View>
    );
  };

  renderPrice = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 0,
          marginRight: '5%',
        }}>
        <Text style={{alignSelf: 'center', color: 'grey'}}>Set Price</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 5,
            marginLeft: '3%',
            alignItems: 'center',
            width: 100,
            height: 30,
            borderRadius: 9,
            borderWidth: 0.5,
            borderColor: 'grey',
          }}>
          <Text style={{color: 'grey'}}>$</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="0.00"
            style={{
              marginLeft: 2,
            }}
            onChangeText={text => {
              this.changePriceState(text);
            }}
          />
        </View>
      </View>
    );
  };

  renderDescription = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2%',
          width: Dimensions.get('window').width,
        }}>
        <View style={{marginTop: '3%'}}>
          <TextInput
            value={this.state.description}
            scrollEnabled={false}
            placeholder="  Detailed Overview Of this Tour"
            multiline={true}
            style={{
              color: 'grey',
              width: '100%',
              height: Dimensions.get('window').height / 3.9,
              width: Dimensions.get('window').width / 1.1,
              marginLeft: '2.5%',
              marginRight: '2.5%',
              borderColor: 'grey',
              borderRadius: 8,
              borderWidth: 1,
              textAlignVertical: 'top',
            }}
            onChangeText={text => {
              this.onChange('description', text);
            }}
          />
        </View>
      </View>
    );
  };

  // renderTitle = () => {
  //   return (
  //     <View
  //       style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
  //       <Text style={{fontSize: 17, color: 'grey'}}>Title</Text>
  //       <TextInput
  //         style={{
  //           height: 40,
  //           width: '92%',
  //           borderWidth: 0.5,
  //           borderColor: 'grey',
  //           margin: 10,
  //           borderRadius: 8,
  //         }}
  //         onChangeText={text => {
  //           this.changeTitleState(text);
  //         }}></TextInput>
  //     </View>
  //   );
  // };

  uploadPost = async () => {
    if (this.state.Category === '') {
      alert('Select Category');
    } else if (this.state.Description === '') {
      alert('Enter Description First ');
    } else if (
      this.state.Category === 5 &&
      this.state.CategoryEventDate === ''
    ) {
      alert('Enter Date First ');
    } else if (this.state.Category === 7 && this.state.Price === '') {
      alert('Enter Price First ');
    } else {
      this.setState({spinner: true});
      const Token = await AsyncStorage.getItem('TOKEN');

      let response = await fetch(
        `${require('../config').default.production}api/v1/post/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
          body: JSON.stringify({
            user_id: this.props.User.id,
            campus_id: this.props.User.campus_id,
            category_id: this.state.Category,
            title: this.state.Title,
            description: this.state.description,
            speciality: this.state.speciality,
            price: this.state.price,
            number_of_days: this.state.days,
            total_seats: this.state.seats,
            departure_date: this.state.date,
          }),
        },
      );
      const postMasterResponse = await response.json();
      let raw_response = await fetch(
        `${require('../config').default.production}api/v1/post/detail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Token}`,
          },
          body: this.createFormData(this.state.Images, {
            user_id: this.props.User.id,
            post_id: postMasterResponse.id,
            height: this.state.Images.height,
            width: this.state.Images.width,
          }),
        },
      );

      let imageResponse = await raw_response.json();

      this.setState({spinner: false, description: ''});

      this.props.navigation.navigate('HomeScreen', {newPost: true});
    }
  };

  renderShareButton = () => {
    const PicAndTitle = this.props.navigation.getParam(
      'deleteItems',
      'nothing to render',
    );

    return (
      <TouchableOpacity
        style={{alignItems: 'center', marginTop: '5%'}}
        onPress={() => {
          this.uploadPost();
          PicAndTitle();
        }}>
        <View
          style={{
            width: '90%',
            borderRadius: 10,
            height: 35,
            justifyContent: 'center',
            backgroundColor: '#0C91CF',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Create
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  createFormData = (images, body) => {
    const data = new FormData();
    data.append('post_detail_images', {
      name: this.state.imageName,
      type: images.type,
      uri:
        Platform.OS === 'android'
          ? images.uri
          : images.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  onChange(name, val) {
    this.setState({[name]: val});
  }

  render() {
    // console.log('data', this.state.Images);
    return (
      <Container>
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset={50}
            behavior="padding">
            <Content style={{backgroundColor: '#f9fdfe'}}>
              {/* <ScrollView> */}
              {/* <Spinner
                visible={this.state.spinner}
                textContent={'Uploading...'}
                textStyle={{color: 'white'}}
                customIndicator={<BarIndicator count={5} />}
              /> */}

              {/* <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{fontSize: 20, color: 'grey'}}>
                  Select Category
                </Text>
              </View> */}

              {/* {this.state.DATA ? (
                this.renderCategories()
              ) : (
                <View style={{marginTop: '10%', marginBottom: '10%'}}>
                  <SkypeIndicator count={5} />
                </View>
              )} */}
              {/* 
              {this.state.Category === 6 ? this.renderDatePicker() : null}
              {this.state.Category === 7 ? this.renderPrice() : null}
              {this.renderDescription()} */}
              {this.renderShareButton()}
              {/* </ScrollView> */}
            </Content>
          </KeyboardAvoidingView>
        ) : (
          <Content
            style={{backgroundColor: '#f9fdfe', paddingHorizontal: '2%'}}>
            {/* <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={80}
          behavior="padding"> */}
            {/* <ScrollView> */}
            <Spinner
              visible={this.state.spinner}
              textContent={'Uploading...'}
              textStyle={{color: 'white'}}
              customIndicator={<BarIndicator count={5} />}
            />

            <Form>
              <Item floatingLabel>
                <Label>Number of Days</Label>
                <Input
                  value={this.state.days}
                  keyboardType="number-pad"
                  onChangeText={text => {
                    this.onChange('days', text);
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label>Price in PKR</Label>
                <Input
                  value={this.state.price}
                  keyboardType="number-pad"
                  onChangeText={text => {
                    this.onChange('price', text);
                  }}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Speciality</Label>
                <Input
                  value={this.state.speciality}
                  onChangeText={text => {
                    this.onChange('speciality', text);
                  }}
                />
              </Item>
              <Item floatingLabel last>
                <Label>Total seats</Label>
                <Input
                  value={this.state.seats}
                  keyboardType="number-pad"
                  onChangeText={text => {
                    this.onChange('seats', text);
                  }}
                />
              </Item>

              {this.renderDatePicker()}

              {this.renderDescription()}
            </Form>

            {this.renderShareButton()}
            {/* </ScrollView> */}
            {/* </KeyboardAvoidingView> */}
          </Content>
        )}
      </Container>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default withNavigation(
  connect(
    mapStateToProps,
    null,
  )(CreateNewPost),
);
