import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useTheme } from "next-themes";
import Uploader from "./AudioFormComp/Uploader";
import Recorder from "./AudioFormComp/Recorder";
const AudioForm = ({ onSubmit, onPrev, data }) => {
  const { theme, setTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState("Record");
 
  return (
     <div className="w-full flex flex-col ">
      <div
        className={`flex w-[100%] justify-between rounded-xl bg-${theme}-secondary `}
      >
        <button
          className={`w-1/2   text-sm sm:text-md md:text-lg py-2 md:py-3 rounded-lg sm:rounded-md font-medium ${
            currentTab == "Record" &&
            " bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white"
          }`}
          onClick={() => {
            setCurrentTab("Record");
          }}
        >
          Record Audio
        </button>
        <button
          className={`w-1/2   text-sm sm:text-md md:text-lg py-2 md:py-3 rounded-lg sm:rounded-md font-medium ${
            currentTab == "Upload" &&
            " bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white"
          }`}
          onClick={() => {
            setCurrentTab("Upload");
          }}
        >
          Upload Audio
        </button>
      </div>
      <hr className="h-px border-0 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"></hr>
      {
        currentTab == "Record" ? (<><Recorder onSubmit={onSubmit} onPrev={onPrev} data={data}/></>) : (<>
        <div className="w-full flex flex-col items-center justify-center">
               <Uploader onSubmit={onSubmit} onPrev={onPrev} data={data}/>
               <div className='w-full flex flex-col items-center justify-center'>
      </div>
    </div>
        </>)
      }
      
    </div>
  );
};


export default AudioForm;