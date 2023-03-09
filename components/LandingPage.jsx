import React from "react";
import { useTheme } from "next-themes";
import videofolder from "../public/assets/video-folder.png";
import businestartup from "../public/assets/business-startup.png";
import Image from "next/image";
import Router from "next/router";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const LandingPage = () => {
	const { theme, setTheme } = useTheme();
	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className='sm:hidden w-full flex flex-col items-center justify-center gap-3 my-10 px-10'>
				<h3 className="text-2xl text-center font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
					Effortlessly Summarize Any Media With AI
				</h3>
				<div className="relative w-[20%] h-[25%]">
					<div
						className={`absolute inset-0 w-full rounded-lg bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center align-center`}
					></div>
					<div className={`relative w-full rounded-lg flex flex-col`}>
						<Image className="cursor-pointer" src={videofolder} />
					</div>
				</div>
				<h3 className="md:text-lg text-center font-sans">
					Get the gist of any text, audio or video in seconds with Summasense,
					the AI-powered summarization tool
				</h3>
				<button
					onClick={() => {
						Router.push("/generateSummary");
					}}
					className="w-fit flex items-center gap-2 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-8 py-4 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
				>
					Generate Summary For Free
					<ArrowRightCircleIcon className="w-6 h-6 stroke-2" />
				</button>
			</div>
			<div className="hidden w-full sm:flex flex-col sm:flex-row  justify-evenly pt-20 pb-24">
				<div className="w-full flex flex-col justify-between sm:w-[40%]">
					<h3 className="text-2xl sm:text-5xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
						Effortlessly Summarize Any Media With AI
					</h3>
					<h3 className="md:text-lg font-sans">
						Get the gist of any text, audio or video in seconds with Summasense,
						the AI-powered summarization tool
					</h3>
					<button
						onClick={() => {
							Router.push("/generateSummary");
						}}
						className="w-fit flex items-center gap-2 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-8 py-4 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
					>
						Generate Summary For Free
						<ArrowRightCircleIcon className="w-6 h-6 stroke-2" />
					</button>
				</div>
				<div className="relative w-[70%] sm:w-[20%] h-[25%]">
					<div
						className={`absolute inset-0 w-full rounded-lg bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center align-center`}
					></div>
					<div className={`relative w-full rounded-lg flex flex-col`}>
						<Image className="cursor-pointer" src={videofolder} />
					</div>
				</div>
			</div>
			<div
				className={`w-full flex flex-col align-center justify-center py-10 bg-${theme}-secondary`}
			>
				<h3 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold font-heading mb-10">
					See SummaSense{" "}
					<span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
						In Action
					</span>
				</h3>
				<div className="flex flex-col sm:flex-row items-center justify-evenly">
					<div className="relative w-fit">
						<div
							className={`absolute inset-0 w-full rounded-lg bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center align-center`}
						></div>
						<div
							className={`relative rounded-lg flex flex-col w-[200px] h-[150px] sm:w-[300px] sm:h-[250px] md:w-[400px] md:h-[350px] bg-white`}
						>
							<Image
								width={400}
								height={400}
								className="cursor-pointer"
								src={businestartup}
							/>
						</div>
					</div>
					<div className="w-full flex flex-col justify-evenly gap-10 sm:w-[50%] align-center">
						<h3 className="text-center text-xl sm:text-2xl md:text-3xl font-medium font-heading my-5">
							Choose The Media
						</h3>
						<h3 className="text-sm md:text-lg font-sans text-justify mx-5">
							Get the gist of any text, audio or video in seconds with
							Summasense, the AI-powered summarization tool Get the gist of any
							text, audio or video in seconds with Summasense, the AI-powered
							summarization tool Get the gist of any text, audio or video in
							seconds with Summasense, the AI-powered summarization tool Get the
							gist of any text, audio or video in seconds with Summasense, the
							AI-powered summarization tool.
						</h3>
					</div>
				</div>
			</div>
			<div className={`w-full flex flex-col sm:flex-row items-center justify-evenly py-10`}>
				<div className="w-full flex flex-col justify-evenly gap-10 sm:w-[50%] align-center">
					<h3 className="text-center text-xl sm:text-2xl md:text-3xl font-medium font-heading my-5">
						Lorem Ipsum
					</h3>
					<h3 className="text-sm md:text-lg font-sans text-justify mx-5">
						Get the gist of any text, audio or video in seconds with Summasense,
						the AI-powered summarization tool Get the gist of any text, audio or
						video in seconds with Summasense, the AI-powered summarization tool
						Get the gist of any text, audio or video in seconds with Summasense,
						the AI-powered summarization tool Get the gist of any text, audio or
						video in seconds with Summasense, the AI-powered summarization tool.
					</h3>
				</div>
				<div className="relative w-fit">
					<div
						className={`absolute inset-0 w-full rounded-lg bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center align-center`}
					></div>
					<div
						className={`relative rounded-lg flex flex-col w-[200px] h-[150px] sm:w-[300px] sm:h-[250px] md:w-[400px] md:h-[350px] bg-white`}
					>
						<Image
							width={300}
							height={400}
							className="cursor-pointer"
							src={businestartup}
						/>
					</div>
				</div>
			</div>
			<div
				className={`w-full flex flex-col sm:flex-row items-center justify-evenly py-10 bg-${theme}-secondary`}
			>
				<div className="relative w-[70%] sm:w-[30%] h-[20%]">
					<div
						className={`absolute inset-0 w-full rounded-lg bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center align-center`}
					></div>
					<div className={`relative w-full rounded-lg flex flex-col`}>
						<Image
							width={400}
							height={350}
							className="cursor-pointer"
							src={businestartup}
						/>
					</div>
				</div>
				<div className="w-full flex flex-col py-5 justify-between sm:w-[50%]">
					<h3 className="text-center sm:text-left text-2xl sm:text-3xl font-semibold font-heading text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
						Unleash The Power Of AI Summarization With SummaSense
					</h3>
					<h3 className="text-center sm:text-left md:text-lg font-sans">
						Get the gist of any text, audio or video in seconds with Summasense,
						the AI-powered summarization tool
					</h3>
					<button
						onClick={() => {
							Router.push("/generateSummary");
						}}
						className="w-fit bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-3 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
					>
						Generate Summary For Free
					</button>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
