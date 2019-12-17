import React, { Component } from 'react'
import { Text, View, Picker } from 'react-native'

const textcolor = '#b3b3b5';
const headingclr = '#6e706f';

export default class CategoryList extends Component {

    state = {
        categoryName : "",
        categoryId : null
    }

    
      
    renderCategories = () => {
        return (
            <View style={{borderWidth:1, width:'100%', alignSelf:"center", borderColor:textcolor}}>
            <Text
              style={{
                marginLeft:18,
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: '2%',
                color: headingclr,
                paddingTop:10
               
              }}>
              Select Category
            </Text>
            <Picker
              selectedValue={this.state.language}
              style={{width: '90%', alignSelf: 'center', color:"grey"}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({categoryName: itemValue, categoryId:itemIndex})
               
              }>
              <Picker.Item label="Blog" value="Blog" />
              <Picker.Item label="Campusgram" value="Campusgram" />
              <Picker.Item label="Deals" value="Deals" />
              <Picker.Item label="DIY" value="DIY" />
              <Picker.Item label="Events" value="Events" />
              <Picker.Item label="Free and For Sale" value="Free and For Sale" />
              <Picker.Item label="Housing" value="Housing" />
              <Picker.Item label="Jobs" value="Jobs" />
              <Picker.Item label="Lost and Found" value="Lost and Found" />
              <Picker.Item label="News" value="News" />
              <Picker.Item label="Random" value="Random" />
              <Picker.Item label="Services" value="Services" />
 
        
            </Picker>

          </View>
        );
      };
    


    render() {
       console.log(this.state);
  
        return (
            <View>
                {this.renderCategories()}
            </View>
        )
    }
}
