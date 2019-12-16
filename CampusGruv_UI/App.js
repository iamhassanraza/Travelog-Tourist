import React, { Component } from 'react'
<<<<<<< HEAD
import { Text, View, ScrollView } from 'react-native'
import Category from './Components/Component1';
import {CatBrown,Catlight,CatBlue,CatGreen,Catpurple,CatLightBrown,CatLightBlue,CatSimit,CatRandom,CatService} from './Assets/Colors';
export default class App extends Component {
  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
        <ScrollView>
        
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10,marginTop:10}}>
        <Category title="Blog " color={CatBrown} uri={require('./Assets/Images')}/>
        <Category title="Campusgram" color={Catlight}/>
        </View>
      
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category title="Deals " color={Catpurple}/>
        <Category title="DIY" color={CatBlue}/>
        </View>
  
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category title="Events " color={CatGreen}/>
        <Category title="Free & For Sale" color={CatLightBrown}/>
        </View>
  
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category title="Housing " color={CatLightBlue}/>
        <Category title="Jobs" color={CatLightBrown}/>
        </View>

        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category title="Lost & Found " color={CatLightBrown}/>
        <Category title="News" color={CatSimit}/>
        </View>

        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category title="Random" color={CatRandom}/>
        <Category title="Services" color={CatService}/>
        </View>

        </ScrollView>
       </View>
=======
import { Text, View } from 'react-native'
import HomeScreen from './Screens/HomeScreen'

import CreatePost from './Screens/CreatePost'



export default class App extends Component {
  render() {
    return (
      <View>
        <HomeScreen />
      </View>
>>>>>>> b8c3a58bfe736908a5ab40737235b5ae8375a8d6
    )
  }
}
