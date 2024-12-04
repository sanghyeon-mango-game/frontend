import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { X } from 'react-native-feather';
import { useTree } from '../context/TreeContext';
import { useNavigation } from '@react-navigation/native';

const TreeDetailModal = ({ visible, onClose, treeData }) => {
  const { setSelectedTree } = useTree();
  const navigation = useNavigation();
  
  if (!treeData) return null;

  const screenWidth = Dimensions.get('window').width;
  const modalWidth = Math.min(screenWidth * 0.9, 300);

  const handleApply = () => {
    setSelectedTree(treeData);
    onClose();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Clicker' }],
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalWrapper, { width: modalWidth }]}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X stroke="#000" width={24} height={24} />
            </TouchableOpacity>

            <View style={[
              styles.contentContainer,
              styles[`${treeData.rarity}Border`]
            ]}>
              <Image 
                source={treeData.image}
                style={styles.treeImage}
                resizeMode="contain"
              />
              
              <View style={styles.textContainer}>
                <Text style={styles.treeName}>{treeData.name}</Text>
                <View style={[styles.rarityBadge, styles[`${treeData.rarity}Badge`]]}>
                  <Text style={styles.rarityText}>{treeData.rarity}</Text>
                </View>
              </View>
              
              <Text style={styles.description}>{treeData.description}</Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>보유 수량</Text>
                  <Text style={styles.statValue}>{treeData.count}개</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.actionButton, styles[`${treeData.rarity}Button`]]}
              onPress={handleApply}
            >
              <Text style={styles.actionButtonText}>적용하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  contentContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  treeImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  treeName: {
    fontSize: 20,
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  actionButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  '전설Border': {
    borderColor: '#FFD700',
  },
  '희귀Border': {
    borderColor: '#C0C0C0',
  },
  '일반Border': {
    borderColor: '#CD7F32',
  },
  '전설Badge': {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  '희귀Badge': {
    backgroundColor: 'rgba(192, 192, 192, 0.2)',
  },
  '일반Badge': {
    backgroundColor: 'rgba(205, 127, 50, 0.2)',
  },
  '전설Button': {
    backgroundColor: '#FFD700',
  },
  '희귀Button': {
    backgroundColor: '#C0C0C0',
  },
  '일반Button': {
    backgroundColor: '#CD7F32',
  },
  rarityText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default TreeDetailModal;