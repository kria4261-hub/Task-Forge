import { useState } from "react";

function Search({ data})
{
    const [ip, setIp]= useState('')
    const handleSearch=()=>{
        data(ip)
    }
    return(
        <>
            <input placeholder="Type here" onChange={(e)=>setIp(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
        </>
    )
};
export default Search;