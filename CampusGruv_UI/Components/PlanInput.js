import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ThemeBlue} from '../Assets/Colors';
import {Item, Input} from 'native-base';

export default class PlanInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day_no: this.props.data.day_no,
      title: '',
      description: '',
      done: false,
    };
  }

  onDone = () => {
    if (this.state.title === '' || this.state.description === '') {
      alert("Fields can't be empty");
      return;
    }
    this.setState({done: true});
    this.props.changeState({
      day_no: this.state.day_no,
      title: this.state.title,
      description: this.state.description,
    });
  };

  render() {
    return !this.state.done ? (
      <View
        style={{
          backgroundColor: 'white',
          margin: '5%',
          padding: '2%',
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: 'grey',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: '3%',
            color: ThemeBlue,
          }}>
          {'DAY ' + this.state.day_no}
        </Text>
        <View>
          <Item>
            <Input
              disabled={this.state.done}
              placeholder="title"
              returnKeyType="done"
              value={this.state.title}
              onChangeText={text => {
                this.setState({title: text});

                // this.onChange('price', text);
                // this.setState(prevState => {
                //   var items = [...prevState.plan];
                //   console.log(items, 'itemsss');
                //   var item = {...items[item]};
                //   console.log('itemm', item);
                //   item.title = text;
                //   items[item] = item;
                //   return {
                //     plan: items,
                //   };
                // });
              }}
            />
          </Item>
          <Item>
            <Input
              disabled={this.state.done}
              placeholder="description / places"
              multiline={true}
              returnKeyType="done"
              value={this.state.description}
              onChangeText={text => {
                this.setState({description: text});
              }}
            />
          </Item>
          <TouchableOpacity onPress={() => this.onDone()}>
            <Text
              style={{
                backgroundColor: this.state.done ? 'gray' : ThemeBlue,
                color: 'white',
                textAlign: 'center',
                marginTop: 15,
                marginBottom: 5,
                alignSelf: 'center',
                width: 50,
                height: 30,
                padding: '2%',
                borderRadius: 5,
              }}>
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  }
}
