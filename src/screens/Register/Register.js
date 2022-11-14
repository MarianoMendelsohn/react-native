import React, {Component} from 'react'
import {Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {auth, db} from '../../firebase/config'

class Register extends Component {
    constructor(){
        super()
        this.state ={
            usuario: '',
            mail: '',
            password: ''
        }
    }

    registrandoUsuario ( usuario, mail, password ){
        auth.createUserWithEmailAndPassword(mail, password)
        .then(()=>{
            return(
                db.collection('usuarios').add({
                    mail: mail,
                    usuario: usuario,
                    miniBio: miniBio,
                    fotoDePerfil: this.state.imagenURL,
                    createdAt: Date.now()
                })
            )
        })
        .then(resp=> this.props.navigation.navigate('Home'))
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
             <TextInput
                style={styles.input}
                placeholder='Tu foto'
                keyboardType='default'
                onChangeText={text => this.setState({imagenURL:text})}
                value={this.state.fotoDePerfil}
            />
            
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
    }
  })
  

export default Register