import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native'
import { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import ImageSlider from '../components/ImageSlider'
import Recommended from '../components/Recommended'

const HomeScreen = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [skillBasedCourses, setSkillBasedCourses] = useState([]);
  const [topRatedCourses, setTopRatedCourses] = useState([]);
  const [mostPopularCourses, setMostPopularCourses] = useState([]);
  const [newArrivalsCourses, setNewArrivalsCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const snapshot = await database().ref('courses/featured').once('value');
        const data = snapshot.val();

        if (data) {
          const courseArray = Object.values(data);
          setFeaturedCourses(courseArray);
        }
      } catch (error) {
        console.error('Error fetching featured courses:', error);
      }
    };
    const fetchSkillBasedCourses = async () => {
      try {
        const snapshot = await database().ref('courses/SkillBased').once('value');
        const data = snapshot.val();
        if (data) {
          const courseArray = Object.values(data);
          setSkillBasedCourses(courseArray);
        }
      } catch (error) {
        console.error('Error fetching skill based courses:', error);
      }
    };
    const fetchTopRatedCourses = async () => {
      try {
        const snapshot = await database().ref('courses/TopRated').once('value');
        const data = snapshot.val();
        if (data) {
          const courseArray = Object.values(data);
          setTopRatedCourses(courseArray);
        }
      } catch (error) {
        console.error('Error fetching top rated courses:', error);
      }
    };
    const fetchMostPopularCourses = async () => {
      try {
        const snapshot = await database().ref('courses/MostPopular').once('value');
        const data = snapshot.val();
        if (data) {
          const courseArray = Object.values(data);
          setMostPopularCourses(courseArray);
        }
      } catch (error) {
        console.error('Error fetching most popular courses:', error);
      }
    };
    const fetchNewArrivalsCourses = async () => {
      try {
        const snapshot = await database().ref('courses/NewArrivals').once('value');
        const data = snapshot.val();
        if (data) {
          const courseArray = Object.values(data);
          setNewArrivalsCourses(courseArray);
        }
      } catch (error) {
        console.error('Error fetching new arrivals courses:', error);
      }
    };
    const fetchRecommendedCourses = async () => {
      try {
        const snapshot = await database().ref('courses/Recommended').once('value');
        const data = snapshot.val();
        if (data) {
          const courseArray = Object.values(data);
          setRecommendedCourses(courseArray);
        }
      } catch (error) {
        console.error('Error fetching recommended courses:', error);
      }
    };
    // Fetch all courses when the component mounts
    fetchRecommendedCourses();
    fetchFeaturedCourses();
    fetchTopRatedCourses();
    fetchMostPopularCourses();
    fetchNewArrivalsCourses();
    fetchSkillBasedCourses();
    fetchFeaturedCourses();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageSlider />
      <ScrollView>

        <Text style={styles.title}>Featured</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredCourses.map((course) => (
            <View key={course.id} style={styles.card}>
              <Image source={{ uri: course.coverImage.replace(/[<>]/g, '') }} style={styles.image} />
              <Text style={{ fontWeight: 'bold' }}>{course.name}</Text>
              <Text style={styles.cardInstructor}>By {course.instructor}</Text>
              <Text numberOfLines={2}
                ellipsizeMode="tail" style={styles.description} >{course.description}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.title}>Skill Based</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {skillBasedCourses.map((course) => (
            <View key={course.id} style={styles.card}>
              <Image source={{ uri: course.coverImage.replace(/[<>]/g, '') }} style={styles.image} />
              <Text style={{ fontWeight: 'bold' }}>{course.name}</Text>
              <Text style={styles.cardInstructor}>By {course.instructor}</Text>
              <Text numberOfLines={2}
                ellipsizeMode="tail" style={styles.description} >{course.description}</Text>
            </View>
          ))}

        </ScrollView>
        <Text style={styles.title}>Top Rated</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topRatedCourses.map((course) => (
            <View key={course.id} style={styles.card}>
              <Image source={{ uri: course.coverImage.replace(/[<>]/g, '') }} style={styles.image} />
              <Text style={{ fontWeight: 'bold' }}>{course.name}</Text>
              <Text style={styles.cardInstructor}>By {course.instructor}</Text>
              <Text numberOfLines={2}
                ellipsizeMode="tail" style={styles.description}>{
                  course.description}</Text>
            </View>
          ))}

        </ScrollView>
        <Text style={styles.title}>Most Popular</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mostPopularCourses.map((course) => (
            <View key={course.id} style={styles.card}>
              <Image source={{ uri: course.coverImage.replace(/[<>]/g, '') }} style={styles.image} />
              <Text style={{ fontWeight: 'bold' }}>{course.name}</Text>
              <Text style={styles.cardInstructor}>By {course.instructor}</Text>
              <Text numberOfLines={2}
                ellipsizeMode="tail" style={styles.description} >{course.description}</Text>
            </View>
          ))}

        </ScrollView>
        <Text style={styles.title}>New Arrivals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {newArrivalsCourses.map((course) =>
            <View key={course.id} style={styles.card}>
              <Image source={{ uri: course.coverImage.replace(/[<>]/g, '') }} style={styles.image} />
              <Text style={{ fontWeight: 'bold' }}>{course.name}</Text>
              <Text style={styles.cardInstructor}>By {course.instructor}</Text>
              <Text numberOfLines={2}
                ellipsizeMode="tail" style={styles.description} >{course.description}</Text>
            </View>
          )}

        </ScrollView>
        {/* Recommended component will render the recommended courses */}
        <View style={styles.recommendedSection}>
          <Text style={styles.title1}>Recommended For You</Text>
          {recommendedCourses.map((course) => (
            <View key={course.id} style={styles.verticalCard}>
              <Image
                source={{ uri: course.coverImage.replace(/[<>]/g, '') }}
                style={styles.verticalImage}
              />
              <Text style={styles.cardTitle}>{course.name}</Text>
              <Text style={styles.cardInstructor}>By {course.instructor}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardDescription}>
                {course.description}
              </Text>
            </View>
          ))}
        </View>



      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },

  // Reusable horizontal card
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
    marginBottom: 8,
  },

  title: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    marginLeft: 12,
    color:"#68a8e3",
    marginTop: 16,
  },
  title1: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#68a8e3",
    marginTop: 16,
  },

  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },

  // Section headers
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  // Recommended Section
  recommendedSection: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 40,
  },

  verticalCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
  },

  verticalImage: {
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
