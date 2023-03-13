import React, { useState } from "react";
import { useTheme } from "next-themes";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const TextForm = ({ onSubmit, onPrev, data }) => {
	const { theme, setTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState("Manual");
	const [values, setValues] = useState(data);
	const [uploadedfile, setUploadedFile] = useState();
  const [fileName, setFileName] = useState();
  const [fileInMb, setFileInMb] = useState();
  const [switchDisplay, setswitchDisplay] = useState("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [progressText, setProgressText] = useState("Not Uploaded");
  const [text, setText] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
   const [ocrSrc, setOcrSrc] = useState(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(values);
	};
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const audioUrl = URL.createObjectURL(file);
    setOcrSrc(audioUrl);
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
        "https://summasense-services-production.up.railway.app/getS3UrlOcr",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      s3Url = response.data["url"];
    } catch (error) {}
	console.log(s3Url);
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
	setProgressText("Extracting Text");
    setswitchDisplay("extract");
    const data = {
      s3url: s3Key,
      filetype: fileType,
    };
	console.log(data);
   try {
      const response = await axios.post(
        "https://summasense-services-production.up.railway.app/extract-text",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response); 
      setswitchDisplay("result");
      setText(response.data["text_extraxted"]);
      setValues({ ...values, text: response.data["text_extraxted"] });
      setProgressText("Not Uploaded");
      setDisableBtn(!disableBtn);
      setUploadProgress(0);
    } catch (error) {}
    setProgressText("Extracting Text");
}
	return (
		<div className="flex flex-col items-center w-full px-5 py-8 justify-center gap-5">
			{
        switchDisplay === "upload" && (
          <>
          <h1 className="font-heading font-semibold text-lg">
				Add Original Content
			</h1>
			<textarea
				rows={8}
				className="bg-light-primary rounded-md p-5 w-[90%] sm:w-[80%] flex-wrap text-black"
				placeholder="Add your content here"
				name="text"
				type="text"
				onChange={handleChange}
			/>
      <div className='w-full flex flex-row items-center justify-center'>
          <hr className="h-[1px] w-[47%] border-0 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"></hr>
<h1 className="font-heading font-semibold text-lg mx-3">
				OR
			</h1>
      <hr className="h-[1px] w-[47%] border-0 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"></hr>
        </div>
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
              Supports .pdf, .jpeg, .png
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
			<div className="w-full flex gap-2 justify-center items-center">
				<button
					className="font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md text-sm sm:text-lg px-2 py-1 sm:px-5 sm:py-2 hover:scale-110 transition-all"
					onClick={onPrev}
				>
					Back
				</button>
				<button
					className="font-heading text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all"
					onClick={handleSubmit}
				>
					Next
				</button>
			</div>
          </>
        )
      }
      {switchDisplay != "upload" && switchDisplay != "result" ? (
        <div className="flex flex-col">
          {switchDisplay == "preview" ? (
            <div
              className={`w-full flex flex-col bg-gray-500 justify-center px-1 py-5 sm:p-5 rounded-lg`}
            >
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
              <svg
                className="animate-spin text-content w-20 h-20 feather feather-loader"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="2" y2="6" />
                <line x1="12" x2="12" y1="18" y2="22" />
                <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
                <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
                <line x1="2" x2="6" y1="12" y2="12" />
                <line x1="18" x2="22" y1="12" y2="12" />
                <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
                <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
              </svg>
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

export default TextForm;
