import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import TextEncoding from 'text-encoding';
import defaultAvatar from '../Assets/Images/defaultAvatar.jpg';
import FastImage from 'react-native-fast-image';
import {SwipeRow} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

class Comment extends Component {
  deleteComment = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');
    var Response = null;
    Response = await fetch(
      `${require('../config').default.production}api/v1/comment/delete`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          comment_id: this.props.commentId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      },
    );
    const JsonResponse = await Response.json();
    console.log('response', JsonResponse);
    this.props.deleteComment(this.props.commentId);
  };

  render() {
    TextDecoder = TextEncoding.TextDecoder;
    return (
      <View style={styles.container}>
        <View style={styles.standalone}>
          <SwipeRow
            stopLeftSwipe={100}
            rightOpenValue={-35}
            leftOpenValue={35}
            disableRightSwipe>
            <View style={styles.standaloneRowFront}>
              {(this.props.userId === this.props.User.id ||
                this.props.User.id === this.props.postUserId) && (
                <View>
                  <Icon
                    onPress={() => this.deleteComment()}
                    name="delete"
                    size={25}
                    color="red"
                  />
                </View>
              )}
            </View>
            <View style={styles.standaloneRowBack}>
              <View
                style={{
                  width: '100%',
                  // backgroundColor: '#e1e1e1',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <FastImage
                  source={
                    this.props.dp === '' || !this.props.dp
                      ? defaultAvatar
                      : {
                          uri: this.props.dp,
                        }
                  }
                  style={{width: 35, height: 35, borderRadius: 17.5}}
                />

                <View
                  style={{
                    width: '88%',
                    flexDirection: 'column',
                    borderRadius: 10,
                    // backgroundColor: '#e1e1e1',
                    backgroundColor: '#e4e7ed',

                    marginLeft: '2%',
                    paddingLeft: '2%',
                    paddingVertical: '1.5%',
                  }}>
                  <Text style={{fontSize: 10}}>{this.props.name}</Text>
                  <Text style={{fontSize: 14}}>{this.props.comment}</Text>
                </View>
              </View>
            </View>
          </SwipeRow>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: '1%',
    flex: 1,
  },
  standalone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  standaloneRowFront: {
    position: 'absolute',
    top: 5,
    right: 8,
  },
  standaloneRowBack: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: '2%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  backTextWhite: {
    color: '#FFF',
  },
  spacer: {
    height: 50,
  },
});

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default connect(
  mapStateToProps,
  null,
)(Comment);
