import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import {Header} from 'react-native-elements'
import Category from '../Components/Component1';
import {CatBrown,Catlight,CatBlue,CatGreen,Catpurple,CatLightBrown,CatLightBlue,CatSimit,CatRandom,CatService} from '../Assets/Colors';
export default class CategoryList extends Component {
  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
        <ScrollView>
        <Header containerStyle={{width:'100%',height:60,backgroundColor:CatLightBlue}}
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'Dashboard', style: { color: '#fff',fontWeight:'bold' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10,marginTop:10}}>
        <Category title="Borritos " color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/06/Burrito-1.jpg' amount='500'/>
        <Category title="Bowls" color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/06/Bowl.jpg' amount='500'/>
        </View>
      
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category title="Arepas " color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/06/Quesidilla.jpg' amount='500'/>
        <Category title="Empanadas" color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/06/Arepa.jpg' amount='500'/>
        </View>
  
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category title="Tacos " color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/06/Tacos.jpg' amount='500'/>
        <Category title="Desert" color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/06/Sides.jpg' amount='500'/>
        </View>
  
        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category title="Kit Bowl " color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/07/Bowl_Chips_Web-1.jpg' amount='500'/>
        <Category title="Kid Borritos" color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/06/KIDS-BURRITOS.jpg' amount='500'/>
        </View>

        <View style={{flexDirection:"row",marginBottom:35,marginLeft:10}}>
        <Category title="Beverages " color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/06/BEVERAGES.jpg' amount='500'/>
        <Category title="Cold" color={CatBlue} uri='https://www.andalelatinogrill.com/wp-content/uploads/2017/06/BEVERAGES.jpg'amount='500' />
        </View>


        </ScrollView>
       </View>
    ) 
}
}
