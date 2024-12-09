// import Sidebar from "./(components)/sidebar/Sidebar";
// import { Toaster } from "react-hot-toast";
// import Header from "./(components)/header/Header";
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (

//     <div className='flex h-screen '>
//       <Sidebar />
//       <div className='w-[75%] text-center'>
//         <Header/>
//         <Toaster position="top-center" />
//         {children}
//       </div>
//     </div>

//   );
// }


// import React from 'react';
// import Sidebar from './Sidebar'; // Adjust the import path as needed
// import Header from './Header'; // Adjust the import path as needed
// import { Toaster } from 'react-hot-toast';

// 2

// import Sidebar from "./(components)/sidebar/Sidebar";
// import { Toaster } from "react-hot-toast";
// import Header from "./(components)/header/Header";
// import "./css/style.css";
// import Sidee from "./(components)/Side/Side";
// const Layout = ({ children }) => {
//   return (
//     <div className="flex h-screen">
//       <Sidee />
//       <div className="ml-[19%] w-[81%] text-center overflow-y-auto">
//         <Header />
//         <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-10">
//         <Toaster position="top-center" />
//         {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;


"use client";
import React, { useState, ReactNode } from "react";
import Sidee from "./(components)/Side/Side";
import Header from "./(components)/nav/Head";
import { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token=localStorage.getItem("authToken");
  const router=useRouter();
  console.log("tttt form loayout",token);
  if(!token){
    console.log("tttt form loayout",token);
    router.push("/login")
  }
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidee sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Toaster position="top-center" />
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
