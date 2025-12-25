
import React from 'react'
import Home from './components/Home'
import Layout from './Layout'
import { BrowserRouter ,  Routes , Route } from 'react-router-dom'

function App() {
  return (
    <>
       <BrowserRouter>
       <Routes>
           <Route path='/' element={<Layout/>} >
            <Route index element={<Home/>} />

           </Route>
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App