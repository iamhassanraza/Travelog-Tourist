import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from 'react-native';
import CategoryButton from '../Components/CategoryButton';
import DatePicker from 'react-native-datepicker';

export default class CreateNewPost extends Component {
  state = {
    Category: '',
    CategoryEventDate: '',
    Title: '',
    Description: '',
    Price : ''
  };

  changeState = cat => {
    this.setState({
      Category: cat,
    });
  };

  changeTitleState = title => {
    this.setState({
      Title: title
    })
  }

  changeDescriptionState = desc => {
    this.setState({
      Title: desc
    })
  }

  changePriceState = price => {
    this.setState({
      Price : price
    })
  }


  renderCategories = () => {
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 22, color: 'grey'}}> Select Category </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <CategoryButton
            title="Blog"
            bgclr={'rgba(229, 110, 73, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'Blog' ? 14 : null
            }></CategoryButton>

          <CategoryButton
            title="CampusGram"
            bgclr={'rgba(239, 149, 149, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'CampusGram' ? 14 : null
            }></CategoryButton>

          <CategoryButton
            title="Deals"
            bgclr={'rgba(207, 59, 232, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'Deals' ? 14 : null
            }></CategoryButton>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <CategoryButton
            title="Events"
            bgclr={'rgba(30, 199, 15, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'Events' ? 14 : null
            }></CategoryButton>

          <CategoryButton
            title="DIY"
            bgclr={'rgba(47, 144, 234, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'DIY' ? 14 : null
            }></CategoryButton>

          <CategoryButton
            title="Free & For Sale"
            bgclr={'rgba(230, 200, 48, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'Free & For Sale' ? 14 : null
            }></CategoryButton>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <CategoryButton
            title="Housing"
            bgclr={'rgba(25, 192, 215, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'Housing' ? 14 : null
            }></CategoryButton>

          <CategoryButton
            title="Jobs"
            bgclr={'rgba(218, 65, 0, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'Jobs' ? 14 : null
            }></CategoryButton>

          <CategoryButton
            title="Lost and Found"
            bgclr={'rgba(251, 136, 2, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'Lost and Found' ? 14 : null
            }></CategoryButton>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <CategoryButton
            title="News"
            bgclr={'rgba(60, 143, 128, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'News' ? 14 : null
            }></CategoryButton>

          <CategoryButton
            title="Random"
            bgclr={'rgba(138, 69, 250, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'Random' ? 14 : null
            }></CategoryButton>

          <CategoryButton
            title="Service"
            bgclr={'rgba(244, 61, 105, 0.75)'}
            onSelect={this.changeState}
            Elevation={
              this.state.Category === 'Service' ? 14 : null
            }></CategoryButton>
        </View>
      </View>
    );
  };

  renderDatePicker = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 22,
          marginRight: 10,
        }}>
        <DatePicker
          style={{width: '60%', justifyContent: 'center', alignSelf: 'center'}}
          date={this.state.date}
          mode="date"
          placeholder={
            this.state.CategoryEventDate
              ? this.state.CategoryEventDate
              : 'Select Date'
          }
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
              borderRadius: 8,
              borderColor: '#c5d1c8',
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({CategoryEventDate: date});
          }}
        />
      </View>
    );
  };

  renderPrice = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 20,
          marginRight: 20,
        }}>
        <Text style={{alignSelf: 'center', color: 'grey'}}>Set Price</Text>
        <TextInput
          placeholder="$ 0.00"
          style={{
            paddingLeft: '3%',
            marginLeft: '3%',
            width: 100,
            height: 35,
            borderRadius: 9,
            borderWidth: 0.5,
            borderColor: 'grey',
          }}
          onChangeText ={(text)=>{this.changePriceState(text)}}
        />
      </View>
    );
  };

  renderDescription = () => {
    return (
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <Text style={{fontSize: 17, color: 'grey'}}>
          Add Description (optional)
        </Text>
        <TextInput
          multiline={true}
          style={{
            color:"grey",
            width: '92%',
            borderWidth: 0.5,
            borderColor: 'grey',
            margin: 10,
            borderRadius: 8,
          }}
          onChangeText ={(text)=>{this.changeDescriptionState(text)}}
          ></TextInput>
      </View>
    );
  };

  renderTitle = () => {
    return (
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <Text style={{fontSize: 17, color: 'grey'}}>Title</Text>
        <TextInput
          style={{
            height: 40,
            width: '92%',
            borderWidth: 0.5,
            borderColor: 'grey',
            margin: 10,
            borderRadius: 8,
          }}
          onChangeText ={(text)=>{this.changeTitleState(text)}}
          ></TextInput>
      </View>
    );
  };

  renderShareButton = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <CategoryButton
          title="Share"
          bgclr={'rgba(47, 144, 234, 0.95)'}
          titlefontsize={{fontSize: 19, fontWeight: 'bold'}}
          style={{width: 300}}></CategoryButton>
      </View>
    );
  };










  render() {
    
    console.log(this.state.Price);
    console.log(this.state.CategoryEventDate);

    return (
      <ScrollView>
        {this.renderTitle()}
        {this.renderCategories()}
        {this.state.Category === 'Events' ? this.renderDatePicker() : null}
        {this.state.Category === 'Free & For Sale' ? this.renderPrice() : null}
        {this.renderDescription()}
        {this.renderShareButton()}
      </ScrollView>
    );
  }
}
