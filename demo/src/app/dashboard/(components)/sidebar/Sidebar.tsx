// // import React from 'react'
// // import Link from '../../../../../node_modules/next/link'
// // const Sidebar = () => {
// //   return (
// //     <>
// //     <div className='w-[25%] bg-slate-800 text-center h-screen'>
// //         <h1 className='text-4xl text-white mt-10'>Menu</h1>
// //         <ul>
// //           <li><Link href="/dashboard/usertable"><button className='px-10 bg-black shadow-md text-white rounded mt-5 py-2' >Users</button></Link></li>
// //           <li></li>
// //           <li></li>
// //           <li></li>
// //         </ul>
// //       </div>
// //     </>
// //   )
// // }

// // export default Sidebar

// import React from 'react';
// import Link from 'next/link';
// import { FaAngleDown } from "react-icons/fa6";
// import { FaAngleUp } from "react-icons/fa6";
// const Sidebar = () => {
//   return (
//     <div className="fixed top-0 left-0 h-full w-[25%] bg-slate-800 text-center">
//       <h1 className="text-4xl text-white mt-10">AdminDashboard</h1>
//       <ul className="mt-10">
//         <li className="mb-5">
//           <Link href="/dashboard/usertable">
            
//               Users
           
//           </Link>
//         </li>
//         {/* Add more menu items as needed */}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
"use client"
import React, { useState } from "react";
import Link from "next/link";
import {
  FaAngleDown,
  FaAngleUp,
  FaTachometerAlt,
  FaShoppingCart,
  FaCalendarAlt,
  FaUser,
  FaTable,
  FaCog,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboardMenu = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  return (
    <div className="fixed top-0 left-0 h-full w-[19%] bg-slate-800 text-center">
      <h1 className="text-4xl text-white mt-10">Admin Dashboard</h1>
      <ul className="mt-10 text-left ml-5 p-5">
        {/* Dashboard Menu with Children */}
        <li className="mb-5">
          <div
            className="flex items-center justify-between text-white cursor-pointer"
            onClick={toggleDashboardMenu}
          >
            <div className="flex items-center">
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </div>
            {isDashboardOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          {/* Child menu items */}
          {isDashboardOpen && (
            <ul className="mt-2 ml-5 space-y-2 text-gray-300">
              <li className="flex items-center">
                <FaShoppingCart className="mr-2" />
                <Link href="/dashboard/ecommerce">Ecommerce</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-5">
    <div className="flex items-center text-white">
      <FaUser className="mr-2" />
      <Link href="/dashboard/usertable">Users</Link>
    </div>
  </li>

  {/* Calendar */}
  <li className="mb-5">
    <div className="flex items-center text-white">
      <FaCalendarAlt className="mr-2" />
      <Link href="/dashboard/calender">Calendar</Link>
    </div>
  </li>

  {/* Profile */}
  <li className="mb-5">
    <div className="flex items-center text-white">
      <FaUser className="mr-2" />
      <Link href="/dashboard/profile">Profile</Link>
    </div>
  </li>

  {/* Table */}
  <li className="mb-5">
    <div className="flex items-center text-white">
      <FaTable className="mr-2" />
      <Link href="/dashboard/usertable">Table</Link>
    </div>
  </li>

  {/* Settings */}
  <li className="mb-5">
    <div className="flex items-center text-white">
      <FaCog className="mr-2" />
      <Link href="/dashboard/settings">Settings</Link>
    </div>
  </li>
        {/* Standalone menu items */}
        <li className="mb-5">
          <div className="flex items-center text-white">
            <FaUser className="mr-2" />
            <Link href="/dashboard/usertable">Users</Link>
          </div>
        </li>
        <li className="mb-5">
          <div className="flex items-center text-white">
            <FaCog className="mr-2" />
            <Link href="/dashboard/settings">Settings</Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
