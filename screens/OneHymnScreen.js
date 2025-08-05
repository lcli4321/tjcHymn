// screens/OneHymnScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

import { getHymnById, getPrevHymnId, getNextHymnId } from '../data/hymns';
import useRepeatMode from '../hooks/useRepeatMode';
import useViewMode from '../hooks/useViewMode';
import useFontSize from '../hooks/useFontSize';

import HymnHeader from '../components/HymnHeader';
import AudioPlayer from '../components/AudioPlayer';
import AudioSelectionModal from '../components/AudioSelectionModal';
import LyricView from '../components/LyricView';
import ImageView from '../components/ImageView';

export default function OneHymnScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { hymnId, repeatMode, initialFontSize,initialViewMode  } = route.params;

  const hymn = getHymnById(hymnId);
  const [page, setPage] = useState(1);
  const { fontSize, setFontSize } = useFontSize(initialFontSize);
  const { mode, icon, toggle } = useRepeatMode(repeatMode);
  const { viewMode, cycleMode } = useViewMode(initialViewMode);
  const [dialogVisible, setDialogVisible] = useState(false);

  if (!hymn) return <Text>找不到詩歌</Text>;

  const totalPages = hymn.lyric.length - 1;

  const handlePageChange = (direction) => {
    setPage((prevPage) => {
      const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return Math.max(1, Math.min(totalPages, newPage));
    });
  };

  const adjustFontSize = (delta) => {
    setFontSize((prev) => Math.max(12, Math.min(60, prev + delta)));
  };

  const handleNavigation = (hymnId) => {
    navigation.replace('OneHymnScreen', {
      hymnId,
      repeatMode: mode,
      initialFontSize: fontSize,
      initialViewMode: viewMode  
    });
  };

  const openDialog = () => {
    console.log('Opening dialog'); // 除錯用
    setDialogVisible(true);
  };

  const closeDialog = () => {
    console.log('Closing dialog'); // 除錯用
    setDialogVisible(false);
  };

  const handleAudioSelect = (type) => {
    console.log(`Selected: ${type}`); // 除錯用
    setDialogVisible(false);
    // TODO: 加入播放邏輯
  };

  // 取得當前頁面的內容（從 hymn.lyric[1] 開始）
  const getCurrentPageContent = () => {
    const mainContent = hymn.lyric[page] || '';
    const chorus = hymn.lyric[0] || '';
    
    if (chorus.trim() !== '') {
      return mainContent + '<br><br>' + chorus;
    }
    return mainContent;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <HymnHeader
          title={hymn.title}
          onPrev={() => handleNavigation(getPrevHymnId(hymnId))}
          onNext={() => handleNavigation(getNextHymnId(hymnId))}
          onRepeatToggle={toggle}
          repeatIcon={icon}
          onAudioPress={openDialog}
          onViewModeChange={cycleMode}
        />

        <AudioPlayer sourceUri="https://example.com/path/to/audio.mp3" />

        <AudioSelectionModal
          visible={dialogVisible}
          onClose={closeDialog}
          onSelect={handleAudioSelect}
        />

        {viewMode === 'lyric' && (
          <LyricView
            content={getCurrentPageContent()}
            fontSize={fontSize}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onFontSizeChange={adjustFontSize}
          />
        )}

        {(viewMode === 'staff' || viewMode === 'simp' || viewMode === 'amis') && (
          <ImageView viewMode={viewMode} hymnId={hymn.id} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
});