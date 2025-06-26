import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);


  const [dob, setDob] = useState('');
  const [branch, setBranch] = useState('');
  const [course, setCourse] = useState('');
  const [rank, setRank] = useState('');
  const [total, setTotal] = useState('');

  const fetchProfile = async () => {
    const user = auth().currentUser;
    if (user) {
      const snapshot = await database().ref(`/users/${user.uid}`).once('value');
      const data = snapshot.val();
      setProfile(data);
      setDob(data?.dob || '');
      setBranch(data?.branch || '');
      setCourse(data?.course || '');
      setRank(data?.rank?.toString() || '');
      setTotal(data?.total?.toString() || '');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await auth().signOut();
    navigation.replace('Login');
  };

  const handleUpdate = async () => {
    const user = auth().currentUser;
    if (!user) return;

    const updatedData = {
      name: user.displayName || user.email,
      dob,
      branch,
      course,
      rank: parseInt(rank) || 0,
      total: parseInt(total) || 0,
    };

    await database().ref(`/users/${user.uid}`).update(updatedData);
    setEditing(false);
    fetchProfile();
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {editing ? (
        <View style={styles.card}>
          <Text style={styles.heading}>Update Profile</Text>
          <TextInput
            placeholder="DOB (DD-MM-YYYY)"
            value={dob}
            onChangeText={setDob}
            style={styles.input}
          />
          <TextInput
            placeholder="Branch"
            value={branch}
            onChangeText={setBranch}
            style={styles.input}
          />
          <TextInput
            placeholder="Course"
            value={course}
            onChangeText={setCourse}
            style={styles.input}
          />
          <TextInput
            placeholder="Rank"
            value={rank}
            onChangeText={setRank}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Total Students"
            value={total}
            onChangeText={setTotal}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Update" onPress={handleUpdate} />
        </View>
      ) : (
        <View style={styles.card}>
          {profile?.rank ? (
            <>
              <Text style={styles.rankText}>Rank {profile.rank} out of {profile.total} students</Text>
              <Text style={styles.label}>User Name: <Text style={styles.value}>{profile.name}</Text></Text>
              <Text style={styles.label}>DOB: <Text style={styles.value}>{profile.dob}</Text></Text>
              <Text style={styles.label}>Branch: <Text style={styles.value}>{profile.branch}</Text></Text>
              <Text style={styles.label}>Course: <Text style={styles.value}>{profile.course}</Text></Text>
            </>
          ) : (
            <>
              <Text style={styles.label}>User Name: <Text style={styles.value}>{auth().currentUser?.displayName || auth().currentUser?.email}</Text></Text>
              <Text style={{ color: '#999', marginTop: 10 }}>No profile data yet</Text>
            </>
          )}
          <TouchableOpacity onPress={() => setEditing(true)} style={styles.editBtn}>
            <Text style={{ color: '#fff' }}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={{ color: '#fff' }}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f9f9f9' },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    marginBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  rankText: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: 'bold', marginTop: 10, fontSize: 16 },
  value: { fontWeight: 'normal' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  editBtn: {
    marginTop: 20,
    backgroundColor: '#34A853',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  logoutBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
});