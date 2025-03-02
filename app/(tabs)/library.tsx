import { FC, useEffect, useState } from 'react';
import { Alert, FlatList, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { refURI } from './index';

const deleteOptions = {
  method: 'DELETE',
  headers: {
      'accept': '*/*',
  }
};


type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  year: number;
  cover: string;
};



export default function Library() {

  const [idUpdate, setId] = useState('');
  const [titleUpdate, setTitle] = useState('');
  const [authorUpdate, setAuthor] = useState('');
  const [descriptionUpdate, setDescription] = useState('');
  const [yearUpdate, setYear] = useState('');
  const [coverUpdate, setCover] = useState('');
  
  const [titleBase, setTitleBase] = useState('');
  const [authorBase, setAuthorBase] = useState('');
  const [descriptionBase, setDescriptionBase] = useState('');
  const [yearBase, setYearBase] = useState('');
  const [coverBase, setCoverBase] = useState('');
  
  const patchOptions = {
      method: 'PATCH',
      headers: {
          'accept': 'application/ld+json',
          'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify({
          "title": titleUpdate,
          "author": authorUpdate,
          "description": descriptionUpdate ? descriptionUpdate : null,
          "year": yearUpdate ? parseInt(yearUpdate) : null,
          "cover": coverUpdate ? coverUpdate : "https://i.pinimg.com/originals/0d/76/f2/0d76f2d3429cb61b53c8d1e48df327f6.jpg"
      })
  };

  const BookTag: FC<Book> = ({title, author, description, year, cover, id}) => (
    <ThemedView style={styles.bookContainer}>
      <Image source={{ uri: cover }} style={styles.cover}/>
      <ThemedView style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{title}</Text>
        <Text style={styles.bookAuthor}>By {author} {year ? 'in ' + year : ''}</Text>
        <Text style={styles.bookDescription}>{description ? description : 'No description available'}</Text>
      </ThemedView>
      <ThemedView style={styles.bookInfo}>
        <Pressable style={styles.bookButton} onPress={() => deleteBook(id)}>
          <Text style={styles.bookButtonText}>Delete</Text>
        </Pressable>
        <Pressable style={styles.bookButton} onPress={() => prepareEdit(title, author, description, year, cover, id)}>
          <Text style={styles.bookButtonText}>Edit</Text>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );

  const prepareEdit = (title: string, author: string, description: string, year: number, cover: string, id:string) => {
    setTitleBase(title);
    setAuthorBase(author);
    setDescriptionBase(description);
    setYearBase(year ? year.toString() : '');
    setCoverBase(cover);
    setId(id);
    setTitle(title);
    setAuthor(author);
    setDescription(description);
    setYear(year ? year.toString() : '');
    setCover(cover);
    setUpdateVisible(true);
  }
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<Book[]>([]);
  const [updateVisible, setUpdateVisible] = useState(false);
  
  const getBooks = async (page: number) => {
    try {
      const response = await fetch(refURI + '/api/books?page=' + page);
      const json = await response.json();
      setTotalPages(Math.ceil(json.totalItems / 10));
      setData(json.member);
    } catch (error) {
      console.error(error);
    }
  };

  const patchBook = async () => {
    try {
      await fetch(refURI + '/api/books/' + idUpdate, patchOptions)
      .then((response) => {
        if(response.status == 200) {
          getBooks(page);
          setUpdateVisible(false);
          Alert.alert("Book Successfully Updated");
        } else {
          Alert.alert("Book Update Failed");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const deleteBook = async (id: string) => {
    try {
      await fetch(refURI + '/api/books/' + id, deleteOptions)
      .then((response) => {
        if(response.status == 204) {
          getBooks(page);
          Alert.alert("Book Successfully Deleted");
        } else {
          Alert.alert("Book could not be deleted");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBooks(page);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="title" style={styles.titleText}>📚 Library</ThemedText>

      <Modal
        animationType="slide"
        transparent={true}
        visible={updateVisible}
        onRequestClose={() => {
          setUpdateVisible(!updateVisible);
        }}>
        <ThemedView style={styles.editBookView}>
          <ThemedText type="title">Edit Book</ThemedText>
          <TextInput style={styles.bookInputField}
            onChangeText={setTitle}
            value={titleUpdate}
            placeholder={titleBase ? titleBase : "Add Title"}
          />
          <TextInput style={styles.bookInputField}
            onChangeText={setAuthor}
            value={authorUpdate}
            placeholder={authorBase ? authorBase : "Add author"}
          />
          <TextInput style={styles.bookInputField}
            onChangeText={setDescription}
            value={descriptionUpdate}
            placeholder={descriptionBase ? descriptionBase : "Add description"}
          />
          <TextInput style={styles.bookInputField}
            onChangeText={setYear}
            value={yearUpdate}
            placeholder={yearBase ? yearBase.toString() : "Add Publication Year"}
            keyboardType="numeric"
          />
          <TextInput style={styles.bookInputField}
            onChangeText={setCover}
            value={coverUpdate}
            placeholder={coverBase ? coverBase : "Add cover photo URL"}
          />
          <ThemedView style={styles.horizontalView}>
            <Pressable style={styles.bookButton}
              onPress={() => patchBook()}>
              <Text style={styles.bookButtonText}>Save</Text>
            </Pressable>
            <Pressable style={styles.bookButton}
              onPress={() => setUpdateVisible(false)}>
              <Text style={styles.bookButtonText}>Cancel</Text>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </Modal>

      <ThemedView style={styles.bookListContainer}>
        <FlatList
          data={data}
          horizontal={false}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
              <BookTag id={item.id} title={item.title} author={item.author} description={item.description} year={item.year} cover={item.cover} />
          )}
        />
        <ThemedView style={styles.buttonContainer}>
          <ThemedText style={styles.pageTitleText}>Page: {page} of {totalPages}</ThemedText>
          <ThemedView style={styles.horizontalView}>
            {(page > 1) ? <Pressable style={styles.pageButton} onPress={() => {getBooks(page - 1); setPage(page - 1);}}>
              <ThemedText>Previous</ThemedText>
            </Pressable> : ""}
            <Pressable style={styles.pageButton} onPress={() => {getBooks(page);}}>
              <ThemedText>Refresh Page</ThemedText>
            </Pressable>
            {(page < totalPages) ? <Pressable style={styles.pageButton} onPress={() => {getBooks(page + 1); setPage(page + 1);}}>
              <ThemedText>Next</ThemedText>
            </Pressable> : ""}
          </ThemedView>
        </ThemedView>
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
  horizontalView: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bookInputField: {
    fontSize: 16,
    padding: 10,
    backgroundColor: 'lightgray',
    marginVertical: 7,
  },
  editBookView: {
    flex: 1,
    marginTop: 60,
    maxHeight: '55%',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    padding: 10,
    gap: 8,
  },
  pageTitleText: {
    backgroundColor: '#f5f5f5',
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
    gap: 8,
  },
  bookListContainer: {
    backgroundColor: '#f5f5f5',
    flex: .95,
    gap: 8,
    marginVertical: 8,
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
  buttonContainer: {
    backgroundColor: '#f5f5f5',
    gap: 8,
    marginVertical: 8,
  },
  pageButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginHorizontal: 'auto',
    marginVertical: 8,
  },
  bookInfo: {
    backgroundColor: 'lightgrey',
    flex: 6,
    borderRadius: 10,
    padding: 10,
  },
  bookButtonContainer: {
    backgroundColor: 'lightgrey',
    flex: 1,
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
  bookButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  bookButtonText: {
    padding: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  cover: {
    width: "15%",
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
});
