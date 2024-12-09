"use client"
import { useSelector } from "../../../../../node_modules/react-redux/dist/react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from '../../../../../node_modules/react-redux/dist/react-redux'
import { ChangeEvent, useState } from "react";
import { setSearchQuery } from "@/store/searchSlice";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import Link from "../../../../../node_modules/next/link";
const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value)); // Update Redux state
  };
  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  }
  return (
    <>
      <div className=" fixed  w-full border-b-2 flex bg-white ">
        <div className=" w-[50%] flex mt-2">
          <CiSearch size={20} className=" mt-3 ml-4" />

          <input type="text" placeholder="Type For Search" onChange={handleSearchChange} className="bg-white  outline-none h-11 p-2" />
        </div>
        <div className=" w-[25%] flex justify-center">
          <div className="items-end">
            <div className="items-end">
              <div className="flex justify-center gap-5 mt-2">
                <div className="">
                  <FaUserCircle size={30} className="m-auto"/>
                  <span className="text-xl">User</span>
                </div>
                <FaAngleDown size={17} onClick={handleShow} className="" />
              </div>

            </div>
            {show ? (<div className="absolute w-[200px] border flex justify-center bg-white shadow-lg  shadow-gray-950">
              <div className="w-full">
                <div className="flex justify-center py-4">
                  <div>
                    <ul className="flex gap-2">
                      <RiAccountPinCircleLine size={25} />
                      <span className="text-lg">Account</span>
                    </ul>
                    <ul className="flex gap-2">
                      <CiSettings size={25} />
                      <span className="text-lg">Account Setting</span>
                    </ul>
                  </div>
                </div>
                <div className="border-t-2 w-full flex justify-center">
                  <Link href="/login">
                    <ul className="flex gap-2 py-3">
                      <LuLogOut size={25} />
                      <span className="text-lg">Log Out</span>
                    </ul>
                  </Link>
                </div>
              </div>
            </div>) : (<></>)}
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;
