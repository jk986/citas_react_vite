import {useState,useEffect} from "react" //importar los react hooks

import Error from "./Error";

const Formulario = ({ pacientes,setPacientes,paciente,setPaciente }) => {
  //Hooks
  const [nombre,setNombre] = useState('');
  const [propietario,setPropietario] = useState('');
  const [email,setEmail] = useState('');
  const [fecha,setFecha] = useState('');
  const [sintomas,setSintomas] = useState('');

  const [error,setError] = useState(false);

  
  //functions

  /**
   * Este hook se ejecuta unicamente cuando
   * [paciente] haya cambiado. Por lo tanto 
   * el redender se ejecuta hasta dar click
   * en el boton editar
   */
  useEffect(()=> {
    if(Object.keys(paciente).length>0){//comporbar si un objeto tiene algo por la suma de los keys
      //console.log('Si hay algo');
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  },[paciente]);


  const handleSubmit = (e) => {
    e.preventDefault(); //prevenir la accion por default al hacer submit
    const generarId = () =>{
      const random = Math.random().toString(36).substring(2);
      const fecha = Date.now().toString(36);
      return random+fecha;
    }
    //validacion del Formulario
     // .includes revisa que el array tenga un string vacío
     if([nombre,propietario,email,fecha,sintomas].includes('')){
      console.log('Hay al menos un campo vacío...');
      setError(true);
      return;
     }
     setError(false); //para que desaparezca la alerta al soluciar error de validacion

     // Objeto de paciente
     const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
     }

     /**
      * verifica si existe el objeto o no por medio de
      * la exitencia de un id
      */
     if(paciente.id){
      //console.log('Editando...');
      objetoPaciente.id = paciente.id;
      console.log(objetoPaciente);//actualizado 
      console.log(paciente);//no actualizado

      /**
       * Identifica el objeto al que estamos editando y 
       * se muestra en el state
       */
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id===paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizados);
      setPaciente({}); // limpiar el state en memoria

     }else{
      //console.log('Nuevo...')
      /**
       * Me genera un array nuevo con los datos del array
       * padre y le añade el nuevo objeto
       */
      objetoPaciente.id = generarId();
      setPacientes([...pacientes,objetoPaciente]);
     }

     //reiniciar formulario 
     setNombre('');
     setPropietario('');
     setEmail('');
     setFecha('');
     setSintomas('');

    };
  //return 
  return (

    <div className="md:w-1/2 lg:w-2/5">
      
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      
      <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {'' }
        <span className="text-indigo-600 font-bold">Administralos</span> </p>
      
      <form
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5" >
          {/* {error && <div><p>Si hay error</p></div>} */}
          { error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="mascota"
            >Nombre Mascota</label>
          <input 
            type="text"
            placeholder="Nombre de la Mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="mascota"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) } // modifica el hook desde el input
            />
        </div>
        
        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="propietario"
            >Nombre Propietario</label>
          <input 
            type="text"
            placeholder="Nombre del Propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="propietario"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value) }
            />
        </div>
        
        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="email"
            >Email</label>
          <input 
            type="email"
            placeholder="emailuser@email.com" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
            />
        </div>
        
        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="alta"
            >Alta</label>
          <input 
            type="date"
            className="border-2 w-full p-2 mt-2 rounded-md"
            id="alta"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value) }
            />
        </div>
        
        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="sintomas"
            >Sintomas</label>
          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
            placeholder="Describe los sitomas"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value) }
            />
        </div>
        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
          />
      </form>
    
    </div>
    )
}

export default Formulario