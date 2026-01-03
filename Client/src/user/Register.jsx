import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Register() {

    const [formData, setFormData] = useState({});

    const handlChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
const handlSubmit = async (e) => {
  e.preventDefault();

  try {
    const api = "http://localhost:8000/user/register";
    const response = await axios.post(api, formData);

    alert("Registration successful!");
    console.log(response.data);

  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong. Please try again.");
    }
  }
};
 





  return (
    <>
     <form
                onSubmit={handlSubmit}
                className="w-full max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-md flex flex-col gap-4" >
                <h1 className="text-2xl font-bold text-center text-black mb-4">
                    Welcome to  ShoeVerse
                </h1>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your name"
                       
                        onChange={handlChange}
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        
                        onChange={handlChange}
                        required
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                    
                        onChange={handlChange}
                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        title="Must 8 char [A-Z a-z 0-9 @$!%*?&]"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <button
                    type="submit"
                      className=" bg-white text-black border-b-4 py-2 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200" >
                    Signup
                   

                </button>

                <p className="text-sm text-center text-gray-600">
                    You have an account?
                    <Link to="/login" className="text-purple-600 font-medium ml-1 hover:underline">
                        Login
                    </Link>
                </p>
            </form>

    </>
  )
}

export default Register