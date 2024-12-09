// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { toast } from "react-hot-toast";
// import { IoEyeOff } from "react-icons/io5";
// import { MdEdit } from "react-icons/md";
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { GrNext } from "react-icons/gr";
// import { GrPrevious } from "react-icons/gr";

// interface Role {
//   roleName: string;
// }

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   age: number;
//   role: Role | string;
// }

// const UserTable: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [sortConfig, setSortConfig] =
//     useState<{ key: keyof User; direction: "asc" | "desc" } | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [errorFileUrl, setErrorFileUrl] = useState<string | null>(null);
//   const modalRef = useRef<HTMLDivElement>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [file, setFile] = useState<File | null>(null);
//   const[showdropdown,setShowdropdown]=useState(false);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalLimit,setTotalLimit]= useState(0);
//   const[limit,setLimit]=useState(1);
//   const [ID, setId] = useState<number>(0);
//   const [ID2, setId2] = useState<number>(0);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/users?page=${currentPage}&search=${searchTerm}&limit=${limit}`
//       );
//       console.log("ala")
//       setUsers(response.data.data);
//       setFilteredUsers(response.data.data);
//       setTotalPages(response.data.totalPages);
//       setTotalLimit(response.data.total);
//       console.log("ll",limit)
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       toast.error("Failed to fetch users");
//     }
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const term = event.target.value;
//     setSearchTerm(term);
//     setFilteredUsers(
//       users.filter(
//         (user) =>
//           user.id.toString().includes(term) ||
//           user.name.toLowerCase().includes(term.toLowerCase()) ||
//           user.email.toLowerCase().includes(term.toLowerCase()) ||
//           user.age.toString().includes(term) ||
//           (typeof user.role === "string" &&
//             user.role.toLowerCase().includes(term.toLowerCase()))
//       )
//     );
//   };

//   const handlePageChange = (page: number) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const deleteUser = async (Id: number) => {
//     setIsModalOpen(true);
//     setId(Id);
//   };

//   const showPasswordUpdate = (IDd: number) => {
//     setIsModalOpen2(true);
//     setId2(IDd);
//   };

//   //dropdwon

//   const shoDropdown=()=>{

//     showdropdown===false ?setShowdropdown(true):setShowdropdown(false);
//   }
//   const limitDropDown=(limit:number)=>{

//     setLimit(limit);
//     console.log("nn",limit);
//     setShowdropdown(false);

//   }

//   const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   //Upload Part

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file first!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('http://localhost:4000/users/upload', formData, {
//         responseType: 'blob',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },

//       });
//       console.log("header", response.headers['content-type'])
//       if (response.headers['content-type'] === 'text/csv; charset=utf-8') {
//         // Create a blob URL for the file
//         const blob = new Blob([response.data], { type: 'text/csv' });
//         const url = window.URL.createObjectURL(blob);
//         console.log("URL:", url)
//         setErrorFileUrl(url);
//       } else {
//         alert('File processed successfully!');
//         setErrorFileUrl(null);
//       }
//       console.log("ressss", response)
//       toast.success("File uploaded successfully!");

//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('File upload failed');
//     }
//   };


//   const submitPassword = async (pass: string) => {
//     try {
//       await axios.put(
//         `http://localhost:4000/users/password/${ID2}`,
//         { password: pass }
//       );
//       toast.success("Password updated successfully!");
//       setIsModalOpen2(false);
//     } catch (err) {
//       toast.error("Error updating password");
//       console.error(err);
//     }
//   };

//   const handleDelete = async (userId: number) => {
//     try {
//       await axios.delete(`http://localhost:4000/users/${userId}`);
//       setIsModalOpen(false);
//       toast.success("User deleted successfully!");
//       setUsers(users.filter((user) => user.id !== userId));
//       setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
//     } catch (err) {
//       toast.error("Error deleting user");
//       console.error("Error deleting user:", err);
//     }
//   };

//   const handleSort = (key: keyof User) => {
//     let direction: "asc" | "desc" = "asc";
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });

//     const sortedUsers = [...filteredUsers].sort((a, b) => {
//       if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
//       if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
//       return 0;
//     });

//     setFilteredUsers(sortedUsers);
//   };

//   useEffect(() => {
//     fetchUsers();
//     console.log("see", searchTerm)
//   }, [currentPage, searchTerm,limit]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         setIsModalOpen(false);
//       }
//     };

