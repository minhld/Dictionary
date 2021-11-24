import { openDatabase } from 'react-native-sqlite-storage';
import * as FileSystem from 'expo-file-system';

const Constants = require('./Constants');

var db;

export const loadDb = () => {
  const dbInfo = { 
    name: Constants.DB_FILENAME, 
    location: FileSystem.documentDirectory
  };
  console.log('open DB', dbInfo);
  db = openDatabase(dbInfo);
};

export const search = (word, numOfWords) => {
  console.log(word);
  const SELECT_WORDS = "SELECT * FROM word_tbl WHERE word LIKE '" + word + "%' LIMIT " + numOfWords;

};