import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { hymnData } from '../data/hymns';

// 使用內存存儲替代 AsyncStorage (適用於 Expo Snack)
class MemoryStorage {
  constructor() {
    this.storage = {};
  }
  
  async getItem(key) {
    return this.storage[key] || null;
  }
  
  async setItem(key, value) {
    this.storage[key] = value;
  }
  
  async removeItem(key) {
    delete this.storage[key];
  }
}

const memoryStorage = new MemoryStorage();

const PlaylistScreen = ({ navigation, route }) => {
  const [playlists, setPlaylists] = useState([]);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameText, setRenameText] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // 載入播放清單
  const loadPlaylists = async () => {
    try {
      const savedPlaylists = await memoryStorage.getItem('playlists');
      const playlistsData = savedPlaylists ? JSON.parse(savedPlaylists) : {};
      
      const playlistArray = [];
      
      // 首先添加新播放清單
      const newPlaylistSongs = playlistsData['_NEW_PLAYLIST'] || [];
      playlistArray.push({
        id: '_NEW_PLAYLIST',
        name: '新播放清單',
        count: newPlaylistSongs.length,
        songs: newPlaylistSongs
      });
      
      // 添加其他播放清單
      Object.keys(playlistsData).forEach(key => {
        if (key !== '_NEW_PLAYLIST') {
          playlistArray.push({
            id: key,
            name: key,
            count: playlistsData[key].length,
            songs: playlistsData[key]
          });
        }
      });
      
      setPlaylists(playlistArray);
    } catch (error) {
      console.error('載入播放清單失敗:', error);
    }
  };

  // 刪除播放清單
  const deletePlaylist = async (playlistId) => {
    try {
      const savedPlaylists = await memoryStorage.getItem('playlists');
      const playlistsData = savedPlaylists ? JSON.parse(savedPlaylists) : {};
      
      delete playlistsData[playlistId];
      
      await memoryStorage.setItem('playlists', JSON.stringify(playlistsData));
      loadPlaylists();
    } catch (error) {
      console.error('刪除播放清單失敗:', error);
    }
  };

  // 重命名播放清單
  const renamePlaylist = async (oldName, newName) => {
    try {
      const savedPlaylists = await memoryStorage.getItem('playlists');
      const playlistsData = savedPlaylists ? JSON.parse(savedPlaylists) : {};
      
      if (playlistsData[oldName]) {
        playlistsData[newName] = playlistsData[oldName];
        delete playlistsData[oldName];
        
        await memoryStorage.setItem('playlists', JSON.stringify(playlistsData));
        loadPlaylists();
      }
    } catch (error) {
      console.error('重命名播放清單失敗:', error);
    }
  };

  // 顯示操作選單
  const showActionMenu = (playlist, index) => {
    setSelectedPlaylist(playlist);
    setSelectedIndex(index);
    
    const options = index === 0 
      ? ['刪除', '另存清單', '取消']
      : ['刪除', '重新命名', '取消'];
    
    Alert.alert(
      '功能表',
      '',
      options.map((option, i) => ({
        text: option,
        onPress: () => handleMenuAction(i, playlist),
        style: option === '取消' ? 'cancel' : 'default'
      }))
    );
  };

  // 處理選單動作
  const handleMenuAction = (action, playlist) => {
    switch (action) {
      case 0: // 刪除
        Alert.alert(
          '確認刪除',
          `確定要刪除播放清單 "${playlist.name}" 嗎？`,
          [
            { text: '取消', style: 'cancel' },
            { text: '刪除', onPress: () => deletePlaylist(playlist.id), style: 'destructive' }
          ]
        );
        break;
      case 1: // 另存清單 或 重新命名
        setRenameText(playlist.id === '_NEW_PLAYLIST' ? 'playlist' : playlist.name);
        setShowRenameModal(true);
        break;
    }
  };

  // 確認重命名
  const confirmRename = () => {
    if (renameText.trim() === '') {
      Alert.alert('提示', '請輸入播放清單名稱');
      return;
    }
    
    renamePlaylist(selectedPlaylist.id, renameText.trim());
    setShowRenameModal(false);
  };

  // 點擊播放清單項目
  const onPlaylistPress = (playlist) => {
    if (playlist.id === '_NEW_PLAYLIST' && playlist.count === 0) {
      Alert.alert('提示', '請於詩歌列表中長按不放，以將詩歌加入播放清單中！');
      return;
    }
    
    // 導航到播放清單內容頁面
    if (navigation && navigation.navigate) {
      navigation.navigate('PlaylistContent', { 
        playlistId: playlist.id,
        playlistName: playlist.name 
      });
    }
  };

  // 渲染播放清單項目
  const renderPlaylistItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.playlistItem}
      onPress={() => onPlaylistPress(item)}
      onLongPress={() => showActionMenu(item, index)}
    >
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistName}>{item.name}</Text>
        <Text style={styles.playlistCount}>共{item.count}首</Text>
      </View>
    </TouchableOpacity>
  );

  // 初始化一些示例數據
  useEffect(() => {
        const initializeSampleData = async () => {
      // 將 hymnData.id 和 hymnData.title 合併成一個陣列
      const songs = hymnData.title.map((title, index) => ({
        id: hymnData.id[index],
        title,
      }));

      const sampleData = {
        '_NEW_PLAYLIST': songs.slice(0, 3), // 只放前3首作為範例（可改成全部）
      };

      await memoryStorage.setItem('playlists', JSON.stringify(sampleData));
      loadPlaylists();
    };
    
    initializeSampleData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={playlists}
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      {/* 重命名對話框 */}
      <Modal
        visible={showRenameModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRenameModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>重新命名</Text>
            <Text style={styles.modalMessage}>請輸入播放清單名稱</Text>
            
            <TextInput
              style={styles.textInput}
              value={renameText}
              onChangeText={setRenameText}
              placeholder="播放清單名稱"
              autoFocus={true}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowRenameModal(false)}
              >
                <Text style={styles.cancelButtonText}>取消</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={confirmRename}
              >
                <Text style={styles.confirmButtonText}>確定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flex: 1,
  },
  playlistItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  playlistInfo: {
    flexDirection: 'column',
  },
  playlistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  playlistCount: {
    fontSize: 14,
    color: '#666666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#333333',
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlaylistScreen;