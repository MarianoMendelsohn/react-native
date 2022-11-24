import { auth, db } from '../../firebase/config';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
 import * as ImagePicker from 'expo-image-picker'; 


class Register extends Component {

	//creamos props con estados vacios
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
			nombreUsuario: '',
			bio: '',
			error: {
				email: '',
				nombreUsuario: '',
				pass: '',
				bio: '',
			},
			image: '',
            permission: false
		};
	}
	componentDidMount() {
		 auth.onAuthStateChanged((user) => {
			if (user) {
				this.props.navigation.navigate('TabNavigation');
			}
		}); 
	}
	//Al registrar un user, queremos guardarlo en la db con nombre,biografia.

	registerUser(email, pass, nombreUsuario, bio, ) {
		//Chequear si estan vacios los campos
		//Si estan vacios, seteame el estado error a un mesaje
		//Despues pones return
		if (this.state.email === '' || this.state.nombreUsuario === '' || this.state.pass === '') {
			this.setState({ error: 'Todos los campos son obligatorios' })
			return
		}
		
	 	fetch(this.state.image)
        .then(res=>res.blob())
        .then(image=>{
            const ref = storage.ref(`perfil/${Date.now()}.jpg`)
            ref.put(image)
            .then(()=>{
                ref.getDownloadURL()
                .then(()=>{
                    this.onImageUpload(image)

                })
            })
        })
        .catch(err=>console.log(err))
		auth
			//metodo de firebase para crear usuario
			.createUserWithEmailAndPassword(email, pass)
			.then((res) => {
				db
					//creamos usuario en la base de datos
					.collection('users')
					.add({
						email: this.state.email,
						nombreUsuario: this.state.nombreUsuario,
						bio: this.state.bio,
						image: this.state.image

					})
					res.user.updateProfile({
						displayName: nombreUsuario,
					})
					//reiniciamos el state a 0
					.then((res) => {
						this.setState({
							email: '',
							pass: '',
							bio: '',
							image: ''

						});
						//una vez creado el usuario que te lleve al menu
						/* this.props.navigation.navigate('TabNavigation'); */
					});
			})
			.catch((error) => console.log(error));
	}
 	onImageUpload(image){
        this.setState({image: image}, () => {console.log(this.state.image)}
        ) 
    }

    elegirImagen(){
        ImagePicker.getMediaLibraryPermissionsAsync() // no funciona el permiso
        .then(()=>this.setState({
            permission: true
        }))
        .catch(err=>console.log(err))
        
        let image = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        .then((res) => {
            if (!image.cancelled) {
                this.setState({image: res.uri})
                
            }
        })
    } 

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headertitle}>REGISTRO</Text>
					<Text style={styles.errorText}>
						{this.state.error.email && 'La dirección de email es obligatoria'}
					</Text>
				</View>

				<TextInput

					style={styles.field}
					placeholder="email"
					keyboardType="email-address"
					onChangeText={(text) => this.setState({ email: text })}
					value={this.state.email} />
				<Text style={styles.errorText}>
					{this.state.error.nombreUsuario && 'El nombre de usuario es obligatorio'}
				</Text>
				<TextInput
					style={styles.field}
					placeholder="Nombre de usuario"
					keyboardType="default"
					onChangeText={(text) => this.setState({ nombreUsuario: text })}
					value={this.state.nombreUsuario}
				/>
				<Text style={styles.errorText}>
					{this.state.error.bio && 'La biografía es obligatoria'}
				</Text>
				<TextInput
					style={styles.field}
					placeholder="Biografía"
					keyboardType="default"
					onChangeText={(text) => this.setState({ bio: text })}
					value={this.state.bio}
				/>
				<Text style={styles.errorText}>
					{this.state.error.pass && 'La contraseña es obligatoria'}
				</Text>
				<TextInput
					style={styles.field}
					placeholder="password"
					keyboardType="default"
					secureTextEntry onChangeText={(text) => this.setState({ pass: text })}
					value={this.state.pass}
				/>
				   <TouchableOpacity 
                        style={styles.campo}
                        onPress={()=>{this.elegirImagen()}}
                    >
                        <Text style={styles.perfil}>Elegí tu foto de perfil</Text>
                    {/* {this.state.image && <Image source={{uri: this.state.image}} style={{width: 200, height: 200}}/>} */}
                    </TouchableOpacity>





				{/* si toco tengo cuenta que me lleve al login */}
				<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.bold}>YA TENGO CUENTA</Text>
					</TouchableOpacity>

				{/*  cuando tocamos el boton registrarme con el metodo Onpress
                     con un callback llamamos a la funcion registerUser y creamos el usuario */}
				<TouchableOpacity style={styles.button} onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario, this.state.bio, this.state.image)}>
					<Text style={styles.bold}>REGISTRARME</Text>
				</TouchableOpacity>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#ff0000",
		width: "100%",
		padding: 10,
		marginBottom: 20,
	},
	headertitle: {
		color: "#000000",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	},
	container: {
		overflow: "hidden",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#c0c0c0",
		color: "#ff9f68",
		paddingTop: 20,
	},
	/* form:{
		backgroundColor: 'red',
	}, */
	field: {
		width: "50%",
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
	},
	button: {
        padding:8,
        backgroundColor:'#ff0000',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
	button2: {
        padding:8,
        backgroundColor:'ff0000',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
		
});


export default Register;