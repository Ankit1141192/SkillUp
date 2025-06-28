// screens/QuizScreen.js

import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import questions from "../data/Questions";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const QuizScreen = () => {
  const navigation = useNavigation();
  const data = questions;
  const totalQuestions = data.length;

  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [counter, setCounter] = useState(15);

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswerIndex;
      setPoints((prev) => (isCorrect ? prev + 5 : prev));
      setAnswerStatus(isCorrect);
      setAnswers([...answers, { question: index + 1, answer: isCorrect }]);
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      } else {
        goToNextQuestion();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  const goToNextQuestion = () => {
    setIndex((prev) => prev + 1);
    setCounter(15);
    setAnswerStatus(null);
    setSelectedAnswerIndex(null);
  };

  useEffect(() => {
    if (index >= totalQuestions) {
      navigation.replace("ResultsScreen", { points, answers });
    }
  }, [index]);

  const currentQuestion = data[index];
  if (!currentQuestion) return null;

  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  return (
    <SafeAreaView>
      <View style={styles.headerRow}>
        <Text>Quiz Challenge</Text>
        <Pressable style={styles.timerBox}>
          <Text style={styles.timerText}>{counter}</Text>
        </Pressable>
      </View>

      <View style={styles.progressRow}>
        <Text>Your Progress</Text>
        <Text>
          ({index}/{totalQuestions}) questions answered
        </Text>
      </View>

      <View style={styles.progressBarWrapper}>
        <Text
          style={[
            styles.progressBar,
            { width: `${progressPercentage}%` },
          ]}
        />
      </View>

      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        <View style={{ marginTop: 12 }}>
          {currentQuestion.options.map((item, optionIndex) => {
            const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
            const isSelected = selectedAnswerIndex === optionIndex;

            const backgroundColor =
              selectedAnswerIndex === null
                ? "#fff"
                : isSelected && isCorrect
                ? "green"
                : isSelected && !isCorrect
                ? "red"
                : "#fff";

            return (
              <Pressable
                key={optionIndex}
                onPress={() => selectedAnswerIndex === null && setSelectedAnswerIndex(optionIndex)}
                style={[styles.optionBox, { backgroundColor }]}
              >
                <View style={styles.iconBox}>
                  {isSelected ? (
                    <AntDesign
                      name={isCorrect ? "check" : "closecircle"}
                      size={20}
                      color="white"
                    />
                  ) : (
                    <Text>{optionIndex + 1}</Text>
                  )}
                </View>
                <Text style={styles.optionText}>{item.answer}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {answerStatus !== null && (
        <View style={styles.feedbackBox}>
          <Text style={styles.feedbackText}>
            {answerStatus ? "Correct Answer" : "Wrong Answer"}
          </Text>
          <Pressable
            onPress={() => {
              if (index + 1 >= totalQuestions) {
                navigation.replace("ResultsScreen", { points, answers });
              } else {
                goToNextQuestion();
              }
            }}
            style={styles.nextButton}
          >
            <Text style={{ color: "white" }}>
              {index + 1 >= totalQuestions ? "Done" : "Next Question"}
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  timerBox: {
    padding: 10,
    backgroundColor: "magenta",
    borderRadius: 20,
  },
  timerText: {
    color: "white",
    fontWeight: "bold",
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  progressBarWrapper: {
    height: 10,
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#FFC0CB",
    borderRadius: 12,
  },
  questionBox: {
    marginTop: 30,
    backgroundColor: "#F0F8FF",
    padding: 10,
    borderRadius: 6,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  optionBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#00FFFF",
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#00FFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  feedbackBox: {
    marginTop: 45,
    backgroundColor: "#F0F8FF",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
  },
  feedbackText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "green",
    padding: 10,
    marginTop: 20,
    borderRadius: 6,
  },
});
