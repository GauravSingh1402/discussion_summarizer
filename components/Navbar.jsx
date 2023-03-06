import React, { useState, useEffect } from "react";
import logoBlack from "../public/assets/logo-black.svg";
import logoWhite from "../public/assets/logo-white.svg";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState();

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
		if(email!=undefined)
		{
			setUser(email);
		}
		else
		{
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
    <nav className="w-full flex justify-between px-6 py-4 items-center">
      <div className="w-1/6">
        <Image
          className="cursor-pointer"
          onClick={() => {
            Router.push("/");
          }}
          src={theme == "light" ? logoBlack : logoWhite}
        />
      </div>
      <ThemeToggle />
      <div className="flex items-center gap-5 font-medium">
        {user !== "Unauthorized" ? (
          <Link href="/profile">
            <a className="hover:underline">Profile</a>
          </Link>
        ) : (
          <Link href="/login">
            <a className="hover:underline">Login</a>
          </Link>
        )}
        <button
          onClick={() => {
            Router.push("/generateSummary");
          }}
          className="bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
        >
          Generate Summary
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
