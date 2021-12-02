import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Autocomplete from 'react-native-autocomplete-input';
import * as db from './utils/DbUtils';
import { ScrollView } from 'react-native-gesture-handler';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: null,
      suggestList: [],
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
      });
      return;
    }
    db.search(keywords, 10, (suggestList) => {
      this.setState({
        suggestList: suggestList,
      });
      var meaning = (suggestList[0] ? suggestList[0].av : '');

      console.log(meaning, meaning);

    });
  };


  selectWord = (word) => {
    console.log('showing ', word.word);
    this.setState({
      keyword: word,
      suggestList: [],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Autocomplete
          data={this.state.suggestList}
          style={styles.input}
          onChangeText={(keywords) => this.searchWord(keywords)}
          placeholder="Enter keywords"
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => 
              <TouchableOpacity onPress={() => this.selectWord(item)}>
                <Text style={styles.itemText}>{item.word}</Text>
              </TouchableOpacity>,
          }}
        />
        <ScrollView 
          style={styles.textView} 
          // originWhitelist={['*']}
          scalesPageToFit={false}
          source={{ html: this.state.keyword?.av }}/>
        {/* <Text style={{padding: 10, fontSize: 42}}>
          {this.state.keyword?.av}
        </Text>   */}
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
  },
  textView: {
    fontSize: 30,
  }

});

export default Home;