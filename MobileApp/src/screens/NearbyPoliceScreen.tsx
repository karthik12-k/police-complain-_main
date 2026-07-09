import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { userAPI } from '../services/api';

interface Police {
  _id: string;
  user_id: string;
  location: {
    coordinates: [number, number];
  };
  distance?: number;
}

const NearbyPoliceScreen = () => {
  const [police, setPolice] = useState<Police[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const requestLocationPermission = useCallback(() => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchNearbyPolice(latitude, longitude);
      },
      (error) => {
        console.error('Location error:', error);
        Alert.alert('Error', 'Unable to get your location. Please enable location services.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  const fetchNearbyPolice = async (latitude: number, longitude: number) => {
    try {
      const response = await userAPI.getNearbyPolice([longitude, latitude]);
      setPolice(response.data);
    } catch (error) {
      console.error('Error fetching nearby police:', error);
      Alert.alert('Error', 'Failed to fetch nearby police officers.');
    } finally {
      setLoading(false);
    }
  };

  const renderPoliceItem = ({ item }: { item: Police }) => (
    <View style={styles.policeItem}>
      <Text style={styles.policeId}>Police ID: {item.user_id}</Text>
      {item.distance && (
        <Text style={styles.distance}>
          Distance: {(item.distance / 1000).toFixed(2)} km
        </Text>
      )}
      <Text style={styles.coordinates}>
        Location: {item.location.coordinates[1].toFixed(4)}, {item.location.coordinates[0].toFixed(4)}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Finding nearby police officers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Police Officers</Text>
      {location && (
        <Text style={styles.locationText}>
          Your location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Text>
      )}
      {police.length > 0 ? (
        <FlatList
          data={police}
          keyExtractor={(item) => item._id}
          renderItem={renderPoliceItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.noPoliceText}>No police officers found nearby.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={requestLocationPermission}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  policeItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  policeId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  distance: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 5,
  },
  coordinates: {
    fontSize: 12,
    color: '#666',
  },
  noPoliceText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NearbyPoliceScreen;
