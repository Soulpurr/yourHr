import { useEffect, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import React from "react";
// import logo from "../../images/logo.png";

const Navbar = () => {
  const [profile, setprofile] = useState([{}]);
  const getData = async () => {
    let data = await fetch("/api/getProfile", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    let res = await data.json();
    console.log(res);
    setprofile(res);
  };
  useEffect(() => {
    getData();
  }, []);
  let user = false;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      user = true;
    }
  }, []);

  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="bg-black w-full flex  md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <h1 className="w-32 text-2xl font-extrabold text-white cursor-pointer">
          YourHr
        </h1>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <Link href={"/"} className="mx-4 cursor-pointer text-white">
          Home
        </Link>
        <Link
          href={`/addProfile/updateProfile${profile[0]?._id}`}
          className="mx-4 cursor-pointer text-white"
        >
          UpdateProfile
        </Link>
        <Link href={"/"} className="mx-4 cursor-pointer text-white">
          About
        </Link>
        {user && (
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Login
          </li>
        )}
      </ul>
      <div className="relative">
        <input
          className="bg-gray-900 text-white border-2 border-gray-700 rounded-full py-2 px-4            pl-10 block w-full sm:text-sm sm:leading-5 focus:outline-none focus:border-gray-500 focus:shadow-outline-gray"
          placeholder="Search"
          type="search"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M22 22l-6-6"></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.43 0 2.76-.433 3.877-1.167"
            ></path>
          </svg>
        </div>
      </div>
      <div className="flex relative ">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed bg-black -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>

            <Link href={"/"} className="mx-4 cursor-pointer text-white">
              Home
            </Link>
            <Link
              href={`/addProfile/updateProfile${profile[0]?._id}`}
              className="mx-4 cursor-pointer text-white"
            >
              UpdateProfile
            </Link>
            <Link href={"/"} className="mx-4 cursor-pointer text-white">
              About
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
