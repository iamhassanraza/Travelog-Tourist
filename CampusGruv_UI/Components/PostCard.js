import React, {Component} from 'react';
import {Text, View, ImageBackground, Image, Dimensions} from 'react-native';
import ViewsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';

class PostCard extends Component {
  state = {
    width: undefined,
    height: undefined,
  };

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
      error => {
        () => console.log(error);
      },
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={{
          marginVertical: 8,
          marginHorizontal: 5,
          borderColor: 'red',
          elevation: 3,
          shadowOffset: {width: 2, height: 4},
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOpacity: 0.5,
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          borderTopRightRadius: 7,
          borderTopLeftRadius: 7,
        }}
        onPress={() =>
          this.props.navigation.navigate('PostDetail', {
            PostData: {
              uri: this.props.imageurl,
              title: this.props.title,
              postId: this.props.postId,
              likeStatus: this.props.userWiseLike[0] ? true : false,
              saveStatus: this.props.userSavedPost[0] ? true : false,
              isFollowing: this.props.isFollowing,
              userAvatar: this.props.userdp,
              userId: this.props.userId,
              first_name: this.props.first_name,
              last_name: this.props.last_name,
              description: this.props.description,
              comments: this.props.comments,
              views: this.props.views,
              height: this.state.height,
            },
          })
        }>
        <View style={{}}>
          <Image
            source={{uri: this.props.imageurl}}
            style={{
              width: '100%',
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
              height: 150,
              // height: this.state.height < 300 ? this.state.height : 200,
            }}
            resizeMode="cover"
          />

          {/* <View
            style={{
              position: 'absolute',
              //  marginTop:"10%",
              //  marginLeft:"45%",
              right: 5,
              top: 10,
              borderRadius: 5,
              backgroundColor: `rgba(${this.props.categoryColor},0.8)`,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
                // backgroundColor:`rgba(${this.props.categoryColor},0.8)`,
              }}>
              {this.props.categoryName}
            </Text>
          </View> */}
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            paddingLeft: '5%',
          }}>
          <View
            style={{
              //flex: 1,
              flexDirection: 'row',
            }}>
            <View style={{paddingVertical: 5}}>
              <Text style={{fontWeight: '600'}}>{this.props.title}</Text>
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
                source={
                  this.props.userdp === '' || !this.props.userdp
                    ? defaultAvatar
                    : {
                        uri: this.props.userdp,
                      }
                }
                style={{
                  width: 30,
                  borderColor: '#616963',
                  borderWidth: 0.3,
                  height: 30,
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={{flex: 6, alignSelf: 'center'}}>
              <Text style={{color: 'grey'}}>
                {this.props.first_name +
                  ' ' +
                  this.props.last_name.charAt(0) +
                  '.'}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                marginRight: '4%',
              }}>
              <ViewsIcon color="grey" name="eye" />
              <Text
                style={{
                  fontSize: 7,
                  color: 'grey',
                  marginTop: -2,
                  alignSelf: 'center',
                }}>
                {this.props.views}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(PostCard);
