//hooks
import { useState,useEffect } from 'react'

//components
import Formulario from './components/Formulario'
import Header from './components/Header'
import ListadoPacientes from './components/ListadoPacientes'


function App() {
  const [pacientes,setPacientes] = useState (()=> JSON.parse(localStorage.getItem('pacientes')) ?? []);
  const [paciente,setPaciente] = useState ({});
  //El orden en que se definen los useEfects, es en el que se ejecutan

  /**
   * Verifica si existen elementos en el array,
   * se ejecuta una sola vez, obteniendo lo que haya
   * en el local storage
   */
  /* useEffect(()=>{
    const obtenerLS = () => {
      //hay que convertir el string del localSt a un array
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []; //si no hay nada le agrega un array vacio
      setPacientes(pacientesLS); // añado lo recopilado al aray pacientes
    }
    obtenerLS();
  },[]); */

  /**
   * Este state alamcena los datos en Local Storage
   */
  //useefect recomendado con local storage
  useEffect(()=>{
    localStorage.setItem('pacientes',JSON.stringify(pacientes)); // convierte un array en string
  },[pacientes]);

  const eliminarPaciente = (id) =>{
    /**Retorna array con los elementos diferentes al id */
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  }

  return (
    <div className='container mx-auto mt-20'>
     <Header />
     <div className='mt-12 md:flex'>
       <Formulario
          pacientes = {pacientes}
          setPacientes = {setPacientes}
          paciente = {paciente}
          setPaciente = {setPaciente}
        />
       <ListadoPacientes
       pacientes = {pacientes}
       setPaciente = {setPaciente}
       eliminarPaciente = {eliminarPaciente}
       />
     </div>
    </div>
  )
}

export default App
