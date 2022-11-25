import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Ionicons,  } from '@expo/vector-icons';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import NewPost from '../screens/NewPost/NewPost';
import Search from '../screens/Search/Search'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

function TabNavigation() {
	return (
		<Tab.Navigator screenOptions={{tabBarShowLabel: false}} >

			<Tab.Screen style={styles.naranja} 
				name="Home" 
				component={Home}  
				options={{ tabBarIcon: () => <FontAwesome name="home"  size={24} color="purple"/>,
                headerShown: false 
            }} 
			/>

			<Tab.Screen style={styles.naranja}
				name="Profile" 
				component={Profile} 
				options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="purple" />,
                headerShown: false 
            }} 
			/>

            <Tab.Screen style={styles.naranja}
				name='Search' 
				component={Search} 
				options={{tabBarIcon: ({focused}) => <Ionicons name="search-sharp" size={24} color='purple'/>,
                headerShown: false 
            }}
			/>

            <Tab.Screen style={styles.naranja}
				name="NewPost" 
				component={NewPost}  
				options={{ tabBarIcon: () => <FontAwesome name="photo" size={24} color="purple" />,
                headerShown: false 
            }} 
			/>

			
			

			</Tab.Navigator>
	);
}
const styles = StyleSheet.create({
	header: {
		backgroundColor: "#FF9333",
		width: "100%",
		padding: 10,
		marginBottom: 20,
	},
	naranja:{
		backgroundColor:"#FF9333"
	},
})
	
	
export default TabNavigation;