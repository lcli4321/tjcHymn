// components/LyricView.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { MaterialIcons } from '@expo/vector-icons';

export default function LyricView({
  content,
  fontSize,
  page,
  totalPages,
  onPageChange,
  onFontSizeChange
}) {
  const contentWidth = Dimensions.get('window').width;

  return (
    <>
      <ScrollView style={styles.lyricBox}>
        <RenderHtml
          contentWidth={contentWidth}
          source={{
            html: `<div style="font-size: ${fontSize}px; text-align: center;">${content}</div>`,
          }}
        />
      </ScrollView>

      <View style={styles.paginationContainer}>
        <TouchableOpacity 
          onPress={() => onPageChange('prev')} 
          style={styles.navButton}
        >
          <Image source={require('../assets/icons/sec_left.png')} />
        </TouchableOpacity>

        <View style={styles.centerBox}>
          <Text style={styles.pageIndicator}>{page}/{totalPages}</Text>
          <View style={styles.fontControl}>
            <TouchableOpacity 
              onPress={() => onFontSizeChange(-4)} 
              style={styles.fontButton}
            >
              <MaterialIcons name="zoom-out" size={28} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => onFontSizeChange(4)} 
              style={styles.fontButton}
            >
              <MaterialIcons name="zoom-in" size={28} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => onPageChange('next')} 
          style={styles.navButton}
        >
          <Image source={require('../assets/icons/sec_right.png')} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  lyricBox: { 
    flex: 1, 
    marginVertical: 12 
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  centerBox: { 
    alignItems: 'center' 
  },
  fontControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  fontButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  navButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  pageIndicator: {
    fontSize: 16,
    color: '#333',
  },
});