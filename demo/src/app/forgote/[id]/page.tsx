// "use client"
// import React, { useState } from 'react'
// import axios from '../../../../node_modules/axios/index'
// import { useParams, useRouter } from 'next/navigation';
// import toast from '../../../../node_modules/react-hot-toast/dist/index';

// const page = () => {
//     const param=useParams();
//     const id=param?.id;
//     const[password,setPassword]=useState<string>('');
//     const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
//         const {value,name}=e.target;
//         setPassword(e.target.value)
        
//     }
//     const submitPass=async()=>{
//         const response=await axios.post(`http://localhost:4000/auth/forgote/${id}`,password);
//         console.log("response",response);
//         toast.success('Password updated successfully!');
//     }
//   return (
//     <>
//     <div className='flex justify-center items-center h-screen'>
//     <div className='w-[40%]'>
//     <h1 className='text-center text-2xl font-semibold mb-5'>Forgote Your Password</h1>
//         <div className='w-full p-5 border shadow rounded'>
            
//             <div className='w-full'>
//                 <label htmlFor="" >Forgote Password</label>
//                 <input type="password" placeholder="Change Passowrd" value={password} className='border-2 h-11 rounded mt-2 p-2 w-full' onChange={handleChange}></input>
//                 <button className='px-3 py-2 bg-blue-700 mt-2 rounded' disabled={!password} onClick={submitPass}>Sumbit</button>
//             </div>
//         </div>
//     </div>
//     </div>
//     </>
//   )
// }

// export default page

"use client";
import React, { useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);

    // Password validation: at least 8 characters and one special character
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (value.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else if (!specialCharRegex.test(value)) {
      setError("Password must contain at least one special character.");
    } else {
      setError(""); // No error
    }
  };

  const submitPass = async () => {
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
      toast.success("Password updated successfully!");
      
      router.push('/dashboard')
      
      
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
            Forgot Your Password
          </h1>
          <div className="w-full bg-white p-6 rounded-lg shadow-lg">
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
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
