import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const [pacientes, setPacientes] = useState (JSON.parse(localStorage.getItem("pacientes")) ?? []);
  const [paciente, setPaciente] = useState ({});

  /// ESTO QUE ESTÁ COMENTADO NO FUNCIONA - APARENTEMENTE ES POR EL CAMBIO DE VERSIONES DE REACT
  // useEffect(()=>{ /// los useEffect se ejecutan en el orden en que se declaran
  //   const obtenerLS = () => {
  //     const pacientesLS = JSON.parse(localStorage.getItem("pacientes")) ?? [];
  //     setPacientes(pacientesLS)
  //   }
  //   obtenerLS()
  // }, []); //cuando la dependencia ( [] ) esta vacía se ejecuta solo una vez


  useEffect(()=> {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  },[pacientes])

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          paciente={paciente}
          setPacientes={setPacientes}
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente = {eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
