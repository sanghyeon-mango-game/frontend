import React, { useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { X } from 'react-native-feather';

export const MangoDetailModal = ({ visible, onClose }) => {
  const screenWidth = Dimensions.get('window').width;
  const buttonGap = 10;
  const horizontalPadding = 40;
  const availableWidth = screenWidth - horizontalPadding;
  const defaultButtonWidth = (availableWidth - buttonGap) / 2;
  const expandedButtonWidth = (availableWidth - buttonGap) * 0.65;
  const shrunkButtonWidth = (availableWidth - buttonGap) * 0.35;

  const [activeButton, setActiveButton] = useState(null);
  const leftButtonWidth = useRef(new Animated.Value(defaultButtonWidth)).current;
  const rightButtonWidth = useRef(new Animated.Value(defaultButtonWidth)).current;

  const [mangoCount, setMangoCount] = useState(67234); 
  const [selectedQuantity, setSelectedQuantity] = useState(0); 

  const dates = ['5/17', '5/18', '5/19', '5/20', '5/21', '5/22', '5/23', '5/24'];
  const data = {
    labels: dates,
    datasets: [
      {
        data: [70, 85, 65, 55, 45, 58, 42, 48],
        strokeWidth: 2,
        color: () => '#4EAD7F',
      }
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: () => '#4EAD7F',
    labelColor: () => '#666666',
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#4EAD7F',
      fill: '#ffffff',
    },
  };

  const handleButtonPress = (button) => {
    if (activeButton === button) {
      Animated.parallel([
        Animated.spring(leftButtonWidth, {
          toValue: defaultButtonWidth,
          useNativeDriver: false,
          friction: 8,
        }),
        Animated.spring(rightButtonWidth, {
          toValue: defaultButtonWidth,
          useNativeDriver: false,
          friction: 8,
        }),
      ]).start();
      setActiveButton(null);
    } else {
      Animated.parallel([
        Animated.spring(leftButtonWidth, {
          toValue: button === 'sell' ? expandedButtonWidth : shrunkButtonWidth,
          useNativeDriver: false,
          friction: 8,
        }),
        Animated.spring(rightButtonWidth, {
          toValue: button === 'buy' ? expandedButtonWidth : shrunkButtonWidth,
          useNativeDriver: false,
          friction: 8,
        }),
      ]).start();
      setActiveButton(button);
    }
  };

  const handleIncreaseQuantity = () => {
    if (mangoCount > 0) {
      setSelectedQuantity(selectedQuantity + 1);
      setMangoCount(mangoCount - 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
      setMangoCount(mangoCount + 1);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X stroke="#000" width={24} height={24} />
          </TouchableOpacity>

          <View style={styles.priceHeader}>
            <Text style={styles.koreanTitle}>망상망고</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>$8,145.69</Text>
              <Text style={styles.priceChange}>+1.74%</Text>
            </View>
          </View>

          <View style={styles.chartWrapper}>
            <View style={styles.chartContainer}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={data}
                  width={screenWidth * 1.2}
                  height={165}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                    borderRadius: 16,
                    marginLeft: 0,
                    paddingRight: 20,
                  }}
                  withInnerLines={false}
                  withOuterLines={false}
                  withVerticalLines={false}
                  withHorizontalLines={false}
                  withVerticalLabels={true}
                  withHorizontalLabels={false}
                />
              </ScrollView>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <Animated.View style={{ width: leftButtonWidth }}>
              <TouchableOpacity 
                style={[
                  styles.sellButton,
                  activeButton === 'sell' && styles.activeButton
                ]}
                onPress={() => handleButtonPress('sell')}
              >
                <Text style={[
                  styles.buttonText,
                  activeButton === 'sell' && styles.activeButtonText
                ]}>팔기</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{ width: rightButtonWidth }}>
              <TouchableOpacity 
                style={[
                  styles.buyButton,
                  activeButton === 'buy' && styles.activeButton
                ]}
                onPress={() => handleButtonPress('buy')}
              >
                <Text style={[
                  styles.buttonText,
                  activeButton === 'buy' && styles.activeButtonText
                ]}>사기</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={styles.dividerLine} />

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>현재 보유 망고</Text>
            <View style={styles.statsContent}>
              <Text style={styles.statsNumber}>{mangoCount}개</Text>
              <Text style={styles.statsValue}>$17M</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleDecreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{selectedQuantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={handleIncreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>보내기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '90%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    alignSelf: 'stretch',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 1,
  },
  priceHeader: {
    alignSelf: 'stretch',
    marginTop: 10,
  },
  koreanTitle: {
    fontFamily: 'Wanted Sans',
    fontSize: 20,
    fontWeight: '600',
    color: '#747474',
    marginBottom: 4,
  },
  priceContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontFamily: 'Wanted Sans',
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
  },
  priceChange: {
    fontFamily: 'Wanted Sans',
    fontSize: 16,
    fontWeight: '600',
    color: '#F00',
  },
  chartWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#e4e4e4',
    width: '100%',
  },
  chartContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  buttonRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },
  dividerLine: {
    height: 4,
    backgroundColor: '#E0E0E0',
    flexShrink: 0,
    alignSelf: 'stretch',
    borderRadius: 2,
    marginVertical: 10,
    marginTop: 15,
    marginBottom: 20,
  },
  sellButton: {
    height: 54,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buyButton: {
    height: 54,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  activeButton: {
    backgroundColor: '#FFD84D',
  },
  buttonText: {
    fontFamily: 'Wanted Sans',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  activeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  statsTitle: {
    fontFamily: 'Wanted Sans',
    fontSize: 14,
    fontWeight: '500',
    color: '#747474',
    lineHeight: 14,
  },
  statsContent: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsNumber: {
    fontFamily: 'Wanted Sans',
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    lineHeight: 24,
  },
  statsValue: {
    fontFamily: 'Wanted Sans',
    fontSize: 24,
    fontWeight: '700',
    color: '#FFD700',
    lineHeight: 24,
  },
  quantityContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 24,
    marginTop: 16,
  },
  quantityButton: {
    width: 40,  
    height: 40,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
  quantityButtonText: {
    fontFamily: 'Wanted Sans',
    fontSize: 24,
    color: '#000000',
    lineHeight: 24,
  },
  quantity: {
    fontFamily: 'Wanted Sans',
    fontSize: 20,
    color: '#000000',
    lineHeight: 24,
    width: 40,
    textAlign: 'center',
    marginRight:-20,
    marginLeft:-20
  },
  submitButton: {
    marginLeft: 'auto',
    backgroundColor: '#FFD84D',
    width: 150,
    height: 40,
    borderRadius: 20,
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 16,
  },
});

export default MangoDetailModal;