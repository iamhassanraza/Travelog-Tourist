import React, { Component } from 'react'
import { Text, View , RefreshControl, SafeAreaView, ScrollView, FlatList, Dimensions} from 'react-native'
import PostCard from './PostCard'
import Masonry from 'react-native-masonry-layout'
import ContentLoader, { Facebook } from 'react-content-loader/native'

export default class Test1 extends Component {

    state={
        posts:[],
        refreshing:false
    }

    fetchdata = ()=>{

    
        
      this.setState({posts:[]},
        ()=>{


            fetch("https://campus-gruv-heroku.herokuapp.com/api/v1/post/all",{
                headers:{
                    'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjM1NCwiaWF0IjoxNTc2MTMzNzQwfQ.f6hcEx-YKAcIaUJM8ZdH66iWahJafbLEzFEFwvLagE8'
                }
            })
            .then(response => {
                return response.json()
            })
            .then((responseJson)=> {
                this.setState({
                    posts : responseJson,
                    refreshing:false
                })
            })
            .catch(err => console.log(err))
        })


    }

    componentDidMount(){
     this.fetchdata()
    }

    render() {
        // {this.state.posts[0].users?  console.log(this.state.posts[0].users.first_name) : console.log('console')}
        if(this.state.posts[0]) {

            const column1Data = this.state.posts.filter((item, i) => i%2 === 0);
            const column2Data = this.state.posts.filter((item, i) => i%2 === 1);

            return (
                <SafeAreaView 
                    style={{flexDirection: 'row',flex: 1, backgroundColor: '#F0F0F0'}}
                    RefreshControl = {
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.fetchdata}/>
                    }
                >
                    <View style={{flex: 1}}>
                        <FlatList          
                            data={column1Data}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                    return <PostCard style={{}} name={item.users.first_name} title={item.title} imageurl={item.postDetail.length > 0 ? item.postDetail[0].image_url : 'https://travelog-pk.herokuapp.com/images/default.png' }>  </PostCard>
                                }       
                            }
                            keyExtractor={item => item.tour_id}
                            
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList          
                            data={column2Data}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                    return <PostCard name={item.users.first_name} title={item.title} imageurl={item.postDetail.length > 0 ? item.postDetail[0].image_url : 'https://travelog-pk.herokuapp.com/images/default.png' }>  </PostCard>
                                }       
                            }
                            keyExtractor={item => item.tour_id}
                        />
                    </View>
                </SafeAreaView>
            )
        }
        else {
            return (
                <View>
                    <ContentLoader speed={0.5} height={Dimensions.get('window').height*1}>
                        
                    </ContentLoader>
                </View>
            )
        }
    }
}
