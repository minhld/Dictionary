import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const Constants = require('./Constants');

var db;

const errorCB = (err) => {
  console.log("SQL Error: " + err);
}

const successCB = () => {
  console.log("SQL executed fine");
}

const openCB = () => {
  console.log("Database OPENED");
}

export const loadDb = async () => {
  var dbPath = Constants.getDbFilePath();
  console.log('loading DB ', dbPath);

  if (!(await FileSystem.getInfoAsync(dbPath)).exists) {
    console.log('SQLite folder does not exist');
    return;
  }

  db = SQLite.openDatabase(Constants.DB_FILENAME, '1.0', openCB, errorCB);
  console.log(db);
};

export const unloadDb = async () => {
  console.log('unloading DB...');

};

export const search = async (word, numOfWords, callback) => {
  const SELECT_WORDS = "SELECT * FROM word_tbl WHERE word LIKE '" + word + "%' LIMIT " + numOfWords;
  var suggestList = [];
  try {
    db.transaction((tx) => {
      tx.executeSql(SELECT_WORDS, [], (tx, results) => {
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          suggestList.push(row.word);
        }
        callback(suggestList);
      });
    });
  } catch (error) {
    console.error(error);
    throw Error('Failed to get suggestions for word ' + word);
    return [];
  }
};