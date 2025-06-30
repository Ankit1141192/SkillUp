import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import database from '@react-native-firebase/database';
import ImageSlider from '../components/ImageSlider';

const CourseSection = ({ title, data, navigation }) => {
  if (!data || data.length === 0) return null;

  const renderCard = (course) => (
    <TouchableOpacity
      key={course.id}
      style={styles.card}
      onPress={() => navigation.navigate('CourseScreen', { course })}
    >
      <Image
        source={{ uri: course.coverImage.replace(/[<>]/g, '') }}
        style={styles.image}
      />
      <Text style={{ fontWeight: 'bold' }}>{course.name}</Text>
      <Text style={styles.cardInstructor}>By {course.instructor}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
        {course.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => renderCard(item)}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const HomeScreen = ({ navigation }) => {
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const courseTypes = [
      'featured',
      'SkillBased',
      'TopRated',
      'MostPopular',
      'NewArrivals',
      'Recommended',
    ];

    const fetchAllData = async () => {
      try {
        const courseData = {};
        for (const type of courseTypes) {
          const snapshot = await database().ref(`courses/${type}`).once('value');
          const data = snapshot.val();
          courseData[type] = data ? Object.values(data) : [];
        }
        setCourses(courseData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#68a8e3" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <ImageSlider />
        <CourseSection title="Featured" data={courses.featured} navigation={navigation} />
        <CourseSection title="Skill Based" data={courses.SkillBased} navigation={navigation} />
        <CourseSection title="Top Rated" data={courses.TopRated} navigation={navigation} />
        <CourseSection title="Most Popular" data={courses.MostPopular} navigation={navigation} />
        <CourseSection title="New Arrivals" data={courses.NewArrivals} navigation={navigation} />

        <View style={styles.recommendedSection}>
          <Text style={styles.title1}>Recommended For You</Text>
          {courses.Recommended.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.verticalCard}
              onPress={() => navigation.navigate('CourseScreen', { course })}
            >
              <Image
                source={{ uri: course.coverImage.replace(/[<>]/g, '') }}
                style={styles.verticalImage}
              />
              <Text style={styles.cardTitle}>{course.name}</Text>
              <Text style={styles.cardInstructor}>By {course.instructor}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardDescription}>
                {course.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1,
     backgroundColor: '#fff', 
     padding: 10 
    },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  card: {
    width: 240,
    height: 240,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 2,
  },
  image: { 
    width: '100%', 
    height: 120, 
    borderRadius: 8, 
    marginBottom: 8 
  },
  title: { fontSize: 22, 
    fontWeight: 'bold', 
    marginLeft: 12, 
    color: '#68a8e3', 
    marginTop: 16 
  },
  title1: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#68a8e3', 
    marginTop: 16 
  },
  description: { 
    fontSize: 14, 
    color: '#555', 
    marginTop: 6 
  },
  cardInstructor: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 4 
  },
  recommendedSection: {
     paddingHorizontal: 16, 
     marginTop: 24, 
     marginBottom: 40 
    },
  verticalCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
  },
  verticalImage: { width: '100%', 
    height: 150, 
    borderRadius: 8, 
    marginBottom: 10
   },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333' 
  },
  cardDescription: { 
    fontSize: 14, 
    color: '#555', 
    marginTop: 6 
  },
});
