/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const exercises = [
  '레그 프레스(3 set)',
  '스쿼트(3 set)',
  '레그 컬(3 set)',
  '레그 익스텐션(3 set)',
  '덤벨 런지(3 set)',
  '스텝 업(3 set)',
  '워킹 런지(3 set)',
  '가로바 스쿼트(3 set)',
  '박스 점프(3 set)',
  '바디웨이트 카프 레이즈(3 set)',
];

const createPairs = (exercises, existingPairs) => {
  let pairGroups = [];
  const stringifySet = set => [...set].sort().join(' \n ');

  while (pairGroups.length < 3) {
    let selected = [];
    while (selected.length < 2) {
      const index = Math.floor(Math.random() * exercises.length);
      if (!selected.includes(exercises[index])) {
        selected.push(exercises[index]);
      }
    }

    // 새로운 운동 세트가 기존 세트와 중복되지 않는지 확인
    const newSetString = stringifySet(selected);
    if (!existingPairs.includes(newSetString)) {
      pairGroups.push(newSetString);   // 중복되지 않는 경우에만 추가
      existingPairs.push(newSetString);
    }
  }
  return pairGroups;
};

const LegBeginner = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [existingPairs, setExistingPairs] = useState([]);
  const [recommendationIndex, setRecommendationIndex] = useState(1);

  useEffect(() => {
    const initialPairGroups = createPairs(exercises, existingPairs);
    setSelectedPairs(initialPairGroups);
    setExistingPairs(existingPairs.concat(initialPairGroups));
  }, []);

  const handleSelection = (option) => {
    setSelected(option === selected ? null : option);
  };

  const handleRecommendation = () => {
    if (recommendationIndex < 3) {
      const newPairGroups = createPairs(exercises, existingPairs);
      setSelectedPairs(newPairGroups);
      setExistingPairs(existingPairs.concat(newPairGroups));
      setRecommendationIndex(recommendationIndex + 1);
    }
    else {
      alert('더 이상의 추천은 불가능합니다.');
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const postExercises = async (selectedExercises) => {
    const todayDate = getTodayDate();
    const exercisesArray = selectedExercises.split(' \n ');

    for (let exercise of exercisesArray) {
      const data = {
        date: todayDate,
        part: '하체',
        exercise: exercise,
      };

      try {
        const response = await fetch('http://52.79.95.216:8080/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (!result.isSuccess) {
          Alert.alert('Error', result.message);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const gotoNextScreen = async () => {
    if (selected === null) {
      Alert.alert('운동 구성을 선택해주세요.');
      return;
    }

    await postExercises(selected);
    navigation.navigate('Plan');
  };

  return (
    <View style={styles.container}>
      <View id="title">
        <Text style={styles.title}>오늘의 운동</Text>
        <View style={styles.titleBar} />
        <Text style={styles.subtitle}>하체(초급)</Text>
      </View>
      <View id="options" style={styles.optionContainer}>
        <Text style={styles.questionText}>마음에 드는 운동 구성을 선택하세요</Text>
        {selectedPairs.map((pair, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, selected === pair && styles.selectedOptionButton]}
            onPress={() => handleSelection(pair)}
          >
            <Text style={[styles.optionText, selected === pair && styles.selectedOptionText]}>{pair}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.completeButton} onPress={gotoNextScreen}>
        <Text style={styles.completeButtonText}>완료</Text>
      </TouchableOpacity>
      <View id="recommend" style={styles.recommendContainer}>
        <Text style={styles.recommendText}>마음에 드는 운동 구성이 없나요?</Text>
        <TouchableOpacity style={styles.recommendButton} onPress={handleRecommendation}>
          <Text style={styles.recommendButtonText}>운동 재추천 하기 ({recommendationIndex}/3)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 50,
    marginLeft: 34,
    fontFamily: 'SCDream7',
    fontSize: 45,
    color: '#1047AD',
  },
  titleBar: {
    marginTop: 20,
    marginLeft: 40,
    borderTopWidth: 3,
    borderTopColor: '#8E8E8E',
    width: 49,
  },
  subtitle: {
    marginTop: 20,
    marginLeft: 40,
    fontFamily: 'SCDream7',
    fontSize: 24,
    color: 'black',
  },
  questionText: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'black',
    marginTop: 30,
    marginBottom: 30,
  },
  optionContainer: {
    alignItems: 'center',
  },
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 291,
    height: 100,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginBottom: 16,
  },
  selectedOptionButton: {
    backgroundColor: '#1047AD',
  },
  selectedOptionText: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'white',
  },
  optionText: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  completeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1047AD',
    width: 291,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 30,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SCDream6',
  },
  recommendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  recommendText: {
    color: '#C2BFBF',
    fontSize: 12,
    fontFamily: 'SCDream6',
    marginTop: -5,
  },
  recommendButtonText: {
    color: '#1047AD',
    fontSize: 12,
    fontFamily: 'SCDream6',
  },
});

export default LegBeginner;