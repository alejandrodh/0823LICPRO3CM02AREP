import React, { Component } from "react";

class RyM extends Component{

    constructor(){
        super();
        this.state = {
           personaje : {}
        }
    }

    componentDidMount(){
        console.log("En componentDidMount");

        fetch("https://rickandmortyapi.com/api/character/2")
        .then(response => response.json())
        .then( data => this.setState({
            personaje: data
        }))
        .catch(e => console.log(e))
    }

    componentDidUpdate(){
        console.log("En componentDidUpdate");
    }


    render(){
        console.log("Me monté");
        console.log(this.state)
        return(
            <section>
                <p>Nombre del Personaje: {this.state.personaje.name}</p>
            </section>
        )
    }

}


export default RyM;

