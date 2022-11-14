import React, {Component} from 'react'
import {Text, View, TextInput, StyleSheet, TouchableOpacity, ImagePicker} from 'react-native'
import {auth, db} from '../../firebase/config'
//import ImagePicker from 'expo-image-picker'
import {storage} from '../../firebase/config'


class Register extends Component {
    constructor(){
        super()
        this.state ={
            usuario: '',
            mail: '',
            password: '',
            miniBio: '',
            fotoDePerfil: ''
        }
    }

    registrandoUsuario ( usuario, mail, password, miniBio ){
        auth.createUserWithEmailAndPassword(mail, password)
        .then(()=>{
            return(
                db.collection('usuarios').add({
                    mail: mail,
                    usuario: usuario,
                    miniBio: miniBio,
                    createdAt: Date.now()
                })
            )
        })
        .then(resp=> this.props.navigation.navigate('Home'))
        .catch(err=> console.log(err))
    }

    // searchImg(){
    //     ImagePicker.launchImageLibraryAsync()
    //     .then(resp => {
    //         fetch(resp.uri)
    //         .then(data => data.blob())
    //         .then(img => {
    //             console.log(storage);
    //             const ref = storage.ref(`profilePis/${Date.now()}.jpg`)
    //             ref.put(img)
    //             .then(()=> {
    //                 ref.getDownloadURL()
    //                 .then (url => {
    //                     this.setState({fotoDePerfil: url})
    //                 })
    //             })
    //         })
    //         .catch(err => console.log(err))
    //     })
    //     .catch( err => console.log( err))
    // }

    render(){
        return(
            <View style={styles.container}>
        <View>
            <Text>Formulario de registro </Text>
            <TextInput
                style={styles.input}
                placeholder='Nombre de usuario'
                keyboardType='default'
                onChangeText={text => this.setState({usuario: text})}
                value={this.state.usuario}
            />
            <TextInput
                style={styles.input}
                placeholder='mail'
                keyboardType='email-address'
                onChangeText={text => this.setState({mail: text})}
                value={this.state.mail}
            />
            <TextInput
                style={styles.input}
                placeholder='password'
                keyboardType='default'
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
            />
             <TextInput
                style={styles.input}
                placeholder='Acerca de vos'
                keyboardType='default'
                onChangeText={text => this.setState({miniBio: text})}
                value={this.state.miniBio}
            />
            {/* <View>
                <TouchableOpacity onPress={()=> this.searchImg()}>
                    <Text style={styles.fotoP}> Carga tu foro de perfil </Text>
                </TouchableOpacity>
            </View> */}
            
            <View>
                <TouchableOpacity onPress={()=> this.registrandoUsuario(this.state.usuario, this.state.mail, this.state.password)}>
                    <Text>Registrarse</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text> Inicia sesión </Text>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                    <Text>Loguearse</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      paddingHorizontal:24
    },
    input:{
        borderWidth:1
    },
    containerRedirect:{
        marginTop: 32
    },
    fotoP:{
        marginTop: 20,
        padding: 10,
        width: '80%',
        height: '50%',
        borderRadius: '25%',

    }
  })
  

export default Register