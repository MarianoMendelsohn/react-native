import React, {Component} from 'react';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase'
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import posts from '../Post/Post';

class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            comments:[],
            textComment:""
        }
    }
    
    componentDidMount(){
        db.collection('posts').doc(this.props.route.params.id).onSnapshot(doc=>{
                this.setState({
                    comments: doc.data().comments 
                })
        }
        )
    }
    
    comentario() {

		db
			.collection('posts')
			.doc(this.props.route.params.id)
			.update({
			        comments: firebase.firestore.FieldValue.arrayUnion({
                    email: auth.currentUser.email,
                    comentario: this.state.textComment,
                    createdAt: Date.now()
                })
			})
			.then(() =>
				this.setState({
					textComment: "",
					
				})
			)
			.catch((error) => console.log(error));
	}


    render(){
        // console.log(this.state);
        return(
                <View>
                    <Text style={styles.title}>Comment</Text>
                  <FlatList
                     data={this.state.comments}
                     keyExtractor={item => item.createdAt}
                     renderItem={({item})=>
                     <View>
                    <Text>{item.email}</Text> 
                    <Text>{item.comentario}</Text> 
                     </View>
                     }

                  >
                 </FlatList>

                     <TextInput style={styles.field}
                     placeholder="text"
                     keyboardType="default"
                     onChangeText={(text) => this.setState({textComment : text })}
                     value={this.state.textComment}/>
                     <TouchableOpacity style={styles.button}
                      onPress={()=>{this.comentario(this.state.textComment)}}
                    ><Text> Agregar comentario</Text></TouchableOpacity>
                </View>

        )
    }
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#ff0000",
		width: "100%",
		padding: 10,
		marginBottom: 20,
	},
	headertitle: {
		color: "white",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	},
	container: {
		overflow: "hidden",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		color: "#ff9f68",
		paddingTop: 20,
	},
	/* form:{
		backgroundColor: 'red',
	}, */
	field: {
		width: "50%",
		backgroundColor: "#E5E5E5",
		textAlign: "center",
		padding: 7,
		marginTop: 5,
		borderRadius: 15,
	},
	title: {
		color: "#000000",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
	},
	bold:{
		fontWeight: "bold",
	},
	button: {
        padding:8,
        backgroundColor:'#FF9333',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
	button2: {
        padding:8,
        backgroundColor:'grey',
        borderRadius:8,
        textAlign:'center',
        marginVertical:8,
        marginHorizontal:16,
        width:280
    },
		
});

export default Comments;