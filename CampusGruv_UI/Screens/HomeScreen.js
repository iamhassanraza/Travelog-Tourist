import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import PostsList from '../Components/PostsList';
import Masonry from 'react-native-masonry-layout';

export default class HomeScreen extends Component {

    const data = this.refs.masonry.addItems([
        { key:1, text:"text1" },
        { key:1, text:"text1" }
    ]);



  render() {
    return (
      <View style={styles.container}>
        {/* <PostsList />  */}
        <Masonry
          ref="masonry"
          columns={3} // optional - Default: 2
          renderItem={data => (
            <View>
              <Text>some text</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '99%',
  },
});
