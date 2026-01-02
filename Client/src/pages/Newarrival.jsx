import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Newarrival() {
   
    // const [newArrivalProducts, setNewArrivalProducts] = useState([]);

    //  const fetchNewArrivalProducts = async () => {
    //     const api = 'http://localhost:8000/products/newArrivals';
    //     try {
    //          const response =  await axios.get(api);
    //          setNewArrivalProducts(response.data);
            
    //     } catch (error) {
    //         console.error("Error fetching new arrival products:", error);
    //     }
    //  }
    //  console.log( "all new arrival products" ,newArrivalProducts);

    //  useEffect(() => {
    //     fetchNewArrivalProducts();
    //  }, []);        






  return (
    <div>Newarrival</div>
  )
}

export default Newarrival