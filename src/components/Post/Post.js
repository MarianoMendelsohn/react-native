import { Text, View, TouchableOpacity } from "react-native";
import React, {Component} from "react";
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            contadorLikes: props.data.likes.length,
            contadorComentarios: props.data.comments.length,
            like: false
        }
    }
    componentDidMount(){
        let like = this.props.data.likes.includes(auth.currentUser.email)
        if(like){
            this.setState({
                like: true
            })
        }
    }

    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)

        })
        .then(()=>{
            this.setState({
                like: true,
                contadorLikes: this.setState.contadorLikes + 1

            })
        })
        .catch(e => console.log(e))
    }
    unlike(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                like: false,
                contadorLikes: this.state.contadorLikes - 1
            })
        })
        .catch(e => console.log(e))
    }
    render() {
        return (
          <View>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate()}> 
                <Text>{this.props.data.owner}</Text>
            </TouchableOpacity>
             
            <Text>{this.props.data.description}</Text>
            <View>
            <Text>{this.state.contadorLikes}</Text>  
            {
               this.state.isMyLike ?
                    <TouchableOpacity onPress={()=> this.unlike()}>
                        <FontAwesome name='heart' color='black' size={16} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=> this.like()}>
                        <FontAwesome name='heart-o' color='red' size={16} />
                    </TouchableOpacity>
    
            }
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'Comments',
                {id:this.props.id}
                )}>
                <Text>Agregar comentario</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        )
      }

}

export default Post