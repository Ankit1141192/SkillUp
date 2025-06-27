import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function Camera() {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      }
    };
    requestPermission();
  }, []);

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto({
        flash: 'off',
      });
      setPhoto(`file://${photo.path}`);
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  if (!device) return <Text>Loading camera...</Text>;

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.card}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <TouchableOpacity style={styles.button} onPress={retakePhoto}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
          ref={camera}
        />
      )}
      {!photo && (
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '90%',
    height: '70%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 15,
    alignItems: 'center',
  },
  preview: {
    width: 250,
    height: 350,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

