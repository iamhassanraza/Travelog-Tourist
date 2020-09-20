import React, {Component} from 'react';
import {Text, View,TouchableWithoutFeedback} from 'react-native';
import MyIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeBlue as ThemeColor} from '../Assets/Colors';



export default class PlanItem extends Component {
  state = {
    expand: false,
  };

  render() {
    return (
      <View style={{flexDirection: 'row', flex: 1,}}>
        <View style={{flexDirection: 'column', alignItems: 'center',flex:1}}>
          <Text style={{paddingTop:12}}>
          {this.props.id === 1 ? (<MyIcon name="map-marker" color={ThemeColor} size={28}></MyIcon>) : this.props.lastitem ? (  <MyIcon name="flag-variant" color={ThemeColor} size={25}></MyIcon>) : (  <MyIcon name="circle-outline" color={ThemeColor} size={20}></MyIcon>) }
          </Text>
         {this.props.lastitem ? undefined : ( <View
            style={{
              borderWidth: 1,
              flex: 1,
              borderColor:ThemeColor,
              borderStyle: 'dotted',
              borderRadius: 1,
              marginBottom:-14,
              marginTop:-3
            }}></View>)}
        </View>

        {/*  Text wala part */}

        <View style={{flex: 10,borderBottomColor:'#B2B7BA',borderBottomWidth:1,marginRight:10}}>
          <View style={{padding: 10,paddingLeft:0}}>
            <TouchableWithoutFeedback onPress={()=>{
                this.setState((prevState) => ({
                    expand: !prevState.expand
                  }));
            }}>

            
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{fontSize: 17, fontWeight: 'bold',color:'#00001a'}}>{this.props.title}
              </Text>
              <Text>
                <MyIcon name={this.state.expand ? 'menu-up' : 'menu-down'} size={24} color={ThemeColor}></MyIcon>
              </Text>
            </View>
            </TouchableWithoutFeedback>
            
            {this.state.expand ? (<View>
              <Text style={{fontWeight: '100', fontSize: 13, lineHeight: 20}}>
                {this.props.details}
              </Text>
            </View>) : undefined}
            
          </View>
        </View>
      </View>
    );
  }
}
