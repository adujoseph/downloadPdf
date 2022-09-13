import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    PermissionsAndroid,
  } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
  
const Dashboard = () => {
    //const fileUrl = 'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';
  
    const fileUrl = `https://www.tutorialspoint.com/react_native/react_native_tutorial.pdf`
    const checkPermission = async () => {
      if (Platform.OS === 'ios') {
        downloadFile();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Application needs access to your storage to download File',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Start downloading
            downloadFile();
            console.log('Storage Permission Granted.');
          } else {
            // If permission denied then show alert
            Alert.alert('Error','Storage Permission Not Granted');
          }
        } catch (err) {
          // To handle permission related exception
          console.log("++++"+err);
        }
      }
    };
  
    const downloadFile = () => {
      let date = new Date();
      let FILE_URL = fileUrl;    
      let file_ext = getFileExtention(FILE_URL);
      file_ext = '.' + file_ext[0];
     
      const { config, fs } = RNFetchBlob;
      let RootDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          path:
            RootDir+
            '/file_' + 
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            file_ext,
          description: 'downloading file...',
          notification: true,
          // useDownloadManager works with Android only
          useDownloadManager: true,   
        },
      };
      config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
          // Alert after successful downloading
          console.log('res -> ', JSON.stringify(res));
          alert('File Downloaded Successfully.');
        });
    };
  
    const getFileExtention = fileUrl => {
      // To get the file extension
      return /[.]/.exec(fileUrl) ?
               /[^.]+$/.exec(fileUrl) : undefined;
    };
  
    return (
      <View style={styles.container}>
       
          <Text style={{ fontSize: 25, textAlign: 'center' }}>
            React Native File Download Example
          </Text>
         
       
        <Image
          source={{
            uri: fileUrl,
          }}
          style={{
            width: '100%',
            height: 100,
            resizeMode: 'contain',
            margin: 5
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={checkPermission}>
          <Text style={styles.text}>
            Download File
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default Dashboard;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 20,
      textAlign: 'center',
      padding: 5,
    },
    button: {
      width: '80%',
      padding: 20,
      backgroundColor: 'blue',
      margin: 20,
      borderRadius: 10,
    },
    
  });
  