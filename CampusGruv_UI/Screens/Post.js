import React, { Component } from 'react'
import { Text, View ,Image, ImageBackground, Button,TextInput,TouchableOpacity} from 'react-native'
import ImagePicker from 'react-native-image-picker'
export default class Post extends Component {
   
   
    state={
        images: [],
        selected:0,
        title:'',

    }

    check =() =>{
      let NumberReg='^[1-9]?[0-9]{1}$|^100$';
      const {images,title}=this.state;
      if(images==null || images=='')
      {
          alert('Please Select Images')
      }
      else if(title==null || title=='')
      {
          alert('Please Enter Title')
      }
      else if(title.match(NumberReg))
      {
          alert('Please Enter Valid Title')
      }
      else{
        var formData = new FormData();
        formData.append('file',this.state.images);
        formData.append('title',this.state.title),
          fetch('api', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            body:formData
          
            
          }).then((resp)=>{ return resp}).then((data)=>{ console.log("data=========>",data)});
          
         

      }
    }

    openCamera =()=>
    {
        const options = {
            noData: true,
          }
        ImagePicker.launchCamera(options, (response) => {
    console.log("response==========>",response)
          });

    }
    getImage = () => {
    
        const options = {
            noData: true,
          }
        ImagePicker.showImagePicker(options, (response) => {
        
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
            //    this.setState({image_uri: response.uri})
              //  this.setState({file:response.fileName})
              console.log("response==========>",response.fileName  ,"uri",response.uri)
            this.setState({ images: this.state.images.concat({
              path: response.path,
              image_uri: response.uri,
              fileName: response.fileName,
              }),
              selected: this.state.selected + 1
            })
          }
        });
      }
    render() {
        console.log(this.state.title)
        return (
            <View style={{flex:1}}>
               
<View>
<View style={{width:170,backgroundColor:'#0C91CF',alignSelf:'center',marginTop:20,borderRadius:10}}>
    <TouchableOpacity onPress={this.openCamera}>
<ImageBackground source={require('../Assets/Images/photo-camera.png',)}style={{width:160,height:140,color:'white',alignSelf:'center'}}/>
    <Text style={{color:'white',fontSize:16,alignSelf:'center',fontWeight:'bold'}}>Take Photo</Text>
    </TouchableOpacity>
</View>



    <View style={{width:170,backgroundColor:'#0C91CF',alignSelf:'center',marginTop:10,borderRadius:10}}>
<TouchableOpacity onPress={this.getImage}>
    {this.state.selected<1?<ImageBackground source={require('../Assets/Images/picture.png',)}style={{width:160,height:140,alignSelf:'center'}}
    />

:<ImageBackground source={{uri:this.state.images[0].image_uri}}style={{width:160,height:140,alignSelf:'center'}}/>
}
    </TouchableOpacity>
</View>


<Text style={{alignSelf:'center',marginTop:10,color:'grey'}}>Title</Text>
                <TextInput style={{marginTop:10,marginHorizontal:10,width:330,height:35,borderRadius: 7,borderWidth:1,borderColor:'#B4B8BA'}}
                placeholder="Enter value" onChangeText={(text)=>{this.setState({title:text})}}></TextInput>

<View style={{width:310,height:60,marginTop:20,marginHorizontal:20}}>
    <Button title="Next" onPress={this.check}></Button>
</View>



                
</View>

         
            </View>
        )
    }
}
