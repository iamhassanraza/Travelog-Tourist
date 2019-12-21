import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, Dimensions, Platform,TextInput ,TouchableHighlight,AsyncStorage,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserProfile extends React.Component {
  static navigationOptions = {
    header: null,
  }
    constructor(props) {
      super(props);
      this.state = {
        resta: []
      };
    }


    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };


    render() {
      // const { navigate } = this.props.navigation;
      return (
          <View>
              {/* EDIT PROFILE BUTTON */}
              <View style={{flexDirection:'row',justifyContent:'flex-end'}}>

              
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-end',margin:10}} onPress={()=>{
              this.props.navigation.navigate('editprofile')
            }}>
              <Text style={{color:'#ACACAC',borderWidth:0.5,padding:5,borderColor:'#ACACAC',borderRadius:10}}>Edit Profile</Text>
            </TouchableOpacity>   
             
            <TouchableHighlight style={{flexDirection:'row',justifyContent:'flex-end',margin:10}} onPress={this._signOutAsync}>
              <Text style={{color:'#ACACAC',borderWidth:0.5,padding:5,borderColor:'#ACACAC',borderRadius:10}}>Logout</Text>
            </TouchableHighlight>
            </View>


            {/* IMAGE and NAME  */}
          <View style={{flexDirection:'row',marginLeft:10}}>
          <Image source={{uri:'https://img.freepik.com/free-photo/beautiful-girl-stands-near-walll-with-leaves_8353-5378.jpg'}} style={{width:100,height:100,borderRadius:50}} />
          <View style={{marginTop:20,marginLeft:5}}>
            <Text style={{fontSize:28,fontWeight:'bold',color:'#727272'}}>Jessica Z.</Text>
            <Text style={{fontSize:18,color:'#727272'}}>University of Pittsurgh</Text>
          </View>
          </View>

            {/* FOLLORWERS */}
            <View style={{flexDirection:'row',marginLeft:10,marginTop:15}}>
        <Text style={{color:'#727272',fontSize:18,fontWeight:'bold'}}>75 </Text>
        <Text style={{color:'#B4B8BA',fontSize:18,fontWeight:'bold'}}>Posts </Text>
        <Text style={{color:'#727272',fontSize:18,fontWeight:'bold'}}>1204 </Text>
        <Text style={{color:'#B4B8BA',fontSize:18,fontWeight:'bold'}}>Followers </Text>
        <Text style={{color:'#727272',fontSize:18,fontWeight:'bold'}}>1204 </Text>
        <Text style={{color:'#B4B8BA',fontSize:18,fontWeight:'bold'}}>Following </Text>
            </View>

{/* SEARCH AND POST */}
<View style={{flexDirection:'row',marginTop:20,justifyContent:'space-around'}}>



        <View style={{flexDirection:'row',borderWidth:1,borderColor:'#C4C4C4',width:'60%',marginLeft:0,borderRadius:15}}>
        <Icon name="search" color='#C4C4C4' size={26} style={{margin:10}}/>
        <TextInput
        style={{width:'100%',fontSize:20,color:'#ACACAC'}}
        placeholder='Search'
                        // value={this.state.password}
                        // onChangeText={password => this.setState({ password })}
                      />
        </View>

<View style={{flexDirection:'row',marginTop:15,marginLeft:10}}>
<Text style={{fontSize:20,fontWeight:'bold',color:'#0C91CF'}}>Posts </Text>
<View style={{height:20,width:2,borderColor:'#B4B8BA',borderWidth:1,backgroundColor:'#B4B8BA'}}/>
<Text style={{fontSize:20,fontWeight:'bold',color:'#B4B8BA'}}> Saves</Text>
</View>
  </View>


          </View>
        );
      }
    }

    export default UserProfile;