import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import {Header} from 'react-native-elements'
import Category from '../Components/CategoryComp';
import {CatBrown,Catlight,CatBlue,CatGreen,Catpurple,CatLightBrown,CatLightBlue,CatSimit,CatRandom,CatService} from '../Assets/Colors';
export default class CategoryList extends Component {
  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
        <ScrollView>
     
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10,marginTop:10}}>
        <Category title='test' color={CatBlue} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        <Category  color={CatBrown} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85' />
        </View>
      
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category  color={CatGreen} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85' />
        <Category  color={Catlight} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        </View>
  
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category  color={CatLightBlue} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        <Category  color={CatLightBlue} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        </View>
  
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category color={Catpurple} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        <Category color={CatSimit} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        </View>
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category color={CatRandom} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        <Category  color={CatService} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        </View>
        </ScrollView>
       </View>
    ) 
}
}