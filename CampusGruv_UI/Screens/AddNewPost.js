import React, {Component} from 'react';
import {Text, KeyboardAvoidingView, View, ImageBackground, TouchableOpacity,TextInput,Button, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/AntDesign';
import { StackActions, NavigationActions } from 'react-navigation';

const options = {
  title: 'Select Photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1,
};

export default class AddNewPost extends Component {
  state = {
    imageSource: null,
    data: null ,
    title:'',
    file:'',
    Images:undefined,
    imgCount:0,
    
  };



selectPhoto = () => {
  ImagePicker.showImagePicker((response) => {
    if (response.didCancel) {
    } else if (response.error) {
    } else {
      const source = {uri: response.uri};
      const fileTypes = /jpeg|jpg|png|gif/;
      const allowedImgSize = 1024*1024*10;
      // console.log('response image: ', response);
      if(!fileTypes.test(response.type)) {
        alert('Uploaded file is not a valid image. \n(allowed file types: jpeg, jpg, png, gif)')
      } 
      else if (response.fileSize > allowedImgSize) {
        alert('Uploaded file is too large \n(allowed file size is 10MB)')
      } else {
        this.state.imgCount++;
      this.setState({
        Images :response,
        imageSource: source,
      })
        //setImagess(Imagess.concat(response.fileName));
      }
    }
  });

}





 



  openCamera =()=>
  {
      const options = {
          noData: true,
        }
      ImagePicker.launchCamera(options, (response) => {

        });

  }

renderOptions = () => {
  return(
    <View>
      <View style={{width:170,backgroundColor:'#0C91CF',alignSelf:'center',marginTop:10,borderRadius:10}}>
<TouchableOpacity onPress={this.selectPhoto}>
   <ImageBackground source={require('../Assets/Images/picture.png',)}style={{width:160,height:140,alignSelf:'center'}}/>
    </TouchableOpacity>
</View>

<View style={{width:170,backgroundColor:'#0C91CF',alignSelf:'center',marginTop:10,borderRadius:10}}>
    <TouchableOpacity onPress={this.selectPhoto}>
<ImageBackground source={require('../Assets/Images/photo-camera.png',)}style={{width:160,height:140,color:'white',alignSelf:'center',marginTop:20}}/>
    <Text style={{color:'white',fontSize:16,alignSelf:'center',fontWeight:'bold'}}>Take Photo</Text>
    </TouchableOpacity>
</View>
    </View>
  );
};

renderDeleteIcon = () =>{
  return(
    <View style={{justifyContent:"center", alignItems:"center"}}>
      <Icon name="delete" style={{fontSize:30, color:"grey"}} onPress={()=> { this.setState({Images:undefined})}}></Icon>
    </View>
  );
};
 




  render() {
   
    return (
      <TouchableWithoutFeedback style={{height:Dimensions.get('window').height}}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{flex: 1}}>
        <ScrollView>
       
        {
            this.state.Images != null?
        <ImageBackground
        style={{height: 200, width: 200, marginTop: 30, marginBottom: 20,alignSelf: 'center'}}
        source={this.state.imageSource}
        />
        : null
    }

    {this.state.Images ? this.renderDeleteIcon() : this.renderOptions()}



<Text style={{alignSelf:'center',marginTop:10,color:'grey'}}>Title</Text>
          <TextInput style={{marginTop:10,marginLeft:'5%',width:'90%',height:35,borderRadius: 7,borderWidth:1,borderColor:'#B4B8BA'}}
          placeholder="Enter value" value={this.state.title} onChangeText={(text)=>{this.setState({title:text})}}></TextInput>


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
      style={{alignItems: 'center', marginTop:'3%'}}
      onPress={()=>{      
        if(this.state.Images && this.state.title !== ''){
          this.props.navigation.navigate('CreatePost',{
            Images: this.state.Images,
            title: this.state.title
          })
        } 
      }}
      >
      <View style={{width: '90%', borderRadius: 5, height: 30, justifyContent: 'center', backgroundColor: '#1192d1', alignSelf: 'center'}}>
        <Text style={{color: 'white', alignSelf: 'center'}}>NEXT</Text>
      </View>
      </TouchableOpacity>




    </ScrollView>
       

         </KeyboardAvoidingView>
         </TouchableWithoutFeedback>
    );
  }
}