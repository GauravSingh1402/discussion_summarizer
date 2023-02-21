import React, { useState } from "react";
import logoBlack from "../public/assets/logo-black.svg";
import Image from "next/image";

const NavBarItem = ({ title, classprops }) => (
	<li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
	// const [toggleMenu, setToggleMenu] = React.useState(false);
	

	return (
		<nav className="w-full flex justify-between p-6">
			<div className="w-1/6">
				<Image src={logoBlack} />
			</div>
			<div>
				<button className="font-sans bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg">
					Generate Summary
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
