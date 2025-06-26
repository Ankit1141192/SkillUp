
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProgressScreen from './screens/ProgressScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';


// Create Navigators
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const ProgressStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Home Stack
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
   
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: 'SkillUp',
          headerLeft: () => null, 
        }}
      />
    </HomeStack.Navigator>
  );
}

// Progress Stack
function ProgressStackScreen() {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen
        name="ProgressMain"
        component={ProgressScreen}
        options={{ title: 'Progress',headerLeft: () => null, }}
      />
    </ProgressStack.Navigator>
  );
}

// Chat Stack
function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatMain"
        component={ChatScreen}
        options={{ title: 'Chat',headerLeft: () => null}}
      />
    </ChatStack.Navigator>
  );
}

// Profile Stack
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: 'Profile',headerLeft: () => null }}
      />
    </ProfileStack.Navigator>
  );
}

// Main Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'ProgressTab') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          else if (route.name === 'ChatTab') iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          else if (route.name === 'ProfileTab') iconName = focused ? 'person' : 'person-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#34A853',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="ProgressTab" component={ProgressStackScreen} options={{ title: 'Progress' }} />
      <Tab.Screen name="ChatTab" component={ChatStackScreen} options={{ title: 'Chat' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStackScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Root Stack (Login, Register, Main)
export default function App() {
  return (
    <NavigationContainer>
      
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
