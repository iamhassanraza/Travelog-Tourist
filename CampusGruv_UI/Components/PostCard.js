import React, {Component} from 'react';
import {Text, View, ImageBackground, Image, Dimensions} from 'react-native';
import ViewsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation'


class PostCard extends Component {

  componentDidMount() {
    Image.getSize(this.props.imageurl, (srcWidth, srcHeight) => {
      const maxHeight = Dimensions.get('window').height;
      const maxWidth = Dimensions.get('window').width;
      //console.log(srcWidth,srcHeight)
      //console.log("width wala",maxWidth / srcWidth)
      //console.log("height wala",maxHeight / srcHeight)
      const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
      this.setState({ width: srcWidth * ratio, height: srcHeight * ratio });
    }, (error) => {

    }
    );
  }

  state = {

    width: undefined,
    height: undefined
  }

  render() {
 
    return (
      <TouchableWithoutFeedback 
        style = {
          {
            margin: '2%', 
            borderColor:'red'
          }
        }
        onPress = {() => this.props.navigation.push('PostDetail',{
          PostData:{
            uri: this.props.imageurl,
            title:this.props.title,
            userAvatar:this.props.imageurl,
            username:this.props.name,
            description:this.props.description
          }
        })}
      >
        <View style={{ }}>
          <Image
              source={{uri: this.props.imageurl}}
              style={{width: '100%',borderTopLeftRadius: 15,
              borderTopRightRadius: 15, height: this.state.height<300? this.state.height : 200 }}
              resizeMode='cover'
          >
          </Image>
        </View>
        <View style={{backgroundColor:'white',borderBottomLeftRadius: 15, borderBottomRightRadius: 15, paddingLeft: '5%'}}>
          <View
            style={{
              //flex: 1,
              flexDirection: 'row'
            }}>
            <View style={{}}>
              <Text style={{}}>{this.props.title}</Text>
            </View>
          </View>
          <View
            style={{
              //flex: 1,
              marginTop:'1%',
              paddingBottom:'3%',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <View style={{flex:2}}>
              <Image
                source={{uri: 'https://depositphotos.com/121231710/stock-illustration-male-default-avatar-profile-gray.html'}}
                style={{width: 30,borderColor:'#616963', borderWidth:0.3, height: 30, borderRadius: 50}}>
              </Image>
            </View>
            <View style={{flex:6, alignSelf: 'center'}}>
              <Text style={{color:'grey'}}>{this.props.name}</Text>
            </View>
            <View style={{flex:1}}>
              <ViewsIcon color="grey" name="eye"/>
              <Text style={{fontSize:7, color: 'grey', marginTop:-2}}>2.4k</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(PostCard);