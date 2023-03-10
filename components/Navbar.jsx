import React, { useState, useEffect } from "react";
import logoBlack from "../public/assets/logo-black.svg";
import logoWhite from "../public/assets/logo-white.svg";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState();
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const link = "https://discussionsummarizerbackend-production.up.railway.app/";

  const profile = async () => {
    try {
      const res = await axios(`${link}auth`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      console.log(res.data);
      if (res.data !== "Unauthorized") {
        const email = res.data.user_id;
        console.log(email);
        if (email != undefined) {
          setUser(email);
        } else {
          setUser("Unauthorized");
        }
      } else {
        setUser("Unauthorized");
      }
    } catch (err) {
      setUser("Unauthorized");
      console.log(err);
    }
  };

  useEffect(() => {
    profile();
  }, []);

  return (
      <nav className="w-full flex justify-around items-center px-6 py-4 ">
        <div className="w-3/6 sm:w-1/6">
          <Image
            className="cursor-pointer"
            onClick={() => {
              Router.push("/");
            }}
            src={theme == "light" ? logoBlack : logoWhite}
          />
        </div>
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
        <ul className="text-content md:flex hidden list-none flex-row justify-between items-center ">
          {user !== "Unauthorized" ? (
            <li className="mx-4 cursor-pointer hover:underline transition-all">
              <Link href="/account">Profile</Link>
            </li>
          ) : (
            <li className="mx-4 cursor-pointer hover:underline transition-all">
              <Link href="/login">Login</Link>
            </li>
          )}

          <li className="cursor-pointer mx-4 py-2 px-7 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white rounded-md font-semibold hover:scale-105 transition-all shadow-lg">
            <Link href="/generateSummary">Generate Summary</Link>
          </li>
        </ul>
        <div className="md:hidden flex relative">
          {!toggleMenu && (
            <HiMenuAlt4
              fontSize={28}
              className="text-content md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <AiOutlineClose
              fontSize={28}
              className="text-content md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          )}
          {toggleMenu && (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md bg-[#27335966] backdrop-blur-sm shadow-[0_4px_30px_rgba(0, 0, 0, 0.2)] border-[1px] border-[#0000004d] rounded-[16px] border-solid text-content animate-slide-in"
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              <li className="text-xl w-full my-2">
                <ThemeToggle />
              </li>
              {user !== "Unauthorized" ? (
                <li className="my-2 text-lg  mx-4 cursor-pointer hover:underline transition-all">
                  <Link href="/account">Profile</Link>
                </li>
              ) : (
                <li className="my-2 text-lg  mx-4 cursor-pointer hover:underline transition-all">
                  <Link href="/login">Login</Link>
                </li>
              )}
              <li className="my-2 text-lg  mx-4 cursor-pointer hover:underline transition-all">
                <Link href="/generateSummary">Summary</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
  );
};

export default Navbar;
