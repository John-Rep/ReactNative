import { Image, StyleSheet, Platform, FlatList, Text, Alert, Pressable, StatusBar } from 'react-native';
import { useState, useEffect, FC } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from 'expo-router';

const refURI = "https://aaa9-37-165-122-230.ngrok-free.app/api";

type bookProps = {
  title: string,
  author: string,
  description: string,
  year: number,
  cover: string,
}

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  year: number;
  cover: string;
};

const BookTag: FC<bookProps> = ({title, author, description, year, cover}) => (
  <ThemedView style={styles.bookContainer}>
    <Image source={{ uri: cover }} style={styles.cover}/>
    <ThemedView style={styles.bookInfo}>
      <Text style={styles.bookTitle}>{title}</Text>
      <Text style={styles.bookAuthor}>By {author} {year ? 'in ' + year : ''}</Text>
      <Text style={styles.bookDescription}>{description ? description : 'No description available'}</Text>
    </ThemedView>
    <Pressable style={styles.bookAddButton} onPress={() => Alert.alert("Text here")}>
      <Text>See More</Text>
    </Pressable>
  </ThemedView>
);

export default function HomeScreen() {
  const [data, setData] = useState<Book[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch(refURI + '/books');
      const json = await response.json();
      setData(json.member);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">📚 Library</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Books:</ThemedText>
        <FlatList
          data={data}
          horizontal={false}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
              <BookTag title={item.title} author={item.author} description={item.description} year={item.year} cover={item.cover} />
          )}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginTop: StatusBar.currentHeight || 0,
  },
  titleContainer: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    backgroundColor: '#f5f5f5',
    height: "75%",
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  bookContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
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
  bookInfo: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 10,
  },
  bookTitle: {
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  bookAuthor: {
    padding: 5,
    fontSize: 10,
  },
  bookDescription: {
    padding: 5,
    fontSize: 14,
  },
  bookAddButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    margin: 'auto',
  },
  cover: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
});
