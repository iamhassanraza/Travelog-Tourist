import React, { Component ,PureComponent} from 'react'
import { Text, View , RefreshControl, SafeAreaView, ScrollView, FlatList, Dimensions} from 'react-native'
import PostCard from './PostCard'

import ContentLoader, { Rect } from 'react-content-loader/native'
import { withNavigation } from 'react-navigation';

class RenderCards extends PureComponent {

   

    render() {
        // {this.state.posts[0].users?  console.log(this.state.posts[0].users.first_name) : console.log('console')}
        if(this.props.posts) {
        
            const column1Data = this.props.posts.filter((item, i) => i%2 === 0);
            const column2Data = this.props.posts.filter((item, i) => i%2 === 1);

            return (
             
                    <View 
                        style={{height:'100%', flexDirection:'row', backgroundColor:'#F0F0F0'}}
                    >
                        <SafeAreaView style={{flex:1}}>
                            <FlatList          
                                data={column1Data}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                        return <PostCard categoryName={item.postCategory.description} description={item.description} style={{}} name={item.users.first_name + ' ' + item.users.last_name} title={item.title} imageurl={item.postDetail.length > 0 ? item.postDetail[0].image_url : 'https://travelog-pk.herokuapp.com/images/default.png' }>  </PostCard>
                                    }       
                                }
                                keyExtractor={item => item.title}
                                
                            />
                        </SafeAreaView>
                        <SafeAreaView style={{flex:1}}>
                            <FlatList          
                                data={column2Data}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item,index }) => {
                                    if(index===0)
                                    {console.log('======================',item.postCategory.description,'===============')}
                                        return <PostCard categoryName={item.postCategory.description} description={item.description} name={item.users.first_name + ' ' + item.users.last_name} title={item.title} imageurl={item.postDetail.length > 0 ? item.postDetail[0].image_url : 'https://travelog-pk.herokuapp.com/images/default.png' }>  </PostCard>
                                    }       
                                }
                                keyExtractor={item => item.title}
                            />
                        </SafeAreaView>
                    </View>
            
            )
        }
        else {
            return (
                <View>
                    {/* <ContentLoader height={450}width={820} speed={0.2} height={Dimensions.get('window').height*1}>
                        <Rect x="10" y="10" rx="5" ry="5" width="185" height="220" />
                        <Rect x="200" y="10" rx="5" ry="5" width="200" height="280" />
                        <Rect x="10" y="240" rx="5" ry="5" width="185" height="250" />
                        <Rect x="200" y="300" rx="5" ry="5" width="200" height="280" /> */}
                        {/* <Rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
                        <Rect x="550" y="160" rx="5" ry="5" width="260" height="280" /> */}
                    {/* </ContentLoader> */}
                    <Text>No posts to show</Text>
                </View>
            )
        }
    }
}

export default withNavigation(RenderCards)