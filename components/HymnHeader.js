// components/HymnHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButtonCustom from './IconButton';

export default function HymnHeader({
  title,
  onPrev,
  onNext,
  onRepeatToggle,
  repeatIcon,
  onAudioPress,
  onViewModeChange
}) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconRow}>
        <IconButtonCustom
          onPress={onPrev}
          source={require('../assets/icons/hymn_left.png')}
        />

        <IconButtonCustom 
          onPress={onRepeatToggle} 
          source={repeatIcon} 
        />

        <IconButtonCustom
          source={require('../assets/icons/mp3.png')}
          onPress={onAudioPress}
        />

        <IconButtonCustom
          onPress={onViewModeChange}
          source={require('../assets/icons/change_view.png')}
        />

        <IconButtonCustom
          onPress={onNext}
          source={require('../assets/icons/hymn_right.png')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'left',
    fontWeight: 'normal',
    paddingVertical: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});