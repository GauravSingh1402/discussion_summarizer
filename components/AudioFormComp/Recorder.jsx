import { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import { useTheme } from "next-themes";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const appId = "41c98519-9d2c-49a8-891c-606cfb75c911";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Recorder = ({ onSubmit, onPrev, data }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [prompts, setprompts] = useState("");
  const [text, setText] = useState(transcript);
  const [values, setValues] = useState(data);
  const handleSubmit = (e) => {
    let val = {...values};
    val['text'] = transcript;
    e.preventDefault();
    console.log(val);
    onSubmit(val);
  };
  const startListening = () => {
    setprompts("Turning On Mic ...");
    SpeechRecognition.startListening({ continuous: true });
    setprompts("Listening ...");
  };
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const stopListening = () => {
    setprompts("");
    SpeechRecognition.stopListening();
  };
   const handleChange = (event) => {
    transcript = event.target.value;
    setText(event.target.value);
  };
  useEffect(() => {
    setText(transcript);
  },)
  return (
    <div className="flex flex-col items-center justify-center">
      <textarea
        rows={8}
        className="bg-light-primary rounded-md p-5 w-[90%] sm:w-[80%] flex-wrap text-black mt-4"
        placeholder="Add your content here"
        name="text"
        type="text"
        value={text}
        onChange={handleChange}
      />
      <p className='my-2 text-xs sm:text-sm: md:text-md'>{prompts}</p>
      <div className="flex w-full items-center justify-center">
        <button
          className="mr-2 text-white bg-gray-500 cursor-pointer rounded-full p-3"
          onClick={resetTranscript}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 sm:w-6 h-4 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>
        <button className="text-white bg-gray-500 cursor-pointer rounded-full p-3">
          {listening ? (
            <svg
              onClick={stopListening}
              className="w-4 sm:w-6 h-4 sm:h-6"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z" />
              <path d="M11 19.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H4c0 4.072 3.061 7.436 7 7.931z" />
            </svg>
          ) : (
            <svg
              onClick={startListening}
              className="w-4 sm:w-6 h-4 sm:h-6"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="none" height="256" width="256" />
              <path d="M213.9,210.6l-160-176A8,8,0,0,0,42.1,45.4L80,87.1V128a48,48,0,0,0,73.9,40.4l10.9,12A64,64,0,0,1,64.4,135.1a8,8,0,1,0-15.9,1.8A79.9,79.9,0,0,0,120,207.6V232a8,8,0,0,0,16,0V207.6a79.2,79.2,0,0,0,39.6-15.3l26.5,29.1A8,8,0,0,0,208,224a8.2,8.2,0,0,0,5.4-2.1A7.9,7.9,0,0,0,213.9,210.6Z" />
              <path d="M162.1,129.8a7.9,7.9,0,0,0,5.9,2.6,7.4,7.4,0,0,0,2.9-.5,8,8,0,0,0,5.1-7.5V64a48,48,0,0,0-48-48A47.5,47.5,0,0,0,87.2,38.8a8,8,0,0,0,.8,9.6Z" />
              <path d="M192.2,161.7a9.3,9.3,0,0,0,2.9.5,7.8,7.8,0,0,0,7.4-5.1,78.7,78.7,0,0,0,5-20.2,8,8,0,1,0-15.9-1.8,60.1,60.1,0,0,1-4,16.2A8.1,8.1,0,0,0,192.2,161.7Z" />
            </svg>
          )}
        </button>
      </div>
      <div className="mt-2 mb-4 w-full flex gap-2 justify-center items-center">
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
    </div>
  );
};
export default Recorder;
    



