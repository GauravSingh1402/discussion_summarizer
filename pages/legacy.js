import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from "../styles/Flipbook.module.css";
const Text = () => {
    const imgUrls = ["https://tse1.mm.bing.net/th?id=OIP.2LqG2bpRqx89GgH8ICkvwgHaLH&pid=Api&P=0", "https://tse4.mm.bing.net/th?id=OIP.iHLjOBL6DWyesiNRxcqd2wHaLH&pid=Api&P=0", "https://tse4.mm.bing.net/th?id=OIP.PITA3X2LtCSl6_3aRIDeHwHaLG&pid=Api&P=0", "https://tse3.mm.bing.net/th?id=OIP.nKYUL15wpQ6mHYHpt-r-nAHaLK&pid=Api&P=0"]
    const [showDropDown, setShowDropDown] = useState(false)
    const [imgUrl, setImgUrl] = useState("https://tse1.mm.bing.net/th?id=OIP.2LqG2bpRqx89GgH8ICkvwgHaLH&pid=Api&P=0");
    const [current, setCurrent] = useState(0)
    const prev = () => {
        setCurrent(current === 0 ? imgUrls.length - 1 : current - 1)
        setImgUrl(imgUrl)
    }
    const next = () => {
        setCurrent(current === imgUrls.length - 1 ? 0 : current + 1)
        setImgUrl(imgUrl)
    }
    const [showSummary, setShowSummary] = useState(false);
    const [random, setrandom] = useState(0);
    return (
        <>
            <div className="text-lg font-medium bg-red-200">
                <div className="relative text-left inline-block w-fit">
                    <div className="relative z-20 flex items-center justify-center">
                        <button
                            onClick={() => {
                                setShowDropDown(!showDropDown);
                            }}
                            className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                            <img src={imgUrl} alt="img" />
                            {showDropDown ? (
                                ""
                            ) : (
                                <svg
                                    className="-mr-1 ml-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    {showDropDown ? (
                        <motion.div initial={{ transform: 'translateX(-90%)' }}
                            animate={{ transform: 'translateX(0%)' }}
                            exit={{ transform: 'translateX(-90%)' }}
                            transition={{
                                type: "spring",
                                duration: 0.5
                            }} className="animate-slide-out transition-all duration-10000 flex items-center absolute z-10 bg-white top-0 left-[100%] px-4 py-2 w-full h-full origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <button onClick={prev} className='mr-2 p-2 rounded-full bg-gray-400'>
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                            <div className="flex relative overflow-hidden">
                                <div className="relative flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
                                    {
                                        imgUrls.map((value, x) => (
                                            <img src={value} alt="img" onClick={() => { setImgUrl(imgUrls[current]); setShowDropDown(!showDropDown) }} />

                                        ))
                                    }
                                </div>
                                <div className='absolute bottom-4 right-0 left-0'>
                                    <div className='flex items-center justify-center gap-2'>

                                        {
                                            imgUrls.map((value, x) => (
                                                <div className={`transition-all w-3 h-3 bg-white rounded-full ${current === x ? "p-2" : "bg-opacity-50"}`}>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <button onClick={next} className='ml-2 p-2 rounded-full bg-gray-400'>
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </motion.div>
                    ) : (
                        ""
                    )}
                </div>
                <div>
                    <button>Back</button>
                    <button>Convert</button>
                </div>
            </div>

            <div className='flex relative overflow-hidden bg-yellow-200 w-[100vw] h-[100vh] '>
                <AnimatePresence>
                    {
                        random == 0 ?
                            <motion.div key={random} initial={{ x: -100 }} animate={{ x: 0 }} exit={{ x: 100 }} className='bg-blue-300 flex items-center justify-end'>
                                <div className='flex items-center w-full justify-between h-full bg-red-300'>
                                    <h2>Hello World</h2>
                                    <button onClick={() => { setrandom(random + 1) }}>Next</button>
                                </div>

                            </motion.div>
                            :
                            <motion.div key={random} initial={{ x: 100 }} animate={{ x: 0 }} exit={{ x: -100 }} className='absolute w-[100vw] h-[100vh] bg-blue-300 flex items-center justify-end'>
                                <div className='flex items-center w-full justify-between h-full bg-green-300'>
                                    <h2>Bye World</h2>
                                    <button onClick={() => { setrandom(random - 1) }}>Prev</button>
                                </div>

                            </motion.div>
                    }
                </AnimatePresence>

            </div>
            <div className={styles.main}>
                <div className={styles.book}>
                    <div className={`${styles.cover}`}></div>
                    <div className={styles.summary}>
                        Summary
                    </div>
                    <div className={styles.backCover}></div>
                </div>
            </div>
            <div className='w-[100vw] h-[100vh] p-5 grid grid-cols-2 items-center justify-center gap-y-32'>
                <div onClick={() => { setShowSummary(!showSummary) }} className='ml-[50%] w-[21rem] h-[30rem] relative flex items-center hover:cursor-pointer'>
                    <div className={`${!showSummary ? 'absolute z-30 w-[21rem] h-[30rem] rounded-r-3xl transition-all duration-30000 origin-left' : 'absolute z-20 w-[21rem] h-[30rem] rounded-r-3xl transition-all duration-30000 rotate-y-20 origin-left'}`} >
                        <img src={imgUrl} className='w-full h-full rounded-r-3xl' alt='book-cover' />
                    </div>
                    <div className={`${!showSummary ? 'p-2 absolute z-20 w-80 h-[28rem] bg-white rounded-l-3xl' : 'p-2 absolute z-40 w-80 h-[28rem] bg-white rounded-l-3xl -translate-x-full transition-all duration-30000 border-r-2 shadow-xl border-r-gray-500'}`}>
                        <h1 className='text-lg underline  text-center text-black'>Title</h1>
                        <p className='text-xs text-justify text-black'>
                            Author Book
                        </p>
                        <p className='text-xs text-justify text-black'>
                            Duration
                        </p>
                    </div>
                    <div className='select-auto p-2 absolute z-10 w-80 h-[28rem] bg-white rounded-r-3xl'>
                        <h1 className='text-lg underline  text-center text-black'>Summary</h1>
                        <p className='text-xs text-justify text-black'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ipsam consectetur sunt quod. Molestias, maiores sapiente. Unde quaerat, tenetur labore quo consequatur quibusdam repellendus harum ad vitae inventore amet dolore.
                            Adipisci laboriosam est fugiat vero facilis aspernatur maiores, eveniet harum, aliquid inventore quae laborum necessitatibus, veniam cupiditate vitae quaerat nesciunt deserunt repudiandae. Optio, in! Magni eveniet iusto quam veritatis corrupti.
                            Est laudantium perspiciatis, veritatis iure voluptatum libero ipsa, quo eligendi delectus impedit soluta officiis non ab blanditiis! Dolorum, dicta. Numquam voluptates hic recusandae totam sint ipsa inventore consequuntur laboriosam officia.
                            Veniam nihil reprehenderit, fugit impedit ad quae molestiae libero reiciendis sit alias facilis quam provident consectetur accusamus voluptas inventore! Repudiandae saepe alias excepturi, doloremque ipsum doloribus explicabo consequatur reiciendis architecto.
                            Asperiores dignissimos voluptatum dicta sed deleniti, quae accusamus perferendis temporibus voluptatibus neque ea. Natus, dolores error optio doloribus vero aut nam minus rerum quidem praesentium neque enim, odio dolorem impedit!
                        </p>
                    </div>
                    <div className='absolute -z-10 w-[21rem] h-[30rem] bg-blue-300 rounded-r-3xl'></div>
                </div>
                <div onClick={() => { setShowSummary(!showSummary) }} className='ml-[50%] w-[21rem] h-[30rem] relative flex items-center hover:cursor-pointer'>
                    <div className={`${!showSummary ? 'absolute z-30 w-[21rem] h-[30rem] rounded-r-3xl transition-all duration-30000 origin-left' : 'absolute z-20 w-[21rem] h-[30rem] rounded-r-3xl transition-all duration-30000 rotate-y-20 origin-left'}`}>
                        <img src={imgUrl} className='w-full h-full rounded-r-3xl' alt='book-cover' />
                    </div>
                    <div className={`${!showSummary ? 'p-2 absolute z-20 w-80 h-[28rem] bg-white rounded-l-3xl' : 'p-2 absolute z-40 w-80 h-[28rem] bg-white rounded-l-3xl -translate-x-full transition-all duration-30000 border-r-2 shadow-xl border-r-gray-500'}`}>
                        <h1 className='text-lg underline  text-center text-black'>Title</h1>
                        <p className='text-xs text-justify text-black'>
                            Author Book
                        </p>
                        <p className='text-xs text-justify text-black'>
                            Duration
                        </p>
                    </div>
                    <div className='select-auto p-2 absolute z-10 w-80 h-[28rem] bg-white rounded-r-3xl'>
                        <h1 className='text-lg underline  text-center text-black'>Summary</h1>
                        <p className='text-xs text-justify text-black'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ipsam consectetur sunt quod. Molestias, maiores sapiente. Unde quaerat, tenetur labore quo consequatur quibusdam repellendus harum ad vitae inventore amet dolore.
                            Adipisci laboriosam est fugiat vero facilis aspernatur maiores, eveniet harum, aliquid inventore quae laborum necessitatibus, veniam cupiditate vitae quaerat nesciunt deserunt repudiandae. Optio, in! Magni eveniet iusto quam veritatis corrupti.
                            Est laudantium perspiciatis, veritatis iure voluptatum libero ipsa, quo eligendi delectus impedit soluta officiis non ab blanditiis! Dolorum, dicta. Numquam voluptates hic recusandae totam sint ipsa inventore consequuntur laboriosam officia.
                            Veniam nihil reprehenderit, fugit impedit ad quae molestiae libero reiciendis sit alias facilis quam provident consectetur accusamus voluptas inventore! Repudiandae saepe alias excepturi, doloremque ipsum doloribus explicabo consequatur reiciendis architecto.
                            Asperiores dignissimos voluptatum dicta sed deleniti, quae accusamus perferendis temporibus voluptatibus neque ea. Natus, dolores error optio doloribus vero aut nam minus rerum quidem praesentium neque enim, odio dolorem impedit!
                        </p>
                    </div>
                    <div className='absolute -z-10 w-[21rem] h-[30rem] bg-blue-300 rounded-r-3xl'></div>
                </div>

            </div>

        </>
    );
};
export default Text;




// import React, { useState, useEffect, useRef } from 'react';
// import adidas from '../public/sound.wav';
// const Text = () => {
//     const summary = 'As an AI language model, I can provide a general summary of what an interview conversation might entail. An interview is a formal discussion between an interviewer and a candidate for a job or position. The interviewer will typically ask questions about the candidate qualifications, experience, and suitability for the role, while the candidate will have the opportunity to showcase their skills and expertise.';

//     const [currentWord, setCurrentWord] = useState(0);
//     const [isReading, setIsReading] = useState(false);

//     const audioRef = useRef(null);

//     // Regular expression to split summary into words
//     const words = summary.match(/\S+/g);

//     // Array of stop words
//     const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'to', 'of', 'in', 'it', 'on', 'at', 'for', 'with', 'from', 'by', 'as', 'is', 'was', 'were', 'be', 'being', 'been', 'that', 'this', 'these', 'those', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must', 'ought', 'shall', 'should'];

//     useEffect(() => {
//         // Initialize the audio player
//         const audio = audioRef.current;
//         const source = audio.src;
//         const audioContext = new AudioContext();
//         const analyser = audioContext.createAnalyser();
//         const sourceNode = audioContext.createMediaElementSource(audio);
//         sourceNode.connect(analyser);
//         analyser.connect(audioContext.destination);

//         const frequencyData = new Uint8Array(analyser.frequencyBinCount);

//         // Start playing the audio file and update the highlighted word based on the audio playback
//         audio.play();
//         setIsReading(true);

//         const updateCurrentWord = () => {
//             analyser.getByteFrequencyData(frequencyData);

//             // Calculate the average amplitude of the audio for the current word
//             const wordIndex = Math.min(Math.floor((currentWord + 1) * (frequencyData.length / words.length)), frequencyData.length - 1);
//             const amplitude = frequencyData[wordIndex];

//             // Update the current word if the amplitude of the audio for the current word is above a certain threshold
//             if (amplitude > 128) {
//                 setCurrentWord(currentWord + 1);
//             }

//             // Stop the audio playback and reset the current word when the audio has finished
//             if (currentWord >= words.length) {
//                 audio.pause();
//                 audio.currentTime = 0;
//                 setCurrentWord(0);
//                 setIsReading(false);
//             }
//         };

//         // Call updateCurrentWord every 50 milliseconds to update the highlighted word
//         const interval = setInterval(updateCurrentWord, 50);

//         // Clean up the audio player and interval when the component unmounts
//         return () => {
//             audio.pause();
//             audio.currentTime = 0;
//             clearInterval(interval);
//             sourceNode.disconnect();
//             analyser.disconnect();
//             audioContext.close();
//         };
//     }, []);
//     // Function to handle clicking on the play/pause button
//     const togglePlayback = () => {
//         const audio = audioRef.current;

//         if (audio.paused) {
//             audio.play();
//             setIsReading(true);
//         } else {
//             audio.pause();
//             setIsReading(false);
//         }
//     };

//     // Function to generate the text display with highlighted current word
//     const generateText = () => {
//         let text = '';
//         for (let i = 0; i < words.length; i++) {
//             let word = words[i];
//             if (stopWords.includes(word)) {
//                 text += `${word} `;
//             } else {
//                 text += `
//             ${i === currentWord ? '<span class="highlight">' : ''}
//             ${word}
//             ${i === currentWord ? '</span>' : ''} `;
//             }
//         }
//         return text;
//     };

//     return (
//         <div>
//             <p dangerouslySetInnerHTML={{ __html: generateText() }} />
//             <audio ref={audioRef} src={adidas} type="audio/wav" />
//             <button onClick={togglePlayback}>{isReading ? 'Pause' : 'Play'}</button>
//         </div>
//     );
// };

// export default Text;