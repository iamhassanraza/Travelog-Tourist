import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import InputView from '../Components/ProfileEdit/InputViews';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Item, Picker, Content, Input} from 'native-base';

export default class CreateOrganization extends Component {

    state = {
        imageUri: '',
        campuses: [],
        currentCampus: {},
        selectedCampus: null,
        selectedId: null,
        text: 'hello',
        organizationName: '',
        organizationEmail:'',
        organizationWebsite:'',
        organizationMembers:[],
        focused: false,
        Spinner: false,
      };

   


    render() {

        let pickerItems = this.state.campuses[0]
      ? this.state.campuses.map((s, i) => {
          // if (s.id !== this.state.selectedId)
          return <Picker.Item key={i} value={s.id} label={s.description} />;
        })
      : null;
        return (
            <View>
                <Text> textInComponent </Text>
                <View
            style={{
              borderTopColor: '#C4C4C4',
              borderTopWidth: 0.5,
              paddingBottom: 40,
              backgroundColor: '#f9fdfe',
              marginTop: Dimensions.get('window').height > 800 ? 50 : 20,
            }}>
            <InputView
              name="Organization"
              ph="Enter Organization"
              value={this.state.organizationName}
              changestate={text => {
                this.setState({organizationName: text});
              }}
            />
            {/* <InputView name='Campus' ph='University of Pittsburgh'/> */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 15,
                  marginLeft: 10,
                  width: '25%',
                }}>
                Campus
              </Text>
              <View
                style={{
                  width: '60%',
                  marginTop: 5,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#C4C4C4',
                }}>
                <Picker
                  textStyle={{paddingLeft: 0}}
                  selectedValue={this.state.selectedId}
                  onValueChange={itemValue => {
                    if (itemValue !== 'select campus') {
                      this.setState({
                        selectedId: itemValue,
                      });
                    }
                  }}>
                  {pickerItems}
                </Picker>
              </View>
              <Icon
                name="pencil"
                color="#C4C4C4"
                size={26}
                style={{width: '10%', marginTop: 15}}
              />
            </View>
            <InputView
              multiline={true}
              name="Email"
              ph="Enter email"
              value={this.state.organizationEmail}
              changestate={text => {
                this.setState({organizationEmail: text});
              }}
            />
            <InputView
              multiline={true}
              name="Website"
              ph="Enter your website"
              value={this.state.organizationWebsite}
              changestate={text => {
                this.setState({organizationWebsite: text});
              }}
            />
            <InputView
              name="Members"
              ph="Add Membors"
              value={this.state.organizationMembers}
              changestate={text => {
                this.setState({organizationMembers: text});
              }}
              />
            </View>
        
        </View>)
    }
}
