import React from 'react';
import {Text, View, TouchableOpacity, ScrollView, FlatList,RefreshControl,TextInput, AsyncStorage, Dimensions} from 'react-native';
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
import NoPost from '../Components/NoPost'



export default class Searching extends React.PureComponent {
  state = {
    selection: 'Feed',
    posts: [],
    refreshing: false,
    loading:false,
    loadmore: false,
    error: false,
    totalFeed: undefined,
    totalUsers: undefined,
    totalCampuses: undefined,
    Users : [],
    //text: undefined,
    Campuses : [],
    search: undefined,
    loadingFeed : undefined,
    loadingUsers : undefined,
    loadingCampuses : undefined,
    pageNo: 1
  };


  fetchFeed = async (text) => {

        this.setState({loadingFeed: true});
        const Token = await AsyncStorage.getItem('TOKEN');
        const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_search&description=${text}&page=${this.state.pageNo}`,{
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        const JsonResponse = await Response.json();
        console.log(JsonResponse.message);

        if(parseInt(Response.status)=== 400) {
           
            this.setState({error : true, totalFeed: 0})
        }
        else if (parseInt(Response.status)=== 200){
           
            if(JsonResponse.total > 0) {
              this.setState({posts : JsonResponse.data, totalFeed: JsonResponse.total, loadingFeed: false})
            }

            else if (JsonResponse.total === 0) {
              this.setState({totalFeed: 0})
            }  
        }
  }



  fetchUsers = async (text) => {

    this.setState({loadingUsers: true});
    const Token = await AsyncStorage.getItem('TOKEN');
    const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/search/user?type=user&description=${text}&page=1`,{
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    const JsonResponse = await Response.json();
    
    if(parseInt(Response.status)=== 400) {
       
        this.setState({error : true, totalUsers: 0})
    }
    else if (parseInt(Response.status)=== 200){
      
        if(JsonResponse.total > 0) {
          this.setState({Users : JsonResponse.data, totalUsers: JsonResponse.total, loadingUsers: false })
        }

        else if (JsonResponse.total === 0) {
          this.setState({totalUsers: 0})
        }  
    }
}



fetchCampuses = async (text) => {

  this.setState({loadingCampuses: true});
  const Token = await AsyncStorage.getItem('TOKEN');
  const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/search/campus?description=${text}&page=1`,{
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });
  const JsonResponse = await Response.json();
  if(parseInt(Response.status)=== 400) {
    
      this.setState({error : true, totalCampuses: 0})
  }
  else if (parseInt(Response.status)=== 200){
      
      if(JsonResponse.total > 0) {
        this.setState({Campuses : JsonResponse.data, totalCampuses: JsonResponse.total, loadingCampuses: false})
      }

      else if (JsonResponse.total === 0) {
        this.setState({totalCampuses: 0})
      }  
  }
}



SearchItems = (text) => {
  // if(this.state.selection === "Feed") {
  //   this.fetchFeed(text);
  //   console.log("feedddddddddddddddd");
  // }

  // else if(this.state.selection === 'Users'){
  //   this.fetchUsers(text);
  //   console.log("userrrrrrrrrrrrrrrrrrr");
  // }

  // else if(this.state.selection === 'Campuses') {
  //   this.fetchCampuses(text);
  //   console.log("camppppppppppppp");
  // }
  
if(text) {
  this.fetchFeed(text);
  this.fetchUsers(text);
  this.fetchCampuses(text);
  console.log("ye chalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
 
    if (this.state.loadingFeed===false) {
      return (
        <ScrollView
        style={{paddingBottom:"25%"}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onPageRefresh}
            />
          }>
          <RenderCards 
            posts={this.state.posts}
            loadMore = {this.loadmore}
            loadstate = {this.state.loadmore}
            totalPosts = {this.state.totalFeed}
          ></RenderCards>
        </ScrollView>
      );
    } else if(this.state.loadingFeed===true) {
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

    if (this.state.loadingUsers===false) {
      // console.log('usersss ===================>',this.state.Users)
      return (
        <FlatList
        style={{paddingBottom:"25%"}}
          vertical
          data={this.state.Users}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <AvatarUserStatus id={item.id} first_name={item.first_name} last_name={item.last_name} status={true} pic={item.profile_pic_url}></AvatarUserStatus>
          )}
        />
      );
    } else if(this.state.loadingUsers===true) {
      return (
        <View>
          <ContentLoader
            height={450}
            speed={0.2}
            height={Dimensions.get('window').height * 1}>
            <Rect x="10" y="10" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="60" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="110" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="160" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="210" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="260" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="310" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="360" rx="5" ry="5" width="85%" height="45" />
            {/* <Rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
                    <Rect x="550" y="160" rx="5" ry="5" width="260" height="280" /> */}
          </ContentLoader>
        </View>
      );
    }   
  };

  renderCampuses = () => {

    if (this.state.loadingCampuses===false) {
      return (
        <FlatList
        style={{paddingBottom:"25%"}}
          vertical
          data={this.state.Campuses}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <AvatarCampusStatus name={item.description} status={false} pic={i4}></AvatarCampusStatus>
          )}
        />
      );
    } else if(this.state.loadingCampuses===true) {
      return (
        <View>
          <ContentLoader
            height={450}
            speed={0.2}
            height={Dimensions.get('window').height * 1}>
            <Rect x="10" y="10" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="60" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="110" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="160" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="210" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="260" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="310" rx="5" ry="5" width="85%" height="45" />
            <Rect x="10" y="360" rx="5" ry="5" width="85%" height="45" />
            {/* <Rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
                    <Rect x="550" y="160" rx="5" ry="5" width="260" height="280" /> */}
          </ContentLoader>
        </View>
      );
    }
  };


  renderNoPost = (text) => {
    return(
      <View style={{paddingTop:"35%"}}>
        <NoPost name={text}></NoPost>
      </View>
    )
  }

  loadmore = () => {
    console.log('load more running --------')
    
      this.setState(
        previousState => {
          return {pageNo: previousState.pageNo + 1, loadmore: true};
        },
        async () => {
          console.log('calling loadmore api.')
        const Token = await AsyncStorage.getItem('TOKEN');
        console.log('searchhhhhhhhhhhh==========',this.state.search)
        const Response = await fetch(`https://campus-gruv-heroku.herokuapp.com/api/v1/search/post?type=post_search&description=${this.state.search}&page=${this.state.pageNo}`,{
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        const JsonResponse = await Response.json();
        console.log(JsonResponse.message);

        if(parseInt(Response.status)=== 400) {
           
            this.setState({error : true, totalFeed: 0})
        }
        else if (parseInt(Response.status)=== 200){
           
            if(JsonResponse.total > 0) {
              this.setState(previousState => {
                return {
                posts: [...previousState.posts, ...JsonResponse.data], 
                totalFeed: JsonResponse.total,
                loadingFeed: false,
                loadmore: false
              }
              })
            }

            else if (JsonResponse.total === 0) {
              this.setState({totalFeed: 0})
            }  
        }
        }
      )
  }


  render() {
    //console.log(this.state);
    return (
      <View>

      <View style={{backgroundColor:ThemeBlue, height:50, flexDirection:"row"}}>
       <View style={{flexDirection:"row", width:"65%",backgroundColor:"white",margin:5,borderRadius:8}}>
       <Icon name="search" style={{alignSelf:"center", fontSize:20,paddingLeft:"3%",color:"grey"}}></Icon>
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
          {this.state.selection === 'Feed' ? this.state.totalFeed === 0 ? this.renderNoPost() : this.renderFeed() : null }
          {this.state.selection === 'Users' ? this.state.totalUsers === 0 ? this.renderNoPost("No Users Availiable") : this.renderUsers() : null}
          {this.state.selection === 'Campuses' ? this.state.totalCampuses === 0 ? this.renderNoPost("No Campuses Availiable") : this.renderCampuses() : null}
        </ScrollView>
      </View>
    );
  }
}