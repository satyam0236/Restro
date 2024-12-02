import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
// import ReactotronConfig from '../../ReactotronConfig';

const { width } = Dimensions.get('window');

const Home = () => {

  // console.tron.log('Hello from Reactotron!');
  // console.tron.log({ name: 'John', age: 30 });

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndexes, setImageIndexes] = useState({});
  const [activeFilters, setActiveFilters] = useState(['Popular']);

  const bannerData = [
    {
      title: 'Fresh Fruit',
      subtitle: '30% Off',
      description: 'Orange',
      bgColor: '#FFE5CC',
      image: 'https://www.themealdb.com/images/ingredients/Orange.png'
    },
    {
      title: 'Special Offer',
      subtitle: '20% Off',
      description: 'Banana',
      bgColor: '#FFF9C4',
      image: 'https://www.themealdb.com/images/ingredients/Banana.png'
    },
    {
      title: "Today's Deal",
      subtitle: '25% Off',
      description: 'Apple',
      bgColor: '#FFE5E5',
      image: 'https://www.themealdb.com/images/ingredients/Apple.png'
    },
    {
      title: 'Hot Deal',
      subtitle: '15% Off',
      description: 'Pineapple',
      bgColor: '#FFF3E0',
      image: 'https://www.themealdb.com/images/ingredients/Pineapple.png'
    },
    {
      title: 'Fresh Pick',
      subtitle: '40% Off',
      description: 'Lime',
      bgColor: '#E8F5E9',
      image: 'https://www.themealdb.com/images/ingredients/Lime.png'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < bannerData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        scrollViewRef.current?.scrollTo({
          x: (width - 30) * (currentIndex + 1),
          animated: true
        });
      } else {
        setCurrentIndex(0);
        scrollViewRef.current?.scrollTo({
          x: 0,
          animated: true
        });
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setImageIndexes(prevIndexes => {
        const newIndexes = { ...prevIndexes };
        Object.keys(newIndexes).forEach(key => {
          newIndexes[key] = (newIndexes[key] + 1) % 3; // 3 is the number of images
        });
        return newIndexes;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(imageTimer);
  }, []);

  const restaurantData = [
    {
      name: 'Bikaner Fruits',
      price: '450',
      images: [
        'https://www.themealdb.com/images/ingredients/Orange.png',
        'https://www.themealdb.com/images/ingredients/Apple.png',
        'https://www.themealdb.com/images/ingredients/Banana.png'
      ],
      rating: '4.5',
      distance: '2 km',
      time: '30-45 mins',
      tags: ['Apple', 'Orange', 'Banana'],
      offer: 'Flat 100 OFF above 249'
    },
    {
      name: 'Taco Frooty',
      price: '380',
      images: [
        'https://www.themealdb.com/images/ingredients/Banana.png',
        'https://www.themealdb.com/images/ingredients/Pineapple.png',
        'https://www.themealdb.com/images/ingredients/Orange.png'
      ],
      rating: '4.5',
      distance: '2 km',
      time: '30-45 mins',
      tags: ['Pineapple', 'Apple', 'Banana'],
      offer: 'Buy 3 Get 2 Free'
    },
    {
      name: 'Fresh Apple Cafe',
      price: '420',
      images: [
        'https://www.themealdb.com/images/ingredients/Apple.png',
        'https://www.themealdb.com/images/ingredients/Orange.png',
        'https://www.themealdb.com/images/ingredients/Banana.png'
      ],
      rating: '4.3',
      distance: '3.5 km',
      time: '25-40 mins',
      tags: ['Apple', 'Orange', 'Banana'],
      offer: '20% OFF on all drinks'
    },
    {
      name: 'Tropical Paradise',
      price: '550',
      images: [
        'https://www.themealdb.com/images/ingredients/Pineapple.png',
        'https://www.themealdb.com/images/ingredients/Apple.png',
        'https://www.themealdb.com/images/ingredients/Banana.png'
      ],
      rating: '4.7',
      distance: '1.8 km',
      time: '35-50 mins',
      tags: ['Pineapple', 'Apple', 'Banana'],
      offer: 'Free drink with combo meals'
    },
    {
      name: 'Citrus Kitchen',
      price: '320',
      images: [
        'https://www.themealdb.com/images/ingredients/Lime.png',
        'https://www.themealdb.com/images/ingredients/Apple.png',
        'https://www.themealdb.com/images/ingredients/Banana.png'
      ],
      rating: '4.4',
      distance: '2.5 km',
      time: '40-55 mins',
      tags: ['Lime', 'Apple', 'Banana'],
      offer: 'Special weekend deals'
    },
    {
      name: 'Fresh Delights',
      price: '480',
      images: [
        'https://www.themealdb.com/images/ingredients/Orange.png',
        'https://www.themealdb.com/images/ingredients/Apple.png',
        'https://www.themealdb.com/images/ingredients/Banana.png'
      ],
      rating: '4.6',
      distance: '3 km',
      time: '20-35 mins',
      tags: ['Apple', 'Orange', 'Banana'],
      offer: 'Happy Hours 2PM-5PM'
    }
  ];

  const handleFilterPress = (filter) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      }
      return [...prev, filter];
    });
  };

  const getFilteredRestaurants = () => {
    return restaurantData.filter(restaurant => {
      if (activeFilters.length === 0) return true;

      let matchesFilters = true;

      if (activeFilters.includes('Rating 4.0+')) {
        matchesFilters = matchesFilters && parseFloat(restaurant.rating) >= 4.0;
      }

      if (activeFilters.includes('Fast Delivery')) {
        const deliveryTime = parseInt(restaurant.time.split('-')[0]);
        matchesFilters = matchesFilters && deliveryTime <= 30;
      }

      if (activeFilters.includes('Offers')) {
        matchesFilters = matchesFilters && restaurant.offer !== '';
      }

      if (activeFilters.includes('Popular')) {
        matchesFilters = matchesFilters && parseFloat(restaurant.rating) >= 4.5;
      }

      return matchesFilters;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header with Location */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={24} color="black" />
              <Text style={styles.locationText01}>4102, Pretty View Lane, EWS Essel...</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="person-circle-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                placeholder="Find for food or restaurant..."
                placeholderTextColor="gray"
                style={styles.searchInput}
              />
              <View style={styles.searchSeparator} />
              <TouchableOpacity>
                <Ionicons name="mic" size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner */}
        <View style={styles.sectionContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="center"
            decelerationRate={0.9}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 30));
              setCurrentIndex(newIndex);
            }}
          >
            {bannerData.map((item, index) => (
              <View key={index} style={[styles.bannerCard, { backgroundColor: item.bgColor }]}>
                <LinearGradient
                  colors={['transparent', item.bgColor]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.bannerGradient}
                >
                  <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                    <Text style={styles.bannerDescription}>{item.description}</Text>
                  </View>
                </LinearGradient>
                <Image
                  source={{ uri: item.image }}
                  style={styles.bannerImage}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Food Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle1}>What would you like to order</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {[
              {
                name: 'Orange',
                image: 'https://www.themealdb.com/images/ingredients/Orange.png',
                bgColor: '#FFE5CC'  // Same as banner Orange background
              },
              {
                name: 'Banana',
                image: 'https://www.themealdb.com/images/ingredients/Banana.png',
                bgColor: '#FFF9C4'  // Same as banner Banana background
              },
              {
                name: 'Apple',
                image: 'https://www.themealdb.com/images/ingredients/Apple.png',
                bgColor: '#FFE5E5'  // Same as banner Apple background
              },
              {
                name: 'Pineapple',
                image: 'https://www.themealdb.com/images/ingredients/Pineapple.png',
                bgColor: '#FFF3E0'  // Same as banner Pineapple background
              },
              {
                name: 'Lime',
                image: 'https://www.themealdb.com/images/ingredients/Lime.png',
                bgColor: '#E8F5E9'  // Same as banner Lime background
              },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 8,
                  backgroundColor: item.bgColor
                }}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.categoryImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter Options */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>All Restaurant</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Popular', 'Rating 4.0+', 'Fast Delivery', 'Offers', 'Sort'].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterButton,
                  activeFilters.includes(item) && styles.activeFilterButton
                ]}
                onPress={() => item !== 'Sort' && handleFilterPress(item)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Text style={[
                    styles.filterText,
                    activeFilters.includes(item) && styles.activeFilterText
                  ]}>{item}</Text>
                  {item === 'Sort' && (
                    <Ionicons
                      name="options-outline"
                      size={16}
                      color={activeFilters.includes(item) ? '#FFFFFF' : '#FF4B3A'}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Restaurant Banners */}
        <View style={styles.sectionContainer}>
          {getFilteredRestaurants().map((restaurant, index) => {
            if (!(index in imageIndexes)) {
              imageIndexes[index] = 0;
            }

            return (
              <TouchableOpacity key={index} style={styles.restaurantCard}>
                <View style={styles.restaurantImageContainer}>
                  <View style={styles.priceOverlay}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceText}>{restaurant.name} - ₹{restaurant.price}/kg</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingText}>{restaurant.rating} ★</Text>
                    </View>
                  </View>
                  <Image
                    source={{ uri: restaurant.images[imageIndexes[index] || 0] }}
                    style={styles.restaurantImage}
                  />
                  <View style={styles.imageDots}>
                    {restaurant.images.map((_, dotIndex) => (
                      <View
                        key={dotIndex}
                        style={[
                          styles.dot,
                          dotIndex === imageIndexes[index] ? styles.activeDot : null
                        ]}
                      />
                    ))}
                  </View>
                  <View style={styles.deliveryBadge}>
                    <Ionicons name="bicycle-outline" size={16} color="#666" />
                    <Text style={styles.deliveryText}>Free delivery</Text>
                  </View>
                </View>
                <View style={styles.restaurantDetails}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <View style={styles.tagsContainer}>
                    {restaurant.tags.map((tag, idx) => (
                      <Text key={idx} style={styles.tagText}>
                        {tag}{idx !== restaurant.tags.length - 1 ? ' • ' : ''}
                      </Text>
                    ))}
                  </View>
                  <View style={styles.locationInfo}>
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Text style={styles.locationText}>{restaurant.distance}</Text>
                    <Text style={styles.locationText}>•</Text>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.locationText}>{restaurant.time}</Text>
                  </View>
                </View>
                <View style={styles.offerBanner}>
                  <Text style={styles.offerText}>{restaurant.offer}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    padding: 15,
    backgroundColor: '#FF4B3A',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#FFFFFF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //  paddingHorizontal: 5,
    gap: 10,
    marginTop: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    //  paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#000000',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  bannerCard: {
    width: width - 30,
    height: 120,
    borderRadius: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  bannerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    paddingRight: 140,
  },
  bannerTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  bannerSubtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginVertical: 4,
  },
  bannerDescription: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  bannerImage: {
    width: 130,
    height: '100%',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  sectionTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    color: 'gray',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000',
    marginLeft: 15,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
  categoryCard: {
    alignItems: 'center',
    width: 100,
  },
  categoryImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF5EE',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryImage: {
    width: '80%',
    height: '80%',
  },
  categoryText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '500',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  activeFilterButton: {
    backgroundColor: '#FF4B3A',
    borderColor: '#FF4B3A',
  },
  filterText: {
    color: '#000000',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  restaurantImageContainer: {
    height: 150,
    width: '100%',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  restaurantDetails: {
    padding: 12,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  ratingContainer: {
    backgroundColor: '#FF4B3A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tagText: {
    color: '#666666',
  },
  locationInfo: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  locationText01: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  locationText: {
    color: '#666666',
  },
  offerContainer: {
    marginTop: 4,
  },
  offerText: {
    color: '#FF4B3A',
    fontWeight: '500',
  },
  priceOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  priceContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priceText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  deliveryBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  deliveryText: {
    color: '#666666',
    fontSize: 12,
  },
  offerBanner: {
    backgroundColor: '#E8F3FF',
    padding: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  offerText: {
    color: '#0066CC',
    fontWeight: '500',
    textAlign: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  imageDots: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
  },
  searchSeparator: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
});

export default Home