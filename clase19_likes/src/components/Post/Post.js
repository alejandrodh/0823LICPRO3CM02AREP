import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.infoPost.datos.likes.length
        }
    }

    componentDidMount(){
        //Indicar si el post ya está likeado o no.
        if(this.props.infoPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
    }


   likear(){
    //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.

    //update en base de datos
    db.collection('posts').doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: true,
            cantidadDeLikes: this.props.infoPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))


   }

   unLike(){
    //Quitar del array de likes al usario que está mirando el post.
    db.collection('posts').doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: false,
            cantidadDeLikes: this.props.infoPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))
   }
   

    render(){
        console.log(this.props);
        return(
            <View>
                <Text>Datos del Post</Text>
                <Text> Email: {this.props.infoPost.datos.owner}</Text>
                <Text>Texto: {this.props.infoPost.datos.textoPost}</Text>
                <Text>cantidad de likes: {this.state.cantidadDeLikes}</Text>

                {/* If ternario */}
                {this.state.like ? 
                <TouchableOpacity onPress={()=>this.unLike()}>
                    QuitarLike
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>this.likear()}>
                    Like
                </TouchableOpacity>
                }
                
                
            </View>
        )
    }
}



export default Post;
