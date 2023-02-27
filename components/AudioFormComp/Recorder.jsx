import React, {useState} from "react";
import "regenerator-runtime/runtime";
import { useTheme } from "next-themes";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const appId = "41c98519-9d2c-49a8-891c-606cfb75c911";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Recorder = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='flex flex-col items-center justify-center'>
    <svg className='w-6 h-6 text-content' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M213.9,210.6l-160-176A8,8,0,0,0,42.1,45.4L80,87.1V128a48,48,0,0,0,73.9,40.4l10.9,12A64,64,0,0,1,64.4,135.1a8,8,0,1,0-15.9,1.8A79.9,79.9,0,0,0,120,207.6V232a8,8,0,0,0,16,0V207.6a79.2,79.2,0,0,0,39.6-15.3l26.5,29.1A8,8,0,0,0,208,224a8.2,8.2,0,0,0,5.4-2.1A7.9,7.9,0,0,0,213.9,210.6Z"/><path d="M162.1,129.8a7.9,7.9,0,0,0,5.9,2.6,7.4,7.4,0,0,0,2.9-.5,8,8,0,0,0,5.1-7.5V64a48,48,0,0,0-48-48A47.5,47.5,0,0,0,87.2,38.8a8,8,0,0,0,.8,9.6Z"/><path d="M192.2,161.7a9.3,9.3,0,0,0,2.9.5,7.8,7.8,0,0,0,7.4-5.1,78.7,78.7,0,0,0,5-20.2,8,8,0,1,0-15.9-1.8,60.1,60.1,0,0,1-4,16.2A8.1,8.1,0,0,0,192.2,161.7Z"/></svg>
    <svg className='w-6 h-6 text-content' height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z"/><path d="M11 19.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H4c0 4.072 3.061 7.436 7 7.931z"/></svg>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
        <div className="flex w-[20%] justify-between my-5">
            <button
              className="font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end w-[45%] text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md px-5 py-2 hover:scale-110 transition-all"
            //   onClick={() => {
            //     setswitchDisplay("upload");
            //   }}
            >
              Back
            </button>
            <button
              className="font-heading text-white w-[45%] bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-5 py-2 hover:scale-110 transition-all"
            //   onClick={handleSubmit}
            >
              Next
            </button>
          </div>
    </div>
  );
};
export default Recorder;