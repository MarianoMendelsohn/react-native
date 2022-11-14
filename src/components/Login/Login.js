import React, {Component} from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {auth} from '../../firebase/config'


class Login extends Component {
    constructor(){
        super()
        this.state={
            mail: '',
            contraseña: '',
            avisoError: ''
        }
    }

    loguear(mail, contraseña){
        auth.signInWithEmailAndPassword(mail, contraseña)
        .then(resp => console.log(resp))
        .catch(e => console.log(e))


    }
    render(){
        return(
            <View>
                <Text> Login </Text>
            <TextInput
                style={Styles.input}
                keyboardType="email-address"
                placeholder= 'mail'
                onChangeText={text => this.setState({mail: text})} /*recibo un parametro y despues seteo el estado con las propiedades que necesito setiar, a email le guardo el valor que me trae text*/
                value={this.state.mail}
            />
            <TextInput
                style={Styles.input}
                keyboardType="default"
                placeholder= 'Contraseña'
                onChangeText={text => this.setState({contraseña: text})}
                value={this.state.contraseña}
                secureTextEntry={true}
            />
                <View>
                    <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
                        <Text> Login </Text>
                    </TouchableOpacity>
                
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    input: {
        borderWidth: 1,
    }
})

export default Login