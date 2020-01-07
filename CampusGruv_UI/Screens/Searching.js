import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, FlatList,RefreshControl,TextInput, AsyncStorage} from 'react-native';
import {ThemeBlue} from '../Assets/Colors';
import AvatarUserStatus from '../Components/AvatarUserStatus';
import AvatarCampusStatus from '../Components/AvatarCampusStatus';
import PostList from '../Components/PostsList'
import HomeScreen from './HomeScreen';
import i1 from '../Assets/Images/lahore.jpg'
import i2 from '../Assets/Images/book.jpg'
import i3 from '../Assets/Images/ema.jpg'
import i4 from '../Assets/Images/mansehra.jpg'
import i5 from '../Assets/Images/samandarkatha.jpg'
import RenderCards from '../Components/RenderCards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContentLoader, {Rect} from 'react-content-loader/native';



export default class Searching extends React.PureComponent {
  state = {
    selection: 'Feed',
    posts: [],
    refreshing: false,
    loading:false,
    error: false,
    total: undefined,
    Users : [],
    Campuses : [],
    search: ""
  };


  fetchFeed = async (text) => {

        const Token = await AsyncStorage.getItem('TOKEN');
        const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_search&description=${text}&page=1`,{
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        const JsonResponse = await Response.json();
        console.log(JsonResponse.message);

        if(parseInt(Response.status)=== 400) {
           
            this.setState({error : true})
        }
        else if (parseInt(Response.status)=== 200){
           
            if(JsonResponse.total > 0) {
              this.setState({posts : JsonResponse.data})
            }

            else if (JsonResponse.total === 0) {
              this.setState({total: 0})
            }  
        }
  }



  fetchUsers = async (text) => {

    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/search/user?type=user&description=${text}&page=1`,{
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    const JsonResponse = await Response.json();
    
    if(parseInt(Response.status)=== 400) {
       
        this.setState({error : true})
    }
    else if (parseInt(Response.status)=== 200){
      
        if(JsonResponse.total > 0) {
          this.setState({Users : JsonResponse.data})
        }

        else if (JsonResponse.total === 0) {
          this.setState({total: 0})
        }  
    }
}



fetchCampuses = async (text) => {

  const Token = await AsyncStorage.getItem('TOKEN');
  const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/search/campus?description=${text}&page=1`,{
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  const JsonResponse = await Response.json();
  if(parseInt(Response.status)=== 400) {
    
      this.setState({error : true})
  }
  else if (parseInt(Response.status)=== 200){
      
      if(JsonResponse.total > 0) {
        this.setState({Campuses : JsonResponse.data})
      }

      else if (JsonResponse.total === 0) {
        this.setState({total: 0})
      }  
  }
}



SearchItems = (text) => {
  if(this.state.selection === "Feed") {
    this.fetchFeed(text);
    console.log("feedddddddddddddddd");
  }

  else if(this.state.selection === 'Users'){
    this.fetchUsers(text);
    console.log("userrrrrrrrrrrrrrrrrrr");
  }

  else if(this.state.selection === 'Campuses') {
    this.fetchCampuses(text);
    console.log("camppppppppppppp");
  }
  
  else{

    console.log("teeno nahi chalay");

  }
}


  // dataUsers = [
  //   {name: 'Jack Jones', follow: false, pic: i1},
  //   {name: 'Frenkie De Jong', follow: true , pic : i2},
  //   {name: 'Lucas Morra', follow: false , pic : i3},
  //   {name: 'Arturo Vidal', follow: false, pic: i4},
  //   {name: 'Lukas Modric', follow: true , pic : i5},
  //   {name: 'De Ligt', follow: false , pic : i3},
  //   {name: 'Sam Tadic', follow: false, pic: i4},
  //   {name: 'Sergio Busquets', follow: true , pic : i2},
  //   {name: 'Eden Hazzard', follow: false , pic : i5},
  //   {name: 'Greame Smith', follow: false, pic: i3},
  //   {name: 'Mark Boucher', follow: true , pic : i2},
  //   {name: 'Steven Gerrad', follow: false , pic : i4}
  // ];

  // dataCampuses = [
  //   {name: 'Jack Jones', current: false, pic: i1},
  //   {name: 'Frenkie De Jong', current: true , pic : i2},
  //   {name: 'Lucas Morra', current: false , pic : i3},
  //   {name: 'Arturo Vidal', current: false, pic: i4},
  //   {name: 'Lukas Modric', current: false , pic : i5},
  //   {name: 'De Ligt', current: false , pic : i3},
  //   {name: 'Sam Tadic', current: false, pic: i4},
  //   {name: 'Sergio Busquets', current: false , pic : i2},
  //   {name: 'Eden Hazzard', current: false , pic : i5},
  //   {name: 'Greame Smith', current: false, pic: i3},
  //   {name: 'Mark Boucher', current: false , pic : i2},
  //   {name: 'Steven Gerrad', current: false , pic : i4}
  // ];


  getToken = async ()=>{
    const Token = await AsyncStorage.getItem('TOKEN')
    return Token
  }


  // fetchdata = async () => {
  //   const Token = await this.getToken();
  //   this.setState({
  //       loading:false
  //   })
  //   fetch('https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_all&page=1', {
  //     headers: {
  //       Authorization:
  //         `Bearer ${Token}`,
  //     },
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(responseJson => {
      
  //       this.setState({
  //         posts: responseJson.data,
  //         refreshing: false,
  //         loading:false
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };


  renderFeed = () => {

    if (this.state.loading===false) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onPageRefresh}
            />
          }>
          <RenderCards posts={this.state.posts}></RenderCards>
        </ScrollView>
      );
    } else {
      return (
        <View>
          <ContentLoader
            height={450}
            width={820}
            speed={0.2}
            height={Dimensions.get('window').height * 1}>
            <Rect x="10" y="10" rx="5" ry="5" width="185" height="220" />
            <Rect x="200" y="10" rx="5" ry="5" width="200" height="280" />
            <Rect x="10" y="240" rx="5" ry="5" width="185" height="250" />
            <Rect x="200" y="300" rx="5" ry="5" width="200" height="280" />
            {/* <Rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
                    <Rect x="550" y="160" rx="5" ry="5" width="260" height="280" /> */}
          </ContentLoader>
        </View>
      );
    }
  };

  renderUsers = () => {
    return (
      <View>
        <FlatList
          vertical
          data={this.state.Users}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <AvatarUserStatus name={item.first_name} status={true} pic={item.profile_pic_url}></AvatarUserStatus>
          )}
        />
      </View>
    );
  };

  renderCampuses = () => {
    return (
      <View>
        <FlatList
          vertical
          data={this.state.Campuses}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <AvatarCampusStatus name={item.description} status={false} pic={i4}></AvatarCampusStatus>
          )}
        />
      </View>
    );
  };

  render() {
    console.log(this.state);
    return (
      <View>

      <View style={{backgroundColor:ThemeBlue, height:50, flexDirection:"row"}}>
       <View style={{flexDirection:"row", width:"65%",backgroundColor:"white",margin:5,borderRadius:8}}>
       <Icon name = "search" style={{alignSelf:"center", fontSize:20,paddingLeft:"3%",color:"grey"}}></Icon>
        <TextInput 
        placeholder="Search" 
        style={{height:"90%" ,margin:4,width:"100%"}}
        onChangeText={(text) => {
          this.setState({search : text});
          this.SearchItems(text);
        }}
        ></TextInput>
       </View>
      </View>

        <View
          style={{
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            elevation: 3,
            borderColor: '#d4cfc1',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({selection: 'Feed'});
            }}>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: this.state.selection === 'Feed' ? ThemeBlue : 'grey',
                  borderBottomWidth: this.state.selection === 'Feed' ? 1 : 0,
                  borderBottomColor: ThemeBlue,
                  marginBottom: 6,
                  marginTop: 8,
                }}>
                Feed
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({selection: 'Users'});
            }}>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: this.state.selection === 'Users' ? ThemeBlue : 'grey',
                  borderBottomWidth: this.state.selection === 'Users' ? 1 : 0,
                  borderBottomColor: ThemeBlue,
                  marginBottom: 6,
                  marginTop: 8,
                }}>
                Users
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({selection: 'Campuses'});
            }}>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color:
                    this.state.selection === 'Campuses' ? ThemeBlue : 'grey',
                  borderBottomWidth:
                    this.state.selection === 'Campuses' ? 1 : 0,
                  borderBottomColor: ThemeBlue,
                  marginBottom: 6,
                  marginTop: 8,
                }}>
                Campuses
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {this.state.selection === 'Feed' ? this.renderFeed() : null}
          {this.state.selection === 'Users' ? this.renderUsers() : null}
          {this.state.selection === 'Campuses' ? this.renderCampuses() : null}
        </ScrollView>
      </View>
    );
  }
}
