import React, {Component} from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {auth} from '../../firebase/config'


class Register extends Component {
    constructor(){
        super()
        this.state = {
            input1: '',
            input2: ''
        }
    }

    registrarUsuario(mail, contraseña){
        auth.createUserWithEmailAndPassword(mail, contraseña)
        .then(resp => console.log(resp))
        .catch(e => console.log(e))
    }

    




    render(){
        return(
            <View>
                <Text> Formulario </Text>
                <TextInput
                style={Styles.input}
                placeholder= 'mail'
                keyboardType="email-address"
                onChangeText={text => this.setState({input1: text})}
                value={this.state.input1}
                />
                <TextInput
                style={Styles.input}
                placeholder= 'contraseña'
                keyboardType="default"
                onChangeText={text => this.setState({input2: text})}
                value={this.state.input2}
                secureTextEntry={true}
                />
                <View>
                    <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.input1, this.state.input2)}>
                        <Text> Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    input: {
        borderWidth: 2,
    }
})

export default Register