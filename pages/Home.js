import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Autocomplete from 'react-native-autocomplete-input';
import { Tab, TabView } from "react-native-elements";

import * as db from './utils/DbUtils';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordHtml: '',
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
        index: 0,
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
    console.log('showing ', word);
    this.setState({
      wordHtml: db.getHtml(word),
      suggestList: [],
      index: 0,
    });
  };

  changeTabIndex = (index) => {
    this.setState({
      index: index,
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
                <Text style={styles.itemText}>{item.word}: {item.mean}</Text>
              </TouchableOpacity>,
          }}
        />
        <Tab value={this.state.index} 
          onChange={this.changeTabIndex} 
          indicatorStyle={styles.indicatorTabStyle}>
          <Tab.Item title="Basic" titleStyle={styles.basicTabTitle}/>
          <Tab.Item title="English" titleStyle={styles.basicTabTitle}/>
          <Tab.Item title="Wiki" titleStyle={styles.basicTabTitle}/>
        </Tab>

        <TabView value={this.state.index} >
          <TabView.Item style={styles.basicTab}>
            <WebView 
              style={styles.textView} 
              originWhitelist={['*']}
              scalesPageToFit={false}
              source={{ html: this.state.wordHtml }}/>
          </TabView.Item>
          <TabView.Item style={styles.englishTab}>
            <Text h1>Favorite</Text>
          </TabView.Item>
          <TabView.Item style={styles.wikiTab}>
            <Text h1>Cart</Text>
          </TabView.Item>
        </TabView>
        
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
  indicatorTabStyle: {
    backgroundColor: '#1f3c69',
    height: 3,
  },
  basicTabTitle: {
    fontSize: 15,
    color: '#1f3c69',
  },
  basicTab: {
    width: '100%',
  },
  englishTab: {
    width: '100%',
  },
  wikiTab: {
    width: '100%',
  },
  textView: {
    fontSize: 30,
  },
});

export default Home;