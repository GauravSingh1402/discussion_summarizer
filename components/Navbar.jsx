import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../assets/logo.svg";

const NavBarItem = ({ title, classprops }) => (
    <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" />
            </div>
            <ul className="text-black md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Login"].map((item, index) => (
                    <NavBarItem key={item + index} title={item} />
                ))}
                <li className="bg-gradient-to-r from-[#ff0f7b] to-[#f89b29]  py-2 px-7 mx-4 rounded-lg cursor-pointer text-[#fafafa] hover:bg-[#2546bd]">
                    Generate Summary
                </li>
            </ul>
            <div className="flex relative">
                {!toggleMenu && (
                    <HiMenuAlt4 fontSize={28} className="text-black md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                )}
                {toggleMenu && (
                    <ul
                        className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md text-black animate-slide-in"
                    >
                        <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
                        {["Login","Generate Summary"].map(
                            (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
                        )}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;