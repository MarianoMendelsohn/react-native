import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../../firebase/config'
//import Camara from '../../components/Camara/Camara'

class Posts extends Component {
    constructor(){
        super()
        this.state={
            descripcion:'',
            usarCamara:true,
            imagenUrl:''
        }
        console.log('llegó')
    }

    enviarPost(description){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: description,
            likes:[],
            comments:[],
            foto: this.state.imagenUrl
        })
        .then(resp => console.log('se subió'))
        .catch(err => console.log(err))

    }

    cuandoSubaLaImagen(url){
        this.setState({
            mostrarCamara:false,
            fotoUrl: url
        })
    }


    render() {
        return (
        <View style = {styles.container}>
            {/* {
                this.state.mostrarCamara ?
                <Camara
                cuandoSubaLaImagen = {(url)=> this.cuandoSubaLaImagen(url)}
                /> : */}
              <View>
                <TextInput
                    keyboardType='default'
                    onChangeText={text => this.setState({description:text})}
                    value={this.state.descripcion}
                    style={styles.input}
                    placeholder='Deja tu descripcion'
                />
                <TouchableOpacity
                onPress={()=> this.enviarPost(this.state.descripcion)}
                >
                    <Text>Enviar posteo</Text>
                </TouchableOpacity>
              </View>  
           {/* } */}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }, 
    input:{
        borderWidth:1,
        height:48
    }
})

export default Posts