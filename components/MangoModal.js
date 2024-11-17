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
  const modalWidth = Math.min(screenWidth * 0.9, 400);
  const maxImageSize = modalWidth * 0.2;

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
        <View style={[styles.modalWrapper, { width: modalWidth }]}>
          <LottieView
            ref={surpriseAnimationRef}
            source={require('../assets/animations/surprise.json')}
            style={styles.surpriseAnimation}
            autoPlay={false}
            loop={false}
            speed={1}
          />
          <View style={styles.modalContent}>
            <View style={styles.contentContainer}>
              <View style={[styles.infoContainer, { borderColor: rarityColor }]}>
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
                
                <View style={styles.textRow}>
                  <Text style={[styles.mangoName, { color: rarityColor }]}>{mangoData.name}</Text>
                  <View style={[styles.rarityBadge, { backgroundColor: '#FFF3D1' }]}>
                    <Text style={[styles.rarityText, { color: rarityColor }]}>{mangoData.rarity}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.confirmButton, { backgroundColor: rarityColor }]}
                onPress={onClose}
              >
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  modalWrapper: {
    alignItems: 'center',
    marginTop: 50, 
  },
  surpriseAnimation: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: -150,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 14,
    alignItems: 'center',
    gap: 14,
    width: '100%',
  },
  contentContainer: {
    width: '100%',
    gap: 14,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    padding: 14,
    alignItems: 'center',
    gap: 14,
  },
  mangoImage: {
    marginTop: 10,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mangoName: {
    fontFamily: 'Wanted Sans',
    fontSize: 18,
    fontWeight: '700',
  },
  rarityBadge: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rarityText: {
    fontFamily: 'Wanted Sans',
    fontSize: 14,
    fontWeight: '600',
  },
  confirmButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Wanted Sans',
  },
});

export default MangoModal;