import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const MarketScreen = () => {
  const [selectedTab, setSelectedTab] = useState('망고');

  return (
    <View style={styles.backgroundLayout}>
      <Text style={styles.title}>시장</Text>
      
      <View style={styles.tabWrapper}>
        <View style={styles.contentBackground}>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[
                styles.tab, 
                selectedTab === '망고' && styles.selectedTab
              ]}
              onPress={() => setSelectedTab('망고')}
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
              onPress={() => setSelectedTab('나무')}
            >
              <Text style={[
                styles.tabText,
                selectedTab === '나무' && styles.selectedTabText
              ]}>나무</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.selectedContent}>
        <Text>{selectedTab} 내용</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundLayout: {
    width: Dimensions.get('window').width,
    height: 917,
    paddingHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
  },
  tabWrapper: {
    width: '100%',
  },
  contentBackground: {
    display: 'flex',
    height: 55,
    padding: 5,
    alignItems: 'flex-start',
    gap: 5,
    flexShrink: 0,
    alignSelf: 'stretch',
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    gap: 5,
  },
  tab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  selectedTab: {
    backgroundColor: '#FFD84D',
  },
  tabText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.70)',
    fontWeight: '600',
  },
  selectedTabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'stretch',
  }
});

export default MarketScreen;