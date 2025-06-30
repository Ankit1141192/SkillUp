import React from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const ProgressScreen = () => {
  const navigation = useNavigation();
  const data = {
    labels: ["Assignment", "Quiz", "Class Participation"],
    data: [0.4, 0.6, 0.8]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Progress</Text>

      <ProgressChart
        data={data}
        width={screenWidth - 40}
        height={250}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />

      <View style={styles.legendContainer}>
        {data.labels.map((label, index) => (
          <Text key={index} style={styles.legendItem}>
            {label}: {(data.data[index] * 100).toFixed(0)}%
          </Text>
        ))}
      </View>

      <Pressable
        onPress={() =>
          navigation.navigate("HomeTab", {
            screen: "HomeQuiz",
          })
        }
        style={{
          backgroundColor: "magenta",
          padding: 14,
          width: 150,
          borderRadius: 25,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>
          Start Quiz
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  legendContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  legendItem: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
});

export default ProgressScreen;
