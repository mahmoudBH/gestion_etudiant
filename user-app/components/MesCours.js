import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const MesCours = () => {
    const [cours, setCours] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchCours = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://192.168.205.100:4000/api/mescours', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCours(data);
            } else {
                console.log('Error fetching courses:', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCours();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchCours();
    };

    const handleDownload = async (fileUrl) => {
        try {
            const fileName = fileUrl.split('/').pop(); // Extract file name
            const fileUri = FileSystem.documentDirectory + fileName; // Build local file path

            // Download the file
            const downloadResult = await FileSystem.downloadAsync(fileUrl, fileUri);

            if (downloadResult.status === 200) {
                // Check if sharing is available or save in the Downloads folder
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(fileUri);
                } else {
                    Alert.alert('Download Complete', 'File saved, but sharing is not available.');
                }
            } else {
                Alert.alert('Error', 'Failed to download course.');
            }
        } catch (error) {
            console.error('Download error:', error);
            Alert.alert('Error', 'Failed to download the file.');
        }
    };

    const renderCourse = ({ item }) => (
        <View style={styles.courseItem}>
            <Text style={styles.courseTitle}>{item.matiere}</Text>
            <Text style={styles.courseDescription}>Class: {item.classe}</Text>
            <Text style={styles.courseDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(item.fileUrl)}>
                <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Courses</Text>
            <FlatList
                data={cours}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCourse}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f9fc',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1e305f',
        alignSelf: 'center',
        marginBottom: 20,
    },
    courseItem: {
        padding: 18,
        marginVertical: 10,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e6ef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    courseTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e305f',
    },
    courseDescription: {
        fontSize: 16,
        color: '#64748b',
        marginVertical: 4,
    },
    courseDate: {
        fontSize: 14,
        color: '#9aa5b1',
        marginTop: 6,
        fontStyle: 'italic',
    },
    downloadButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#007bff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
    },
    downloadButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MesCours;
