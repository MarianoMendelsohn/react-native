import React, {Component} from 'react';
import { db, auth } from '../../firebase/config';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Image, ScrollView} from 'react-native';
import Post from '../Post/Post';


class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
    }
    
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts
                })
            }
        )

        
    }


    render(){
         console.log(this.state.posts)
        return(
            <ScrollView>
                <View>
                    <Text style={styles.title}>POSTEOS</Text>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
                    />
                    
                </View>
                </ScrollView>
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
    title:{
		color: "#000000",
		textAlign: "center",
		fontSize: 20,
		fontWeight: "600",
		padding: 10,
    }
    
	
});


export default Home;