//     if (isModalOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen]);
//   useEffect(() => {
//     if (filteredUsers === undefined || filteredUsers.length === 0) {
//       console.log("No users found matching your search.");
//       toast.error("No users found matching your search.");
//     }
//   }, [users]);


//   return (
//     <>
//       <div className="flex justify-center mt-5">
//         <div className="w-[80%]">
//           <div className="w-full text-right">
//             <Link href="/login">
//               <button className="px-7 bg-cyan-500 shadow-md text-white rounded py-2">
//                 Logout
//               </button>
//             </Link>
//           </div>
//           <div className="flex justify-between mt-5">
//             <h2 className="text-3xl font-semibold text-center mb-4">User List</h2>
//             <Link href="/dashboard/userinfo">
//               <button className="px-10 bg-black shadow-md text-white rounded py-2 mb-3">
//                 Add
//               </button>
//             </Link>

//           </div>
//           <div className="flex justify-between mt-5">
//             <h2 className="text-3xl font-semibold text-center mb-4">Upload CSV File</h2>
//             {errorFileUrl && (
//               <a href={errorFileUrl} download="error-report.csv">
//                 Download Error Report
//               </a>
//             )}
//             <input type="file" accept=".csv" onChange={handleFileChange} >
//             </input>
//             <button onClick={handleUpload} className="px-10 bg-lime-600 shadow-md text-white rounded py-2 mb-3">Upload CSV</button>

//           </div>

//           <input
//             type="text"
//             placeholder="Search by ID, Name, Email, Age, or Role"
//             value={searchTerm}
//             onChange={handleSearch}
//             className="mb-4 p-2 border border-black rounded w-full h-12"
//           />

//           <table className="w-full border-collapse shadow-lg bg-white rounded">
//             <thead>
//               <tr className="bg-gray-200">
//                 {["id", "name", "email", "age", "role"].map((key) => (
//                   <th
//                     key={key}
//                     className="border p-3 cursor-pointer"
//                     onClick={() => handleSort(key as keyof User)}
//                   >
//                     <div className="flex justify-center">
//                       <span>{key.toUpperCase()}</span>
//                       <div className="flex flex-col ml-2">
//                         <div
//                           className={`text-xs ${sortConfig?.key === key &&
//                             sortConfig?.direction === "asc"
//                             ? "text-blue-500"
//                             : "text-gray-500"
//                             }`}
//                         >
//                           ▲
//                         </div>
//                         <div
//                           className={`text-xs ${sortConfig?.key === key &&
//                             sortConfig?.direction === "desc"
//                             ? "text-blue-500"
//                             : "text-gray-500"
//                             }`}
//                         >
//                           ▼
//                         </div>
//                       </div>
//                     </div>
//                   </th>
//                 ))}
//                 <th className="border p-3">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className="text-center">
//                   <td className="border p-3 text-xl">{user.id}</td>
//                   <td className="border p-3 text-xl">{user.name}</td>
//                   <td className="border p-3 text-xl">{user.email}</td>
//                   <td className="border p-3 text-xl">{user.age}</td>
//                   <td className="border p-3 text-xl">
//                     {user.role && typeof user.role === "object" && "roleName" in user.role
//                       ? user.role.roleName
//                       : user.role || "N/A"}
//                   </td>

//                   <td className="border p-3">
//                     <div className="flex justify-center gap-5">
//                       <IoEyeOff size={40} onClick={() => showPasswordUpdate(user.id)} />
//                       <Link href={`/dashboard/editinfo/${user.id}`}>
//                         <MdEdit size={40} />
//                       </Link>
//                       <RiDeleteBin5Fill
//                         size={40}
//                         onClick={() => deleteUser(user.id)}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="mt-4 flex justify-end group">
//             <div>
//             <ul className="border-2 border-gray-400 rounded-lg flex">
//               <button
//                 className={totalPages == currentPage ? `px-4 py-3 bg-blue-600 rounded-l-md ` : "px-4 py-3  bg-gray-100 rounded-l-md"}
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 <GrPrevious />
//               </button>
//               {Array.from({ length: totalPages }, (_, index) => {
//                 const pageNumber = index + 1;

