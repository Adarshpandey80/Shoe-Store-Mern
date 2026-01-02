import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Mens() {
    const [mensProducts, setMensProducts] = useState([]);

     const fetchMensProducts = async () => {
    try {
      const api = "http://localhost:8000/products/mensProducts";
      const response = await axios.get(api);
      setMensProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };


     console.log( "all mens products", mensProducts);

     useEffect(() => {
        fetchMensProducts();
     }, []);


  return (
    <div>Mens</div>
  )
}

export default Mens