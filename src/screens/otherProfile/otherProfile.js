import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView,Image } from 'react-native';
import { auth,db } from '../../firebase/config';
import Post from "../Post/Post"; 

 class otherProfile  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: [],
            posts: [],
            error: '',
        }
    }

    componentDidMount() {
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                docs.forEach((doc) => {
                    const data = doc.data();
                    this.setState({
                        userName: data.userName,
                        bio: data.bio,
                        photo: data.photo
                    });
                });
            });

        db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                    })
                })
            }
        )
    };

    back() {
        this.props.navigation.navigate('Home')  
    }

    render() {
        console.log(this.state.usuario)

        return (
            <View style={styles.container}>
                
                <Text style={styles.title}>Be Fake.</Text>

                <TouchableOpacity style={styles.button} onPress = {() => this.back()} >
                    <Text style={styles.buttonText}>Volver a Home</Text>
                </TouchableOpacity> 

                <View style={styles.subContainer}>
                 


                    <Text style={styles.userNameText}>{this.state.userName}</Text>

                    
                </View>
                    
                <View>
                    <Text style={styles.text}>Email: {this.state.email}</Text>
                    <Text style={styles.text}>Biografía: {this.state.bio}</Text>
                    <Text style={styles.text}>Listado de {this.state.posts.length} posteos</Text>
                </View>
                    
                    <View>
                        {this.state.posts.length >= 1 ?
                            <FlatList style={styles.list}
                            data={this.state.posts}
                            keyExtractor={ onePost => onePost.id.toString()}
                            renderItem={ ({item}) => <Post dataPost={item} navigation={this.props.navigation} />}
                        />
                        :
                        <Text>Aún no hay publicaciones</Text>
                        }
                </View>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})

export default otherProfile;