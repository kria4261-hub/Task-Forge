import { useState } from "react"
import Search from "./Search"

function Projects({pd, setSub})
{
    const [ed,setEd]=useState(null)
    const [temp, setTemp]= useState(null)

    const [tx, setTx]= useState('')

    const handleDel=async (index)=>{
        try{
            const resp= await fetch(`http://localhost:8000/project/${index}`, {
                method: 'DELETE'
            })
            if (!resp.ok) throw new Error('Failed to delete')
            setSub((res)=>(res.filter((item)=> item.id !== index)))
        }
        catch(err){
            console.error(err)
        }
    }

    const handleEdit=(idx)=>{
        const item= pd.find((f)=>f.id === idx)
        setEd(idx)
        setTemp({
            ttl: item.title,
            tasks: (item.task ?? []).join('\n'),
        })
        
    }

    const handleChange=(e)=>{
        setTemp({...temp, [e.target.name]: e.target.value   })
    }
    
    const handleUpd=async ()=>{
        const title= temp.ttl
        const task= temp.tasks.split('\n')
        try{
            const resp= await fetch(`http://localhost:8000/project/${ed}`, {
                method: 'PATCH',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({title, task})
            })
            if (!resp.ok) throw new Error('Failed to Edit')
            setSub((prev)=>
            prev.map((p)=>
            (p.id === ed ?  {...p, title , task} : p)
                )
            )
            setEd(null)     
        }
        catch(err){
            console.error(err)
        }
    }

    const res= pd.filter(p=> p.title.toLowerCase().includes(tx.toLowerCase()))

    const handleDelTask= (pid, index)=>{
        const res= pd.map((p)=>{
            return p.id== pid ? {...p, task:p.task.filter((_,j)=> j!== index )}: p
        })
        setSub(res)
    }

    return(
        <>
            <h1>Projects</h1>

            <Search data={setTx}/>

            {ed !== null &&(
                <div>
                    <p>Edit</p>
                    <input name='ttl' value={temp.ttl} onChange={handleChange} />
                    <textarea name="tasks" value={temp.tasks} onChange={handleChange} />
                    
                    <button onClick={handleUpd}>Update</button>
                </div>
            )}

            {res.map((s)=>
                <div key={s.id}>
                    <strong>{s.title} </strong>
                    <button onClick={()=>handleDel(s.id)}>Completed</button>
                    <button onClick={()=>handleEdit(s.id)}>Edit</button>

                    <ul>
                    {(s.task??[]).map((t,j)=> <div key={j}><li>{t}
                        <button onClick={()=>handleDelTask(s.id,j)}>Done</button>
                    </li></div>)}
                    </ul>
                </div>
            )}
        </>
    );
}
export default Projects;