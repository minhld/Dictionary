import React, { useState, useEffect } from 'react';
import { Button, Platform, TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ProgressBar, Colors } from 'react-native-paper';

const Constants = require('./utils/Constants');

const Settings = ({ navigation }) => {
  const [fileExist, setFileExist] = useState(false); 
  const [downloadInfo, setDownloadInfo] = useState(''); 
  const [downloadPercentage, setDownloadPercentage] = useState(0); 
  const [isDownloading, setIsDownloading] = useState(false);
  /**
   * call after rendering - to update states
   */
  useEffect(() => {
    checkFileExist();

    return () => {
      // clean up previous render
      
    };
  });

  const checkFileExist = async () => {
    const downloadFilePath = FileSystem.documentDirectory + Constants.DB_FILENAME;
    const dbFileInfo = await FileSystem.getInfoAsync(downloadFilePath, {});
    setDownloadInfo(dbFileInfo.exists ? 'File is downloaded' : 'File has not been downloaded');
  };

  const downloadFile = async () => {
    setIsDownloading(true);
    const downloadFilePath = FileSystem.documentDirectory + Constants.DB_FILENAME;
    const downloadResumable = FileSystem.createDownloadResumable(
      Constants.DB_URL,
      downloadFilePath,
      {},
      updateProgress
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading ", uri);
    } catch (e) {
      console.error(e);
    }
    setIsDownloading(false);
  };

  const updateProgress = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    console.log(JSON.stringify(downloadProgress));
    setDownloadPercentage(progress);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dbTextView}>
        <Text style={styles.dbText}>
          Data File:
        </Text>
        <TextInput 
          style={styles.dbFileTextBox}
          value={Constants.DB_URL}
          />
      </View>
      <ProgressBar 
        progress={downloadPercentage} 
        color={'#1f3c69'} 
        visible={isDownloading}
        style={styles.downloadProgress} />
      <Text style={styles.dbDownloadProgress}>
        {downloadInfo}
      </Text>  
      <Button 
        style={styles.downloadBtn}
        title='Download'
        onPress={downloadFile}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: 5,
  }, 
  dbTextView: {
    height: 38,
    flexDirection: 'row',
  },
  dbText: {
    marginTop: 10,
    flex: 1,
  },
  downloadProgress: {
    marginTop: 10,
    marginBottom: 10,
  },
  dbFileTextBox: {
    height: 35,
    flex: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 5,
  },
  downloadBtn: {
    width: 100,
    height: 50,
    textAlign: 'center',
    backgroundColor: '#aaa',
    borderWidth: 1,
  },
  dbDownloadProgress: {
    height: 50,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: '#ccc',
    color: '#fc6203'
  }
});

export default Settings;