// components/IconButton.js
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function IconButton({ onPress, source }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={source} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
