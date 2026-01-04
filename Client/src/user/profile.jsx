import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setId(decoded.id);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/user/getuserdata/${id}`)
        .then((res) => setUserData(res.data))
        .catch(() => console.log("Error"));
    }
  }, [id]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  // If field belongs to address
  if (["phone", "gender", "pincode"].includes(name)) {
    setUserData((prev) => ({
      ...prev,
      address: [
        {
          ...prev.address?.[0],
          [name]: value,
        },
      ],
    }));
  } 

  else {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


const changedata = async () => {
  try {
    const api = `http://localhost:8000/user/setuserdata/${id}`;
    // Use POST since route is defined as POST
    const response = await axios.post(api, userData);
    setUserData(response.data);   
    navigate("/account/profile")
    alert("Profile updated successfully");

  } catch (error) {
    if (error.response && error.response.data) {
      alert(error.response.data.message || error.response.data || "Error updating profile");
    } else {
      alert("Server error");
    }
  }
};

  


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
  <div className="max-w-4xl mx-auto">

    {/* ===== PROFILE CARD ===== */}
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-5 p-6 border-b bg-gray-50">
        <div
          className="w-16 h-16 rounded-full bg-indigo-600 text-white 
          flex items-center justify-center text-2xl font-bold"
        >
          {userData.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Personal Information
          </h1>
          <p className="text-sm text-gray-500">
            Manage your personal details securely
          </p>
        </div>
      </div>

      {/* ===== FORM ===== */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* FULL NAME */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            name="username"
            value={userData.username || ""}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border px-4 py-2 
            focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            value={userData.email || ""}
            disabled
            className="mt-2 w-full rounded-lg border px-4 py-2 
            bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* MOBILE */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Mobile Number
          </label>
          <input
            type="text"
            name="phone"
            value={userData.address?.[0]?.phone || ""}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className="mt-2 w-full rounded-lg border px-4 py-2 
            focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

       

        {/* GENDER */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Gender
          </label>
          <select
           name="gender"
            value={userData.address?.[0]?.gender || ""}
             onChange={handleChange}
            className="mt-2 w-full rounded-lg border px-4 py-2 
            focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

      </div>

      {/* ===== FOOTER ===== */}
      <div className="flex justify-end p-5 border-t bg-gray-50 gap-5">
         <button
          className="bg-indigo-600 text-white px-8 py-2 rounded-lg 
          font-semibold hover:bg-indigo-700 transition"
          onClick={()=>{navigate("/account/dashboard")}}
        >
          Dashboard
        </button>
        <button
          className="bg-indigo-600 text-white px-8 py-2 rounded-lg 
          font-semibold hover:bg-indigo-700 transition"
          onClick={changedata}
        >
          Save Changes
        </button>
       
      </div>

    </div>
  </div>
</div>
  );
}

export default Profile;
