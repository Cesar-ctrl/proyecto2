import React from "react";
import {firebase} from "./firebase"


function App() {

    const [tareas, setTareas] = React.useState([])
    const [tarea, setTarea] = React.useState([])
    const [modoEdicion, setmodoEdicion] = React.useState(false)
    const [Id, setId] = React.useState("")
  
    React.useEffect(() =>{
        const obtenerDatos = async () => {
            try{
                const db = firebase.firestore()
                const data = await db.collection("tareas").get()
                const arrayData = data.docs.map(doc => ({id:doc.id,...doc.data()}))
                console.log(arrayData)
                setTareas(arrayData)
            }catch (error){
              console.log(error)
            }
        }
      obtenerDatos()
    },[])
  
    const agregarTarea = async(e) =>{
        e.preventDefault()
        try{
            const db = firebase.firestore()
            const nuevaTarea = {
                name:tarea,
                fecha:Date.now()
            }
            const data = await db.collection("tareas").add(nuevaTarea)
            setTareas([
                ...tareas,
                {...nuevaTarea,id:data.id}
            ])
            setTarea("")
        }catch(error){
            console.log(error)
        }
    }
    const eliminarTarea = async(id) =>{
       
        try{
            const db = firebase.firestore()
            db.collection("tareas").doc(id).delete()
            const arrayFiltrado= tareas.filter(item=>item.id!==id)
            setTareas(arrayFiltrado)
        }catch (error){

        }
    }
    const activarModoEdicion = (item) => {
        setmodoEdicion(true)
        setTarea(item.name)
        setId(item.id)
    }

    const editarTarea = async(e) =>{
        e.preventDefault()
        try{
            const db = firebase.firestore()
            await db.collection("tareas").doc(Id).update({
                name:tarea,
            })
            const arrayEditado= tareas.map (item => (
                item.id === Id?{id:item.id, fecha:item.fecha, name:tarea}: item
                ))
            console.log(arrayEditado)
            setTareas(arrayEditado)
            setmodoEdicion(false)
            setTarea("")
            setId("")
        }catch (error){

        }
    }

    


    return (
        <div className="container mt-5">
            <h1 className="text-center">CRUD</h1>
            <hr/>
            <div className="row mt-2">
                <div className="col-8">
                    <h4 className="text-center">Lista tareas</h4>
                    <ul className="list-group">
                    {
                      tareas.map (item=>
                        <li className="list-group-item" key={item.id}>
                            <span className="lead">{item.name}</span>
                            <span className="lead">Fecha: {item.fecha}</span>
                            <button 
                              className="btn btn-danger btn-sm float-end"
                              onClick={e=>eliminarTarea(item.id)}
                              >
                              Eliminar
                            </button>
                            <button
                                className="btn btn-warning btn-sm float-end mx-2"
                                onClick={e=>activarModoEdicion(item)}
                            >
                                Editar
                            </button>
                        </li>              
                      )
                    }
                    </ul>
                </div>
                <div className="col-4">
                <h4 className="text-center">
                  {
                    modoEdicion? "Editar tareas": "Agregar tareas"
                  }
                    </h4>
                    <form onSubmit={modoEdicion? editarTarea:agregarTarea}>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Introduce la tarea"
                            onChange={e=> setTarea(e.target.value)}
                            value={tarea}
                            />

                        {modoEdicion? (
                            <button className="btn btn-warning w-100 mt-2">Guardar Cambios</button> 
                            ):
                            (<button className="btn btn-dark w-100 mt-2">Agregar</button> 
                            )
                        } 
                </form>
                </div>
            </div>
        </div>
      );
}

export default App;