import React, {Component} from 'react';

class Filtro extends Component {

    constructor(){
        super()
        this.state = {
            valorDelInput:''
        }
    }

    controlarEnvio(event){
        event.preventDefault();
        console.log("No me mandé");
        return true
    }

    guardarDatosDelInput(eventoEnCampoInput){
        this.setState({
            valorDelInput: eventoEnCampoInput.target.value
        }, () => console.log(this.state.valorDelInput)) //Usando el 2do parámetro de setState nos aseguramos que la función trabaje con el estado actualizado

        //console.log(this.state.valorDelInput); //Ejecutar una función acá puede que falle por tener info incompleta
    }

    render(){
        return(
            <form action="" onSubmit={(e)=>this.controlarEnvio(e)}>
                <label htmlFor="">Filtrar por: </label>
                <input type="text" name="filtro" onChange={(e)=>this.guardarDatosDelInput(e)} value={this.state.valorDelInput} />
                <button type='submit'>Filtrar</button>
            </form>
        )
    }

}

export default Filtro