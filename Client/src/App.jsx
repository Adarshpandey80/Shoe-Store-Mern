
import React from 'react'
import Home from './components/Home'
import Layout from './Layout'
import UserLayout from './UserLayout.jsx'
import { BrowserRouter ,  Routes , Route } from 'react-router-dom'
import ProductList from './AdminSeller/ProductList.jsx'
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
import Dashboard from './user/Dashboard.jsx'
import ProtectRoute from './components/ProtectRoute.jsx'
import Order from './user/Order.jsx'
import Profile from './user/profile.jsx'
import Address from './user/Address.jsx'
import Payment from './user/Payment.jsx'
import HelpCenter from './user/HelpCenter.jsx'
import WatchlistCart from './user/WatchlistCart.jsx'
import AdminSellerLayout from './AdminSellerLayout.jsx'
import AdminDashboard from './AdminSeller/AdminDashboard.jsx'
import Products from './AdminSeller/Products.jsx'



function App() {
  return (
    <>
       <BrowserRouter>
      <Routes>
   
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      

     
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<MyCart />} />
          <Route path="carousel" element={<Carousel />} />
          <Route path="checkout" element={<ProtectRoute><CheckOut /></ProtectRoute>} />
          <Route path="mens" element={<Mens />} />
          <Route path="women" element={<Women />} />
          <Route path="newarrival" element={<Newarrival />} />
          <Route path="sale" element={<Sale />} />
          <Route path="product/:id" element={<ShowProduct />} />
          <Route path="product/category/:category" element={<SeeCategoryProd />} />
          <Route path="ai-search" element={<OpenAI />} />
        </Route>

       
        <Route path="/account" element={<ProtectRoute><UserLayout /></ProtectRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="/account/dashboard" element={<Dashboard />} />
          <Route path='/account/order' element={<Order/>} />
          <Route path='/account/cart' element={<MyCart/>} />
          <Route path='/account/watchlist' element={<WatchlistCart/>} />
          <Route path='/account/helpcenter' element={<HelpCenter/>} />
          <Route path='/account/profile' element={<Profile/>} />
          <Route path='/account/address' element={<Address/>} />
          <Route path='/account/payment' element={<Payment/>} />
        </Route>

        <Route path='/adminSeller' element={<AdminSellerLayout/>}>
        <Route index element={<AdminDashboard/>}/>
          <Route path='/adminSeller/productlist' element={<ProductList/>} />
          <Route path='/adminSeller/allproducts' element={<Products/>} />

        </Route>
      </Routes>

   


    </BrowserRouter>
    </>
  )
}

export default App