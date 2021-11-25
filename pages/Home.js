import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as db from './utils/DbUtils';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
    };
  }

  componentDidMount = () => {
    db.loadDb();
  };

  componentWillUnmount = () => {
    db.unloadDb();
  };
  
  searchWord = async (keywords) => {
    db.search(keywords, 10);
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Keywords" 
          onChangeText={text => this.searchWord(text)}/> 

        <Text style={{padding: 10, fontSize: 42}}>
          {/* {keyword} */}
        </Text>  
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#1f3c69',
    backgroundColor: '#fff',
  },
});

export default Home;