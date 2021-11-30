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
  

  // unicodeFromBinary = async (inputString) => {
  //   var twoByteGroups = /^(?:[01]{16})+$/;

	// 	/* Remove all whitespace from the input string. */
	// 	var binaryString = inputString.replace(/\s+/g, '');

	// 	/*
	// 		Ensure the binary string is a sequence of two-byte pairs
	// 		in binary—i.e., groups of sixteen '0' or '1' digits.
	// 	*/
	// 	if (!twoByteGroups.test(binaryString)) {
	// 		throw new TypeError('input must be a sequence of two-byte pairs in binary');
	// 	}

	// 	/* Convert the binary string into code points. */
	// 	var unicodeString = "";
	// 	for (var i = 0; i < binaryString.length; i += 16) {
	// 		var first = Number.parseInt(binaryString.slice(i, i + 16), 2);

	// 		/* Code unit is not a surrogate pair, so convert it. */
	// 		if (first < 0xD800 || first > 0xDFFF) {
	// 			unicodeString += String.fromCodePoint(first);
	// 		}

	// 		/* Elsewise, convert both halves of the surrogate pair. */
	// 		else {
	// 			/* Sanity check the high surrogate. */
	// 			if (first < 0xD800 || first > 0xDBFF) {
	// 				throw new RangeError('mismatched surrogate pair in input');
	// 			}

	// 			/* Increment the index and sanity check the length. */
	// 			i += 16;
	// 			if (i >= binaryString.length) {
	// 				throw new Error('truncated surrogate pair in input');
	// 			}

	// 			/* Get the low surrogate and sanity check it. */
	// 			var second = Number.parseInt(binaryString.slice(i, i + 16), 2);
	// 			if (second < 0xDC00 || second > 0xDFFF) {
	// 				throw new RangeError('mismatched surrogate pair in input');
	// 			}

	// 			unicodeString += String.fromCodePoint(first, second);
	// 		}
	// 	}

	// 	/* Return the string. */
	// 	return unicodeString;
	// };

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
        suggestWords: ['he', 'she'], //suggestList.map((word) => {return word.word;}),
      });
      var meaning = (suggestList[0] ? suggestList[0].av : '');
      var decoder = new encoding.TextDecoder();
      var meaningStr = decoder.decode(meaning);

      var uint8array = new TextEncoder().encode("¢");
      var string = new TextDecoder().decode(uint8array);
      console.log("something else ", string);

      console.log(meaning, meaningStr);

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