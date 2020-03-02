import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const Heading = ({
    containerStyle, textStyle 
}) => (
    <View style={[ styles.container, containerStyle ]}>
        <Image 
            source={require('../Assets/Images/logo.png')}
            resizeMode='contain'
            style={{ width: 300 }} 
            />
    </View>
);

const styles = StyleSheet.create({
    container: {
        height:'40%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default Heading;
