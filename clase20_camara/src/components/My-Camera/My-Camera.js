import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { db, storage } from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';


class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos:false, //permisos de acceso al hardware para usar la cámara.
            urlInternaFoto: '', //aca va la url temporal interna de la foto.
            mostrarCamara: true,
        }
        this.metodosDeCamara = '' //referenciar a los métodos internos del componente camera.
    }

    componentDidMount(){
       //Pedir permisos para uso del hardware.
       Camera.requestCameraPermissionsAsync()
            .then( () => {
                this.setState({
                    permisos: true
                })
            } )
            .catch( e => console.log(e)) 
    }

    SacarFoto(){
        console.log('sacando foto...');
        this.metodosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlInternaFoto: photo.uri, //La ruta interna de la foto en la computadora.
                    mostrarCamara: false //escondemos la cámara para mostrar un preview de la foto al usuario.
                })
            })
            .catch(e=>console.log(e))
    }

    cancelar(){
        console.log("Cancelando...");
        this.setState({
            urlInternaFoto:'',
            mostrarCamara: true,
        })
    }

    guardarFoto(){
        fetch(this.state.urlInternaFoto)
            .then( res => res.blob()) //.blob() recupera datos binarios. Las fotos son archivos binarios.
            .then( image => {

                const ruta = storage.ref(`photos/${Date.now()}.jpg`);
                ruta.put( image )
                    .then(()=>{
                        ruta.getDownloadURL() //La url de guardado de la foto.
                            .then( url => {
                                //Necesitamos guardar la url en internet como un dato más del posteo.
                                this.props.traerUrlDeFoto(url)
                                //Borra la url temporal del estado.
                                this.setState({
                                    urlInternaFoto: '',
                                })
                            } )
                    })

            })
            .catch( e => console.log(e))

    }


    render(){
        return(
            <View style={ styles.container}>

                {
                    this.state.permisos ?
                        this.state.mostrarCamara === false ?
                        //Preview
                        <React.Fragment>
                            <Image 
                                source={{uri:this.state.urlInternaFoto}}
                                style={ styles.cameraBody }
                            />
                            {/* Corregir estilos para que se vea la imagen. Resuelto ✅.*/}
                            {/* Corregir estilos para que los botones desaparezcan una vez que el usuario aceptó o canceló el preview. Resuelto ✅ */}
                            <View style={styles.confirm}>
                                <TouchableOpacity style={styles.cancelButton} onPress={()=>this.cancelar()}>
                                    <Text style = { styles.textButton }>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={ () => this.guardarFoto() }>
                                    <Text style = { styles.textButton }>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                        
                        :
                        //Cámara.
                        <React.Fragment>
                        {/* Corregir estilos para que se vea bien la cámara */}
                            <Camera 
                                type={Camera.Constants.Type.front}
                                ref= { metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                                style = { styles.cameraBody }
                            />
                            <TouchableOpacity  style = { styles.button } onPress={()=> this.SacarFoto()}>
                                <Text style = { styles.textButton }>Sacar Foto</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    :
                    <Text>La cámara no tiene permisos</Text>

                }
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container:{
        height:"45vh",
        
    },
    cameraBody: {
      marginTop: 20,
      marginBottom: 10,
      height:"40vh",
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff',
        textAlign: "center"
    },
    confirm:{
        flexDirection:"row",
        justifyContent: "space-between"
    },
    confirmButton:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
    },
    cancelButton:{
        backgroundColor:'#dc3545',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
    }
})

export default MyCamera