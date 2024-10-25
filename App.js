import React from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import Constants from 'expo-constants';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Clicker"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveBackgroundColor: "transparent",
          tabBarInactiveBackgroundColor: "transparent",
          tabBarItemStyle: {
            alignItems: "center",
            justifyContent: "center",
            width: 55,
            marginHorizontal: 8,
          },
          tabBarStyle: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 85,
            paddingVertical: 20,
            backgroundColor: "#FFF",
            justifyContent: 'center',
          },
          tabBarIcon: ({ focused }) => {
            const getTabName = (routeName) => {
              const names = {
                Clicker: "수확",
                Ranking: "랭킹",
                Market: "시장",
                Gifts: "선물",
                ItemShop: "아이템샵"
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
                ItemShop: <ItemShopIcon color={iconColor} />
              };

              return icons[routeName];
            };

            return (
              <View style={{ 
                display: 'flex',
                width: 55,
                height: 55,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
                flexShrink: 0,
                position: 'relative'
              }}>
                {focused && (
                  <View style={{
                    position: 'absolute',
                    display: 'flex',
                    width: 55,
                    height: 55,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                    flexShrink: 0,
                    backgroundColor: "#FFD84D",
                    borderRadius: 16,
                    zIndex: 1
                  }} />
                )}
                <View style={{
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 5
                }}>
                  {getTabIcon(route.name, focused)}
                  <Text
                    style={{
                      fontSize: 12,
                      color: focused ? "#FFFFFF" : "#999999",
                    }}
                  >
                    {getTabName(route.name)}
                  </Text>
                </View>
              </View>
            );
          },
          tabBarShowLabel: false,
        })}
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