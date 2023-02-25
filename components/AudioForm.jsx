import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
// } from 'firebase/storage';
// import { storage } from '../services/firebase';
import axios from "axios";
import { useTheme } from "next-themes";
const AudioForm = () => {
  const [text, setText] = useState("");
  const { theme, setTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState("Record");
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const fileType = file.name.split(".").pop().toLowerCase();
    // const audioRef = ref(storage, `audios/${file.name.split('.').pop() + uuidv4()}`);
    // const snapshot = await uploadBytes(audioRef, file);
    // const downloadUrl = await getDownloadURL(snapshot.ref);
    // console.log(downloadUrl);
    const s3Key = `${file.name.split(".").pop() + uuidv4()}`;
    const body = {
      fileName: s3Key,
    };
    let s3Url;
    setText("Uploading");
    await axios
      .post("http://localhost:2000/getS3Url", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        s3Url = response.data["url"];
      })
      .catch((err) => console.log(err));
    await fetch(s3Url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const FileUrl = s3Url.split("?")[0];

    setText("Extracting Text");
    const data = {
      audioUrl: FileUrl,
      mediaFormat: fileType,
    };
    await axios
      .post("http://localhost:2000/transcribe", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setText(response.data["transcript"]);
      })
      .catch((err) => console.log(err));
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
      <input type="file" onChange={(e) => handleFileUpload(e)} />
      <p className="w-full my-3">{text}</p>
    </div>
  );
};

export default AudioForm;
