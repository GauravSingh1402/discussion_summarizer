import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useTheme } from "next-themes";
import Uploader from "./AudioFormComp/Uploader";
import Recorder from "./AudioFormComp/Recorder";
const AudioForm = ({ onSubmit, onPrev, data }) => {
  const { theme, setTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState("Record");
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadFile = async (url, file, onUploadProgress) => {
console.log(file,url);
  return axios.put(url, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  console.log(file);
  const fileType = file.name.split(".").pop().toLowerCase();

  const s3Key = `${file.name.split(".").pop() + uuidv4()}`;
  const body = {
    fileName: s3Key,
  };
  let s3Url;
  setText("Uploading");

  try {
    const response = await axios.post("http://localhost:2000/getS3Url", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    s3Url = response.data["url"];
  } catch (error) {
    console.log(error);
  }

  await uploadFile(s3Url, file, (progressEvent) => {
    console.log("Upload progress: ", progressEvent.loaded / progressEvent.total);
    setUploadProgress((progressEvent.loaded / progressEvent.total) * 100);
    setText(`Uploading... ${(progressEvent.loaded / progressEvent.total) * 100}%`);
  });

  const fileUrl = s3Url.split("?")[0];

  setText("Extracting Text");
  const data = {
    audioUrl: fileUrl,
    mediaFormat: fileType,
  };

  try {
    const response = await axios.post("http://localhost:2000/transcribe", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    setText(response.data["transcript"]);
  } catch (error) {
    console.log(error);
  }
};

  return (
     <div className="w-full flex flex-col ">
      <div
        className={`flex w-[100%] justify-between rounded-xl bg-${theme}-secondary `}
      >
        <button
          className={`w-1/2  py-3 rounded-md font-medium ${
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
          className={`w-1/2  py-3 rounded-md font-medium ${
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
        currentTab == "Record" ? (<><Recorder/></>) : (<>
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