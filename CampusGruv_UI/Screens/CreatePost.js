import React, { Component } from 'react'
import { Text, View, Picker } from 'react-native'

const textcolor = '#b3b3b5';
const headingclr = '#6e706f';

export default class CreatePost extends Component {

    state = {
        category : ""
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
                this.setState({category: itemValue})
               
              }>
              <Picker.Item label="Hunza" value="java" />
              <Picker.Item label="Kashmir" value="js" />
              <Picker.Item label="Mansehra" value="Mansehra" />
              <Picker.Item label="Gilgit" value="" />
              <Picker.Item label="Skardu" value="Skardu" />
              <Picker.Item label="Chitral" value="Chitral" />
              <Picker.Item label="Swat" value="Swat" />
              <Picker.Item label="Abbottabad" value="Abbottabad" />
              <Picker.Item label="Faisalabad" value="Faisalabad" />
              <Picker.Item label="Islamabad" value="Islamabad" />
              <Picker.Item label="Lahore" value="Lahore" />
              <Picker.Item label="Multan" value="Multan" />
              <Picker.Item label="Karachi" value="Karachi" />
              
        
            </Picker>

          </View>
        );
      };
    


    render() {
       const Images = this.props.navigation.getParam('Images', 'nothing to render');
      console.log(Images,'===================== imagess ============================')
  
        return (
            <View>
                {this.renderCategories()}
            </View>
        )
    }
}
