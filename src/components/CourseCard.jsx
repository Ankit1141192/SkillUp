import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function CourseCard({ title, image, instructor }) {
  return (
    <View style={styles.card}>
      {/* {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      {instructor && (
        <Text style={styles.instructor}>By {instructor}</Text>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  instructor: {
    fontSize: 12,
    color: '#777',
  },
});
