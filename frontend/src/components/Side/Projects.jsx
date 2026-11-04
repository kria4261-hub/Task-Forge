import { useState } from "react"
import Search from "./Search"

function Projects({pd, setSub})
{
    const [ed,setEd]=useState(null)
    const [temp, setTemp]= useState(null)

    const [tx, setTx]= useState('')

    const handleDel=(index)=>{
        const res= pd.filter((item)=> item.id !== index)
        setSub(res)
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
    
    const handleUpd=()=>{
        setSub((prev)=>
            prev.map((p)=>
            (p.id === ed ?  {...p, title:temp.ttl , task: temp.tasks.split('\n')} : p)
            )
        )
        setEd(null)
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