//                 // Conditions for showing specific page numbers
//                 if (
//                   pageNumber === 1 || // Always show the first page
//                   pageNumber === totalPages || // Always show the last page
//                   (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) // Show 2 pages before and after the current page
//                 ) {
//                   return (
//                     <li key={pageNumber}>
//                       <button
//                         className={`px-5 py-3 ${currentPage === pageNumber
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-100"
//                           }`}
//                         onClick={() => handlePageChange(pageNumber)}
//                       >
//                         {pageNumber}
//                       </button>
//                     </li>
//                   );
//                 }

//                 // Show ellipsis for skipped pages
//                 if (
//                   (pageNumber === currentPage - 2 && pageNumber > 1) || // Ellipsis before the current range
//                   (pageNumber === currentPage + 2 && pageNumber < totalPages) // Ellipsis after the current range
//                 ) {
//                   return (
//                     <li key={pageNumber}>
//                       <span className="px-4 py-2">...</span>
//                     </li>
//                   );
//                 }

//                 return null; // Hide pages that are not in the displayed range
//               })}
//               <button
//                 className={totalPages !== currentPage ? `px-4 py-3 bg-blue-600 rounded-r-md` : "px-4 py-2 bg-gray-100 rounded-r-md"}
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 <GrNext />
//               </button>
//             </ul>
//             <button onClick={shoDropdown} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="hidden group-hover:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown hover <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
//           </svg>
//           </button>
//           <div id="dropdownHover" className={showdropdown?`"z-10bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"`:"hidden"}>
//             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">

//             {Array.from({length:totalLimit},(_,index)=>{
//               return<>
//               <li onClick={()=>limitDropDown(index+1)} key={index+1}>
//                 <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{index+1}</a>
//               </li>
//               </>
//             })}
//             </ul>
//           </div>
//             </div>

//           </div>



//         </div>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div
//             className="bg-white p-5 rounded shadow-lg"
//             ref={modalRef}
//           >
//             <p>Are you sure you want to delete this user?</p>
//             <div className="mt-4 flex justify-end gap-2">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => handleDelete(ID)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isModalOpen2 && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-5 rounded shadow-lg">
//             <p>Enter new password:</p>
//             <input
//               type="password"
//               value={password}
//               onChange={handleChangePassword}
//               className="border p-2 w-full mt-2"
//             />
//             <div className="mt-4 flex justify-end gap-2">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setIsModalOpen2(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-500 text-white rounded"
//                 onClick={() => submitPassword(password)}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserTable;



"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { IoEyeOff } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { RootState } from "@/store/store";
import { useSelector } from '../../../../../node_modules/react-redux/dist/react-redux'
import { FaFileCsv } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { headers } from "next/headers";
import * as XLSX from "xlsx";

interface Role {
  roleName: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  role: Role | string;
  managerid: number | '';
}

interface managerData {
  name: string;
  email: string;
  password: string;
  age: number | '';
  id: number;
  //spring roles_id:''
}

interface APIResponse {
  data: User[];
  totalPages: number;
  total: number;
}

