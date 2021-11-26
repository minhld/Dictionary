import * as FileSystem from 'expo-file-system';

export const DB_URL = 'https://dl.dropboxusercontent.com/s/3vfyfpg8f37zdz7/ev.db';
export const DB_FILENAME = 'ev.db';
export const DB_SQLITE_FOLDER = 'SQLite/';

export const getDbPath = () => {
  return FileSystem.documentDirectory + DB_SQLITE_FOLDER;
};

export const getDbFilePath = () => {
  return FileSystem.documentDirectory + DB_SQLITE_FOLDER + DB_FILENAME;
};