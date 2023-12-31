import React, { Component } from 'react';

class TarjetaPersonaje extends Component {

    constructor(props){
        super(props)
        this.state ={
            textoBoton: "Agregar a favoritos",
            favoritos: []

        } 
    }

    componentDidMount(){
        let arrayFavoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos');
        
        if(recuperoStorage !== null){
            arrayFavoritos = JSON.parse(recuperoStorage);

           if(arrayFavoritos.includes(this.props.datosPersonaje.id)){
             this.setState({
                 textoBoton: 'Quitar de favoritos'
             })
           }    
        }

    }

    agregarAFavoritos(id){
        // Agregar un id dentro de array y colocar ese array en localStorage
        let arrayFavoritos = []
        let recuperoStorage = localStorage.getItem('favoritos');
        
        if(recuperoStorage !== null){
           arrayFavoritos = JSON.parse(recuperoStorage);   
        }
           
        if(arrayFavoritos.includes(id)){
            //Si el id está en el array queremos sacar el id.
            arrayFavoritos = arrayFavoritos.filter( unId => unId !== id);

            this.setState({
                textoBoton: "Agregar a Favoritos"
            })


        } else {
            arrayFavoritos.push(id);
            this.setState({
                textoBoton: "Quitar de favoritos"
            })
        }

        //Subirlo a local storage stringifeado
        let arrayFavoritosAString = JSON.stringify(arrayFavoritos)
        localStorage.setItem('favoritos', arrayFavoritosAString)

        console.log(localStorage)
    }


    render(){
        return (
            <article className='character-card'>
                <img src={this.props.datosPersonaje.image} alt={this.props.datosPersonaje.name} />
                
                <button onClick={()=>this.agregarAFavoritos(this.props.datosPersonaje.id)} className='link' type="button">{ this.state.textoBoton }</button>

                <h2>{this.props.datosPersonaje.name}</h2>
                <p>{this.props.datosPersonaje.status}</p>
                <p>{this.props.datosPersonaje.species}</p>
            </article>
        )
    }

}

export default TarjetaPersonaje;