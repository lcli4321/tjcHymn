import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  // 開啟隱私政策
  const openPrivacyPolicy = () => {
    const url = 'https://joy.org.tw/app/hymn/privacy-policy.html';
    
    // 檢查是否支援 WebView 導航
    if (navigation && navigation.navigate) {
      navigation.navigate('Webview', { 
        url: url,
        title: '隱私政策' 
      });
    } else {
      // 後備方案：使用系統瀏覽器
      Linking.openURL(url).catch(err => {
        Alert.alert('錯誤', '無法開啟隱私政策頁面');
        console.error('無法開啟 URL:', err);
      });
    }
  };

  // 開啟聯絡我們
  const openContactUs = () => {
    const email = 'kaymusic@tjc.org.tw';
    const ccEmail = 'tinanlin@gmail.com';
    const subject = encodeURIComponent('讚美詩錯誤回報 v3.1.1 (React Native)');
    const body = encodeURIComponent('請描述您的問題：');
    
    // 構建 mailto URL
    const mailtoUrl = `mailto:${email}?cc=${ccEmail}&subject=${subject}&body=${body}`;
    
    Linking.canOpenURL(mailtoUrl).then(supported => {
      if (supported) {
        Linking.openURL(mailtoUrl);
      } else {
        Alert.alert('提示', '未安裝任何 E-mail APP，無法使用此功能');
      }
    }).catch(err => {
      Alert.alert('錯誤', '無法開啟電子郵件');
      console.error('無法開啟 mailto:', err);
    });
  };

  // 關於應用程式
  const showAboutApp = () => {
    Alert.alert(
      '關於應用程式',
      '真耶穌教會讚美詩 v3.0.4\n\n此應用程式提供真耶穌教會讚美詩的數位版本，方便弟兄姊妹在敬拜中使用。',
      [{ text: '確定', style: 'default' }]
    );
  };

  // 應用程式資訊
  const showAppInfo = () => {
    Alert.alert(
      '應用程式資訊',
      `版本：3.0.4\n平台：${Platform.OS}\n作者：真耶穌教會\n更新日期：2024年`,
      [{ text: '確定', style: 'default' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        
        {/* 版本資訊區域 */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>真耶穌教會讚美詩 v3.0.4</Text>
          <Text style={styles.versionSubtext}>True Jesus Church Hymnal</Text>
        </View>

        {/* 功能按鈕區域 */}
        <View style={styles.buttonSection}>
          
          {/* 隱私政策按鈕 */}
          <TouchableOpacity 
            style={styles.button}
            onPress={openPrivacyPolicy}
            activeOpacity={0.7}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>隱私政策</Text>
              <Text style={styles.buttonDescription}>查看應用程式隱私政策</Text>
            </View>
            <Text style={styles.buttonArrow}>›</Text>
          </TouchableOpacity>

          {/* 聯絡我們按鈕 */}
          <TouchableOpacity 
            style={styles.button}
            onPress={openContactUs}
            activeOpacity={0.7}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>聯絡我們</Text>
              <Text style={styles.buttonDescription}>回報問題或提供意見</Text>
            </View>
            <Text style={styles.buttonArrow}>›</Text>
          </TouchableOpacity>

          {/* 關於應用程式按鈕 */}
          <TouchableOpacity 
            style={styles.button}
            onPress={showAboutApp}
            activeOpacity={0.7}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>關於應用程式</Text>
              <Text style={styles.buttonDescription}>瞭解更多應用程式資訊</Text>
            </View>
            <Text style={styles.buttonArrow}>›</Text>
          </TouchableOpacity>

          {/* 應用程式資訊按鈕 */}
          <TouchableOpacity 
            style={styles.button}
            onPress={showAppInfo}
            activeOpacity={0.7}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>應用程式資訊</Text>
              <Text style={styles.buttonDescription}>版本與技術資訊</Text>
            </View>
            <Text style={styles.buttonArrow}>›</Text>
          </TouchableOpacity>

        </View>

        {/* 底部資訊 */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>© 2024 真耶穌教會</Text>
          <Text style={styles.footerText}>True Jesus Church</Text>
          <Text style={styles.footerSubtext}>願主的恩典與平安與您同在</Text>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  versionSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  versionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  versionSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  buttonSection: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContent: {
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#666666',
  },
  buttonArrow: {
    fontSize: 20,
    color: '#007AFF',
    marginLeft: 12,
  },
  footerSection: {
    marginTop: 40,
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default NotificationsScreen;