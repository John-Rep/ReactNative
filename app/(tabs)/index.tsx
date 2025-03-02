import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export const refURI = "https://d627-2a02-8428-26d-3701-713e-e839-1d68-d7e0.ngrok-free.app";

export default function HomeScreen() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [cover, setCover] = useState('');

  const options = {
      method: 'POST',
      headers: {
          'accept': 'application/ld+json',
          'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify({
          "title": title,
          "author": author,
          "description": description ? description : null,
          "year": year ? parseInt(year) : null,
          "cover": cover ? cover : "https://i.pinimg.com/originals/0d/76/f2/0d76f2d3429cb61b53c8d1e48df327f6.jpg"
      })
  };

  const PostBook = async () => {
    try {
        
      await fetch(refURI + '/api/books', options)
        .then((response) => {
          if(response.status == 201) {
            Alert.alert("Book Successfully Added");
            setTitle('');
            setAuthor('');
            setDescription('');
            setYear('');
            setCover('');
          } else {
            Alert.alert("Book Addition Failed: " + response.status);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <ThemedText type="title" style={styles.titleContainer}>Add a New Book!</ThemedText>
        <TextInput style={styles.bookInputField}
          onChangeText={setTitle}
          value={title}
          placeholder="title"
        />
        <TextInput style={styles.bookInputField}
          onChangeText={setAuthor}
          value={author}
          placeholder="author"
        />
        <TextInput style={styles.bookInputField}
          onChangeText={setDescription}
          value={description}
          placeholder="description"
        />
        <TextInput style={styles.bookInputField}
          onChangeText={setYear}
          value={year}
          placeholder="publication year"
          keyboardType="numeric"
        />
        <TextInput style={styles.bookInputField}
          onChangeText={setCover}
          value={cover}
          placeholder="add the url of a cover image online"
        />
      <Pressable style={styles.bookAddButton} onPress={() => {
        if (author == '' || title == '') {
          Alert.alert('Books must have a title and an author');
        } else {
          PostBook()
        }
      }
    }>
        <Text>Add New Book</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    padding: 10,
    gap: 8,
  },
  bookListContainer: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    gap: 8,
    marginBottom: 8,
  },
  bookInputField: {
    fontSize: 16,
    padding: 10,
    backgroundColor: 'lightgray',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bookAddButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    margin: 'auto',
  },
});
