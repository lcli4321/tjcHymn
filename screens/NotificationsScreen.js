import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NotificationScreen() {
  const navigation = useNavigation();

  const handlePrivacyPress = () => {
    navigation.navigate('PrivatePolicyScreen', {
      url: 'https://joy.org.tw/app/hymn/privacy-policy.html',
    });
  };

  const handleContactPress = () => {
    // TODO: 實作導向聯絡我們頁面
    console.log('聯絡我們');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/icons/about_icon.png')} // 確保你有這張圖
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.versionText}>真耶穌教會讚美詩 v3.0.4</Text>

      <View style={styles.buttonContainer}>
        <Button title="隱私權政策" onPress={handlePrivacyPress} color="#6200EE"/>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="聯絡我們" onPress={handleContactPress} color="#6200EE"/>
      </View>

      <Text style={styles.copyrightText}>
        © 2022 真耶穌教會台灣總會版權所有
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  versionText: {
    marginTop: 8,
    fontSize: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 8,
    width: '60%', // 可以調整按鈕寬度
  },
  copyrightText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    paddingHorizontal: 20,
  },
});
