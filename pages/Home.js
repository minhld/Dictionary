import React, {useState, useEffect} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Import Autocomplete component
import Autocomplete from 'react-native-autocomplete-input';

import * as db from './utils/DbUtils';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      suggestList: [],
      query: null,
    };
  }

  componentDidMount = () => {
    db.loadDb();
  };

  componentWillUnmount = () => {
    db.unloadDb();
  };
  
  searchWord = async (keywords) => {
    db.search(keywords, 10, (suggestList) => {
      this.setState({
        suggestList: suggestList
      });
      console.log(suggestList);

    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Autocomplete
          data={['hello', 'there']}
          // data={[]}
          // value={'atb'}
          // defaultValue={''}
          style={styles.input}
          onChangeText={(keywords) => searchWord(keywords)}
          placeholder="Enter the film title"
          renderItem={({item}) => (
            // For the suggestion view
            <TouchableOpacity
              onPress={() => {
                // setSelectedValue(item);
                // setFilteredFilms([]);
              }}>
              <Text style={styles.itemText}>
                  {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Keywords" 
          onChangeText={text => this.searchWord(text)}/>  */}

        <Text style={{padding: 10, fontSize: 42}}>
        </Text>  
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
    // borderRadius: 8,
    padding: 10,
    borderColor: '#1f3c69',
    backgroundColor: '#fff',
  },
  itemText: {
    // fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  }
});

export default Home;