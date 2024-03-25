import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Home = ({navigation}) => {
  // 각 박스 및 하단바의 아이콘을 눌렀을 때의 동작 추가

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box}>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>챌린지</Text>
          <Text style={styles.descriptionText}>운동기구를 찍으면 해당 기기에 대한{'\n'}설명을 받을 수 있어요</Text>
        </View>
        <Image source={require('../assets/images/ArrowIcon.png')} style={styles.arrow} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>운동기구 찾기</Text>
          <Text style={styles.descriptionText}>운동기구를 찍으면 해당 기기에 대한{'\n'}설명을 받을 수 있어요</Text>
        </View>
        <Image source={require('../assets/images/ArrowIcon.png')} style={styles.arrow} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>오늘의 운동</Text>
          <Text style={styles.descriptionText}>매일 운동 계획을 간편하게 {'\n'}세울 수 있어요</Text>
        </View>
        <Image source={require('../assets/images/ArrowIcon.png')} style={styles.arrow} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <View style={styles.textBox}>
          <Text style={styles.boxText}>마이페이지</Text>
          <Text style={styles.descriptionText}>가입했던 정보를 수정할 수 있어요</Text>
        </View>
        <Image source={require('../assets/images/ArrowIcon.png')} style={styles.arrow} />
      </TouchableOpacity>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/CalendarIcon.png')} style={styles.UnderIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/HomeIcon.png')} style={styles.UnderIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('../assets/images/CameraIcon.png')} style={styles.UnderIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F4FF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: 312,
    height: 160,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,   // 하얀 박스 사이의 간격
  },
  textBox: {
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  arrow: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: -65,
  },
  boxText: {   // 챌린지, 운동기구 찾기, 오늘의 운동, 마이페이지
    fontSize: 20,
    fontFamily: 'SCDream6',
    color: "black",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'SCDream4',
    color: "#707070",
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: '#E7F4FF',
  },
  UnderIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default Home;