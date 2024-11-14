import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

// Helper function to get a random color or gradient for store cards
const getStoreBackgroundColor = (id) => {
  const darkColors = [
    '#B22222', // Dark Red (for Tech World)
    '#4169E1', // Royal Blue (for Fashion Fiesta)
    '#006400', // Dark Green (for Book Haven)
    '#8B4513', // Saddle Brown (for Home Essentials)
    '#A52A2A', // Brown (for Grocery Galaxy)
    '#4B0082', // Indigo (for Pet Palace)
  ];

  // Return color based on the store ID
  return darkColors[(id - 1) % darkColors.length];
};

const SearchScreen = ({ navigation }) => {
  const initialStores = [
    {
      id: 1,
      name: 'Tech World',
      description: 'All about gadgets and electronics, offering the latest in tech, from smartphones to laptops, accessories, and more.',
      comments: ['Great selection of tech gadgets!', 'Staff is very knowledgeable.', 'Affordable prices and excellent quality!', 'Highly recommend for tech lovers.'],
      link: 'https://www.techworld.com',
    },
    {
      id: 2,
      name: 'Fashion Fiesta',
      description: 'Trendy clothes and accessories for all ages. Latest trends at affordable prices, including seasonal collections.',
      comments: ['Love the fashion variety!', 'Affordable and stylish!', 'Great quality clothes!', 'Fantastic customer service!'],
      link: 'https://www.fashionfiesta.com',
    },
    // More stores...
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [showWelcomeText, setShowWelcomeText] = useState(true); // New state to toggle welcome text visibility

  // Function to handle search input change
  const handleSearch = (query) => {
    setSearchTerm(query);

    // If query is empty, clear the results
    if (!query) {
      setFilteredStores([]);
      return;
    }

    // Filter the stores based on the search term
    const filtered = initialStores.filter(store =>
      store.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStores(filtered);
    setShowWelcomeText(false); // Hide the welcome text when a search is done
  };

  const toggleExpand = (id, type) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], [type]: !prevState[id]?.[type] },
    }));
  };

  return (
    <View style={styles.container}>
      {/* "Welcome to Yalla App" - Shown at the center initially */}
      {showWelcomeText && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome to Yalla App</Text>
        </View>
      )}

      {/* List of filtered stores */}
      {filteredStores.length > 0 && (
        <FlatList
          data={filteredStores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isDescriptionExpanded = expandedItems[item.id]?.description;
            const isCommentsExpanded = expandedItems[item.id]?.comments;

            return (
              <View style={[styles.storeCard, { backgroundColor: getStoreBackgroundColor(item.id) }]}>
                {/* Store Name */}
                <Text style={styles.storeName}>{item.name}</Text>

                {/* Partial/Expandable Store Description */}
                <Text style={styles.storeDescription}>
                  {isDescriptionExpanded ? item.description : `${item.description.slice(0, 50)}...`}
                </Text>
                <TouchableOpacity onPress={() => toggleExpand(item.id, 'description')}>
                  <Text style={styles.expandText}>
                    {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                  </Text>
                </TouchableOpacity>

                {/* Store Link */}
                <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.visitButton}>
                  <Text style={styles.visitButtonText}>Visit Store</Text>
                </TouchableOpacity>

                {/* Collapsible Comments Section */}
                <Text style={styles.commentsTitle}>Comments:</Text>
                {(isCommentsExpanded ? item.comments : item.comments.slice(0, 2)).map((comment, index) => (
                  <Text key={index} style={styles.comment}>{comment}</Text>
                ))}
                {item.comments.length > 2 && (
                  <TouchableOpacity onPress={() => toggleExpand(item.id, 'comments')}>
                    <Text style={styles.expandText}>
                      {isCommentsExpanded ? 'Hide Comments' : 'View All Comments'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        />
      )}

      {/* Search input with Camera and Microphone icons inside the TextInput */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={handleSearch} // Call handleSearch to update results as you type
          placeholder="Ask YallaApp"
          placeholderTextColor="#888"
        />
        {/* Camera Icon */}
        <TouchableOpacity style={styles.iconButton} onPress={() => { /* Handle camera icon press */ }}>
          <Icon name="camera" size={20} color="black" />
        </TouchableOpacity>
        {/* Microphone Icon */}
        <TouchableOpacity style={styles.iconButton1} onPress={() => { /* Handle voice icon press */ }}>
          <Icon name="microphone" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Placeholder Image at the bottom */}
      <View style={styles.placeholderImageContainer}>
        <Image
          source={{ uri: 'https://your-image-url.com' }}  // Use the placeholder image URL you want here
          style={styles.placeholderImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center', // Centers the input horizontally
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    textAlign: 'left', // Left-aligned text
    paddingLeft: 30, // Add padding on the left to make space for the icons
  },
  iconButton: {
    position: 'absolute',
    right: 45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  iconButton1: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  storeCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  storeDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  expandText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    fontWeight: '700',
  },
  visitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  visitButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  comment: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  noResultsText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  placeholderImageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});

export default SearchScreen;
