import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import {Header} from 'react-native-elements'
import Category from '../Components/CategoryComp';
import {CatBrown,Catlight,CatBlue,CatGreen,Catpurple,CatLightBrown,CatLightBlue,CatSimit,CatRandom,CatService} from '../Assets/Colors';
export default class CategoryList extends Component {
  render() {
    return (
      <View style={{flex:1,margin:10}}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection:"row",marginBottom:25,flex:1}}>
        <Category title="Book" color={CatBlue} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        <Category title="Book" color={CatBrown} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85' />
        </View>
      
        <View style={{flexDirection:"row",marginBottom:25,flex:1}}>
        <Category title="Book" color={CatGreen} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85' />
        <Category title="Book" color={Catlight} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        </View>
  
        <View style={{flexDirection:"row",marginBottom:25,flex:1}}>
        <Category title="Book" color={CatLightBlue} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        <Category title="Book" color={CatLightBlue} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        </View>
  
        <View style={{flexDirection:"row",marginBottom:25,flex:1}}>
        <Category title="Book" color={Catpurple} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        <Category title="Book" color={CatSimit} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        </View>

        <View style={{flexDirection:"row",marginBottom:25,flex:1}}>
        <Category title="Book" color={CatRandom} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        <Category title="Book"  color={CatService} uri='https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?w=800&quality=85'/>
        </View>


        </ScrollView>
       </View>
    ) 
}
}
