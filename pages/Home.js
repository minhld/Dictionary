import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import * as db from './utils/DbUtils';

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
        suggestList: suggestList
      });
      console.log(suggestList);

    });
  };

  selectWord = (word) => {
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
          // data={['sedb', 'babs']}

          // value={'atb'}
          // defaultValue={''}
          style={styles.input}
          onChangeText={(keywords) => this.searchWord(keywords)}
          placeholder="Enter keywords"
          flatListProps={{
            keyExtractor: (_, idx) => idx,
            renderItem: ({ item }) => <Text style={styles.itemText} onPress={(text) => this.selectWord(text)}>{item}</Text>,
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