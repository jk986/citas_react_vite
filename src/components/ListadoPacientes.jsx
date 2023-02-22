import {useEffect} from "react";
import Paciente from "./Paciente"

function ListadoPacientes({pacientes,setPaciente,eliminarPaciente}) {
  //useEstate
  
  //useEffect
/*   useEffect(()=>{
    if(pacientes.length>0)
    console.log('Nuevo paciente');
  },[pacientes]); */

  //console.log(pacientes);
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus{' '}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {pacientes.map( paciente => {
            return(<Paciente
              key = {paciente.id} //debo usar un key unico cada que repita el mismo elemento en base a un array
              paciente = {paciente}
              setPaciente = {setPaciente}
              eliminarPaciente = {eliminarPaciente}
            />);
          })}
        </>
      ) : (
          <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes {' '}
              <span className="text-indigo-600 font-bold">Y aparecerán en este lugar</span>
            </p>
          </>
      )}
    </div>
  )
}

export default ListadoPacientes