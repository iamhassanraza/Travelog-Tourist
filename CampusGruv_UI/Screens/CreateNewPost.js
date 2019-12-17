import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback, ScrollView, TextInput} from 'react-native';
import CategoryButton from '../Components/CategoryButton';
import DatePicker from 'react-native-datepicker';

export default class CreateNewPost extends Component {
  state = {
    Category: '',
    CategoryEventDate: '2019-01-04'
  };

  changeState = cat => {
    this.setState({
      Category: cat,
    });
  };


  renderCategories = () => {
      return(
        <View>
            <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 22, color: 'grey'}}> Select Category </Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <CategoryButton
          title="Blog"
          bgclr={'rgba(229, 110, 73, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "Blog" ? 14 : null }
          ></CategoryButton>

        <CategoryButton
          title="CampusGram"
          bgclr={'rgba(239, 149, 149, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "CampusGram" ? 14 : null }
          ></CategoryButton>

        <CategoryButton
          title="Deals"
          bgclr={'rgba(207, 59, 232, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "Deals" ? 14 : null }
          ></CategoryButton>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <CategoryButton
          title="Events"
          bgclr={'rgba(30, 199, 15, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "Events" ? 14 : null }
          ></CategoryButton>

        <CategoryButton
          title="DIY"
          bgclr={'rgba(47, 144, 234, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "DIY" ? 14 : null }
          ></CategoryButton>

        <CategoryButton
          title="Free & For Sale"
          bgclr={'rgba(230, 200, 48, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "Free & For Sale" ? 14 : null }
          ></CategoryButton>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <CategoryButton
          title="Housing"
          bgclr={'rgba(25, 192, 215, 0.75)'}
          onSelect={this.changeState} 
          Elevation= {this.state.Category === "Housing" ? 14 : null }
          ></CategoryButton>

        <CategoryButton
          title="Jobs"
          bgclr={'rgba(218, 65, 0, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "Jobs" ? 14 : null }
          ></CategoryButton>

        <CategoryButton
          title="Lost and Found"
          bgclr={'rgba(251, 136, 2, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "Lost and Found" ? 14 : null }
          ></CategoryButton>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <CategoryButton
          title="News"
          bgclr={'rgba(60, 143, 128, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "News" ? 14 : null }
          ></CategoryButton>

        <CategoryButton
          title="Random"
          bgclr={'rgba(138, 69, 250, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "Random" ? 14 : null }
          ></CategoryButton>

        <CategoryButton
          title="Service"
          bgclr={'rgba(244, 61, 105, 0.75)'}
          onSelect={this.changeState}
          Elevation= {this.state.Category === "Service" ? 14 : null }
          ></CategoryButton>
      </View>
        </View>
      )
  }



renderDatePicker = () => {
    return(

        <View style={{flexDirection:"row", justifyContent:"flex-end", marginTop:22, marginRight:10}}>
          <DatePicker
            style={{width: '60%', justifyContent:"center", alignSelf:"center"}}
            date={this.state.date}
            mode="date"
            placeholder="Select Date"
            format="YYYY-MM-DD"
            minDate="2019-05-04"
            maxDate="2022-05-04"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                
              },
              dateInput: {
                paddingLeft: 2,
                borderRadius:8,
                borderColor:"#c5d1c8"
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({CategoryEventDate: date});
            }}
          />
        </View>

    )
}



renderPrice = () => {
    return(

        <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
            <Text style={{borderWidth:1,alignSelf:"center"}}>Set Price</Text>
            <TextInput placeholder="$ 0.00" style={{ width: 180, height:30 ,borderWidth:1, alignSelf:"center" }} />
        </View>
    )
}




  render() {
    console.log(this.state.Category);
    return (
     <ScrollView>

         {this.renderCategories()}
         {this.state.Category === 'Events' ? this.renderDatePicker() : null}
         {this.state.Category === 'Free & For Sale' ? this.renderPrice() : null}
     </ScrollView>
    );
  }
}