const UserTable: React.FC = () => {
  const useRole = localStorage.getItem("userRole");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortConfig, setSortConfig] =
    useState<{ key: keyof User; direction: "asc" | "desc" } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [errorFileUrl, setErrorFileUrl] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [managers, setManagers] = useState<managerData[]>([]);
  const [showdropdown, setShowdropdown] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLimit, setTotalLimit] = useState(0);
  const [limit, setLimit] = useState(5);
  const [ID, setId] = useState<number>(0);
  const [ID2, setId2] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [er, setEr] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const token = localStorage.getItem("authToken");
  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the file input
    }
  };

  // fetching all roles
  const fetchUsers = async () => {
    try {
      const response = await axios.get<APIResponse>(
        `http://localhost:4000/users?page=${currentPage}&search=${searchTerm || ''}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("comming response table out side", response.data);
      if (useRole === "Admin") {
        // Admin sees all users
        setUsers(response.data.data);
        console.log("From Admin", useRole)
        setFilteredUsers(response.data.data);
      }
      else {
        // Default case (in case the role doesn't match)
        setUsers([]);
        setFilteredUsers([]);
      }
      // setUsers(response.data.data);
      // setFilteredUsers(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalLimit(response.data.total);

      setEr(null);
      console.log("ll", limit)
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users", error);
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        toast.error("Unauthorized: Your session has expired or the token is invalid. Please log in again.");

        localStorage.removeItem('authToken');
        localStorage.removeItem("userRole");
        localStorage.removeItem("userID");
        window.location.href = '/login';
      } else {
        // Handle other errors (optional)
        toast.error("Failed to fetch users, please try again later.");
      }
    }
  };

  //if Manger role then fetching maangers user and manager
  const managerAsPerUser = async () => {
    const response = await axios.get(
      
      `http://localhost:4000/users/manager/data?page=${currentPage}&search=${searchTerm || ''}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("resopone amanger", response.data)
    if (useRole === "Manager") {
      setUsers(response.data.data);
      console.log("From Admin", useRole)
      setFilteredUsers(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalLimit(response.data.total);
    }
  }

  // fetch only when curent page,searchtearm,limit is change.
  useEffect(() => {
    fetchUsers();
    managerAsPerUser();
    console.log("see", searchTerm)
  }, [currentPage, searchTerm, limit]);

  //redux
  const searchQuery = useSelector((state: RootState) => state.search.query);
  useEffect(() => {
    setSearchTerm(searchQuery);
    setCurrentPage(1);
  }, [searchQuery]);


  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const deleteUser = async (Id: number) => {
    setIsModalOpen(true);
    setId(Id);
  };

  const showPasswordUpdate = (IDd: number) => {
    setIsModalOpen2(true);
    setId2(IDd);
    setPassword("")
  };
  const showUploadFile = () => {
    file ? setFile(null) : "";
    isModalOpen3 ? setIsModalOpen3(false) : setIsModalOpen3(true);;

  };

  //dropdwon

  const shoDropdown = () => {

    showdropdown === false ? setShowdropdown(true) : setShowdropdown(false);
  }
  const limitDropDown = (limit: number) => {

    setLimit(limit);
    console.log("nn", limit);
    setShowdropdown(false);

  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  //Upload Part

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  //uploading for csv file 
  const handleUpload = async () => {

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/users/upload', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },

      });
      setFile(null);
      fetchUsers;
      console.log("header", response.headers['content-type'])
      console.log(response.data);
      if (response.data === "All data processed successfully!") {
        toast.success("All data processed successfully!")
      }
      if (response.headers['content-type'] === "text/csv; charset=utf-8") {
        // Create a blob URL for the file
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        console.log("URL:", url)
        setErrorFileUrl(url);
      } else {
        alert('File processed successfully!');
        setErrorFileUrl(null);
      }
      console.log("ressss", response)
      toast.success("File uploaded successfully!");

    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        toast.error("Unauthorized: Your session has expired or the token is invalid. Please log in again.");

        // Optionally, remove the token and redirect to login page
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      } else {
        // Handle other errors (optional)
        toast.error("Failed to fetch users, please try again later.");
      }
      console.error('Error uploading file:', error);
      alert('File upload failed');
    }
  };

  //for set Password
  const submitPassword = async (pass: string) => {
    try {
      await axios.put(
        `http://localhost:4000/users/password/${ID2}`,
        { password: pass },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      toast.success("Password updated successfully!");
      setIsModalOpen2(false);
    } catch (err) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        toast.error("Unauthorized: Your session has expired or the token is invalid. Please log in again.");

        // Optionally, remove the token and redirect to login page
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      } else {
        // Handle other errors (optional)
        toast.error("Failed to fetch users, please try again later.");
      }
      toast.error("Error updating password");
      console.error(err);
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:4000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen(false);
      toast.success("User deleted successfully!");
      setUsers(users.filter((user) => user.id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
    } catch (err) {

      toast.error("Error deleting user");
      console.error("Error deleting user:", err);
    }
  };

  const handleSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      let aValue: any = a[key];
      let bValue: any = b[key];
      if (key === "role") {
        aValue = typeof a.role === "object" && a.role !== null ? a.role.roleName : a.role;
        bValue = typeof b.role === "object" && b.role !== null ? b.role.roleName : b.role;
      }

        // if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        // if (a[key] > b[key]) return direction === "asc" ? 1 : -1;

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;

      return 0;
    });

    setFilteredUsers(sortedUsers);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);

    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (users === undefined || users.length === 0) {
      console.log("No users found matching your search.");
      setEr("No users found.")
    }
  }, [users]);



  // fetching only role maangers for filter only managerid in table.
  const fetchManagers = async () => {
    const responsMangers = await axios.get("http://localhost:4000/users/managers", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    );
    setManagers(responsMangers.data);

    console.log("Manager from usertable data", responsMangers);
  }
  useEffect(() => {
    fetchManagers();
  }, [])


  const exportToCSV = () => {
    const csvData = filteredUsers.map((user) => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      Age: user.age,
      Role: user.role && typeof user.role === "object" ? user.role.roleName : "N/A",
      "Manager": managers
        .filter((manager) => manager.id === user.managerid)
        .map((managed) => managed.email)
        .join(", ") || "No Managed Users",
    }));

    const csvHeaders = ["ID", "Name", "Email", "Age", "Role", "Managed Users"];
    const csvContent = [
      csvHeaders.join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const exportToXLS = () => {
    // Prepare data for XLS
    const xlsData = filteredUsers.map((user) => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      Age: user.age,
      Role: user.role && typeof user.role === "object" ? user.role.roleName : "N/A",
      Manager: managers
        .filter((manager) => manager.id === user.managerid)
        .map((managed) => managed.email)
        .join(", ") || "No Managed Users",
    }));
  
    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(xlsData);
  
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users Data");
  
    // Write the workbook and trigger the download
    XLSX.writeFile(workbook, "users_data.xlsx");
  };

  return (
    <>
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-8">
          <div className="max-w-full overflow-x-auto">
            <div className="flex justify-between mt-5 border-b-2">
              <h2 className="text-3xl font-semibold text-center mb-4">User List</h2>
              <div className="flex gap-3">
                <Link href="/dashboard/userinfo">
                  <button className="px-10 bg-black shadow-md text-white rounded py-2 mb-3">
                    Add
                  </button>
                </Link>
              
      <select
  className="border-2 rounded h-11 px-3 text-black"
  name="exportOption"
  onChange={(e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "csv") {
      exportToCSV();
    } else if (selectedOption === "xls") {
      exportToXLS();
    }
  }}
