import React, {Component} from 'react';
import {Text, View, ImageBackground, Image, Dimensions} from 'react-native';
import ViewsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

class PostCard extends Component {

  state = {

    width: undefined,
    height: undefined
  }


  componentDidMount() {
    Image.getSize(
      this.props.imageurl,
      (srcWidth, srcHeight) => {
        const maxHeight = Dimensions.get('window').height / 2;
        const maxWidth = Dimensions.get('window').width / 2;
        //console.log(srcWidth,srcHeight)
        //console.log("width wala",maxWidth / srcWidth)
        //console.log("height wala",maxHeight / srcHeight)
        const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        this.setState({width: srcWidth * ratio, height: srcHeight * ratio});
      },
      error => {},
    );
  }



  render() {
    return (
      <TouchableWithoutFeedback
        style={{
          margin: '2%',
          borderColor: 'red',
        }}
        onPress={() =>
          this.props.navigation.push('PostDetail', {
            PostData: {
              uri: this.props.imageurl,
              title: this.props.title,
              userAvatar: this.props.userdp ,
              username: this.props.name,
              description: this.props.description,
            },
          })
        }>
        <View style={{}}>
          <Image
            source={{uri: this.props.imageurl}}
            style={{
              width: '100%',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              height: this.state.height < 300 ? this.state.height : 200,
            }}
            resizeMode="cover"></Image>
         
            <Text style={{color:"white", fontWeight:"bold", fontSize:12,  position: 'absolute',
            //  marginTop:"10%",
            //  marginLeft:"45%",
            right: 5,
            top:10,
              justifyContent: 'center',
              alignItems: 'center',
              padding:3,
              backgroundColor:`rgba(${this.props.categoryColor},0.9)`,
              borderRadius:5,}}>{this.props.categoryName}</Text>
        
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            paddingLeft: '5%',
          }}>
          <View
            style={{
              //flex: 1,
              flexDirection: 'row',
            }}>
            <View style={{}}>
              <Text style={{}}>{this.props.title}</Text>
            </View>
          </View>
          <View
            style={{
              //flex: 1,
              marginTop: '1%',
              paddingBottom: '3%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 2}}>
              <Image
                source={{
                  uri: this.props.userdp    }}
                style={{
                  width: 30,
                  borderColor: '#616963',
                  borderWidth: 0.3,
                  height: 30,
                  borderRadius: 50,
                }}></Image>
            </View>
            <View style={{flex: 6, alignSelf: 'center'}}>
              <Text style={{color: 'grey'}}>{this.props.name}</Text>
            </View>
            <View style={{flex: 1}}>
              <ViewsIcon color="grey" name="eye" />
              <Text style={{fontSize: 7, color: 'grey', marginTop: -2}}>
                2.4k
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(PostCard);
