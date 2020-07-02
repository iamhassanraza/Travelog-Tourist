import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Container, Header, Content, Item, Input, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import ReportIcon from 'react-native-vector-icons/Octicons';
import {ThemeBlue} from '../Assets/Colors';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

class ReportPost extends Component {
  state = {
    reason: '',
    postId: undefined,
    description: '',
    error: 'No Reason Selected',
    post_id: this.props.navigation.getParam('PostId', null).postId,
  };

  onSubmission = async () => {
    const Token = await AsyncStorage.getItem('TOKEN');

    let response = await fetch(
      `${require('../config').default.production}api/v1/post/report`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({
          user_id: this.props.User.id,
          post_id: this.state.post_id,
          reason: this.state.reason,
          description: this.state.description,
        }),
      },
    );

    const postReport = await response.json();
    if (parseInt(response.status) === 400) {
      alert(postReport.message);
    } else if (parseInt(response.status) === 200) {
      this.props.navigation.navigate('HomeScreen');
    } else {
      alert('something went wrong');
    }
  };

  render() {
    return (
      // <ScrollView style={{paddingTop: Platform.OS == 'ios' ? '10%' : null}}>
      <Container style={{backgroundColor: 'white'}}>
        <Content>
          <TouchableOpacity>
            <Icon
              onPress={() => this.props.navigation.goBack()}
              name="ios-arrow-back"
              style={{
                color: 'red',
                marginTop: '5%',
                marginLeft: '4%',
                fontSize: 30,
                fontWeight: 'bold',
              }}
            />
          </TouchableOpacity>

          <ReportIcon
            onPress={() => this.props.navigation.goBack()}
            name="report"
            style={{
              color: 'red',
              alignSelf: 'center',
              fontSize: 60,
              fontWeight: 'bold',
            }}
          />
          <Text
            style={{
              color: '#f54952',
              alignSelf: 'center',
              fontSize: 25,
              marginTop: '5%',
              fontWeight: 'bold',
            }}>
            Report Post !
          </Text>

          <Text
            style={{
              color: '#f54952',
              paddingLeft: '10%',
              paddingRight: '10%',
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: '10%',
            }}>
            Please select a problem to continue
          </Text>
          <Text
            style={{
              color: '#f54952',
              paddingLeft: '10%',
              paddingRight: '10%',
              fontSize: 14,
              marginTop: '1%',
            }}>
            You can report the post after selecting the problem
          </Text>

          <View>
            {Platform.OS == 'ios' ? (
              <View>
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    borderRadius: 9,
                    backgroundColor:
                      this.state.reason === 'Absuive and harmful'
                        ? ThemeBlue
                        : null,
                  }}>
                  <Text
                    onPress={() => {
                      this.setState({reason: 'Absuive and harmful', error: ''});
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 9,
                      padding: 5,
                      alignItems: 'center',
                      alignSelf: 'center',

                      fontSize: 17,
                      borderColor:
                        this.state.reason === 'Absuive and harmful'
                          ? 'white'
                          : ThemeBlue,
                      color:
                        this.state.reason === 'Absuive and harmful'
                          ? 'white'
                          : ThemeBlue,
                    }}>
                    Absuive and harmful
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    backgroundColor:
                      this.state.reason === 'Inaccurate Information'
                        ? ThemeBlue
                        : null,
                    borderRadius: 9,
                  }}>
                  <Text
                    onPress={() => {
                      this.setState({
                        reason: 'Inaccurate Information',
                        error: '',
                      });
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 9,
                      padding: 5,
                      alignItems: 'center',
                      alignSelf: 'center',

                      fontSize: 17,
                      borderColor:
                        this.state.reason === 'Inaccurate Information'
                          ? 'white'
                          : ThemeBlue,
                      color:
                        this.state.reason === 'Inaccurate Information'
                          ? 'white'
                          : ThemeBlue,
                    }}>
                    Inaccurate Information
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: '5%',
                    backgroundColor:
                      this.state.reason === 'Sensitive or Inappropriate Image'
                        ? ThemeBlue
                        : null,
                    borderRadius: 9,
                  }}>
                  <Text
                    onPress={() => {
                      this.setState({
                        reason: 'Sensitive or Inappropriate Image',
                        error: '',
                      });
                    }}
                    style={{
                      borderWidth: 1,

                      padding: 5,
                      alignItems: 'center',
                      alignSelf: 'center',
                      borderRadius: 9,
                      fontSize: 17,
                      borderColor:
                        this.state.reason === 'Sensitive or Inappropriate Image'
                          ? 'white'
                          : ThemeBlue,
                      color:
                        this.state.reason === 'Sensitive or Inappropriate Image'
                          ? 'white'
                          : ThemeBlue,
                    }}>
                    Sensitive or inappropriate content
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <View style={{alignSelf: 'center', marginTop: '5%'}}>
                  <Text
                    onPress={() => {
                      this.setState({reason: 'Absuive and harmful', error: ''});
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 9,
                      padding: 5,
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor:
                        this.state.reason === 'Absuive and harmful'
                          ? ThemeBlue
                          : null,
                      fontSize: 17,
                      borderColor:
                        this.state.reason === 'Absuive and harmful'
                          ? 'white'
                          : ThemeBlue,
                      color:
                        this.state.reason === 'Absuive and harmful'
                          ? 'white'
                          : ThemeBlue,
                    }}>
                    Absuive and harmful
                  </Text>
                </View>

                <View style={{alignSelf: 'center', marginTop: '5%'}}>
                  <Text
                    onPress={() => {
                      this.setState({
                        reason: 'Inaccurate Information',
                        error: '',
                      });
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 9,
                      padding: 5,
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor:
                        this.state.reason === 'Inaccurate Information'
                          ? ThemeBlue
                          : null,
                      fontSize: 17,
                      borderColor:
                        this.state.reason === 'Inaccurate Information'
                          ? 'white'
                          : ThemeBlue,
                      color:
                        this.state.reason === 'Inaccurate Information'
                          ? 'white'
                          : ThemeBlue,
                    }}>
                    Inaccurate Information
                  </Text>
                </View>

                <View style={{alignSelf: 'center', marginTop: '5%'}}>
                  <Text
                    onPress={() => {
                      this.setState({
                        reason: 'Sensitive or Inappropriate Image',
                        error: '',
                      });
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 9,
                      padding: 5,
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor:
                        this.state.reason === 'Sensitive or Inappropriate Image'
                          ? ThemeBlue
                          : null,
                      fontSize: 17,
                      borderColor:
                        this.state.reason === 'Sensitive or Inappropriate Image'
                          ? 'white'
                          : ThemeBlue,
                      color:
                        this.state.reason === 'Sensitive or Inappropriate Image'
                          ? 'white'
                          : ThemeBlue,
                    }}>
                    Sensitive or inappropriate content
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={{}}>
            <Item style={{width: '80%', marginTop: 20, alignSelf: 'center'}}>
              <Input
                onChangeText={text => {
                  this.setState({description: text});
                }}
                placeholder="This post contains ..."
                placeholderTextColor="grey"
                style={{width: '80%', color: ThemeBlue}}
              />
            </Item>

            <Button
              onPress={() => {
                this.state.error === 'No Reason Selected'
                  ? alert('Select Reason')
                  : this.onSubmission();
              }}
              rounded
              style={{
                justifyContent: 'center',
                marginTop: '7%',
                backgroundColor: ThemeBlue,
                marginBottom: '2%',
                width: '40%',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 17,
                  marginTop: Platform.OS == 'ios' ? '-15%' : 0,
                  fontWeight: 'bold',
                }}>
                Done
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

mapStateToProps = state => {
  //this state will contain FULL redux store all the reducers data

  //use your required reducer data in props i.e reducer1

  return {User: state.User}; //isse ye reducer1 wala data as a props ajaega is component me (combinereducer me jo key assign ki thi wo use karna)
};

export default withNavigation(
  connect(
    mapStateToProps,
    null,
  )(ReportPost),
);