>
  <option value="">Select Export Option</option>
  <option value="csv">Export CSV Data</option>
  <option value="xls">Export XLS Data</option>
</select>
                <div>
                  <button onClick={showUploadFile} className="px-10 bg-black shadow-md text-white rounded py-2 mb-3">Upload CSV</button>
                </div>
              </div>

            </div>
            <div className="flex justify-end mt-5">
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  {["id", "name", "email", "age", "role", "manager"].map((key) => (
                    <th
                      key={key}
                      className="border p-3 cursor-pointer"
                      onClick={() => handleSort(key as keyof User)}
                    >
                      <div className="flex justify-center">
                        <span>{key.toUpperCase()}</span>
                        <div className="flex flex-col ml-2">
                          <div
                            className={`text-xs ${sortConfig?.key === key &&
                              sortConfig?.direction === "asc"
                              ? "text-blue-500"
                              : "text-gray-500"
                              }`}
                          >
                            ▲
                          </div>
                          <div
                            className={`text-xs ${sortConfig?.key === key &&
                              sortConfig?.direction === "desc"
                              ? "text-blue-500"
                              : "text-gray-500"
                              }`}
                          >
                            ▼
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                  <th className="border p-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  // Find all users whose `managerid` matches the current user's `id`
                  const managedUsers = managers.filter((item) => item.id === user.managerid);

                  return (
                    <tr key={user.id} className="text-center">
                      <td className="border p-3 text-xl">{user.id}</td>
                      <td className="border p-3 text-xl">{user.name}</td>
                      <td className="border p-3 text-xl">{user.email}</td>
                      <td className="border p-3 text-xl">{user.age}</td>
                      <td className="border p-3 text-xl">
                        {user.role && typeof user.role === "object" && "roleName" in user.role
                          ? user.role.roleName
                          : user.role || "N/A"}
                      </td>
                      <td className="border p-3 text-xl">
                        {/* Display a comma-separated list of emails of managed users */}
                        {managedUsers.length > 0
                          ? managedUsers.map((managed) => managed.email).join(", ")
                          : "No Manager"}
                      </td>
                      <td className="border p-3">
                        <div className="flex justify-center gap-5">
                          <IoEyeOff size={30} onClick={() => showPasswordUpdate(user.id)} />
                          <Link href={`/dashboard/editinfo/${user.id}`}>
                            <MdEdit size={30} />
                          </Link>
                          <RiDeleteBin5Fill
                            size={30}
                            onClick={() => deleteUser(user.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
            {er}
            {users.length > 0 && <div className="mt-4 flex justify-center">
              <div className="flex justify-between w-full">
                <ul className="">
                  <div className="flex gap-2">
                    <span className="mt-3">Showing Result</span>
                    <div>
                      <button onClick={shoDropdown} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="flex justify-between items-center py-3   focus:outline-none   rounded-lg   px-2 text-center inline-flex items-center   text-sm font-bold border border-2 border-black gap-5" type="button"><span>{limit}</span>
                        <FaAngleDown className="m-auto" size={20} />
                      </button>
                      <div id="dropdownHover" className={showdropdown ? "mb-10 absolute z-10 text-center items-center content-center justify-center bg-white divide-y divide-gray-100  rounded-lg shadow border dark:bg-gray-700" : "hidden"}>
                        <ul className=" bg-white w-auto px-2 py-2  text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                          {Array.from({ length: Math.ceil(totalLimit / 5) - 1 }, (_, index) => {
                            const value = (index + 1) * 5; // Increment by 5
                            return (
                              <li
                                key={`limit-${value}`}
                                onClick={() => limitDropDown(value)}
                                className="w-full cursor-pointer "
                              >
                                <a href="#" className=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                  {value}
                                </a>
                              </li>
                            );
                          })}
                          <li

                            onClick={() => limitDropDown(totalLimit)}
                            className="cursor-pointer"
                          >
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              {totalLimit}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>


                </ul>
                <ul className="border-2 border-gray-400 rounded-lg flex relative">
                  <button
                    className={totalPages == currentPage ? `px-4 py-2 rounded-l-md ` : "px-4 py-2  bg-gray-100 rounded-l-md"}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <GrPrevious />
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    // Conditions for showing specific page numbers
                    if (
                      pageNumber === 1 || // Always show the first page
                      pageNumber === totalPages || // Always show the last page
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) // Show 2 pages before and after the current page
                    ) {
                      return (
                        <li key={`page-${pageNumber}`}>
                          <button
                            className={`px-4 py-3 h-full ${currentPage === pageNumber
                              ? "bg-sky-500 text-white"
                              : "bg-gray-100"
                              }`}
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      );
                    }

                    // Show ellipsis for skipped pages
                    if (
                      (pageNumber === currentPage - 2 && pageNumber > 1) || // Ellipsis before the current range
                      (pageNumber === currentPage + 2 && pageNumber < totalPages) // Ellipsis after the current range
                    ) {
                      return (
                        <li key={`ellipsis-${pageNumber}`} className="py-2">
                          <span className=" px-4 py-3">...</span>
                        </li>
                      );
                    }

                    return null; // Hide pages that are not in the displayed range
                  })}
                  <button
                    className={totalPages !== currentPage ? `px-4 py-3 rounded-r-md` : "px-4 py-3 bg-gray-100 rounded-r-md"}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <GrNext />
                  </button>
                </ul>

              </div>

            </div>}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-white p-5 rounded shadow-lg"
            ref={modalRef}
          >
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={() => handleDelete(ID)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <p>Enter new password:</p>
            <input
              type="password"
              value={password}
              onChange={handleChangePassword}
              className="border p-2 w-full mt-2"
              required
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsModalOpen2(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded"
                disabled={!password}
                onClick={() => submitPassword(password)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={showUploadFile}>
          <div className="bg-white p-5 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-semibold text-center mb-4">Upload CSV</h2>

            <div className="block">
              <div className="flex justify-center">
                <FaFileCsv onClick={handleFileClick} size={50} className="text-sky-500" />
                <input type="file" accept=".csv" className="text-center hidden" ref={fileInputRef} onChange={handleFileChange} >
                </input>
              </div>

              {errorFileUrl ? (
                <div>
                  <h1 className="text-sm text-black">Downlaod CSV </h1>
                  <a href={errorFileUrl} download="error-report.csv" className="">
                    <button className=" px-10 bg-black shadow-md text-white rounded py-2 mb-3" onClick={showUploadFile}>Download CSV</button>
                  </a>
                </div>
              ) : (<div className="flex gap-4">
                <button onClick={showUploadFile} className={`px-10 mt-5 bg-gray-300  shadow-md text-white rounded py-2 mb-3`}>Cancel</button>
                <button onClick={handleUpload} className={file ? `px-10 mt-5 bg-black shadow-md text-white rounded py-2 mb-3` : "px-10 mt-5 bg-slate-600 shadow-md text-white rounded py-2 mb-3"}>Upload CSV</button>
              </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;