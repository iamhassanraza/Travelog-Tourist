import React, { Component } from 'react'
import { Text, View , RefreshControl, FlatList} from 'react-native'
import Test from '../Components/Test'

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
      if(this.state.posts[0])
      {
       console.log(this.state.posts[0])
        return (
            <View style={{backgroundColor: '#F0F0F0'}}>
      
                 <FlatList
                              
                                data={this.state.posts}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) =>{
                                   return <Test name={item.users.first_name} title={item.title} imageurl={item.postDetail.length > 0 ? item.postDetail[0].image_url : 'https://travelog-pk.herokuapp.com/images/default.png' }>  </Test>
                                }
                              
                           
                            
                            }
                                keyExtractor={item => item.tour_id}
                                numColumns={2}
                                refreshControl={
                                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.fetchdata}/>}
                            />


            </View>
        )
      }
      else{
            return <View>
                
            </View>
      }
    }
}
