import React, { Component } from 'react'
import { Text, View,SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {ThemeBlue} from '../Assets/Colors';

export default class Help extends Component {

    state={
        isModalVisible:true
    }


    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
      };

    renderOption = (option) => {
        return(
        <View style={styles.optionContainer}>
            <Text style={styles.optionText} onPress={()=> this.props.navigation.navigate('Feedback')}>{option}</Text>
        </View>
        )
    }
    
    render() {
        return (
           <SafeAreaView style={styles.container}>
               <TouchableOpacity onPress={()=> this.toggleModal()}>
                <View style={styles.reportContainer} >
                <Text style={styles.reportText}> Report a problem </Text>
                <Icon name="keyboard-arrow-right" color="grey" size={35} />
                </View>
                </TouchableOpacity>
               <Modal
                style={{margin: 0}}
                isVisible={this.state.isModalVisible}
                onBackdropPress={() => this.setState({isModalVisible: false})}>
                <View style={styles.modalContainer}>
                  
                    <Text style={styles.modalHeading}>Report a Problem</Text>
                    {this.renderOption("Spam or Abuse")}
                    {this.renderOption("Something isn't working")}
                    {this.renderOption("General Feedback")}
                    {this.renderOption("Image or Video Quality Issue")}
                    <View style={styles.cancelView}>
                    <Text style={styles.cancelText} onPress={()=> this.toggleModal()}>Cancel</Text>
                    </View>

                </View>
                </Modal>
           </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
      flex:1
  },
  reportContainer: {
      flexDirection:'row',
      marginTop:5,
      marginHorizontal:5,
      justifyContent:'space-between',
      alignItems:'center'
  },
  reportText:{
      color:'grey',
      fontSize:19
  },
  modalContainer:{
      backgroundColor:'white',
      marginHorizontal:'15%',
      alignItems:'center',
      borderRadius:8
  },
  optionContainer:{
      
      borderTopWidth:0.4,
      width:'100%',
      alignItems:'center',
      borderTopColor:ThemeBlue
  },
  optionText:{
      fontSize:17,
      color:ThemeBlue,
      paddingVertical:5
  },
  cancelText:{
      fontWeight:"bold",
      fontSize:18,
      color:ThemeBlue,
      paddingVertical:5
  },
  modalHeading:{
    fontWeight:"bold",
    fontSize:18,
    color:'black',
    paddingVertical:5,
  
  },
  cancelView: {
      width:'100%',
      borderTopWidth:0.4,
      alignItems:'center',
      borderTopColor:ThemeBlue
  }
});

