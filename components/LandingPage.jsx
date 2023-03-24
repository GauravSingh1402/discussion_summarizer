import React from "react";
import { useTheme } from "next-themes";
import videofolder from "../public/assets/video-folder.png";
import businestartup from "../public/assets/business-startup.png";
import content from "../public/assets/content-marketing.png";
import summary from "../public/assets/create-file.png";
import Image from "next/image";
import Router from "next/router";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const LandingPage = () => {
	// made page responsive
	const { theme, setTheme } = useTheme();
	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="w-full flex flex-col text-center md:text-left md:flex-row">
				<div className="w-full md:w-[55%] flex flex-col gap-10 xl:gap-12 md:gap-8 py-16 px-5 sm:px-16 xl:p-24">
					<h3 className="font-extrabold font-heading text-[2rem] xl:text-[3rem] text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
						Effortlessly Summarize Any Media With AI
					</h3>
					<p className="text-lg">
						Get the gist of any text, audio or video in seconds with Summasense,
						the AI-powered summarization tool
					</p>
					<button className="self-center text-white md:self-start bg-gradient-to-r gap-2 text-lg flex items-center from-custom-gradient-start to-custom-gradient-end px-5 py-3 font-semibold w-fit rounded-md">
						Generate Summary
						<ArrowRightCircleIcon className="w-8 h-8" />
					</button>
				</div>
				<div className="hidden md:flex md:w-[45%] justify-center py-10">
					<Image
						className="scale-75 lg:scale-90"
						src={videofolder}
						width={350}
						height={200}
					/>
				</div>
			</div>
			<div
				className={`w-full flex flex-col align-center justify-center py-10 bg-${theme}-secondary`}
			>
				<h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-semibold font-heading mb-10">
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
							className={`relative rounded-lg flex flex-col w-[300px] sm:h-[250px] lg:w-[400px] lg:h-[400px] bg-white`}
						>
							<Image
								width={400}
								height={400}
								className="cursor-pointer"
								src={content}
							/>
						</div>
					</div>
					<div className="w-full flex flex-col justify-evenly sm:gap-10 sm:w-[50%] align-center">
						<h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-medium font-heading my-5">
							Choose The Media
						</h3>
						<h3 className="text-md md:text-lg font-sans text-justify sm:mx-5 w-2/3 mx-auto sm:w-auto">
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
			<div
				className={`w-full flex flex-col-reverse sm:flex-row items-center justify-evenly py-10`}
			>
				<div className="w-full flex flex-col justify-evenly sm:gap-10 sm:w-[50%] align-center">
					<h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-medium font-heading my-5">
						Lorem Ipsum
					</h3>
					<h3 className="text-md md:text-lg font-sans text-justify sm:mx-5 w-2/3 mx-auto sm:w-auto">
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
						className={`relative rounded-lg flex flex-col w-[300px] sm:h-[250px] lg:w-[400px] lg:h-[400px] bg-white`}
					>
						<Image
							width={300}
							height={400}
							className="cursor-pointer"
							src={summary}
						/>
					</div>
				</div>
			</div>
			<div
				className={`flex flex-col sm:flex-row items-center justify-evenly w-full bg-${theme}-secondary py-10`}
			>
				<div className="relative w-fit">
					<div
						className={`absolute inset-0 w-full rounded-lg bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center align-center`}
					></div>
					<div
						className={`relative rounded-lg flex flex-col w-[300px] sm:h-[250px] lg:w-[400px] lg:h-[400px] bg-white`}
					>
						<Image
							width={400}
							height={400}
							className="cursor-pointer"
							src={businestartup}
						/>
					</div>
				</div>
				<div
					className={`w-full flex flex-col justify-evenly gap-5 sm:w-[50%] items-center`}
				>
					<h3 className="text-center text-xl sm:mx-5 w-2/3 mx-auto sm:w-auto sm:text-2xl lg:text-3xl font-bold font-heading my-5 text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
						Unleash The Power Of AI Summarization With SummaSense
					</h3>
					<h3 className="text-md md:text-lg font-sans text-justify sm:mx-5 w-2/3 mx-auto sm:w-auto">
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
