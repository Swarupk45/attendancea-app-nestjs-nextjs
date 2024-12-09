// "use client";
// import React, { useEffect, useRef, useState } from 'react';

// import axios from 'axios';
// import { useParams, useRouter } from '../../../../../../node_modules/next/navigation';



// interface User {
//   id: number;
//   name: string;
//   email: string;
//   password:string;
//   age: number | '';
//   role: string;
// }

// const EditUser: React.FC = () => {

//   const params = useParams();
//   const router=useRouter();
//   const id = params?.id;  
//   const [formData, setFormData] = useState<User>({
//     id: Number(id),
//     name: '',
//     email: '',
//     password:'',
//     age: '',
//     role: ''
//   });
//   const[Er,setEr]=useState<string | null>(null);


//   useEffect(() => {
//     if (id) {
//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:4000/users/${id}`);
//           console.log("CHANGED DARA",response)
//           setFormData(response.data);
//         } catch (err) {
//           console.log("Error fetching user data:", err);
//         }
//       };
//       fetchUserData();
//     }
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === 'age' ? Number(value) : value
//     }));
//   };

//   const validatePassword = (password: string) => {
//     const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
//     return passwordRegex.test(password);
// };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if(validatePassword(formData.password)){
//         await axios.put(`http://localhost:4000/users/${id}`, formData);
//         router.push("/dashboard/usertable");
//       }
//       else{
//         setEr("Password is not Valid.")
//       }
//     } catch (err) {
//       console.log("Error updating user:", err);
//     }
//   };


//   return (
//     <>
//     <div className="flex justify-center mt-5">
//       <div className="w-[40%] border rounded p-5 shadow-lg bg-white">
//         <h2 className="text-2xl font-semibold text-center mb-6">Edit User</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
//             <label className="block text-gray-700">Age</label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Role</label>
//             <select
//               name='role'
//               value={formData.role}
//               onChange={handleChange}
//               className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
//               required
//             >
//               <option value=''>Select Role</option>
//               <option value='Admin'>Admin</option>
//               <option value='Manager'>Manager</option>
//               <option value='HR_Admin'>HR_Admin</option>
//               <option value='User'>User</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>

//     </>
//   );
// };

// export default EditUser;


//seocnd 


// "use client";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useRouter } from 'next/navigation';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   age: number | '';
//   role: string;
// }

// const EditUser: React.FC = () => {
//   const params = useParams();
//   const router = useRouter();
//   const id = params?.id;

//   const [formData, setFormData] = useState<User>({
//     id: Number(id),
//     name: '',
//     email: '',
//     password: '',
//     age: '',
//     role: ''
//   });

//   const [roles, setRoles] = useState<string[]>([]); // State for roles from backend
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch user data
//     const fetchUserData = async () => {
//       if (id) {
//         try {
//           const response = await axios.get(`http://localhost:4000/users/${id}`);
//           setFormData({
//             id: response.data.id,
//             name: response.data.name,
//             email: response.data.email,
//             password: '', // Keep password empty for security
//             age: response.data.age,
//             role: response.data.role
//           });
//         } catch (err) {
//           console.log("Error fetching user data:", err);
//         }
//       }
//     };

//     // Fetch roles data
//     const fetchRoles = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/users/roles"); // Adjust the URL as needed
//         setRoles(response.data); // Assuming response.data is an array of roles
//       } catch (err) {
//         console.log("Error fetching roles:", err);
//       }
//     };

//     fetchUserData();
//     fetchRoles();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === 'age' ? Number(value) : value
//     }));
//   };

//   const validatePassword = (password: string) => {
//     const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (validatePassword(formData.password)) {
//         await axios.put(`http://localhost:4000/users/${id}`, formData);
//         router.push("/dashboard/usertable");
//       } else {
//         setError("Password must contain at least 8 characters with a special character.");
//       }
//     } catch (err) {
//       console.log("Error updating user:", err);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center mt-5">
//         <div className="w-[40%] border rounded p-5 shadow-lg bg-white">
//           <h2 className="text-2xl font-semibold text-center mb-6">Edit User</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-700">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//               {error && <p className="text-red-500">{error}</p>}
//             </div>
//             <div>
//               <label className="block text-gray-700">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 required
//               >
//                 <option value="">Select Role</option>
//                 {roles.map((role) => (
//                   <option key={role} value={role}>{role.toUpperCase()}</option>
//                 ))}
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               Save Changes
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditUser;


"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';


interface Role {
  id: number;
  roleName: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number | '';
  role: Role | string;
  managerid: number | '';
}

const EditUser: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [formData, setFormData] = useState<User>({
    id: Number(id),
    name: '',
    email: '',
    password: '',
    age: '',
    role: '',
    managerid: ''
  });

  interface managerData {
    name: string;
    email: string;
    password: string;
    age: number | '';
    id: number;
    //spring roles_id:''
  }

  const [roles, setRoles] = useState<Role[]>([]); // State for roles from backend
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");
  const [managers, setManagers] = useState<managerData[]>([]);
  const userRole=localStorage.getItem("userRole");
  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:4000/users/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log("res", response);
          setFormData({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            password: '', // Keep password empty for security
            age: response.data.age,
            managerid: response.data.managerid,
            role: response.data.role // Assuming role is an object with { id, roleName }
          });
        } catch (err) {
          console.log("Error fetching user data:", err);
        }
      }
    };

    // Fetch roles data
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:4000/roles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        console.log("roles", response);
        setRoles(response.data);
      } catch (err: any) {
        console.log("Failed to fetch roles", err.response?.data?.message);
      }
    };

    fetchUserData();
    fetchRoles();
    const fetchManagers = async () => {
      const responsMangers = await axios.get("http://localhost:4000/users/managers", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      setManagers(responsMangers.data);
      console.log("Manager from add edit form", responsMangers);
    }
    fetchManagers();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'age' || 'managerid' ? Number(value) : value
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleId = e.target.value;
    const selectedRole = roles.find(role => role.id === Number(selectedRoleId));
    console.log("seletected", selectedRole)
    setFormData((prevData) => ({
      ...prevData,
      role: selectedRole || ''
    }));
  };
  const handleManagerChange=()=>{
    
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!validatePassword(formData.password)) {
        await axios.put(`http://localhost:4000/users/${id}`, formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        router.push("/dashboard/usertable");
      } else {
        setError("Password must contain at least 8 characters with a special character.");
      }
    } catch (err) {
      console.log("Error updating user:", err);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-[40%] border rounded p-5 shadow-lg bg-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold text-lg">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold text-lg">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold text-lg">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold text-lg">Role</label>
            <select className='py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 border rounded'
              name="role"
              value={formData.role?.id || ''} // Set the selected role based on role ID
              onChange={handleRoleChange}
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
          {formData.role?.id!==3 && <div>
            <label className="block text-gray-700 mb-2 font-semibold text-lg">Manager</label>
            <select className='py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 border rounded'
              name="managerid"
              value={formData.managerid || ''} // Set the selected role based on role ID
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
          </div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
