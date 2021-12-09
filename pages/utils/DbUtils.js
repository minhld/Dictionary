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

const convertUtf8ArrayToStr = (array) => {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                      ((char2 & 0x3F) << 6) |
                      ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
}

const convertToUtf8 = (str) => {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  const buff8Array = new Uint8Array(bufView.buffer, bufView.byteOffset, bufView.byteLength);
  return convertUtf8ArrayToStr(buff8Array);
}

export const search = async (word, numOfWords, callback) => {
  const SELECT_WORDS = "SELECT w.word, " 
    + "w.av, " 
    + "w.dnpn as dnpn, "
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
          row.av = convertToUtf8(row.av ? row.av : '');
          row.dnpn = convertToUtf8(row.dnpn ? row.dnpn : '');
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