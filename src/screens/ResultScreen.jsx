import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const ResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { answers = [], points = 0 } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Results</Text>
        <View style={styles.shareBox}>
          <Text style={{ marginRight: 4 }}>Share</Text>
          <AntDesign name="sharealt" size={18} color="black" />
        </View>
      </View>

      {/* Score Summary */}
      <View style={styles.scoreSummary}>
        <Text>Questions Answered</Text>
        <Text>({answers.length}/{answers.length})</Text>
      </View>

      {/* Score Card */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>Score Card</Text>

        <FlatList
          numColumns={2}
          data={answers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text>Q{item.question}</Text>
              {item.answer === true ? (
                <AntDesign
                  name="checkcircle"
                  size={20}
                  color="green"
                  style={styles.icon}
                />
              ) : (
                <AntDesign
                  name="closecircle"
                  size={20}
                  color="red"
                  style={styles.icon}
                />
              )}
            </View>
          )}
        />

        {/* Continue Button */}
        <Pressable
          onPress={() => navigation.navigate("MainTabs")}
          style={styles.continueButton}
        >
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shareBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  scoreCard: {
    backgroundColor: "white",
    height: 280,
    borderRadius: 7,
    marginTop: 20,
    padding: 10,
  },
  scoreTitle: {
    color: "magenta",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    alignSelf: "center",
  },
  icon: {
    marginLeft: 6,
  },
  continueButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  continueText: {
    color: "white",
    fontWeight: "600",
  },
});
