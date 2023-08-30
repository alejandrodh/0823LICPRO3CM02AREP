import React, { Component } from "react";
import TarjetaPersonaje from "../TarjetaPersonaje/TarjetaPersonaje";
import Filtro from "../Filtro/Filtro";

class ListaPersonajes extends Component{

    constructor(){
        super();
        this.state = {
           personajes : [],
        }
    }

    componentDidMount(){
        console.log("En componentDidMount");

        fetch("https://rickandmortyapi.com/api/character")
        .then(response => response.json())
        .then( data => this.setState({
            personajes: data.results,
        }))
        .catch(e => console.log(e))
    }

    filtrarPersonajes(textoAFiltrar){
    //  Desarrollar el método
       let personajesFiltrados = this.state.personajes.filter(function(unPersonaje){
            //tenemos que chequear si el texto a filtrar está dentro del nombre del personaje. Usemos la funcuión includes()
            return unPersonaje.name.includes(textoAFiltrar)
        })

        this.setState({
            personajes: personajesFiltrados,
        })
    }

    render(){
        console.log("Me monté");
        console.log(this.state)
        return(
            <section>
                <Filtro />
                { 
                    this.state.personajes.map( function(unPersonaje){
                        return <TarjetaPersonaje key={unPersonaje.id} datosPersonaje={unPersonaje}/> 
                    })
                }
            </section>
        )
    }

}


export default ListaPersonajes;

