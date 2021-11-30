import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import * as db from './utils/DbUtils';
import * as encoding from 'text-encoding';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      suggestList: [],
      suggestWords: [],
    };
  }

  componentDidMount = () => {
    db.loadDb();
  };

  componentWillUnmount = () => {
    db.unloadDb();
  };

  searchWord = async (keywords) => {
    if (keywords === '') {
      this.setState({
        suggestList: [],
        suggestWords: [],
      });
      return;
    }
    db.search(keywords, 10, (suggestList) => {
      this.setState({
        suggestList: suggestList,
        suggestWords: suggestList.map((word) => {return word.word;}),
      });
      var meaning = (suggestList[0] ? suggestList[0].av : '');
      // var decoder = new encoding.TextDecoder();
      // var meaningStr = decoder.decode(meaning);

      // var uint8array = new TextEncoder().encode("¢");
      // var string = new TextDecoder().decode(uint8array);
      // console.log("something else ", string);

      console.log(meaning, meaning);

    });
  };


  selectWord = (word) => {
    console.log('showing ', word);
    this.setState({
      keyword: word,
      suggestList: [],
      suggestWords: [],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Autocomplete
          data={this.state.suggestWords}
          style={styles.input}
          onChangeText={(keywords) => this.searchWord(keywords)}
          placeholder="Enter keywords"
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => 
              <TouchableOpacity onPress={() => this.selectWord(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>,
          }}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.keyword}
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
    borderWidth: 1,
    padding: 10,
    borderColor: '#1f3c69',
    backgroundColor: '#fff',
  },
  itemText: {
    height: 20,
    margin: 8,
  }
});

export default Home;