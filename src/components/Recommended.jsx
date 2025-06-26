
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';

// Recommended component expects 'courses' as a prop
const Recommended = ({ courses }) => {
//   if (!courses || courses.length === 0) {
//     return (
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Recommended For You</Text>
//         <Text>No courses available</Text>
//       </View>
//     );
//   }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recommended For You</Text>
      {courses.map((course) => (
        <View key={course.id} style={styles.verticalCard}>
          <Image
            source={{ uri: course.coverImage.replace(/[<>]/g, '') }}
            style={styles.image}
          />
          <Text style={styles.cardTitle}>{course.name}</Text>
          <Text style={styles.cardInstructor}>By {course.instructor}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.cardDescription}
          >
            {course.description}
          </Text>
        </View>
      ))}
    </View>
  );
};


export default Recommended;

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  verticalCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardInstructor: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
});
