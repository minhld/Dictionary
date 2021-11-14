import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'ev.db', location: 'default' });

export const search = (keys) => {
  console.log(keys);
}