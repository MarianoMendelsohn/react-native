import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../../firebase/config';

//muy parecido al registro

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			pass: '',
			error:'',
		};
	}
	loginUser(email, pass) {
		auth
        //metodo de firebase para ingresar
			.signInWithEmailAndPassword(email, pass)
			.then((res) => {
				this.setState({
					email: '',
					pass: '',
				});
				this.props.navigation.navigate('TabNavigation',{id:1,mensaje:"hola"});
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headertitle}>INGRESAR</Text>
				</View>		
				<View>
					<TextInput 
                    style={styles.field} 
                    placeholder="email" 
                    keyboardType="email-address" 
                    onChangeText={(text) => this.setState({ email: text })} 
                    value={this.state.email} 
                    />

					<TextInput 
                    style={styles.field} 
                    placeholder="password"
                     keyboardType="default" 
                     secureTextEntry onChangeText={(text) => this.setState({ pass: text })}
                      value={this.state.pass} 
                      />

					<TouchableOpacity style={styles.button} onPress={() => this.loginUser(this.state.email, this.state.pass)}>
					<Text style={styles.bold}>INGRESAR</Text>
						</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
					<Text style={styles.bold}>NO TENGO CUENTA</Text>
						</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header:{
		backgroundColor: "#ff0000",
		width: "100%",
		padding: 10,
		marginBottom: 20,
	},	
	headertitle:{
		color: "white",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	},
	container:{
		overflow: "hidden",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		color: "#ff9f68",
		paddingTop: 20,
	},
	
	field: {
		width: "140%",
		backgroundColor: "#E5E5E5",
		textAlign: "center",
		padding: 7,
		marginTop: 5,
		borderRadius: 15,
	  },
	  title: {
		color: "#000000",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	  },
	  bold:{
		fontWeight: "bold",
			button: {
        padding:8,
        backgroundColor:'#552586',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
	campo: {
        fontSize:16,
        borderColor: '#552586',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:4,
        marginVertical:8,
        marginHorizontal:16,
        padding:8,
        width:280
    },
	button: {
        padding:8,
        backgroundColor:'#FF9333',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
	}
});

export default Login;