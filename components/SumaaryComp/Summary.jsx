import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const Summary = ({ title, summary,text }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isReading, setIsReading] = useState(false);
  // Regular expression to split summary into words
  console.log(title,summary)
  const words = summary.match(/\S+/g);
  // Array of stop words
  const stopWords = ["a","an","the",
    "and",
    "or",
    "but",
    "to",
    "of",
    "in",
    "it",
    "on",
    "at",
    "for",
    "with",
    "from",
    "by",
    "as",
    "is",
    "was",
    "were",
    "be",
    "being",
    "been",
    "that",
    "this",
    "these",
    "those",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "should",
    "could",
    "can",
    "may",
    "might",
    "must",
    "ought",
    "shall",
    "should",
  ];
  const readText = () => {
    setIsReading(true);
    const msg = new SpeechSynthesisUtterance();
    msg.text = summary;
    msg.rate = 0.8; // reduce speed by 20%
    msg.onend = () => {
      setIsReading(false);
      setCurrentWord(0); // reset current word when speech ends
    };
    msg.onboundary = (event) => {
      const wordIndex = event.charIndex;
      const word = words.findIndex(
        (w) =>
          wordIndex >= summary.indexOf(w) &&
          wordIndex < summary.indexOf(w) + w.length
      );
      setCurrentWord(word);
    };
    window.speechSynthesis.speak(msg);
  };
  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setCurrentWord(0); // reset current word when speech is stopped
  };
  const link = "http://localhost:5000/";
  const profile = async () => {
    const res = await axios(`${link}auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const email = res.data.user_id;
    const udata = {
      email: email,
      sum: {
        summary: summary,
        title: title,
        text: text,
      },
    };
    if (res.status == 200 && res.data.user_id != undefined) {
      const resp = await axios
        .post(`${link}save_summary`, udata, {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        })
        .then((resp) => {
          console.log(resp.data.data);
          if (resp.data.data == "Updated") {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Summary saved  Successfully",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Summmary could not  be saved!",
            });
          }
        });
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="flex md:justify-between flex-col md:flex-row gap-2">

      <div className='w-full md:w-[75%]'>
        <div className="flex w-full items-end justify-end bg-white text-black rounded-t-md">
            {isReading ? 
        <button className='flex items-center justify-center p-2 bg-gray-200 rounded-tr-md' onClick={stopReading} disabled={!isReading}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
</svg>

            Stop Reading
          </button>
          :
<button className='flex items-center justify-center p-2 bg-gray-200 rounded-tr-md' onClick={readText} disabled={isReading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>

            {isReading ? "Reading..." : "Start Reading"}
          </button>
        }
          
          
        </div>
        <div className="text-justify text-sm sm:text-lg w-full bg-white p-3 text-black rounded-b-md font-small min-h-[200px] max-h-[200px] h-[200px] overflow-y-auto overflow-x-hidden">
        {words?.map((word, i) => (
          <span
            key={i}
            className={
              i === currentWord
                ? "text-transparent bg-clip-text font-heading bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
                : ""
            }
          >
            {word}{" "}
          </span>
        ))}
      </div>
      </div>
      <div className="mt-5 md:mt-0 flex flex-col gap-5 sm:gap-0 md:gap-3 sm:flex-row justify-between md:justify-start items-center md:items-end md:flex-col">
        	<button className="font-heading text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all"
             onClick={() => {
                    navigator.clipboard.writeText(summary); Swal.fire({
                      position: 'top-middle',
                      icon: 'success',
                      title: 'Summary Copied',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }}
            >
          Copy Summary
        </button>
        <button
          onClick={() => profile(title, summary)}
          className="font-heading text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all"
        >
          Save To Profile
        </button>
      </div>
    </div>
  );
};

export default Summary;
