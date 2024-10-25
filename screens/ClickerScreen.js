import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

function ClickerScreen() {
  const [count, setCount] = useState(0);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [fallingMangos, setFallingMangos] = useState([]);
  const nextMangoId = useRef(0);

  const shakeTrees = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -0.5,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  };

  const createFallingMango = () => {
    const mangoId = nextMangoId.current++;
    const startPosition = Math.random() * 150 - 75; 

    const newMango = {
      id: mangoId,
      animation: new Animated.ValueXY({ x: startPosition, y: -50 }),
      rotation: new Animated.Value(0),
    };

    setFallingMangos(prev => [...prev, newMango]);

    Animated.parallel([
      Animated.timing(newMango.animation.y, {
        toValue: 400,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.quadIn,
      }),
      Animated.timing(newMango.rotation, {
        toValue: 360,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setFallingMangos(prev => prev.filter(mango => mango.id !== mangoId));
    });
  };

  const handleClick = () => {
    setCount(prev => prev + 1);
    shakeTrees();
    createFallingMango();
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Image 
          source={require('../assets/images/Mango.png')}
          style={styles.mangoIcon}
        />
        <Text style={styles.scoreText}>{count.toLocaleString()}</Text>
      </View>

      <TouchableOpacity onPress={handleClick} style={styles.treeContainer}>
        <Animated.Image 
          source={require('../assets/images/tree.png')}
          style={[
            styles.treeImage,
            {
              transform: [
                {
                  rotate: shakeAnimation.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-5deg', '5deg'],
                  }),
                },
              ],
            },
          ]}
        />
      </TouchableOpacity>

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
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    top: 80,
    left: '50%',    
    transform: [{ translateX: -75 }], 
    zIndex: 1,
  },
  mangoIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  treeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  fallingMango: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '55%',    
    left: '50%',
  },
});

export default ClickerScreen;