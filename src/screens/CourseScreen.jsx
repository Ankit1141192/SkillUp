import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';

const CourseScreen = ({ route }) => {
  const { course } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: course.coverImage.replace(/[<>]/g, '') }} style={styles.image} />
      <Text style={styles.title}>{course.name}</Text>
      <Text style={styles.instructor}>By {course.instructor}</Text>
      <Text style={styles.description}>{course.description}</Text>
    </ScrollView>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  instructor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});
