import { Package } from "@/types/package";

const packageData: Package[] = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Paid",
  },
  {
    name: "Business Package",
    price: 99.0,
    invoiceDate: `Jan 13,2023`,
    status: "Unpaid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: "Pending",
  },
];

const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Package
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Invoice date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                  <p className="text-sm">${packageItem.price}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.invoiceDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      packageItem.status === "Paid"
                        ? "bg-success text-success"
                        : packageItem.status === "Unpaid"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;



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
//       <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//         <div className="w-full">
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

//           <table  className="w-full table-auto">
//             <thead>
//               <tr className="bg-gray-2 text-left dark:bg-meta-4">
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
//                       <IoEyeOff size={30} onClick={() => showPasswordUpdate(user.id)} />
//                       <Link href={`/dashboard/editinfo/${user.id}`}>
//                         <MdEdit size={30} />
//                       </Link>
//                       <RiDeleteBin5Fill
//                         size={30}
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