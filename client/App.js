import React, {useState} from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import profilePic from './assets/profilePic.png';
import ManageTasks from './manageTasks';  
import CallOwner from './callOwner';
import Outcomes from './outcomes';
import Bills from './bills';
import SmartDevices from './smartDevices';
import More from './more';
import CreateUserScreen from './createAccount';


function LoginPage({ navigation }) {
  // const [currentPage, setCurrentPage] = useState('login');

  // function goBackToLogin() {
  //   setCurrentPage('login');
  // }

  // if (currentPage !== 'login') {
  //   return (<CreateUserScreen onBack={goBackToLogin}/>);
  // }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightblue' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>SharedSpace</Text>
      <TextInput placeholder="Username" style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: '80%' }} />
      <TextInput placeholder="Password" secureTextEntry={true} style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: '80%' }} />
      <Button title="Sign In" onPress={() => navigation.navigate('Main')} />
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={{ marginTop: 10 }}>Create Account</Text>
      </TouchableOpacity>
      
    </View>
  );
}

function ProfilePage() {
  const [currentPage, setCurrentPage] = useState('profile');
  const buttons = [
    { label: 'Manage tasks', onPress: () => setCurrentPage('tasks') },
    { label: 'New call for the apartment owner', onPress: () => setCurrentPage('call') },
    { label: 'Manage outcomes', onPress: () => setCurrentPage('outcomes') },
    { label: 'Pay bills', onPress: () => setCurrentPage('bills') },
    { label: 'Smart devices integration', onPress: () => setCurrentPage('devices') },
    { label: 'More…', onPress: () => setCurrentPage('more') },
  ];

  function goBackToProfile() {
    setCurrentPage('profile');
  }

  if (currentPage !== 'profile') {
    if (currentPage === 'tasks') return <ManageTasks onBack={goBackToProfile}/>;
    if (currentPage === 'call') return <CallOwner onBack={goBackToProfile}/>;
    if (currentPage === 'outcomes') return <Outcomes onBack={goBackToProfile}/>;
    if (currentPage === 'bills') return <Bills onBack={goBackToProfile}/>;
    if (currentPage === 'devices') return <SmartDevices onBack={goBackToProfile}/>;
    if (currentPage === 'more') return <More onBack={goBackToProfile}/>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SharedSpace</Text>
      <Image source={profilePic} style={styles.profileImage} />
      <Text style={styles.name}>Name: Lior Maimon</Text>

      <View style={styles.buttonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={button.onPress}
          >
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function PostsPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightblue' }}>
      <Text style={{ fontSize: 24 }}>SharedSpace</Text>
      {/* Add posts here */}
    </View>
  );
}

function ChatPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightblue' }}>
      <Text style={{ fontSize: 24 }}>SharedSpace</Text>
      {/* Add chat components here */}
    </View>
  );
}

function NotificationsPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightblue' }}>
      <Text style={{ fontSize: 24 }}>SharedSpace</Text>
      {/* Add notifications here */}
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Posts" component={PostsPage} />
      <Tab.Screen name="Chat" component={ChatPage} />
      <Tab.Screen name="Notifications" component={NotificationsPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="CreateAccount" component={CreateUserScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#0f3057',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    color: '#0f3057',
    marginBottom: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    width: 100,
    height: 110,
    backgroundColor: '#008891',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});