// components/AudioSelectionModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet
} from 'react-native';

export default function AudioSelectionModal({ visible, onClose, onSelect }) {
  const handleSelect = (type) => {
    console.log(`Modal handleSelect: ${type}`); // 除錯用
    if (onSelect) {
      onSelect(type);
    }
  };

  const handleClose = () => {
    console.log('Modal handleClose'); // 除錯用
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.modalOverlay} onPress={handleClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.modalTitle}>選擇播放類型</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              onPress={() => handleSelect('鋼琴')} 
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>鋼琴</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => handleSelect('人聲')} 
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>人聲</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});