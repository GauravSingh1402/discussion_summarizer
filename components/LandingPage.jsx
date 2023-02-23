import React from "react";
import { useTheme } from "next-themes";
import videofolder from "../public/assets/video-folder.png";
import Image from "next/image";
import Router from "next/router";
const LandingPage = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col sm:flex-row  justify-evenly py-10">
        <div className="w-full flex flex-col justify-between sm:w-[50%]">
          <h3 className="text-2xl sm:text-4xl md:text-6xl font-semibold font-heading text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
            Effortlessly Summarize Any Media With AI
          </h3>
          <h3 className="md:text-2xl font-semibold font-sans">
            Get the gist of any text, audio or video in seconds with Summasense,
            the AI-powered summarization tool
          </h3>
          <button
            onClick={() => {
              Router.push("/generateSummary");
            }}
            className="w-fit bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
          >
            Generate Summary For Free
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
     
    </div>
  );
};

export default LandingPage;
