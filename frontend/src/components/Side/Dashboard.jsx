import { useEffect, useState } from "react";
function Dashboard({ btn, setBtn, sub, setSub})
{
    const [tsk ,setTsk]= useState(false)
    const [prj, setPrj]= useState(false)
    const [ad, setAd]= useState([])

    const [task, setTask]= useState('')
    const [desc, setDesc]= useState('')
    const [stat, setStat]= useState('inprog')
    const [dedl, setDedl]= useState('')

    const [pstat, psetStat]= useState('inprog')
    const [pdedl, psetDedl]= useState('')

    const [ttl, setTtl]= useState('')


    const handleSub=()=>{
        setTsk(true)
    }

    const handlePrj=()=>{
        setPrj(true)
    }

    const handleAdd= ()=>{
        setAd([...ad, ''])
    }

    const handleTaskChange=(indx, value)=>{
        setAd((prev)=>prev.map((t,i)=>(i=== indx ? value: t )))
    }

    const handleBtn=async()=>{
        try {
            const res = await fetch("http://localhost:8000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: task, desc: desc, stats: stat === 'compl', dedline: dedl  }),
            });
            if (!res.ok) throw new Error("Failed to save");

            const saved= await res.json();
            setBtn((prev)=>[...prev, saved])
            setTask('')
            setDesc('')
            setStat('inprog')
            setDedl('')
        }
         catch (err) {
            console.error(err);
        }    
    };


    const handleS= async()=>{
        try{
            const resp= await fetch('http://localhost:8000/project',{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({title:ttl, task:ad , stats: pstat == 'compl', dedline:pdedl})
            })
            if (!resp.ok){
                console.error(resp.status, await resp.text());
                throw new Error('Failed to Save')}

            const data= await resp.json()
            setSub((prev)=>[...prev, data])
            setAd([])
            setTtl("")
            psetStat('inprog')
            psetDedl('')
        }
        catch(err){
            console.error(err)
            
        }
    }
    return(
        <>      
                <div className="body">
                    <h1>Dashboard</h1>
                    <div className="main" >
                        <p className="id1">Total tasks: {btn.length}</p>
                        <p className="id1">Tasks pending: {btn.filter(t=> !t.stats).length}</p>

                        <p className="id1">Total projects: {sub.length}</p>
                        <p className="id1">Projects Pending: {sub.filter(t=> !t.stats).length}</p>
                    </div>

                    <div className="btn">
                    <button className="b1" onClick={handleSub}>Create Tasks</button>
                    <button className="b1" onClick={handlePrj}>Create Projects</button>
                    </div>
                

                {tsk && (
                    <>
                        <div>

                            <p>Enter tasks</p>
                            <input value={task} onChange={(e)=>setTask(e.target.value)}/>
                            <p>Description</p>
                            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                            <select value={stat} onChange={(e)=>setStat(e.target.value)}>
                                <option value='inprog'>In Progress</option>
                                <option value='compl'>Completed</option>
                            </select>
                            <label>Select date</label>
                            <input type="date" value={dedl} onChange={(e=>setDedl(e.target.value))}/>
                            <button onClick={handleBtn} >Submit</button>
                        </div>
                    </>
                )}

            

                {prj && (
                    <>
                        <p>Project Title</p>
                        <input value={ttl} onChange={(e)=>setTtl(e.target.value)}/>
                        <button onClick={handleAdd}>Add tasks</button>
                        {ad.map((value, i)=> (
                            <div key={i}>
                                <p>Enter tasks</p>
                                <input value={value} onChange={(e)=>handleTaskChange(i, e.target.value)} />
                            </div>
                        ))}
                        <select value={pstat} onChange={(e)=> psetStat(e.target.value)}>
                            <option value='inprog'>In Progress</option>
                            <option value='compl'>Completed</option>
                        </select>
                        
                        <label>Select Date: </label>
                        <input type="date" value={pdedl} onChange={(e)=>psetDedl(e.target.value)} />

                        <button onClick={handleS}>Submit</button>
                    </>
                )}
                
                
                <p>Recents</p>
            </div>

        </>
    );
}
export default Dashboard;