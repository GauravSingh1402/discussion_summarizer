import React, { useState } from "react";
import TextForm from "../components/TextForm.jsx";
import AudioForm from "../components/AudioForm";
import VideoForm from "../components/VideoForm";
import CustomizeSummary from "./CustomizeSummary";


const StepForm = ({ currentTab }) => {
	const [step, setStep] = useState(1);
	const [data, setData] = useState({ limit: 100, top: 10 });
	const handleNext = (values) => {
		setData({ ...data, ...values });
		setStep(step + 1);
	};

	const handlePrev = () => {
		setStep(step - 1);
	};

	
	return (
		<div className="w-full flex">
			{step === 1 &&
				(currentTab === "Text" ? (
					<TextForm onSubmit={handleNext} onPrev={handlePrev} data={data} />
				) : currentTab === "Audio" ? (
					<AudioForm onSubmit={handleNext} onPrev={handlePrev} data={data} />
				) : currentTab === "Video" ? (
					<VideoForm onSubmit={handleNext} onPrev={handlePrev} data={data} />
				) : null)}

			{step === 2 && (
				<CustomizeSummary
					onPrev={handlePrev}
					data={data}
				/>
			)}
		</div>
	);
};

export default StepForm;
