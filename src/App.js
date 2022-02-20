import  { React,  useState } from "react";
import  { nanoid } from "nanoid"

function App() {

    const [tarea , setTarea] = useState("")
    const [tareas , setTareas] = useState([])
    const [modoEdicion , setModoEdicion] = useState(false)
    const [id , setId] = useState("")
    const [error , setError] = useState(null)

    const agregarTarea = (e) =>{
        e.preventDefault();
        if(!tarea.trim){
            setError("Tarea vacia!!")
            return
        }
        setTareas([
            ...tareas,
            {id:nanoid(),nombreTarea:tarea}
        ])
        setTarea("")
        console.log("Agregar tarea")
    }

    const borrarTarea = (id) =>{
        
        setTareas(tareas.filter(item=>item.id !== id))
        console.log("Borrar tarea")
    }

    const editar = (item) =>{
        setModoEdicion(true)
        setTarea(item.nombreTarea)
        setId(item.id)
    }
    
    const editarTarea = (e) => {
        e.preventDefault();
        if(!tarea.trim){
            setError("Tarea vacia!!")
            return
        }

        const arrayEditado = tareas.map(
            item=> item.id === id? {id, nombreTarea:tarea}:item
        )
        setTareas(arrayEditado)
        setModoEdicion(false)
        setId("")
        setTarea("")
    }

    return (
        <div className="container mt-5">

            <h1 className="text-center">  CRUD Tareas</h1>
            <hr/>
            <div className="row">
                <div className="col-8">
                    <h4>Lista tareas</h4>
                    <ul className="list-group">
                        
                        {tareas.map(item =>(
                            <li key={item.id} className="list-group-item" >
                            <span className="lead">{item.nombreTarea}</span>
                            <button className="btn btn-sm btn-danger float-end mx-2" onClick={()=> borrarTarea(item.id)}> Eliminar</button>
                            <button className="btn btn-sm btn-warning float-end mx-2" onClick={()=> editar(item)}> Editar</button>
                            </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    
                    <h4 className="text-center"> 
                        {modoEdicion?"Editar Tarea": "Agregar Tarea"}
                    </h4>

                    <form onSubmit={modoEdicion? editarTarea:agregarTarea}>
                        <input type="text" className="form-control mb-2" placeholder="Ingrese Tarea" onChange={e => setTarea(e.target.value)} value={tarea}></input>
                        <button className="btn btn-dark btn-block" type="submit">
                            {modoEdicion?"Editar": "Agregar"}
                            </button>
                            
                    </form>
                </div>
            </div>

        </div>
    );
}
//error? <span className="text-danger">{error}</span>:null

export default App;
