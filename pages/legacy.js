import React, { useState, useEffect, useRef } from 'react';
import adidas from '../public/sound.wav';
const Text = () => {
    const summary = 'As an AI language model, I can provide a general summary of what an interview conversation might entail. An interview is a formal discussion between an interviewer and a candidate for a job or position. The interviewer will typically ask questions about the candidate qualifications, experience, and suitability for the role, while the candidate will have the opportunity to showcase their skills and expertise.';

    const [currentWord, setCurrentWord] = useState(0);
    const [isReading, setIsReading] = useState(false);

    const audioRef = useRef(null);

    // Regular expression to split summary into words
    const words = summary.match(/\S+/g);

    // Array of stop words
    const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'to', 'of', 'in', 'it', 'on', 'at', 'for', 'with', 'from', 'by', 'as', 'is', 'was', 'were', 'be', 'being', 'been', 'that', 'this', 'these', 'those', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must', 'ought', 'shall', 'should'];

    useEffect(() => {
        // Initialize the audio player
        const audio = audioRef.current;
        const source = audio.src;
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const sourceNode = audioContext.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(audioContext.destination);

        const frequencyData = new Uint8Array(analyser.frequencyBinCount);

        // Start playing the audio file and update the highlighted word based on the audio playback
        audio.play();
        setIsReading(true);

        const updateCurrentWord = () => {
            analyser.getByteFrequencyData(frequencyData);

            // Calculate the average amplitude of the audio for the current word
            const wordIndex = Math.min(Math.floor((currentWord + 1) * (frequencyData.length / words.length)), frequencyData.length - 1);
            const amplitude = frequencyData[wordIndex];

            // Update the current word if the amplitude of the audio for the current word is above a certain threshold
            if (amplitude > 128) {
                setCurrentWord(currentWord + 1);
            }

            // Stop the audio playback and reset the current word when the audio has finished
            if (currentWord >= words.length) {
                audio.pause();
                audio.currentTime = 0;
                setCurrentWord(0);
                setIsReading(false);
            }
        };

        // Call updateCurrentWord every 50 milliseconds to update the highlighted word
        const interval = setInterval(updateCurrentWord, 50);

        // Clean up the audio player and interval when the component unmounts
        return () => {
            audio.pause();
            audio.currentTime = 0;
            clearInterval(interval);
            sourceNode.disconnect();
            analyser.disconnect();
            audioContext.close();
        };
    }, []);
    // Function to handle clicking on the play/pause button
    const togglePlayback = () => {
        const audio = audioRef.current;

        if (audio.paused) {
            audio.play();
            setIsReading(true);
        } else {
            audio.pause();
            setIsReading(false);
        }
    };

    // Function to generate the text display with highlighted current word
    const generateText = () => {
        let text = '';
        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (stopWords.includes(word)) {
                text += `${word} `;
            } else {
                text += `
            ${i === currentWord ? '<span class="highlight">' : ''}
            ${word}
            ${i === currentWord ? '</span>' : ''} `;
            }
        }
        return text;
    };

    return (
        <div>
            <p dangerouslySetInnerHTML={{ __html: generateText() }} />
            <audio ref={audioRef} src={adidas} type="audio/wav" />
            <button onClick={togglePlayback}>{isReading ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default Text;