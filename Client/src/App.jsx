
import React from 'react'
import Home from './components/Home'
import Layout from './Layout'
import { BrowserRouter ,  Routes , Route } from 'react-router-dom'
import ProductList from './pages/ProductList'
import MyCart from "./pages/MyCart.jsx"
import ShowProduct from './pages/ShowProduct.jsx'
import Carousel from './pages/Carousel.jsx'
import CheckOut from './pages/CheckOut.jsx'
import Mens from './pages/Mens.jsx'
import Women from './pages/Women.jsx'
import Newarrival from './pages/Newarrival.jsx'
import Sale from './pages/Sale.jsx'
import SeeCategoryProd from './pages/SeeCategoryProd.jsx'
import OpenAI from './pages/OpenAI.jsx'
import Login from './user/Login.jsx'
import Register from './user/Register.jsx'


function App() {
  return (
    <>
       <BrowserRouter>
       <Routes>
           <Route path='productlist' element={<ProductList/>}/>     
                 <Route path='/' element={<Layout/>} >
                 <Route index element={<Home/>} />
                 <Route path='/cart' element={<MyCart/>} />
                 <Route path='/carousel' element={ <Carousel/> } />
                 <Route path='/checkout' element={ <CheckOut/> } />
                 <Route path='/mens' element={<Mens/>} />
                 <Route path='/women' element={<Women/>} />
                  <Route path='/newarrival' element={<Newarrival/>} />
                  <Route path="sale" element={<Sale/>} />
                  <Route path='/product/:id' element={ <ShowProduct/> } />
                  <Route path='/product/category/:category' element={ <SeeCategoryProd/> } />
                  <Route path='/ai-search' element={ <OpenAI/> } />
                  <Route path='/login' element={ <Login/> } />
                  <Route path='/register' element={ <Register/> } />

           </Route>
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App