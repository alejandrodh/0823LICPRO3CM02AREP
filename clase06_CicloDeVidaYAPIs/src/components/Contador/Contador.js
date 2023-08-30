import React, { Component } from "react";

class Contador extends Component{

    constructor(){
        super();
        this.state = {
            valor: 100,
            materia: "Prog 3",
            turno: "mañana"
        }
    }

    componentDidMount(){
        // console.log("En componentDidMount");
    }

    componentDidUpdate(){
        // console.log("En componentDidUpdate");
        if(this.state.valor === 103){
            alert("¿Querés seguir")
        }
    }

    aumentar(){
        this.setState({
            valor: this.state.valor +1
        })
    }

    disminuir(){
        this.setState({
            valor: this.state.valor -1
        })
    }

    render(){
        // console.log("Me monté");
        return(
            <section>
                <p>Valor inicial: {this.state.valor} </p>
                <button type="button" onClick={()=>this.aumentar()}>Aumentar</button>
                <button type="button" onClick={()=>this.disminuir()}>Disminuir</button>
            </section>
        )
    }

}


export default Contador;

