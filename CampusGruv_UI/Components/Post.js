import React, { Component } from 'react'
import { Text, View, ScrollView, Image, ImageBackground, StyleSheet } from 'react-native'
import ViewsIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Post extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{height:'60%'}}>
                    <Image
                        style={styles.image}
                        source = {{
                            uri: "https://travelog-pk.herokuapp.com/images/6.jpg"
                        }}
                    />
                </View>
                <View style={{marginLeft:'3%', marginTop: '2%'}}>
                    <View>
                        <Text style={{fontSize:13}}>Love my new study spot!</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: '2%'}}>
                        <View style={{flex:1}}>
                            <Image 
                                source={{uri: 'https://travelog-pk.herokuapp.com/images/logo.png'}}
                                style={{width:30, height:30,borderWidth:0.1, borderColor:'#616963', borderRadius: 50}} 
                            />
                        </View>
                        <View style={{flex:4,borderWidth:1, marginLeft: '2%'}}>
                            <Text style={{color: 'grey'}}>
                                Linda Z.
                            </Text>
                        </View>
                        <View style={{}}>
                            <ViewsIcon color="grey" name="eye"/>
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
        height:'40%',
        marginLeft:10
    },
    image: {
        height:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    }
})