import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// 假設你是這樣包裝資料的
import { getAllHymns } from '../data/hymns'; 

export default function SearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [hymns, setHymns] = useState([]);

  // 一開始載入全部詩 歌資料
  useEffect(() => {
    const allHymns = getAllHymns();
    setHymns(allHymns);
  }, []);

  const query = search.toLowerCase();

  const filtered = hymns.filter(hymn => {  
    const titleMatch = hymn.title.toLowerCase().includes(query);
    const sheetMatch = hymn.simp_key?.toLowerCase().includes(query);

    const lyricsCombined = hymn.lyric?.join(' ') || '';
    const lyricMatch = lyricsCombined.toLowerCase().includes(query);

    return titleMatch || sheetMatch || lyricMatch;
  });

  const handleItemPress = (item) => {
    navigation.navigate('OneHymnScreen', { hymnId: item.id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TouchableOpacity>
          <Image source={require('../assets/icons/keyboard.png')} style={styles.keyboardIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="數字、歌詞、簡譜(範例：#113355)"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.listItem}>
              <Text>
                <Text style={styles.prefix}>
                  {item.title.split(' ')[0]}
                </Text>{' '}
                {item.title.split(' ').slice(1).join(' ')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  keyboardIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    paddingVertical: 4,
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  prefix: {
  color: '#4a90e2', // 淡藍色
  fontWeight: 'bold',
  },
});
