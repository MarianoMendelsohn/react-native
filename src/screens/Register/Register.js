import React, {Component} from 'react'
import {Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {auth, db} from '../../firebase/config'

class Register extends Component {
    constructor(){
        super()
        this.state ={
            usuario: '',
            mail: '',
            contraseña: ''
        }
    }

    registrandoUsuario ( usuario, mail, contraseña ){
        auth.createUserWithEmailAndPassword(mail, contraseña)
        .then(()=>{
            return(
                db.collection('usuarios').add({
                    mail: mail,
                    usuario: usuario,
                    createdAt: Date.now()
                })
            )
        })
        .ten(resp=> this.props.navigation.nvigate('Home'))
        .catch(err=> console.log(err))
    }

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
                placeholder='Contraseña'
                keyboardType='default'
                onChangeText={text => this.setState({contraseña: text})}
                value={this.state.contraseña}
                secureTextEntry={true}
            />
            <View>
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.usuario, this.state.mail, this.state.contraseña)}>
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
    }
  })
  

export default Register