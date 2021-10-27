import React, { useState, useEffect } from 'react';
import { Button, Platform, TextInput } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

const Settings = ({ navigation }) => {
  const dbFileUrl = 'https://drive.google.com/file/d/1DYcAT58LjNfqaIuDHLuo0zzBO07y_kVh';
  const dbFilename = 'ev.db';
  /**
   * call after rendering - to update states
   */
  useEffect(() => {
    // Platform.OS === 'ios' ? ;
    return () => {
      // clean up previous render
      
    };
  });

  const downloadFile = () => {

   

  };

  return (
    <View style={styles.container}>
      <View style={styles.dbTextView}>
        <Text
          style={styles.dbText}>Data File:</Text>
        <TextInput 
          style={styles.dbFileTextBox}
          value={dbFileUrl}
          />
      </View>
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
  }
});

export default Settings;