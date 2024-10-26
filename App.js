import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClickerScreen from './screens/ClickerScreen';
import TreeIcon from './components/TreeIcon';
import RankingIcon from './components/RankingIcon';
import RankingScreen from './screens/RankingScreen';
import MarketScreen from './screens/MarketScreen';
import GiftsScreen from './screens/GiftsScreen';
import ItemShopScreen from './screens/ItemShopScreen';
import MarketIcon from './components/MarketIcon';
import GiftIcon from './components/GiftIcon';
import ItemShopIcon from './components/ItemShopIcon';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

function TabBar({ state, descriptors, navigation }) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const iconPositions = useRef([]).current;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) {
      Animated.spring(slideAnim, {
        toValue: iconPositions[state.index],
        useNativeDriver: true,
        tension: 68,
        friction: 10,
      }).start();
    }
  }, [state.index, ready]);

  const handleIconLayout = (event, index) => {
    iconPositions[index] = event.nativeEvent.layout.x;
    if (index === state.routes.length - 1) setReady(true);
  };

  return (
    <View style={{
      flexDirection: 'row',
      width: '100%',
      height: 85,
      paddingVertical: 20,
      backgroundColor: "#FFF",
      justifyContent: 'center',
    }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 15,
          left: 0,
          width: 55,
          height: 55,
          backgroundColor: '#FFD84D',
          borderRadius: 16,
          transform: [{ translateX: slideAnim }],
          zIndex: 0,
        }}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getTabName = (routeName) => {
          const names = {
            Clicker: "수확",
            Ranking: "랭킹",
            Market: "시장",
            Gifts: "선물",
            ItemShop: "아이템샵",
          };
          return names[routeName] || routeName;
        };

        const getTabIcon = (routeName, focused) => {
          const iconColor = focused ? "#FFFFFF" : "#999999";
          const icons = {
            Clicker: <TreeIcon color={iconColor} />,
            Ranking: <RankingIcon color={iconColor} />,
            Market: <MarketIcon color={iconColor} />,
            Gifts: <GiftIcon color={iconColor} />,
            ItemShop: <ItemShopIcon color={iconColor} />,
          };
          return icons[routeName];
        };

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            onPress={onPress}
            onLayout={(event) => handleIconLayout(event, index)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 55,
              marginHorizontal: 8,
              zIndex: 2,
            }}
          >
            <View style={{
              width: 55,
              height: 55,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
              }}>
                {getTabIcon(route.name, isFocused)}
                <Text
                  style={{
                    fontSize: 12,
                    color: isFocused ? "#FFFFFF" : "#999999",
                  }}
                >
                  {getTabName(route.name)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        initialRouteName="Clicker"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Clicker" component={ClickerScreen} />
        <Tab.Screen name="Ranking" component={RankingScreen} />
        <Tab.Screen name="Market" component={MarketScreen} />
        <Tab.Screen name="Gifts" component={GiftsScreen} />
        <Tab.Screen name="ItemShop" component={ItemShopScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
