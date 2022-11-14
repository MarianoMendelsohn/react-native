import {View, Text} from 'react-native'
import React from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from './TabNavigation';
import Login from '../screens/Login/Login'
import Register from "../screens/Register/Register";
import Home from '../screens/Home/Home'

const Stack = createNativeStackNavigator()

function MainNavigation (){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Login" 
                component={Login} 
                options={{
                    headerShown: false
                    //es un booleano 
                }}
                />
                <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{
                    headerShown: false 
                }}
                />
                <Stack.Screen
                name='TabNavigation'
                component={TabNavigation}
                options={{
                    headerShown: false
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation