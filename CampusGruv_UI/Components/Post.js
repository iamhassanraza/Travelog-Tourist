import React, { Component } from 'react'
import { Text, View, ScrollView, Image, ImageBackground, StyleSheet } from 'react-native'
import ViewsIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Post extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{height:'50%'}}>
                    <Image
                        style={styles.image}
                        source = {{
                            uri: "https://travelog-pk.herokuapp.com/images/6.jpg"
                        }}
                    />
                </View>
                <View style={{borderWidth:1, backgroundColor:'white', paddingLeft:'3%', paddingTop: '2%'}}>
                    <View>
                        <Text style={{fontSize:13}}>Love my new study spot!</Text>
                    </View>
                    <View style={{paddingBottom:'2%', flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width:'20%'}}>
                            <Image 
                                source={{uri: 'https://travelog-pk.herokuapp.com/images/logo.png'}}
                                style={{width:30, height:30,borderWidth:0.3, borderColor:'#616963', borderRadius: 50}} 
                            />
                        </View>
                        <View style={{width:'50%', marginRight: '2%', marginLeft: '2%'}}>
                            <Text style={{color: 'grey'}}>
                                Linda Z.
                            </Text>
                        </View>
                        <View style={{width:'10%'}}>
                            <View>
                                <ViewsIcon color="grey" name="eye"/>
                            </View>
                            <View style={{marginTop:-2}}>
                                <Text style={{color:'grey', fontSize:7}}>2.4k</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:"50%",
        height:300,
        marginLeft:10,
        borderWidth:1
    },
    image: {
        height:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    }
})