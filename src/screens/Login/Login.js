import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            mail: '',
            contraseña:''
        }
    }

    componentDidMount(){

        auth.onAuthStateChanged(usuario => {
            if ( usuario !== null) {
                this.props.navigation.navigate('TabNavigation')
            }
        })

    }

    loguear( mail, contraseña){
        auth.signInWithEmailAndPassword(mail, contraseña)
        .then(resp=> {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch( err => console.log('TabNavigation'))
    }

    render() {
        return(
            <View style={styles.container}>
        <View>

          <Text>Login</Text>
          <TextInput
              style={styles.input}
              keyboardType='email-address'
              placeholder='Ingresa tu email'
              onChangeText={text => this.setState({mail: text})}
              value={this.state.mail}
          />
          <TextInput
              style={styles.input}
              keyboardType='default'
              placeholder='Ingresa tu Password'
              onChangeText={text => this.setState({contraseña: text})}
              value={this.state.contraseña}
              secureTextEntry={true}
          />
          <View>
              <TouchableOpacity onPress={()=> this.loguear(this.state.mail, this.state.contraseña)}>
                  <Text>Log In</Text>
              </TouchableOpacity>
          </View>

          <View>
            <Text>
              ¿Todavía no tenes tu cuenta? ¡Createla!
            </Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}> 
              <Text>Registrate</Text>
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
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10
    }
  })

export default LoginScreen