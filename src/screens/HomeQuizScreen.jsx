// screens/HomeQuizScreen.js

import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeQuizScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 15 }}>
      <Image
        style={{ height: 370, width: "100%", resizeMode: "contain" }}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9k2hf2J5rbVVpb4Z1Gy4y9D0vWZHQnA1dW6GxHchAKtufJapZ_bJOkZ_ESB3nDoSvgFw&usqp=CAU",
        }}
      />

      <View style={{ padding: 10 }}>
        <Text style={styles.header}>QUIZ RULES</Text>

        <View style={styles.rulesBox}>
          <Text style={styles.rule}>• For each correct answer you get 5 points</Text>
          <Text style={styles.rule}>• There is no negative marking for wrong answer</Text>
          <Text style={styles.rule}>• Each question has a time limit of 15 sec</Text>
          <Text style={styles.rule}>• You should answer all the questions compulsorily</Text>
        </View>
      </View>

      <Pressable
        onPress={() => navigation.navigate("QuizScreen")}
        style={styles.startButton}
      >
        <Text style={styles.startText}>Start Quiz</Text>
      </Pressable>
    </View>
  );
};

export default HomeQuizScreen;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    color: "magenta",
    fontSize: 20,
    fontWeight: "600",
  },
  rulesBox: {
    padding: 10,
    backgroundColor: "#F88379",
    borderRadius: 6,
    marginTop: 15,
  },
  rule: {
    color: "#722F37",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 6,
  },
  startButton: {
    backgroundColor: "magenta",
    padding: 14,
    width: 120,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 30,
  },
  startText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
