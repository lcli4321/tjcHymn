import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

export default function AudioProgressBar({ sourceUri }) {
  const soundRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    async function loadSound() {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current.setOnPlaybackStatusUpdate(null);
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri: sourceUri },
        { shouldPlay: true, rate: 1 },
        onPlaybackStatusUpdate
      );
      soundRef.current = sound;
    }
    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current.setOnPlaybackStatusUpdate(null);
        soundRef.current = null;
      }
    };
  }, [sourceUri]);

  const onPlaybackStatusUpdate = status => {
    if (!status.isLoaded) return;
    setPosition(status.positionMillis);
    setDuration(status.durationMillis || 1);
    setRate(status.rate || 1);
  };

  const onSlidingComplete = async value => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#6200EE"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#6200EE"
        onSlidingComplete={onSlidingComplete}
      />
      <Text style={styles.rateText}>{rate.toFixed(2)}x</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
  slider: { flex: 1, height: 40 },
  rateText: { width: 50, textAlign: 'center', color: '#6200EE', fontWeight: 'bold' },
});
