import React, { useState,useEffect  } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { MaterialIcons } from '@expo/vector-icons';

import hymnData, { getHymnById, getPrevHymnId, getNextHymnId } from '../data/hymns';
import useRepeatMode from '../hooks/useRepeatMode';
import useViewMode from '../hooks/useViewMode';
import IconButton from '../components/IconButton';

export default function OneHymnScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { hymnId } = route.params;

  const hymn = getHymnById(hymnId);
  const [page, setPage] = useState(1);
  const [fontSize, setFontSize] = useState(20);
  const { mode, icon, toggle } = useRepeatMode();
  const { viewMode, cycleMode } = useViewMode();
  
  if (!hymn) return <Text>找不到詩歌</Text>;

  const totalPages = hymn.lyric.length - 1;
  const contentWidth = Dimensions.get('window').width;

  const handlePageChange = (direction) => {
    setPage((prevPage) => {
      const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return Math.max(1, Math.min(totalPages, newPage));
    });
  };

  const adjustFontSize = (delta) => {
    setFontSize((prev) => Math.max(12, Math.min(60, prev + delta)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{hymn.title}</Text>

      <View style={styles.iconRow}>
        <IconButton
          onPress={() => navigation.replace('OneHymnScreen', { hymnId: getPrevHymnId(hymnId) })}
          source={require('../assets/icons/hymn_left.png')}
        />

        <IconButton onPress={toggle} source={icon} />

        <IconButton
          onPress={() => console.log('mp3 點擊')}
          source={require('../assets/icons/mp3.png')}
        />

        <IconButton
          onPress={cycleMode}
          source={require('../assets/icons/change_view.png')}
        />

        <IconButton
          onPress={() => navigation.replace('OneHymnScreen', { hymnId: getNextHymnId(hymnId) })}
          source={require('../assets/icons/hymn_right.png')}
        />
      </View>
      
      {viewMode === 'lyric' && (
        <>
          <ScrollView style={styles.lyricBox}>
            <RenderHtml
              contentWidth={contentWidth}
              source={{
                html: `<div style="font-size: ${fontSize}px; text-align: center;">${hymn.lyric[page]}</div>`,
              }}
            />
          </ScrollView>

          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={() => handlePageChange('prev')} style={styles.navButton}>
              <Image source={require('../assets/icons/sec_left.png')} />
            </TouchableOpacity>

            <View style={styles.centerBox}>
              <Text style={styles.pageIndicator}>{page}/{totalPages}</Text>
              <View style={styles.fontControl}>
                <TouchableOpacity onPress={() => adjustFontSize(-4)} style={styles.fontButton}>
                  <MaterialIcons name="zoom-out" size={28} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => adjustFontSize(4)} style={styles.fontButton}>
                  <MaterialIcons name="zoom-in" size={28} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => handlePageChange('next')} style={styles.navButton}>
              <Image source={require('../assets/icons/sec_right.png')} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'left',
    fontWeight: 'normal',
    paddingVertical: 8,
  },
  lyricBox: { flex: 1, marginVertical: 12 },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  centerBox: { alignItems: 'center' },
  fontControl: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  fontButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 8,
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
