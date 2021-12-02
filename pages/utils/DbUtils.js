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

const hex2a = (hexx) => {
  var hex = hexx.toString();
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

export const search = async (word, numOfWords, callback) => {
  const SELECT_WORDS = "SELECT w.word, " 
    + "hex(w.av) as av, " 
    + "hex(w.dnpn) as dnpn, "
    + "w.mean "
    + "FROM word_tbl as w " 
    + "WHERE w.word LIKE '" + word + "%' " 
    + "LIMIT " + numOfWords;
  var suggestList = [];
  try {
    db.transaction((tx) => {
      tx.executeSql(SELECT_WORDS, [], (tx, results) => {
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          row.av = hex2a(row.av);
          row.dnpn = hex2a(row.dnpn);
          suggestList.push(row);
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