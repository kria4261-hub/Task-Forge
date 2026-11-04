import { useState } from "react";
import Search from "./Search";

function Tasks({ta, setBtn})
{
    const [ed, setEd]= useState(null)
    const [txt, setTxt]= useState('')
    const [ser, setSer]= useState('')

    const handleEdit= (index)=>{
        setEd(index.id)
        setTxt(index.title)
    }

    const handleUpd=async()=>{
        const itm=ta.find((t)=> t.id === ed)
        try {
            const res = await fetch(`http://localhost:8000/task/${itm.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: txt, desc: itm.desc, stats: itm.stat === 'compl', dedline: itm.dedl  }),
            });
            if (!res.ok) throw new Error("Failed to save");
    

            setBtn((prev)=>
                prev.map((p)=>
                    (p.id=== ed ? {...p, title:txt}: p)
                )
            )
            setEd(null)
            setTxt('')
            
        }
         catch (err) {
            console.error(err);
        }    

    }

    const handleDel=async (id)=>{
        try{
            const resp= await fetch(`http://localhost:8000/task/${id}`,{
                method:'DELETE'
            })
            if (!resp.ok) throw new Error("Failed to delete");

            setBtn((res) =>res.filter((item)=>item.id !== id))
            
        }
        catch(err){
            console.error(err)
        }
    }

    const res= ta.filter(i=>(i.title ?? "").toLowerCase().includes(ser.toLowerCase()))

    return(
        <>
            <h1>Tasks</h1>

            <Search data={setSer}/>
            

            {ed !== null && (
                <div>
                    <p>Edit Task</p>
                    <input value={txt} onChange={(e)=>setTxt(e.target.value)}/>
                    <button onClick={handleUpd}>Update</button>
                </div>
            )}

            {res.map((data)=>
                <p key={data.id}>{data.title} <button onClick={()=>handleEdit(data)}>Edit</button>
                <button onClick={()=>handleDel(data.id)}>Done</button></p>
                
            )}
        </>
    );
}
export default Tasks;