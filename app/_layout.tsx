import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import { Platform, Image, Animated } from 'react-native';
import "./globals.css";

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#181824' }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(24,24,36,0.95)',
            borderTopWidth: 0,
            elevation: 0,
            height: 60,
            paddingBottom: Platform.OS === 'ios' ? 18 : 10,
            paddingTop: 6,
          },
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#b0b0c3',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <Animated.View>
                <Image
                  source={require('../assets/images/home.png')}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? '#3b82f6' : '#b0b0c3'
                  }}
                />
              </Animated.View>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'How It Works',
            tabBarLabel: 'How It Works',
            tabBarIcon: ({ focused }) => (
              <Animated.View>
                <Image
                  source={require('../assets/images/information-button.png')}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? '#3b82f6' : '#b0b0c3'
                  }}
                />
              </Animated.View>
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
