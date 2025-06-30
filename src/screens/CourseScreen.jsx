import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Linking,
  Alert,
} from 'react-native';

const CourseScreen = ({ route }) => {
  const { course } = route.params;

  // 1. Clean the cover image URI:
  const coverImage = course.coverImage?.replace(/[<>\\]/g, '').trim();

  // 2. Normalize course.part into an array of lessons:
  let lessons = [];
  if (Array.isArray(course.part)) {
    lessons = course.part.filter(Boolean);
  } else if (course.part && typeof course.part === 'object') {
    lessons = Object.values(course.part).filter(Boolean);
  }

  // 3. Function to open YouTube, stripping any ?si=… or bad chars:
  const openYouTube = async (url) => {
    if (!url) {
      return Alert.alert('No link', 'This lesson has no YouTube link.');
    }
    // drop everything after “?” (removes ?si=…)
    const clean = url.split('?')[0].trim();
    try {
      const can = await Linking.canOpenURL(clean);
      if (!can) throw new Error('Cannot open URL');
      await Linking.openURL(clean);
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', 'Could not open video.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: coverImage }} style={styles.image} />
      <Text style={styles.title}>{course.name}</Text>
      <Text style={styles.instructor}>By {course.instructor}</Text>
      <Text style={styles.description}>{course.description}</Text>

      {lessons.map((lesson, idx) => (
        <View key={idx} style={styles.lessonBox}>
          <Text style={styles.lessonTitle}>🎓 {lesson.title}</Text>
          <Text style={styles.lessonText}>🕒 {lesson.duration}</Text>
          <Text style={styles.lessonText}>📖 {lesson.content}</Text>

          <Pressable
            style={styles.youtubeButton}
            onPress={() => openYouTube(lesson.youtubeLink)}
          >
            <Text style={styles.youtubeLink}>▶️ Watch on YouTube</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flexGrow: 1 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  instructor: { fontSize: 16, color: '#666', marginBottom: 12 },
  description: { fontSize: 15, lineHeight: 22, marginBottom: 16 },
  lessonBox: {
    backgroundColor: '#F0F8FF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  lessonTitle: { fontSize: 16, fontWeight: 'bold' },
  lessonText: { fontSize: 14, marginTop: 4 },
  youtubeButton: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#FF0000',
    borderRadius: 6,
    alignItems: 'center',
  },
  youtubeLink: { color: '#fff', fontWeight: 'bold' },
});
