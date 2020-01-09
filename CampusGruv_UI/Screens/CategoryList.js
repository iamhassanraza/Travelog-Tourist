import React, {Component} from 'react';
import {Text, View, ScrollView, FlatList, AsyncStorage,ActivityIndicator} from 'react-native';
import Category from '../Components/CategoryComp';
import { withNavigation } from 'react-navigation';

export default class CategoryList extends Component {
  state = {
    Data: undefined,
    Category_id: undefined,
    CategoryName: "",
    loading:false
  };



  selectCategory = (cat) => {
    this.setState({Category_id: cat},()=>{
      this.props.navigation.navigate("HomeScreen", {
        CategoryID : this.state.Category_id ,
        CategoryName: this.state.CategoryName
      })
    })
  }

  // move = (cat_id,cat_name) =>{
 
  // }
  



  componentDidMount = async() =>{
  this.setState({loading:true})
   const Token = await AsyncStorage.getItem('TOKEN')
    fetch('https://campus-gruv-heroku.herokuapp.com/api/v1/post/categories', {
      headers: {
        Authorization:
          `Bearer ${Token}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('response==========>', responseJson);
        this.setState({Data: responseJson,loading:false});
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    // console.log(this.state.Category_id);
    return (
      <View style={{flex: 1}}>
        {this.state.loading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator color='#1192d1' size={50} style={{marginBottom:'5%'}}></ActivityIndicator>
          <Text>Loading Categories</Text>
        </View> : (     <FlatList
          style={{margin: 10}}
          numColumns={2}
          data={this.state.Data}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            console.log(item.id)
            return (
             
             
   
                  <Category
              description={item.description}
              color={item.rgba_colors}
              image={item.category_image}
              cat_id={item.id}
              onSelect1={this.selectCategory}
              // onSelect2={this.move}
            />
             
           
          )} }
        />) }
   
      </View>
    );
  }
}
