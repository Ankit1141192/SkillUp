import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');
const SIDE_MARGIN = 16;
const IMAGE_WIDTH = width - SIDE_MARGIN * 2;

const IMAGES = [
  require('../assets/image1.jpg'),
  require('../assets/image2.jpg'),
  require('../assets/image3.jpg'),
  require('../assets/image4.jpg'),
  require('../assets/image5.jpg'),
  require('../assets/image6.jpg'),
];

const ImageSlider = () => {
  const scrollRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let scrollValue = 0;
    const interval = setInterval(() => {
      scrollValue += width;
      if (scrollValue >= width * IMAGES.length) scrollValue = 0;

      scrollRef.current?.scrollTo({ x: scrollValue, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
      },
    }
  );
  return (
    <View style={styles.sliderSection}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: SIDE_MARGIN }}
      >
        {IMAGES.map((img, index) => (
          <Image key={index} source={img} style={styles.image} />
        ))}
      </Animated.ScrollView>

      <View style={styles.dotsContainer}>
        {IMAGES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex ? '#34A853' : '#ccc',
              },
            ]}
          />
        ))}
      </View>
    </View>
  )
}

export default ImageSlider

const styles = StyleSheet.create({
  sliderSection: {
    alignItems: 'center',
  },
  image: {
    width: IMAGE_WIDTH,
    height: 200,
    borderRadius: 15,
    marginHorizontal: 8,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
})