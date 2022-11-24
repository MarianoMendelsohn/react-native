import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cantidadDeLikes: this.props.dataPost.data.likes.length,
			myLike: false,
		};
	}

	componentDidMount() {
		if (this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
			this.setState({
				myLike: true,
			});
		}
	}

	like() {
		//Agregar el email del user logueado en el array
		db
			.collection('posts')
			.doc(this.props.dataPost.id)
			.update({
				likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
			})
			.then(() =>
				this.setState({
					cantidadDeLikes: this.state.cantidadDeLikes + 1,
					myLike: true,
				})
			)
			.catch((error) => console.log(error));
	}

	unLike() {
		db
		.collection('posts')
		.doc(this.props.dataPost.id)
		.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.displayName)
        })
        .then((res) => {
            this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes - 1,
				myLike: false
            })
        })
        .catch(err => console.log(err))

	}

	render() {
		return (
			<View style={styles.separator}>
				
{this.props.dataPost.data.owner == auth.currentUser.email ?  
<Text style={styles.nombre} onPress={() => this.props.navigation.navigate('Profile', { id: this.props.id })}> {this.props.dataPost.data.owner}</Text> : <Text style={styles.nombre} onPress={() => this.props.navigation.navigate('otherProfile', { email: this.props.dataPost.data.owner })}> {this.props.dataPost.data.owner}</Text> }
                <Image 
                    source={{uri:this.props.dataPost.data.url}}
                    resizeMode="contain"
                    style={styles.image}
                />


				{this.state.myLike ? (
					<TouchableOpacity onPress={() => this.unLike()}>
						<Text style={styles.grande}>❤️</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => this.like()}>
						<Text style={styles.grande}>🤍</Text>
					</TouchableOpacity>
					
				)}
				<TouchableOpacity onPress={() => this.props.navigation.navigate("Comments",{id:this.props.dataPost.id})}>
				<Text style={styles.grande}>💭</Text>
			</TouchableOpacity>
					
				<Text>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
				<Text>Texto del Post: {this.props.dataPost.data.description}</Text>
				
					
					
			</View>
		);
	}
}

const styles = StyleSheet.create({
	separator: {
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 20,
		display: "flex",
		textAlign: "center",
		
		
	},
    image: {
        height:250,
        padding:0
    },
	title:{
		textAlign:"center"
	},
	grande:{
fontSize: 30
	}
});

export default Post;