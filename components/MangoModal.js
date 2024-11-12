import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const RARITY_COLORS = {
  전설: '#FFD700',
  희귀: '#C0C0C0',
  일반: '#CD7F32',
};

function MangoModal({ visible, onClose, mangoData }) {
  const surpriseAnimationRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 80, height: 80 });
  const screenWidth = Dimensions.get('window').width;
  const modalWidth = Math.min(screenWidth * 0.8, 400);
  const maxImageSize = modalWidth * 0.3;

  useEffect(() => {
    if (visible && surpriseAnimationRef.current) {
      surpriseAnimationRef.current.play();
    }

    if (mangoData && mangoData.image) {
      Image.getSize(Image.resolveAssetSource(mangoData.image).uri, (width, height) => {
        const aspectRatio = width / height;
        let newWidth = maxImageSize;
        let newHeight = maxImageSize;

        if (aspectRatio > 1) {
          newHeight = maxImageSize / aspectRatio;
        } else {
          newWidth = maxImageSize * aspectRatio;
        }

        setImageSize({ width: newWidth, height: newHeight });
      });
    }
  }, [visible, mangoData, maxImageSize]);

  if (!mangoData) return null;

  const rarityColor = RARITY_COLORS[mangoData.rarity] || '#FFD700';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { width: modalWidth }]}>
          <LottieView
            ref={surpriseAnimationRef}
            source={require('../assets/animations/surprise.json')}
            style={styles.surpriseAnimation}
            autoPlay={false}
            loop={false}
            speed={1}
          />
          
          <View style={styles.header}>
            <Text style={styles.title}>망고를 수확했습니다!</Text>
          </View>

          <View style={[styles.mangoInfoContainer, { borderColor: rarityColor }]}>
            <Image 
              source={mangoData.image}
              style={[
                styles.mangoImage,
                {
                  width: imageSize.width,
                  height: imageSize.height,
                }
              ]}
              resizeMode="contain"
            />
            <View style={styles.infoContent}>
              <Text style={[styles.mangoName, { color: rarityColor }]}>{mangoData.name}</Text>
              <View style={styles.rarityContainer}>
                <Text style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
                  {mangoData.rarity}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.closeButton, { backgroundColor: rarityColor }]}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    marginTop: -20,
  },
  surpriseAnimation: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: -150,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  mangoInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9F0',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
    borderWidth: 2,
  },
  mangoImage: {
    marginRight: 15,
    borderRadius: 10,
  },
  infoContent: {
    flex: 1,
  },
  mangoName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rarityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rarityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MangoModal;