// "use client"
// import React, { useState } from 'react'
// import axios from '../../../../../node_modules/axios/index';
// import { useRouter } from '../../../../../node_modules/next/navigation';

// interface FormData{
//   name:string,
//   email:string,
//   password:'',
//   age:number | '',
//   role:string
// }
// const page = () => {

//     const [formData, setFormData] = useState<FormData>({
//       name: '',
//       email: '',
//       age: '',
//       password:'',
//       role: ''
//     });
//     const[Er,setEr]=useState<string | null>(null)
//     const router =useRouter();

//     const validatePassword = (password: string) => {
//       const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
//       return passwordRegex.test(password);
//   };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: name === 'age' ? Number(value) : value
//       }));
//     };

//     const handleSubmit = async(e: React.FormEvent) => {
//       e.preventDefault();

//       console.log('Form Data:', formData);
//       try{
//         if(validatePassword(formData.password)){
//           const response=await axios.post("http://localhost:4000/users",formData);

//           console.log("response",response)
//           setFormData({
//             name:"",
//             email:"",
//             age:"",
//             password:'',
//             role:""
//         })
//         router.push("/dashboard/usertable");
//         }
//         else{
//           setEr("Password is not Valid");
//         }
//       }  
//       catch(err){
//         console.log("error get",err)
//       }
//     };
//     const isFormComplete =
//     formData.name !== '' &&
//     formData.email !== '' &&
//     formData.password!=='' &&
//     formData.age !== '' &&
//     formData.role !== '';
//   return (
//     <>
//     <div className='flex justify-center'>
//       <div className='w-[40%] border rounded p-5 h-auto mt-5 shadow-lg bg-white'>
//         <h2 className='text-2xl font-semibold text-center mb-6'>User Information</h2>
//         <form onSubmit={handleSubmit} className='space-y-4'>
//           <div>
//             <label className='block text-gray-700'>Name</label>
//             <input
//               type='text'
//               name='name'
//               value={formData.name}
//               onChange={handleChange}
//               className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
//               required
//             />
//           </div>
//           <div>
//             <label className='block text-gray-700'>Email</label>
//             <input
//               type='email'
//               name='email'
//               value={formData.email}
//               onChange={handleChange}
//               className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
//               required
//             />
//           </div>
//           <div>
//             <label className='block text-gray-700'>Password</label>
//             <input
//               type='text'
//               name='password'
//               value={formData.password}
//               onChange={handleChange}
//               className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
//               required
//             />
//           </div>
//           <div>
//             <label className='block text-gray-700'>Age</label>
//             <input
//               type='number'
//               name='age'
//               value={formData.age}
//               onChange={handleChange}
//               className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
//               required
//             />
//           </div>
//           <div>
//             <label className='block text-gray-700'>Role</label>

//             <select
//               name='role'
//               value={formData.role}
//               onChange={handleChange}
//               className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
//               required
//             >
//               <option value=''>Select Role</option>
//               <option value='admin'>ADMIN</option>
//               <option value='manager'>MANAGER</option>
//               <option value='hr admin'>HR_ADMIN</option>
//               <option value='user'>USER</option>
//             </select>
//           </div>
//           <button
//             type='submit'
//             disabled={!isFormComplete}
//             className={!isFormComplete?"bg-gray-500 w-full text-white py-2 rounded":`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400`}
//           >
//             Submit
//           </button>
//           {Er && <p className="text-red-500 mb-4">{Er}</p>}
//         </form>
//       </div>
//     </div>
//     </>
//   )
// }

// export default page


"use client";
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  password: string;
  age: number | '';
  roleId: string;
  managerid: number | '';
  //spring roles_id:''
}

interface Role {
  id: number;
  roleName: string;
}

interface managerData {
  name: string;
  email: string;
  password: string;
  age: number | '';
  id: number;
  //spring roles_id:''
}
const Page = () => {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    password: '',
    roleId: '',
    managerid: ''
    //spring roles_id:''
  });

  const [roles, setRoles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [managers, setManagers] = useState<managerData[]>([]);
  const router = useRouter();
  const token = localStorage.getItem("authToken");
  //http://localhost:4000/users/managers
  useEffect(() => {
    const fetchRoles = async () => {
      //Nestjs => http://localhost:4000/roles
      const response = await axios.get("http://localhost:4000/roles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("Getttt", response)
      setRoles(response.data);

    };
    const fetchManagers = async () => {
      const responsMangers = await axios.get("http://localhost:4000/users/managers", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      setManagers(responsMangers.data);
      console.log("Manager from add data", responsMangers);
    }

    fetchRoles();
    fetchManagers();

  }, []);

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'age' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (true) {
      try {
        console.log("token from data add", token)
        // Nestjs=  http://localhost:4000/users
        const response= await axios.post("http://localhost:4000/users", formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        toast.success("Successfully Added user!")
        setFormData({ name: "", email: "", age: "", password: "", roleId: "", managerid: "" });
        router.push("/dashboard/usertable");
        console.log("dataaaa submited from add",response)
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 409) {
            alert(error.response.data.message); // Display custom message
          } else {
            console.log('An error occurred:', error);
            alert('An error occurred while registering. Please try again later.');
          }
        } else {
          console.error('An unexpected error occurred:', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    } else {
      setError("Password is not valid");
    }
  };

  const isFormComplete =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.age &&
    formData.managerid &&
    //Nestjs=>  formData.roleId;
    formData.roleId

  return (
    <div className='flex justify-center'>
      <div className='w-[40%] border rounded p-5 h-auto mt-5 shadow-lg bg-white'>
        <h2 className='text-3xl font-semibold mb-6'>User Information</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Input fields for name, email, password, age */}
          <div>
            <div className='w-full'>
              <label className='block text-gray-700 text-xl font-semibold mb-2 text-left'>Name:</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700 text-left text-xl font-semibold mb-2 mt-3'>Email:</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 text-left text-xl font-semibold mb-2 mt-3'>Age:</label>
              <input
                type='number'
                name='age'
                value={formData.age}
                onChange={handleChange}
                className='w-full px-3 py-2 border-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                required
              />
            </div>
            <label className='block text-gray-700 text-left text-xl font-semibold mb-2 mt-3'>Role:</label>
            <select className='w-full border-2 rounded h-11' name="roleId" onChange={handleChange} required>
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
          {
            formData.roleId!=="3" &&<div>
            <label className='block text-gray-700 text-xl font-semibold mb-2 text-left'>Manager:</label>
            <select
              className='w-full border-2 rounded h-11'
              name='managerid'
              value={formData.managerid}
              onChange={handleChange}
              required
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.email}
                </option>
              ))}
            </select>
          </div>
          }
          <button
            type='submit'

            className={`w-full h-11 mt-3 ${!isFormComplete ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
              } text-white py-2 rounded`}
          >
            Submit
          </button>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Page;
