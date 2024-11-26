import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'; 
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} options = {{
            title: 'Cadastrar',
            headerStyle: {backgroundColor: '#63D53C'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}/>
        <Stack.Screen name="Login" component={LoginScreen} options = {{
            title: 'Login',
            headerStyle: {backgroundColor: '#63D53C'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

