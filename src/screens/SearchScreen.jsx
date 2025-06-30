import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Keyboard
} from 'react-native';
import database from '@react-native-firebase/database';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const types = ['featured', 'SkillBased', 'TopRated', 'MostPopular', 'NewArrivals', 'Recommended'];
      let all = [];

      for (const type of types) {
        const snapshot = await database().ref(`courses/${type}`).once('value');
        const data = snapshot.val();
        if (data) {
          all = [...all, ...Object.values(data)];
        }
      }

      setAllCourses(all);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredCourses([]);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = allCourses.filter(course =>
        course.name?.toLowerCase().includes(lowerQuery) ||
        course.instructor?.toLowerCase().includes(lowerQuery)
      );
      setFilteredCourses(filtered);
    }
  }, [query]);

  const renderCourseCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        Keyboard.dismiss();
        navigation.navigate('CourseScreen', { course: item });
      }}
    >
      <Image
        source={{ uri: item.coverImage?.replace(/[<>]/g, '') }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.instructor}>By {item.instructor}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchBoxWrapper}>
        <TextInput
          placeholder="Search for a course..."
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={filteredCourses.length ? filteredCourses : allCourses.slice(0, 5)}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseCard}
        ListHeaderComponent={
          query.trim() === ''
            ? <Text style={styles.suggestionsTitle}>Suggestions for you</Text>
            : null
        }
        ListEmptyComponent={<Text style={styles.noResult}>No course found.</Text>}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  searchBoxWrapper: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    elevation: 3,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 4,
    color: '#68a8e3',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  instructor: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
  },
  noResult: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 16,
  },
});
