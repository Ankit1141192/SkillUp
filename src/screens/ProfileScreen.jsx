import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [branch, setBranch] = useState('');
  const [course, setCourse] = useState('');
  const [photoUri, setPhotoUri] = useState('');

  const fetchProfile = async () => {
    const user = auth().currentUser;
    if (user) {
      const snapshot = await database().ref(`/users/${user.uid}`).once('value');
      const data = snapshot.val();
      setProfile(data);
      setName(data?.name || user.displayName || user.email);
      setDob(data?.dob || '');
      setBranch(data?.branch || '');
      setCourse(data?.course || '');
      setPhotoUri(data?.photo || '');
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
      name,
      dob,
      branch,
      course,
      photo: photoUri,
    };

    await database().ref(`/users/${user.uid}`).update(updatedData);
    setEditing(false);
    fetchProfile();
  };

  const CameraComponent = ({ onCapture }) => {
    const cameraRef = useRef(null);
    const devices = useCameraDevices();
    const device = devices.back;
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
      (async () => {
        const status = await Camera.requestCameraPermission();
        if (status === 'authorized') setHasPermission(true);

        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setHasPermission(true);
          }
        }
      })();
    }, []);

    if (!device || !hasPermission)
      return (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ marginBottom: 10 }}>Camera not available or permission denied</Text>
          <TouchableOpacity onPress={handleImagePick} style={styles.uploadBtn}>
            <Text style={{ color: '#fff' }}>Upload from Gallery</Text>
          </TouchableOpacity>
        </View>
      );

    const takePhoto = async () => {
      try {
        const photo = await cameraRef.current.takePhoto();
        const uri = `file://${photo.path}`;
        onCapture(uri);
        setCameraVisible(false);
      } catch (e) {
        console.error('Camera error:', e);
      }
    };

    return (
      <View style={{ width: '100%', height: 400, borderRadius: 10, overflow: 'hidden', marginTop: 20 }}>
        <Camera ref={cameraRef} style={{ flex: 1 }} device={device} isActive={true} photo={true} />
        <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
          <Icon name="camera-alt" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result?.assets?.length > 0) {
      setPhotoUri(result.assets[0].uri);
      setCameraVisible(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: photoUri || 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={() => setCameraVisible(true)}>
            <Icon name="photo-camera" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{profile?.name || name}</Text>
        <Text style={styles.info}>Branch: {profile?.branch}</Text>
        <Text style={styles.info}>Course: {profile?.course}</Text>
        <Text style={styles.info}>DOB: {profile?.dob}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => setEditing(true)} style={styles.editBtn}>
            <Text style={{ color: '#fff' }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={{ color: '#fff' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {editing && (
        <View style={styles.card}>
          <Text style={styles.heading}>Update Details</Text>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="DOB" value={dob} onChangeText={setDob} style={styles.input} />
          <TextInput placeholder="Branch" value={branch} onChangeText={setBranch} style={styles.input} />
          <TextInput placeholder="Course" value={course} onChangeText={setCourse} style={styles.input} />

          <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn}>
            <Text style={{ color: '#fff' }}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}

      {cameraVisible && <CameraComponent onCapture={setPhotoUri} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0f4f7' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 120 / 3,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editBtn: {
    marginTop: 10,
    backgroundColor: '#68a8e3',
    padding: 12,
    width: '45%',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutBtn: {
    marginTop: 10,
    width: '45%',
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateBtn: {
    backgroundColor: '#68a8e3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  captureBtn: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#68a8e3',
    padding: 15,
    borderRadius: 30,
  },
  uploadBtn: {
    backgroundColor: '#6c756c',
    padding: 12,
    fontWeight: 'bold',
    borderRadius: 8,
    alignItems: 'center',
  },
});
