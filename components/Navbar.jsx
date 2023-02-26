import React, { useState } from "react";
import logoBlack from "../public/assets/logo-black.svg";
import logoWhite from "../public/assets/logo-white.svg";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";
import Router from "next/router";
import Link from "next/link";


const Navbar = () => {
	// const [toggleMenu, setToggleMenu] = React.useState(false);
	const { theme, setTheme } = useTheme();

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
				<a className="hover:underline" href="/login">
					Login
				</a>
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
