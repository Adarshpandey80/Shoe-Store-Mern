
import React from 'react'
import Home from './components/Home'
import Layout from './Layout'
import { BrowserRouter ,  Routes , Route } from 'react-router-dom'
import ProductList from './pages/ProductList'
import MyCart from "./pages/MyCart.jsx"
import ShowProduct from './pages/ShowProduct.jsx'
import Carousel from './pages/Carousel.jsx'

function App() {
  return (
    <>
       <BrowserRouter>
       <Routes>
           <Route path='productlist' element={<ProductList/>}/>     
                 <Route path='/' element={<Layout/>} >
                 <Route index element={<Home/>} />
                 <Route path='/cart' element={<MyCart/>} />
                 <Route path='/product/:id' element={ <ShowProduct/> } />
                 <Route path='/carousel' element={ <Carousel/> } />
           </Route>
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App