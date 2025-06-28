// HomeScreen.js
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import ImageSlider from '../components/ImageSlider'

const HomeScreen = ({ navigation }) => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [skillBasedCourses, setSkillBasedCourses] = useState([]);
  const [topRatedCourses, setTopRatedCourses] = useState([]);
  const [mostPopularCourses, setMostPopularCourses] = useState([]);
  const [newArrivalsCourses, setNewArrivalsCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  useEffect(() => {
    const fetchData = async (type, setter) => {
      try {
        const snapshot = await database().ref(`courses/${type}`).once('value');
        const data = snapshot.val();
        if (data) setter(Object.values(data));
      } catch (error) {
        console.error(`Error fetching ${type} courses:`, error);
      }
    };
    fetchData('featured', setFeaturedCourses);
    fetchData('SkillBased', setSkillBasedCourses);
    fetchData('TopRated', setTopRatedCourses);
    fetchData('MostPopular', setMostPopularCourses);
    fetchData('NewArrivals', setNewArrivalsCourses);
    fetchData('Recommended', setRecommendedCourses);
  }, []);

  const renderCard = (course) => (
    <TouchableOpacity key={course.id} style={styles.card} onPress={() => navigation.navigate('CourseScreen', { course })}>
      <Image source={{ uri: course.coverImage.replace(/[<>]/g, '') }} style={styles.image} />
      <Text style={{ fontWeight: 'bold' }}>{course.name}</Text>
      <Text style={styles.cardInstructor}>By {course.instructor}</Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>{course.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageSlider />
      <ScrollView>
        <Text style={styles.title}>Featured</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredCourses.map(renderCard)}
        </ScrollView>

        <Text style={styles.title}>Skill Based</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {skillBasedCourses.map(renderCard)}
        </ScrollView>

        <Text style={styles.title}>Top Rated</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topRatedCourses.map(renderCard)}
        </ScrollView>

        <Text style={styles.title}>Most Popular</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mostPopularCourses.map(renderCard)}
        </ScrollView>

        <Text style={styles.title}>New Arrivals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {newArrivalsCourses.map(renderCard)}
        </ScrollView>

        <View style={styles.recommendedSection}>
          <Text style={styles.title1}>Recommended For You</Text>
          {recommendedCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.verticalCard} onPress={() => navigation.navigate('CourseScreen', { course })}>
              <Image source={{ uri: course.coverImage.replace(/[<>]/g, '') }} style={styles.verticalImage} />
              <Text style={styles.cardTitle}>{course.name}</Text>
              <Text style={styles.cardInstructor}>By {course.instructor}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardDescription}>{course.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  card: {
    width: 240, height: 240, marginTop: 10, backgroundColor: '#fff', borderRadius: 12,
    marginRight: 12, padding: 10, shadowColor: '#000', shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 7, elevation: 2,
  },
  image: { width: '100%', height: 120, borderRadius: 8, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: 'bold', marginLeft: 12, color: "#68a8e3", marginTop: 16 },
  title1: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: "#68a8e3", marginTop: 16 },
  description: { fontSize: 14, color: '#555', marginTop: 6 },
  cardInstructor: { fontSize: 14, color: '#666', marginTop: 4 },
  recommendedSection: { paddingHorizontal: 16, marginTop: 24, marginBottom: 40 },
  verticalCard: {
    backgroundColor: '#fff', padding: 16, marginBottom: 16,
    borderRadius: 10, elevation: 2,
  },
  verticalImage: { width: '100%', height: 150, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardDescription: { fontSize: 14, color: '#555', marginTop: 6 },
});
