// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CourseScreen from './screens/CourseScreen';
import ProgressScreen from './screens/ProgressScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeQuizScreen from './screens/HomeQuizScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultScreen';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const ProgressStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// Home Stack (with CourseScreen)
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: 'SkillUp',
          gestureEnabled: false,
        }}
      />
      <HomeStack.Screen
        name="CourseScreen"
        component={CourseScreen}
        options={({ route }) => ({
          title: route.params?.course?.name || 'Course Detail',
        })}
      />
      <HomeStack.Screen
        name="HomeQuizScreen"
        component={HomeQuizScreen} // ✅ FIXED: Correct component
        options={{
          title: 'Quiz',
          gestureEnabled: false,
        }}
      />
      <HomeStack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{
          title: 'Quiz',
          gestureEnabled: false,
        }}
      />
      <HomeStack.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={{
          title: 'Results',
          gestureEnabled: false,
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
        options={{
          title: 'Progress',
          gestureEnabled: false,
        }}
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
        options={{
          title: 'Chat',
          gestureEnabled: false,
        }}
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
        options={{
          title: 'Profile',
          gestureEnabled: false,
        }}
      />
    </ProfileStack.Navigator>
  );
}

// Bottom Tabs with Icons
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
        tabBarActiveTintColor: '#68a8e3',
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

// App Root Stack
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
