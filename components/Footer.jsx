import React from "react";
import { useTheme } from "next-themes";

const Footer = () => {
	const { theme, setTheme } = useTheme();
	return (
		<div className={`flex w-full justify-center p-2 bg-${theme}-primary`}>
			Built with 💖 by the SummaSense team
		</div>
	);
};

export default Footer;
