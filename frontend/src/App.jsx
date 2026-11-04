import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Dashboard from './components/Side/Dashboard'
import Tasks from './components/Side/Tasks'
import Projects from './components/Side/Projects'
import Setting from './components/Side/Setting'

function App() {
  const [btn, setBtn]=useState(()=>{
    return JSON.parse(
      localStorage.getItem('btn')
    )||[];
  })
  const [sub, setSub]=useState(()=>{
    return JSON.parse(
      localStorage.getItem('sub')
    )||[];
  })

  useEffect(()=>{
    localStorage.setItem('btn', JSON.stringify(btn))
  },[btn])

  useEffect(()=>{
    localStorage.setItem('sub', JSON.stringify(sub))
  },[sub])


  return (
    <>
      <BrowserRouter>
      <div className='all'>
        <nav className='side'>
          
            <Link to="/" id='l1'>Dashboard</Link>
            <Link to="/t" id='l2'>Tasks</Link>
            <Link to="/p" id='l3'>Projects</Link>
         
          <Link to="/s" className='set' id='l4'>Settings</Link>
        </nav>

        <Routes>
          <Route path='/' element={<Dashboard btn={btn}  setBtn={setBtn} sub={sub} setSub={setSub}/>} />
          <Route path='/t' element={<Tasks ta={btn} setBtn={setBtn}/>} />
          <Route path='/p' element={<Projects pd={sub} setSub={setSub}/>} />
          <Route path='/s' element={<Setting />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
