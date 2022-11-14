import {View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {auth} from '../../firebase/config'

class Perfil extends Component {
    signOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }
    render(){
        return(
            <View>
                <Text style={styles.letra}> PERFIL </Text>
                <TouchableOpacity 
                onPress={ ()=> this.signOut()}
                style={styles.boton}
                > 
                    <Text> Cerrar sesión </Text>

                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    boton: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    letra:{
        fontFamily: 'Copperplate',
        fontSize: 20

    },
    // input: {
    //     height: 40,
    //     margin: 12,
    //     borderWidth: 1,
    //     padding: 10
    // }
})
export default Perfil