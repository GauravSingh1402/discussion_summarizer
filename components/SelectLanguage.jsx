import React, { useState } from "react";
import English from "../public/assets/english.svg";
import Hindi from "../public/assets/hindi.svg";
import French from "../public/assets/french.svg";
import Spanish from "../public/assets/spanish.svg";
import Image from "next/image";

const SelectLanguage = ({ onSubmit }) => {
	const [currentLanguage, setCurrentLanguage] = useState("English");
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(currentLanguage);
	};
	return (
		<div className="flex flex-col w-full items-center p-5 gap-6">
			<div className="flex flex-row w-full p-5">
				<h1 className="w-1/2 h-full flex justify-center items-center text-center font-heading text-xl font-medium">
					Select language
				</h1>
				<div className="w-1/2 flex flex-col gap-2 items-center">
					<div className="w-[50%] p-2 bg-white rounded-lg">
						<button
							className={`flex items-center gap-2 text-md w-full p-2 rounded-md font-heading ${
								currentLanguage == "English"
									? `bg-dark-secondary text-dark-content`
									: "text-black"
							}`}
							onClick={() => {
								setCurrentLanguage("English");
							}}
						>
							<Image src={English} width={30} height={30} />
							English
						</button>
						<button
							className={`flex items-center gap-2 text-md w-full p-2 rounded-md font-heading ${
								currentLanguage == "Hindi"
									? `bg-dark-secondary text-dark-content`
									: "text-black"
							}`}
							onClick={() => {
								setCurrentLanguage("Hindi");
							}}
						>
							<Image src={Hindi} width={30} height={30} />
							Hindi
						</button>
						<button
							className={`flex items-center gap-2 text-md w-full p-2 rounded-md font-heading ${
								currentLanguage == "French"
									? `bg-dark-secondary text-dark-content`
									: "text-black"
							}`}
							onClick={() => {
								setCurrentLanguage("French");
							}}
						>
							<Image src={French} width={30} height={30} />
							French
						</button>
						<button
							className={`flex items-center gap-2 text-md w-full p-2 rounded-md font-heading ${
								currentLanguage == "Spanish"
									? `bg-dark-secondary text-dark-content`
									: "text-black"
							}`}
							onClick={() => {
								setCurrentLanguage("Spanish");
							}}
						>
							<Image src={Spanish} width={30} height={30} />
							Spanish
						</button>
					</div>
				</div>
			</div>
			<button
				className="font-heading text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end w-[10%] rounded-md px-5 py-2 hover:scale-110 transition-all"
				onClick={handleSubmit}
			>
				Next
			</button>
		</div>
	);
};

export default SelectLanguage;
