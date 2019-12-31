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
  FlatList
} from 'react-native';
import {withNavigation} from 'react-navigation';
import CategoryButton from '../Components/CategoryButton';
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import RNFetchBlob from 'rn-fetch-blob';

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

class CreateNewPost extends Component {
  state = {
    Category: '',
    CategoryEventDate: '',
    Title: '',
    Description: '',
    Price: '',
    spinner: false,
    Images: '',
    DATA: undefined,
  };

  getCategories = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');

    const Response = await fetch(
      `https://campus-gruv-heroku.herokuapp.com/api/v1/post/categories`,
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
      console.log('API called Successfully');
    }
  };

  componentDidMount = () => {
    this.getCategories();
    this.setState({
      Images: this.props.navigation.getParam('Images', 'nothing to render'),
      Title: this.props.navigation.getParam('title', 'nothing to render'),
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
      `https://campus-gruv-heroku.herokuapp.com/api/v1/post/categories`,
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
      console.log('API called Successfully');
      this.setState({DATA: JsonResponse});
    }
  };

  renderCategories = () => {
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 22, color: 'grey'}}> Select Category </Text>
        </View>

        <FlatList
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
                this.state.Category === item.id ? `rgba(${item.rgba_colors}, 0.95)` : `rgba(${item.rgba_colors}, 0.65)`
              }
              onSelect={this.changeState}
              Elevation={
                this.state.Category === item.id ? 14 : null
              }>
              </CategoryButton>
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
          justifyContent: 'flex-end',
          marginTop: 22,
          marginRight: 10,
        }}>
        <DatePicker
          style={{width: '60%', justifyContent: 'center', alignSelf: 'center'}}
          date={this.state.date}
          mode="date"
          placeholder={
            this.state.CategoryEventDate
              ? this.state.CategoryEventDate
              : 'Select Date'
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
            this.setState({CategoryEventDate: date});
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
          marginTop: 20,
          marginRight: 20,
        }}>
        <Text style={{alignSelf: 'center', color: 'grey'}}>Set Price</Text>
        <TextInput
          placeholder="$ 0.00"
          style={{
            paddingLeft: '3%',
            marginLeft: '3%',
            width: 100,
            height: 40,
            borderRadius: 9,
            borderWidth: 0.5,
            borderColor: 'grey',
          }}
          onChangeText={text => {
            this.changePriceState(text);
          }}
        />
      </View>
    );
  };

  renderDescription = () => {
    return (
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <Text style={{fontSize: 17, color: 'grey'}}>
          Add Description (optional)
        </Text>
        <TextInput
          value={this.state.Description}
          multiline={true}
          style={{
            color: 'grey',
            width: '92%',
            borderWidth: 0.5,
            borderColor: 'grey',
            margin: 10,
            borderRadius: 8,
          }}
          onChangeText={text => {
            this.changeDescriptionState(text);
          }}></TextInput>
      </View>
    );
  };

  renderTitle = () => {
    return (
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <Text style={{fontSize: 17, color: 'grey'}}>Title</Text>
        <TextInput
          style={{
            height: 40,
            width: '92%',
            borderWidth: 0.5,
            borderColor: 'grey',
            margin: 10,
            borderRadius: 8,
          }}
          onChangeText={text => {
            this.changeTitleState(text);
          }}></TextInput>
      </View>
    );
  };

  

  uploadPost = async ()=>{

    if( this.state.Category === ''){
      alert('Select Category')
    }
    else if (this.state.Description === '') {
      alert('Enter Description First ')
    }
    else{

    this.setState({spinner:true});
    const Token = await AsyncStorage.getItem('TOKEN')
    const user_id = await AsyncStorage.getItem('USER_ID')
      
    let response = await fetch('https://campus-gruv-heroku.herokuapp.com/api/v1/post/create',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${Token}`,
      },
      body:JSON.stringify({user_id:user_id,category_id:1,title:this.state.Title,description:this.state.Description})
    })
    const postMasterResponse =  await response.json();

    let raw_response = await fetch("https://campus-gruv-heroku.herokuapp.com/api/v1/post/detail", {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${Token}`
    },
      body:this.createFormData(this.state.Images,{user_id:user_id,post_id:postMasterResponse.id})
    })
    
    let imageResponse = await raw_response.json();
    
    console.log(imageResponse,'IMAGEE ka responseE')
      console.log(imageResponse.image_url,'IMAGEEEEEEEEEEEEEEEEEEEEEEEE')
 
     this.setState({spinner:false,Description:''})
     this.props.navigation.push('PostDetail', {
        PostData: {
          uri: imageResponse.image_url,
          title: postMasterResponse.title,
          userAvatar: 'Api needed',
          username: 'API NEEDED',
          description: postMasterResponse.description,
        }
      }

     )



    }
  };

  renderShareButton = () => {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', marginTop: '3%'}}
        onPress={() => {
          this.uploadPost();
        }}>
        <View
          style={{
            width: '30%',
            borderRadius: 5,
            height: 30,
            justifyContent: 'center',
            backgroundColor: '#1192d1',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white', alignSelf: 'center'}}>SHARE</Text>
        </View>
      </TouchableOpacity>
    );
  };

  createFormData = (images, body) => {
    const data = new FormData();
    data.append('post_detail_images[]', {
      name: images.fileName,
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

  render() {
    return (
      <TouchableWithoutFeedback>
        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={90}
          behavior="padding">
          <ScrollView>
            <Spinner
              visible={this.state.spinner}
              textContent={'Uploading...'}
              textStyle={{color: 'white'}}
              customIndicator={<BarIndicator count={5} />}
            />

            {this.renderCategories()}
            {this.state.Category === 5 ? this.renderDatePicker() : null}
            {this.state.Category === 7
              ? this.renderPrice()
              : null}

            {this.renderDescription()}
            {this.renderShareButton()}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(CreateNewPost);
