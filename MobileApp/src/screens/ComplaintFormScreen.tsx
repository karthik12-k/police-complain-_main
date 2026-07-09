import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  ComplaintForm: undefined;
  NearbyPolice: undefined;
  PoliceLogin: undefined;
  PoliceSignup: undefined;
};

type ComplaintFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ComplaintForm'>;

interface Props {
  navigation: ComplaintFormScreenNavigationProp;
}

const ComplaintFormScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [complaint, setComplaint] = useState('');
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates([longitude, latitude]);
        setLocationLoading(false);
      },
      (error) => {
        console.error('Location error:', error);
        Alert.alert('Location Error', 'Unable to get your location. Please enable location services.');
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSubmitComplaint = async () => {
    if (!phoneNumber || !complaint || !coordinates) {
      Alert.alert('Error', 'Please fill in all fields and ensure location is available');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.64:5000/api/complaint', {
        phoneNumber,
        complaint,
        coordinates,
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('userPost', JSON.stringify(coordinates));
        Alert.alert('Success', 'Complaint filed successfully!', [
          {
            text: 'View Nearby Police',
            onPress: () => navigation.navigate('NearbyPolice'),
          },
          { text: 'OK', style: 'cancel' },
        ]);
      }
    } catch (error) {
      console.error('Complaint submission error:', error);
      Alert.alert('Error', 'Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>File a Complaint</Text>
      <Text style={styles.subtitle}>Report an incident</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your complaint"
        value={complaint}
        onChangeText={setComplaint}
        multiline
        numberOfLines={4}
      />

      <View style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Location:</Text>
        {locationLoading ? (
          <ActivityIndicator size="small" color="#007bff" />
        ) : coordinates ? (
          <Text style={styles.locationText}>
            Lat: {coordinates[1].toFixed(6)}, Lng: {coordinates[0].toFixed(6)}
          </Text>
        ) : (
          <Text style={styles.locationText}>Location not available</Text>
        )}
        <TouchableOpacity style={styles.refreshButton} onPress={getCurrentLocation}>
          <Text style={styles.refreshButtonText}>Refresh Location</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmitComplaint} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit Complaint</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#007bff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ComplaintFormScreen;
