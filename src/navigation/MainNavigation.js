import { StyleSheet, Text, View } from 'react-native';

//componentes que creamos nosotros y los traemos
import Register from '../screens/Register/Register';
import Login from '../screens/Login/Login';
import TabNavigation from './TabNavigation';
import Comments from '../screens/Comments/Comments';
//dependencias que instalamos stack navigation y navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Component } from 'react';


//Objeto con dos componentes Navigator y Screen
const Stack = createNativeStackNavigator();

class MainNavigation extends Component {
    constructor(props){
        super(props)
        this.state = {
            initialScreen:'Login'
        }
    }
  render(){
  return (
    
    <NavigationContainer>

    <Stack.Navigator>

      <Stack.Screen 
        options={{ headerShown: false }} 
        name="Register" 
        component={Register} 
    
      />

      <Stack.Screen 
        options={{ headerShown: false }} 
        name="Login" 
        component={Login} 
      />

      <Stack.Screen 
        options={{ headerShown: false }} 
        name="TabNavigation" 
        component={TabNavigation} 
      />

      <Stack.Screen 
        options={{ headerShown: true }} 
        name="Comments" 
        component={Comments} 
      />

    </Stack.Navigator>

  </NavigationContainer>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainNavigation