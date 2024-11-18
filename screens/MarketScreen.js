import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView, Animated } from 'react-native';
import { MangoDetailModal } from '../components/MangoDetailModal';

const MarketScreen = () => {
  const [selectedTab, setSelectedTab] = useState('망고');
  const [selectedMango, setSelectedMango] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const mangos = Array(15).fill({
    name: '망상망고',
    price: '$8,145.69',
    change: '+1.74%',
    image: require('../assets/images/Mango.png'),
  });

  const handleTabChange = (tab) => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: tab === '망고' ? 0 : 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();

    setSelectedTab(tab);
  };

  const handleMangoPress = (mango) => {
    setSelectedMango(mango);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.backgroundLayout}>
        <Text style={styles.title}>시장</Text>
        
        <View style={styles.tabWrapper}>
          <View style={styles.contentBackground}>
            <View style={styles.tabContainer}>
              <Animated.View
                style={[
                  styles.selectedTabIndicator,
                  {
                    transform: [{
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, (Dimensions.get('window').width - 58) / 2]
                      })
                    }]
                  }
                ]}
              />
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === '망고' && styles.selectedTab
                ]}
                onPress={() => handleTabChange('망고')}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === '망고' && styles.selectedTabText
                ]}>망고</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === '나무' && styles.selectedTab
                ]}
                onPress={() => handleTabChange('나무')}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === '나무' && styles.selectedTabText
                ]}>나무</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <ScrollView
            style={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {mangos.map((mango, index) => (
              <TouchableOpacity
                key={index}
                style={styles.mangoItem}
                onPress={() => handleMangoPress(mango)}
              >
                <View style={styles.leftContent}>
                  <Image source={mango.image} style={styles.mangoIcon} />
                  <Text style={styles.mangoName}>{mango.name}</Text>
                </View>
                <View style={styles.rightContent}>
                  <Text style={styles.price}>{mango.price}</Text>
                  <Text style={styles.change}>{mango.change}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        <MangoDetailModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          mangoData={selectedMango}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backgroundLayout: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  tabWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  contentBackground: {
    display: 'flex',
    height: 55,
    padding: 5,
    alignItems: 'flex-start',
    gap: 5,
    flexShrink: 0,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    gap: 5,
    position: 'relative',
  },
  selectedTabIndicator: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: '#FFD84D',
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  selectedTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.70)',
    fontWeight: '600',
  },
  selectedTabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  mangoItem: {
    display: 'flex',
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 8,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mangoIcon: {
    width: 50,
    height: 50,
  },
  mangoName: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  price: {
    color: '#000',
    textAlign: 'right',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  change: {
    color: '#F00',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
  },
});

export default MarketScreen;