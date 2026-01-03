import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({});

   const handleInput=(e)=>{
      let name=e.target.name;
      let value=e.target.value;
      setInput(values=>({...values, [name]:value}));
   }

   const handleSubmit = async () => {
  try {
    const api = "http://localhost:8000/user/login";
    const response = await axios.post(api, input);

    localStorage.setItem("token", response.data.token);
    alert(response.data.msg);
    navigate("/");

  } catch (error) {
    if (error.response) {
      alert(error.response.data.msg);
    } else {
      alert("Server error, try again later");
    }
  }
};

  
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-md flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center text-black flex items-center justify-center gap-2 mb-4">
                    Welcome Back to ShoeVerse
                </h1>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        required
                        onChange={handleInput}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        onChange={handleInput}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <button
                    type="submit"
                    className=" bg-white text-black border-b-4 py-2 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200">
                    Login
                </button>

                <p className="text-sm text-center text-gray-600">
                    You have no account?
                    <Link
                        to="/register"
                        className="text-purple-600 font-medium ml-1 hover:underline" >
                        Signup
                    </Link>
                </p>
            </form>
        </>
    )
}

export default Login