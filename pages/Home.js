import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as db from './utils/DbUtils';

const Home = ({ navigation }) => {
  const [keyword, setKeyWord] = useState('');

  useEffect(() => {
    db.search(keyword);
  });

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Keywords"
        onChangeText={text => setKeyWord(text)}/>

      <Text style={{padding: 10, fontSize: 42}}>
        {keyword}
      </Text>  
    </View>
  );
};

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