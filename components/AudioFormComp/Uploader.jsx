import { useState } from "react";
import { useTheme } from "next-themes";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const Uploader = ({ onSubmit, onPrev, data }) => {
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
  const handleFile = (e) => {
    const file = e.target.files[0];
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
        "https://summasense-services-production.up.railway.app/getS3Url",
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

    setProgressText("Extracting Text");
    setswitchDisplay("extract");
    const data = {
      audioUrl: fileUrl,
      mediaFormat: fileType,
    };

    try {
      const response = await axios.post(
        "https://summasense-services-production.up.railway.app/transcribe",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setswitchDisplay("result");
      setText(response.data["transcript"]);
      setValues({ ...values, text: response.data["transcript"] });
      setProgressText("Not Uploaded");
      setDisableBtn(!disableBtn);
      setUploadProgress(0);
    } catch (error) {}
  };
  return (
    <div className="w-[90%] p-3">
      {switchDisplay == "upload" && (
        <label
          className={`flex justify-center w-full h-[300px] px-4 transition bg-${theme}-primary border-2 border-gray-500 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-300 focus:outline-none`}
        >
          <span className="flex flex-col items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-blue-600"
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
            <span className={`font-medium text-content text-center`}>
              Drop files to Attach, <br /> or
              <span className="text-blue-600 underline ml-2">browse</span>
              <br />
            </span>
            <span className={`font-medium text-gray-500`}>
              Supports .mr, .flac, .wav, .ogg, .mp3, .mp4, .webm
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
              className={`bg-gray-500 w-full flex flex-col justify-center p-5 rounded-md`}
            >
              <div className='flex flex-row items-center justify-center'>
                <div>
                 <svg className='text-content w-10 h-10 mr-1' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><polyline fill="none" points="152 32 152 88 208 88" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M168,224h32a8,8,0,0,0,8-8V88L152,32H56a8,8,0,0,0-8,8v88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><polygon fill="none" points="48 204 48 172 72 172 96 152 96 224 72 204 48 204" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M128,163a32,32,0,0,1,0,50" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>
                </div>
                <div className='w-full flex flex-col justify-center'>
                  <div className="flex flex-row items-center justify-between">
                <p className="text-white">{fileName}</p>
                <p className="italic text-gray-300">{progressText}</p>
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
                <p className="text-gray-300 text-xs"> {fileInMb}</p>
              </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
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
                className="font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end w-[45%] text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md px-5 py-2 hover:scale-110 transition-all"
                onClick={() => {
                  setswitchDisplay("upload");
                }}
              >
                Back
              </button>
              <button
                className="font-heading text-white w-[45%] bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-5 py-2 hover:scale-110 transition-all"
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
            className="bg-light-primary rounded-md p-5 w-[80%] flex-wrap text-black"
            placeholder="Add your content here"
            name="text"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setValues({ ...values, text: e.target.value });
            }}
          />
          <div className="flex w-[20%] justify-between my-5">
            <button
              className="font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end w-[45%] text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md px-5 py-2 hover:scale-110 transition-all"
              onClick={() => {
                setswitchDisplay("upload");
              }}
            >
              Back
            </button>
            <button
              className="font-heading text-white w-[45%] bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-5 py-2 hover:scale-110 transition-all"
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

export default Uploader;
