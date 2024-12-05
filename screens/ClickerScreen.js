import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User } from 'react-native-feather';
import LottieView from 'lottie-react-native';
import MangoModal from '../components/MangoModal';
import { checkMangoDropAndGet } from '../utils/mangoUtils';
import { useTree } from '../context/TreeContext';
import { useGame } from '../context/GameContext';
import { useItems } from '../context/ItemContext';

function ClickerScreen() {
  const navigation = useNavigation();
  const { selectedTree, setSelectedTree } = useTree();
  const { clickCount, incrementClickCount } = useGame();
  const { activeItems } = useItems();
  const [fallingMangos, setFallingMangos] = useState([]);
  const [fallingLeaves, setFallingLeaves] = useState([]);
  const [showClickAnimation, setShowClickAnimation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentMango, setCurrentMango] = useState(null);
  const [durability, setDurability] = useState(100);
  const [isTreeDisabled, setIsTreeDisabled] = useState(false);
  const nextMangoId = useRef(0);
  const nextLeafId = useRef(0);
  const lottieRef = useRef();
  const idleTimerRef = useRef(null);
  const durabilityAnimValue = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(durabilityAnimValue, {
      toValue: durability,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start();

    if (durability <= 0) {
      setIsTreeDisabled(true);
    }
  }, [durability]);

  useEffect(() => {
    setDurability(100);
    setIsTreeDisabled(false);
    durabilityAnimValue.setValue(100);
  }, [selectedTree]);

  const startIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setShowClickAnimation(true);
    }, 4000);
  };

  useEffect(() => {
    startIdleTimer();
    return () => clearTimeout(idleTimerRef.current);
  }, []);

  const handleClick = () => {
    if (isTreeDisabled) return;

    setShowClickAnimation(false);
    startIdleTimer();

    incrementClickCount();
    setDurability(prev => Math.max(0, prev - 2));

    const droppedMango = checkMangoDropAndGet();
    if (droppedMango) {
      setCurrentMango(droppedMango);
      setShowModal(true);
    }

    createFallingMango();

    const leafCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < leafCount; i++) {
      setTimeout(() => createFallingLeaf(), i * 100);
    }
  };

  const createFallingMango = () => {
    const mangoId = nextMangoId.current++;
    const startPosition = Math.random() * 200 - 90;
    const startHeight = Math.random() * 20 - 40;

    const newMango = {
      id: mangoId,
      animation: new Animated.ValueXY({ x: startPosition, y: startHeight }),
      rotation: new Animated.Value(0),
      scale: new Animated.Value(0.5),
      shadowOpacity: new Animated.Value(0.2),
    };

    setFallingMangos(prev => [...prev, newMango]);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(newMango.animation.y, {
          toValue: startHeight - 10 - Math.random() * 20,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.cubic,
        }),
        Animated.timing(newMango.animation.y, {
          toValue: 200 + Math.random() * 50,
          duration: 700 + Math.random() * 200,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
      ]),
      Animated.sequence([
        Animated.timing(newMango.rotation, {
          toValue: Math.random() < 0.5 ? 360 : -360,
          duration: 850,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]),
      Animated.sequence([
        Animated.spring(newMango.scale, {
          toValue: 1,
          tension: 200,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(newMango.scale, {
          toValue: 0.8,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.cubic,
        }),
      ]),
      Animated.sequence([
        Animated.spring(newMango.shadowOpacity, {
          toValue: 0.4,
          tension: 200,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(newMango.shadowOpacity, {
          toValue: 0.2,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.cubic,
        }),
      ]),
    ]).start(() => {
      setFallingMangos(prev => prev.filter(mango => mango.id !== mangoId));
    });
  };

  const createFallingLeaf = () => {
    const leafId = nextLeafId.current++;
    const startPosition = Math.random() * 200 - 90;
    const startHeight = Math.random() * 20 - 40;

    const newLeaf = {
      id: leafId,
      animation: new Animated.ValueXY({ x: startPosition, y: startHeight }),
      rotation: new Animated.Value(0),
      scale: new Animated.Value(0.3),
    };

    setFallingLeaves(prev => [...prev, newLeaf]);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(newLeaf.animation.y, {
          toValue: 200 + Math.random() * 50,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      ]),
      Animated.sequence([
        ...Array(3).fill().map(() =>
            Animated.sequence([
              Animated.timing(newLeaf.animation.x, {
                toValue: startPosition + (Math.random() * 40 - 20),
                duration: 500,
                useNativeDriver: true,
                easing: Easing.sinIn,
              }),
              Animated.timing(newLeaf.animation.x, {
                toValue: startPosition - (Math.random() * 40 - 20),
                duration: 500,
                useNativeDriver: true,
                easing: Easing.sinOut,
              }),
            ])
        ),
      ]),
      Animated.sequence([
        Animated.timing(newLeaf.rotation, {
          toValue: Math.random() * 720 - 360,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ]).start(() => {
      setFallingLeaves(prev => prev.filter(leaf => leaf.id !== leafId));
    });
  };

  return (
      <View style={styles.container}>
        <MangoModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            mangoData={currentMango}
        />

        <View style={styles.overlay}>
          <View style={styles.header}>
            <View style={styles.scoreContainer}>
              <View style={styles.countContainer}>
                <Image
                    source={require('../assets/images/Mango.png')}
                    style={styles.mangoIcon}
                />
                <Text style={styles.scoreText}>{clickCount.toLocaleString()}</Text>
              </View>

              <View style={styles.durabilityContainer}>
                <View style={styles.durabilityBackground}>
                  <Animated.View
                      style={[
                        styles.durabilityFill,
                        {
                          width: durabilityAnimValue.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%']
                          }),
                          backgroundColor: isTreeDisabled ? '#FF0000' : '#4CAF50'
                        }
                      ]}
                  />
                </View>
                <Text style={styles.durabilityText}>{`내구도: ${durability}%`}</Text>
              </View>
            </View>

            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('Profile')}
            >
              <User stroke="#00000066" width={24} height={24} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
              onPress={handleClick}
              style={[
                styles.treeContainer,
                isTreeDisabled && styles.disabledTree
              ]}
              activeOpacity={isTreeDisabled ? 1 : 0.8}
          >
            <Image
                source={selectedTree.image || require('../assets/images/tree.png')}
                style={[
                  styles.mainMangoImage,
                  isTreeDisabled && styles.disabledTreeImage
                ]}
                resizeMode="contain"
            />

            {showClickAnimation && !isTreeDisabled && (
                <LottieView
                    source={require('../assets/animations/click2.json')}
                    style={styles.clickAnimation}
                    autoPlay={true}
                    loop={true}
                    speed={1}
                />
            )}
          </TouchableOpacity>

          {fallingLeaves.map(leaf => (
              <Animated.Image
                  key={leaf.id}
                  source={require('../assets/images/leaf1.png')}
                  style={[
                    styles.fallingLeaf,
                    {
                      transform: [
                        { translateX: leaf.animation.x },
                        { translateY: leaf.animation.y },
                        {
                          rotate: leaf.rotation.interpolate({
                            inputRange: [-360, 360],
                            outputRange: ['-360deg', '360deg'],
                          }),
                        },
                        { scale: leaf.scale },
                      ],
                    },
                  ]}
              />
          ))}

          {fallingMangos.map(mango => (
              <Animated.Image
                  key={mango.id}
                  source={require('../assets/images/Mango.png')}
                  style={[
                    styles.fallingMango,
                    {
                      transform: [
                        { translateX: mango.animation.x },
                        { translateY: mango.animation.y },
                        {
                          rotate: mango.rotation.interpolate({
                            inputRange: [0, 360],
                            outputRange: ['0deg', '360deg'],
                          }),
                        },
                        { scale: mango.scale },
                      ],
                      shadowOpacity: mango.shadowOpacity,
                    },
                  ]}
              />
          ))}

          {activeItems.length > 0 && (
              <View style={styles.activeItemsContainer}>
                {activeItems.map((item) => {
                  const remainingTime = Math.max(0,
                      Math.floor((new Date(item.expiresAt) - new Date()) / 1000)
                  );
                  const minutes = Math.floor(remainingTime / 60);
                  const seconds = remainingTime % 60;

                  return (
                      <View key={item.id} style={styles.activeItemBadge}>
                        <Text style={styles.activeItemText}>
                          {item.name} 적용 중 ({minutes}:{seconds.toString().padStart(2, '0')})
                        </Text>
                      </View>
                  );
                })}
              </View>
          )}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  overlay: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 60,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  scoreContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  mangoIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    elevation: 2,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00000066',
  },
  durabilityContainer: {
    width: 150,
    alignItems: 'center',
  },
  durabilityBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  durabilityFill: {
    height: '100%',
    borderRadius: 5,
  },
  durabilityText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
  },
  treeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledTree: {
    opacity: 0.5,
  },
  mainMangoImage: {
    width: 200,
    height: 200,
  },
  disabledTreeImage: {
    tintColor: '#666666',
  },
  clickAnimation: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: '50%',
    marginTop: -45,
    right: 40,
  },
  fallingMango: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '45%',
    left: '50%',
    marginLeft: -15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fallingLeaf: {
    width: 15,
    height: 15,
    position: 'absolute',
    top: '45%',
    left: '50%',
    marginLeft: -7.5,
  },
  // 아이템 표시를 위한 새로운 스타일
  activeItemsContainer: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    alignItems: 'flex-end',
  },
  activeItemBadge: {
    backgroundColor: 'rgba(255, 216, 77, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeItemText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
  }
});

export default ClickerScreen;