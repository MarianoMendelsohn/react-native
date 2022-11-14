import { View, Text, StyleSheet, Image, FlatList,ActivityIndicator,TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import Post from '../../components/Post/Post'
import {db} from '../../firebase/config'

class Home extends Component{
    constructor(props){
        super(props)
        this.state= {
            posteos:[]
        }
    }

    componentDidMount(){
        db.collection('posteos')
        .orderBy('createdAt', 'desc')
        .limit(3)
        .onSnapshot( doc => {
            let publicaciones = []
            docs.forEach( doc => {
                publicaciones.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            this.setState({
                posteos: publicaciones
            })
        })

    }

    render(){
        return(
            <>
             <View style={styles.contenedor1}>
                 <Text>Home</Text>
             </View>
             <View style={styles.contenedor3}>
                 <FlatList
                 data={this.state.posteos}
                 keyExtractor={item => item.id.toString()}
                 renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
                 />
             </View>
            </>
        )
    }

}

const styles = StyleSheet.create({
    contenedor1:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    contenedor2:{
      flex:3
    },
    container3:{
      flex:5
    },
    image:{
      height:300
    }
  })
  
  export default Home