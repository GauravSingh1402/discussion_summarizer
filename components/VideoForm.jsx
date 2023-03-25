import { useState } from "react";
import { useTheme } from "next-themes";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";
const VideoForm = ({ onSubmit, onPrev, data }) => {
  const { theme, setTheme } = useTheme();
  const [uploadedfile, setUploadedFile] = useState();
  const [fileName, setFileName] = useState();
  const [fileInMb, setFileInMb] = useState();
  const [switchDisplay, setswitchDisplay] = useState("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progressText, setProgressText] = useState("Not Uploaded");
  const [values, setValues] = useState(data);
  const [text, setText] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  const [videoSrc, setVideoSrc] = useState(null);

  const getMimeType = (fileName) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      default:
        return '';
    }
  }; 
  const handleFile = (e) => {
    const file = e.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setVideoSrc(videoUrl);
    const modifiedSize =
      `${(parseInt(file.size) * 0.0009765625 * 0.0009765625).toFixed(2)}` +
      "MB";
    setUploadedFile(file);
    setFileName(file.name);
    setFileInMb(modifiedSize);
    setswitchDisplay("preview");
  };

  const uploadFile = async (url, file, onUploadProgress) => {
    return axios.put(url, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  };

  const handleFileUpload = async () => {
    const file = uploadedfile;
    const fileType = file.name.split(".").pop().toLowerCase();

    const s3Key = `${file.name.split(".").pop() + uuidv4()}`;
    const body = {
      fileName: s3Key,
    };
    let s3Url;

    try {
      const response = await axios.post(
        "http://localhost:2000/getS3UrlVideo",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      s3Url = response.data["url"];
    } catch (error) {}

    await uploadFile(s3Url, file, (progressEvent) => {
      setDisableBtn(!disableBtn);
      setUploadProgress((progressEvent.loaded / progressEvent.total) * 100);
      setProgressText(
        `Uploading... ${(
          (progressEvent.loaded / progressEvent.total) *
          100
        ).toFixed(2)}%`
      );
    });

    const fileUrl = s3Url.split("?")[0];
    console.log(fileUrl);
    setProgressText("Extracting Text");
    setswitchDisplay("extract");
    const data = {
      audioUrl: fileUrl,
      mediaFormat: fileType,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:2000/transcribe",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
let isInterview = true;
      if(response.data["transcript"].includes("spk_1")==false){
        console.log("entered");
        response.data["transcript"]=response.data["transcript"].slice(14)
        isInterview=false;
      }
      setswitchDisplay("result");
      setText(response.data["transcript"]);
      setValues({ ...values, text: response.data["transcript"] ,isConversation: isInterview,doCheck: false });
      setProgressText("Not Uploaded");
      setDisableBtn(!disableBtn);
      setUploadProgress(0);
    } catch (error) {}
  };
  return (
   <div className="w-[90%] py-2 sm:p-3 mx-auto">
      {switchDisplay == "upload" && (
        <label
          className={`flex justify-center w-full h-[250px] sm:h-[300px] px-4 transition bg-${theme}-primary border-2 border-gray-500 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-300 focus:outline-none`}
        >
          <span className="flex flex-col items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 sm:w-16 h-10 sm:h-16 text-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className={`text-sm sm:text-md font-medium text-content text-center`}>
              Drop files to Attach, <br /> or
              <span className="text-blue-600 underline ml-2">browse</span>
              <br />
            </span>
            <span className={`text-xs sm:text-sm font-medium text-gray-500 text-center`}>
              Supports .mp4, .webm, .ogg
            </span>
          </span>
          <input
            type="file"
            name="file_upload"
            className="hidden"
            onChange={(e) => {
              handleFile(e);
            }}
          />
        </label>
      )}
      {switchDisplay != "upload" && switchDisplay != "result" ? (
        <div className="flex flex-col">
          {switchDisplay == "preview" ? (
            <div
              className={`w-full flex flex-col bg-gray-500 justify-center px-1 py-5 sm:p-5 rounded-lg`}
            >
                {videoSrc && (
        <video controls>
          <source src={videoSrc} type={getMimeType(videoSrc)} />
          Your browser does not support the video tag.
        </video>
      )}
              <div className='mt-1 flex flex-row items-center justify-center px-3 sm:px-5'>
                <div className='w-full flex flex-col justify-center'>
                  <div className="flex flex-row items-center justify-between">
                <p className="text-content truncate w-[60%] text-sm sm:text-md">{fileName}</p>
                <p className="italic text-content text-xs sm:text-sm text-right">{progressText}</p>
              </div>
              {uploadProgress > 0 && (
                <div className="my-2 w-full h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              <div>
                <p className="text-content text-xs"> {fileInMb}</p>
              </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-2 w-full flex flex-col items-center justify-center">
              <ClockLoader
			loading={true}
  color=" #f89b29"
  size={120}
  speedMultiplier={0.5}
/>
              <p>{progressText}</p>
              <p className="text-gray-300 text-xs italic">
                This might take several minutes ...
              </p>
            </div>
          )}
          {disableBtn ? (
            ""
          ) : (
            <div className="flex w-full justify-between my-5">
              <button
                className="font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end w-[45%] text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all"
                onClick={() => {
                  setswitchDisplay("upload");
                }}
              >
                Back
              </button>
              <button
                className="font-heading text-white w-[45%] bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all"
                onClick={() => {
                  handleFileUpload();
                }}
              >
                Extract Text
              </button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      {switchDisplay == "result" && (
        <div className="w-full flex flex-col items-center justify-center">
          <textarea
            rows={8}
            className="text-xs sm:text-md md:text-lg bg-light-primary rounded-md p-5 w-[90%] sm:w-[80%] flex-wrap text-black mt-4"
            placeholder="Add your content here"
            name="text"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setValues({ ...values, text: e.target.value });
            }}
          />
          <div className="my-5 flex w-full flex gap-2 justify-center items-center">
            <button
              className="font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end w-[45%] text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all"
              onClick={() => {
                setswitchDisplay("upload");
              }}
            >
              Back
            </button>
            <button
              className="font-heading text-white w-[45%] bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default VideoForm;
