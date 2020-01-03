import React, { useState, useEffect } from 'react';
import { 
  Text, 
  Image, 
  ScrollView, 
  View, TouchableOpacity, Picker,
  StyleSheet, Dimensions, Platform,TextInput, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import InputView from '../Components/ProfileEdit/InputViews'
import ImagePicker from 'react-native-image-picker'
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg'
import SearchableDropdown from 'react-native-searchable-dropdown'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

class ProfilePage extends React.Component {

  static navigationOptions = (props) => {
    const {params = {}} = props.navigation.state;
    return {
    header: (
        <View style={{height: 50, backgroundColor: '#1192d1', flexDirection: 'row' ,justifyContent: 'center'}}>
            <View style={{position: 'absolute', padding:2, alignSelf: 'center', left: 8}}>
                <TouchableOpacity 
                    // onPress = {() => {
                    //     props.navigation.navigate("UserProfile");
                    // }}
                >
                    <Text style={{color: 'white', padding: 2}}>
                        back
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
                <Text style={{color: 'white', fontSize:20, fontWeight:'bold'}}>Edit profile</Text>
            </View>
            <View style={{position: 'absolute', padding:2, alignSelf: 'center', right: 8}}>
                <TouchableOpacity 
                    onPress = {() => params.handleThis()}
                >
                    <Text style={{color: 'white', padding: 2}}>
                        done
                    </Text>
                </TouchableOpacity>
            </View>
        </View> 
    )
  }
}

    componentDidMount = async () => {
      const Token = await AsyncStorage.getItem('TOKEN')
      fetch('https://campus-gruv-heroku.herokuapp.com/api/v1/fetch/campuses', {
        headers: {
          Authorization:
            `Bearer ${Token}`,
        },
      }
    ) 
    .then(res => res.json())
    .then(res => {
      // const campuses = [this.state.campuses,...res]
      const cam = [...this.state.campuses,...res]
    
      this.setState({
        campuses: cam
      })
      
    })
    .catch(err => console.log('error is',err))

    this.props.navigation.setParams({
          handleThis: () => {
            if(this.state.selectedId)
              {
                this.UpdateProfile()
        
               
              }
            else
              alert('no campus selected')
          }
      });
    }

    

    state = {
        //resta: [],
        imageUri: '' ,
        campuses: [{description: "Select campus"}],
        selectedCampus: null,
        selectedId: null,
        text: 'hello'
      };

    uploadProfilePicture = () => {
      ImagePicker.showImagePicker((response) => {
        if (response.didCancel) { console.log('cancelled')} 
        else if (response.error) { console.log('error is:', response.error) }
        else {
          const source = {uri: response.uri};
          const fileTypes = /jpeg|jpg|png|gif/;
          const allowedImgSize = 1024*1024*10;
          if(!fileTypes.test(response.type)) {
            alert('Uploaded file is not a valid image. \n(allowed file types: jpeg, jpg, png, gif)')
          } 
          else if (response.fileSize > allowedImgSize) {
            alert('Uploaded file is too large \n(allowed file size is 10MB)')
          } 
          else {
          this.setState({
            imageUri : response
          })
          }
        }
      });
    }


    createFormData = (images, body) => {
      const data = new FormData();
      if(this.state.imageUri !== '')
      {
        data.append('profile_pic', {
          name: images.fileName,
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



    UpdateProfile = async ()=>{
        const profiledata  = new FormData()
        profiledata.append('first_name','babaa jeeee')
        profiledata.append('campus_id','2')
        profiledata.append('profile_pic', {
          uri: this.state.imageUri
        })


      const Token = await AsyncStorage.getItem('TOKEN');
      //const Campusid = await AsyncStorage.getItem('CAMPUS_ID');

      let response = await fetch(
        'https://campus-gruv-heroku.herokuapp.com/api/v1/edit/profile',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Token}`,
          },
          body: this.createFormData(this.state.imageUri,{campus_id:2}),
        },
      );
      const postMasterResponse = await response.json();
      await AsyncStorage.setItem('CAMPUS_ID', this.state.selectedId.toString());
      this.props.navigation.navigate('App')
      console.log(postMasterResponse,'patch request')


    }

    


    render() {

      let pickerItems = this.state.campuses[0]? this.state.campuses.map( (s, i) => {
        return <Picker.Item key={i} value={s.id} label={s.description} />
      }) : null;


      return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
          <ScrollView>
              {/* EDIT PROFILE IMAGE */}
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
              <Image source={{ uri: this.state.imageUri!== '' ? this.state.imageUri.uri : 'https://www.bluefrosthvac.com/wp-content/uploads/2019/08/default-person.png'}} style={{width:120, height:120, borderColor:'grey',borderWidth:0.9,borderRadius:80}} />
            </View>
            <TouchableOpacity
              onPress = {this.uploadProfilePicture}
            >
              <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                <Text style={{color:'#0C91CF',fontWeight:'bold',fontSize:20}}>Change Profile Picture</Text>
              </View>
            </TouchableOpacity>
    
        {/* OPTIONS */}

            <View style={{borderBottomColor:'#C4C4C4', marginTop:10}}>
              <InputView name='Name' ph='Enter name'/>
              {/* <InputView name='Campus' ph='University of Pittsburgh'/> */}
              <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:20,marginTop:15,marginLeft:10,width:'25%'}}>Campus</Text>
                {/* <SearchableDropdown
                  multi={true}
                  // onItemSelect = {(item) => {
                  //   console.log('on select item')
                  //   const items = this.state.selectedItems;
                  //   items.push(item)
                  //   this.setState({ selectedItems: items });
                  //   console.log(this.state.selectedItems)
                  // }}
                  onItemSelect={(item) =>  alert(JSON.stringify(item))}

                  containerStyle={{ width: '60%', borderBottomColor:'#C4C4C4', borderBottomWidth:0.5 }}
                  onRemoveItem={(item, index) => {
                    console.log('onremove item')
                    const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                    this.setState({ selectedItems: items });
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{ color: '#222' }}
                  itemsContainerStyle={{ maxHeight: 140 }}
                  items={items}
                  //defaultIndex={1}
                  resetValue={false}
                  textInputProps={
                    {
                      placeholder: 'select campus',
                      underlineColorAndroid: "transparent",
                      style: {
                        fontSize:20,
                        color:'#ACACAC'
                      },
                      onTextChange: text => alert(text)
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                /> */}
                <View style={{width: '60%', marginTop: 5, borderBottomWidth: 0.5, borderBottomColor:'#C4C4C4'}}>
                  <Picker
                    selectedValue={this.state.selectedId}
                    onValueChange={(itemValue) => {
                      if(itemValue !== "select campus")
                      this.setState({
                        selectedId: itemValue
                      })
                    }}
                  >
                      {pickerItems}
                  </Picker>
                </View>
                <Icon name="pencil" color='#C4C4C4' size={26} style={{width:'10%',marginTop:15}}/>
              </View>
              <InputView name='Major' ph='Major'/>
              <InputView name='Birth Date' ph='MM/DD/YY'/>
              <InputView name='Phone' ph='XXX-XXXXX-XXXX'/>
              <InputView name='Grad Year' ph='2019'/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    );
    }
}

    export default ProfilePage;