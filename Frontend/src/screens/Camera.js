/* eslint-disable */

import React, { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text, ImageURISource, ActivityIndicator } from 'react-native';
import BottomBar from '../components/BottomBar.js';
import LogoLocation from '../components/LogoLocation.js';
import {launchImageLibrary} from 'react-native-image-picker';

const Camera = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);

  const UploadImage = async () => {
    setUploadFailed(false);
    let image = null;

    await launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker ERROR :", response.errorCode);
      } else if (response.assets) {
        image = response.assets[0];
      }
    });

    if (!image) return; // Exit if no image is selected

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type || 'image/jpeg',  // Default to JPEG if type isn't provided
      name: image.fileName || 'temp_image.jpg',  // Default name if not provided
    });

    setLoading(true);

    try {
      const response = await fetch('http://52.79.95.216:8080/search', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
      const result = await response.json();
      console.log("SUCCESS:", result);
      const { prediction } = result;
      const [machineName, confidence, machineDescription, videoUrl] = prediction[0];

      if (confidence < 80) {
        setUploadFailed(true);
      } else {
        navigation.navigate('CameraResult', { result, imageUri: image.uri });
      }
    } catch (error) {
      console.error('ERROR:', error);
      setUploadFailed(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <LogoLocation />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5B5B5B" />
          </View>
        ) : (
          <View style={styles.contentContainer}>
            {uploadFailed ? (
            <View style={styles.failedTab}>
              <Text style={styles.failedText}>운동기구를 식별할 수 없습니다.</Text>
              <Text style={styles.failedText}>운동기구를 다시 촬영해주세요.</Text>
              <TouchableOpacity onPress={UploadImage}>
                <Text style={styles.retryText}>운동기구 다시 촬영하러 가기</Text>
              </TouchableOpacity>
            </View>
            ) : null}
            <Text style={styles.text}>카메라 영역에 운동기구가 {'\n'}잘리지 않도록 촬영해주세요</Text>
            <TouchableOpacity style={styles.greyBox} onPress={UploadImage}>
              <Image source={require('../assets/images/CameraIcon.png')} style={styles.icon} />
              <Text style={styles.buttonText}>촬영하기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={UploadImage}>
              <Text style={[styles.optionText, {color:"#C2BFBF"}]}>가지고 있는 이미지를 사용하기 원하시나요?</Text>
              <Text style={[styles.optionText, {color: '#1047AD'}]}>앨범에서 이미지 가져오기</Text>
            </TouchableOpacity>
          </View>
        )}
      <BottomBar style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 200,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'SCDream5',
    textAlign: 'center',
    marginBottom: 25,
  },
  greyBox: {
    width: 249,
    height: 305,
    borderRadius: 16,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  icon: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'SCDream5',
    marginTop: 20,
  },
  optionText: {
    fontSize: 12,
    fontFamily: 'SCDream6',
    textAlign: 'center'
  },
  failedTab: {
    position: 'absolute',
    zIndex: 1,
    width: 330,
    height: 539,
    backgroundColor: 'rgba(0,0,0,0.9)',
    opacity: 90,
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  failedText: {
    fontFamily: 'SCDream6',
    fontSize: 20,
    color: 'white',
    marginBottom: 30
  },
  retryText: {
    fontSize: 12,
    fontFamily: 'SCDream5',
    textDecorationLine: 'underline',
    color:'white',
    paddingTop: 30
  }
});

export default Camera;
