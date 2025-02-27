import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define book type
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
}

// Sample book data
const books: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://via.placeholder.com/100' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'https://via.placeholder.com/100' },
  { id: '3', title: '1984', author: 'George Orwell', cover: 'https://cdn.dc5.ro/img-prod/1728045377-5.jpeg' },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', cover: 'https://via.placeholder.com/100' },
  { id: '5', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://via.placeholder.com/100' },
  { id: '6', title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'https://via.placeholder.com/100' },
  { id: '7', title: '1984', author: 'George Orwell', cover: 'https://via.placeholder.com/100' },
  { id: '8', title: 'Pride and Prejudice', author: 'Jane Austen', cover: 'https://via.placeholder.com/100' },
  { id: '10', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://via.placeholder.com/100' },
  { id: '11', title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'https://via.placeholder.com/100' },
  { id: '12', title: '1984', author: 'George Orwell', cover: 'https://via.placeholder.com/100' },
  { id: '13', title: 'Pride and Prejudice', author: 'Jane Austen', cover: 'https://via.placeholder.com/100' },
];

const TabTwoScreen: React.FC = () => {

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={styles.card} onPress={() => Alert.alert("Text here")}>
      <Image source={{ uri: item.cover }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Library</Text>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cover: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
});

export default TabTwoScreen;