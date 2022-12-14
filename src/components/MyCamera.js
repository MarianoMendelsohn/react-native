import React, { Component } from 'react'
import {Camera} from 'expo-camera'

import {
    View,
    Text, 
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'

import {storage} from '../firebase/config'


export default class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            uri: ""
        }
        this.metodosDeCamara = ''
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then( ()=> this.setState({
            permission: true
        }))
        .catch ( error => console.log(error))

    }

    tomarFoto(){
        console.log("Tomar Foto")
        this.metodosDeCamara.takePictureAsync()
            .then( photo => this.setState({
                uri: photo.uri,
                showCamera: false
            }))
            .catch (error => console.log(error))
    }

    guardarFoto(){
        console.log("Guardar Foto")
        fetch(this.state.uri)
            .then( res => res.blob())
            .then( image => {
                const ref = storage.ref(`photo/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>{
                        ref.getDownloadURL()
                        .then((uri)=> {
                            this.props.onImageUpload(uri)  // viene del componente padre
                        })
                    })
            })
            .catch(err => console.log(err))
    }

    clearFoto(){
        console.log("Guardar Foto")
        this.setState({
            uri: '',
            showCamera: true
        })
    }


  render() {
    return (
        <View style={styles.cameraBody}>
            {
                this.state.permission ? 
                    this.state.showCamera ?
                        <View style={styles.cameraBody}>
                            <Camera 
                                style={styles.cameraBody}
                                type={Camera.Constants.Type.back}
                                ref= {(metodosDeCamara) => this.metodosDeCamara = metodosDeCamara} 
                            />

                            <TouchableOpacity 
                                style={styles.button}
                                onPress = { ()=>this.tomarFoto()}
                            >
                                <Text>Tomar Foto</Text>
                            </TouchableOpacity>
                        </View> :
                        
                        <View>
                            {/* Vista previa de la imagen */}
                            <Image 
                                style={styles.preview}
                                source={{uri:this.state.uri}}
                                resizeMode='cover'
                            />
                            {/* Guardar fotor */}
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>this.guardarFoto()}
                            >
                                <Text>Guardar Foto</Text>
                            </TouchableOpacity>
                            {/* Rechazar foto */}
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>this.clearFoto()}
                            >
                                <Text>Eliminar</Text>
                            </TouchableOpacity>
                        </View> : 
                        <Text>No Hay permisos para la camara</Text>
            }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    cameraBody: {
        height: '80%',
    },
    button: {
        padding:8,
        backgroundColor:'violet',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280,
        color: "white"
    },
    preview:{
        height:'250%'
    }
})