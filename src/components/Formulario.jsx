import { useState, useEffect } from "react"
import Error from "./Error";

function Formulario({pacientes, setPacientes, paciente, setPaciente}) {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if( Object.keys(paciente).length > 0 ){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      console.log("hay algo")
    }else{console.log("esta vacío")}

  }, [paciente])

  /// genera un ID unico uniendo el date.now del momento en que se graba con un aleatorio de Math
  const generarId =() =>{ 
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36)

    return fecha + random
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    /// Validación del formulario
    if([nombre, propietario, email, fecha, sintomas].includes("")){
      console.log("hay al menos un campo vacío")
      setError(true)
      return;
    }
    setError(false)

    /// Objeto de Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizados)
      setPaciente({})
    }else{
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente]);
    }

    /// Reiniciar el formulario
    setNombre("")
    setPropietario("")
    setEmail("")
    setFecha("")
    setSintomas("")
  }

  return (
    <div className="md:w-1/2 lg:w2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Paciente y {" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
          {/* {error ? "si hay error" : "no hay error"} */} 
          {/* {error && "si hay error"} con esta expresión me evito tener que poner el valor del "ELSE" (:) */}
          {/* {error &&
              <div className="bg-red-700 text-white text-center p-3 uppercase font-bold mb3 rounded-md ">
                <p>Todos los campos son obligatorios</p>
              </div>
          } */}

          {/* {error &&   /// Props Tradicional
            <Error
              mensaje="Todos los campos son obligatorios"
            />
          } */}

          {error &&
            <Error>
              <p>Todos los campos son obligatorios</p>
            </Error>
          }

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e)=> setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre propietario</label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e)=> setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">email</label>
          <input
            id="email"
            type="email"
            placeholder="E-mail Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">alta</label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e)=> setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Síntomas</label>
          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los Sintomas"
            value={sintomas}
            onChange={(e)=> setSintomas(e.target.value)}
            >            
            </textarea>
        </div>

        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
          value={ paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>

    </div>
  )
}

export default Formulario