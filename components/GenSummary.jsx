import React, { useState } from "react";
import { useTheme } from "next-themes";
import StepForm from "./StepForm.jsx";

const GenSummary = () => {
	const [currentTab, setCurrentTab] = useState("Text");
	const { theme, setTheme } = useTheme();
	return (
		<div className="w-full flex flex-col items-center gap-6 mt-5">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-xl sm:text-2xl md:text-3xl text-center text-transparent bg-clip-text font-heading font-bold bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
					Generate Your Summary
				</h1>
				<p className="text-sm sm:text-md md:text-lg font-medium">using</p>
			</div>
			<div
				className={`flex w-[80%] sm:w-[70%] md:w-[40%] justify-between p-1 sm:p-2 rounded-xl bg-${theme}-secondary`}
			>
				<button
					className={`w-1/3 text-sm sm:text-md md:text-lg py-2 md:py-3 rounded-lg sm:rounded-md font-medium ${
						currentTab == "Text" &&
						" bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white"
					}`}
					onClick={() => {
						setCurrentTab("Text");
					}}
				>
					Text
				</button>
				<button
					className={`w-1/3 text-sm sm:text-md md:text-lg py-2 md:py-3 rounded-lg sm:rounded-md font-medium ${
						currentTab == "Audio" &&
						" bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white"
					}`}
					onClick={() => {
						setCurrentTab("Audio");
					}}
				>
					Audio
				</button>
				<button
					className={`w-1/3 text-sm sm:text-md md:text-lg py-2 md:py-3 rounded-lg sm:rounded-md font-medium ${
						currentTab == "Video" &&
						" bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white"
					}`}
					onClick={() => {
						setCurrentTab("Video");
					}}
				>
					Video
				</button>
			</div>
			<div className="w-[90%] sm:w-[80%] md:w-[70%] relative my-10">
				<div
					className={`absolute inset-0 w-full rounded-lg mt-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center`}
				></div>
				<div
					className={`relative w-full rounded-lg mt-5 bg-${theme}-secondary flex justify-center`}
				>
					<StepForm currentTab={currentTab} />
				</div>
			</div>
		</div>
	);
};

export default GenSummary;
