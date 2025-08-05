// components/ImageView.js
import React from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { getViewImages } from '../utils/imageLoader';

export default function ImageView({ viewMode, hymnId }) {
  return (
    <ScrollView style={styles.lyricBox}>
      {getViewImages(viewMode, hymnId).map((img, idx) => (
        <Image
          key={idx}
          source={img}
          resizeMode="contain"
          style={styles.image}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lyricBox: { 
    flex: 1, 
    marginVertical: 12 
  },
  image: { 
    width: '100%', 
    height: 400, 
    marginBottom: 10 
  },
});