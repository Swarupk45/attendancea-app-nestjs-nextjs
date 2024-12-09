"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const param = useParams();
  const router=useRouter();
  const id = param?.id;
  const token=localStorage.getItem("authToken");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [error2, setError2] = useState<string>("");
  const [olDpass,setOldPass]=useState<string>("")
  const [pass,setPass]=useState<string>("")
  const handleChange1=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const{value}=e.target;
    setOldPass(value);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    if(pass===olDpass){
        setError2("Old password is not match")
    }
    // Password validation: at least 8 characters and one special character
    
  };


  const fetchUserData = async () => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        console.log("res", response);
        setPass(response?.data.password)
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    }
  };
  useEffect(()=>{
    fetchUserData
  },[id])

  const submitPass = async () => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else if (!specialCharRegex.test(password)) {
      setError("Password must contain at least one special character.");
    } else {
      setError(""); // No error
    }
    try {
      //Nestjs =>   `http://localhost:4000/auth/forgote/${id}`
      const response = await axios.post(
        `http://localhost:4000/auth/forgote/${id}`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }  // Send password as an object
      );
    //   
      console.log("response",response);
      toast.success("Password Reset successfully!");
      setOldPass("")
      setPassword("")
      
    } catch (error) {
      console.log("error",error)
      toast.error("Failed to update password. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-[40%] ">
          <h1 className="text-center text-2xl font-semibold mb-5 text-gray-800">
            Reset Your Password
          </h1>

          <div className="w-full bg-white p-6 rounded-lg shadow-lg">
            <div>
            <label htmlFor="password" className="text-gray-700 font-medium">
              Old Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={olDpass}
              id="password"
              className={`border-2 h-11 rounded mt-2 p-2 w-full focus:outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange1}
            />
            </div>
            <div>
            <label htmlFor="password" className="text-gray-700 font-medium">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              id="password"
              className={`border-2 h-11 rounded mt-2 p-2 w-full focus:outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
            />
            </div>
           
            <button
              className={`px-4 py-2 mt-4 rounded text-white font-medium w-full ${
                error || !password
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={!!error || !password}
              onClick={submitPass}
            >
              Submit
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {error2 && <p className="text-red-500 text-sm mt-2">{error2}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
