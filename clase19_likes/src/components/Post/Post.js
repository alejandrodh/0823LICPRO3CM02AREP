import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
        }
    }

    componentDidMount(){
        //Indicar si el post ya está likeado o no
        if(this.props.infoPost.datos.owner === auth.currentUser.email){
            this.setState({
                like: true
            })
        }
    }


   likear(){
    //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.
   }

   unLike(){
    //Quitar del array de likes al usario que está mirando el post.
   }
   

    render(){
        // console.log(this.props);
        return(
            <View>
                <Text>Datos del Post</Text>
                <Text> Email: {this.props.infoPost.datos.owner}</Text>
                <Text>Texto: {this.props.infoPost.datos.textoPost}</Text>

                {/* If ternario */}
                {this.state.like ? 
                <TouchableOpacity onPress={()=>this.unlike()}>
                    UnLike
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
