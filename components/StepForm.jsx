import React, { useState } from "react";
import SelectLanguage from "./SelectLanguage";
import TextForm from "../components/TextForm.jsx";
import AudioForm from "../components/AudioForm";
import VideoForm from "../components/VideoForm";
import CustomizeSummary from "./CustomizeSummary";


const StepForm = ({ currentTab }) => {
	// console.log(currentTab);
	const [step, setStep] = useState(1);
	const [data, setData] = useState({ limit: 100, top: 10 });
	const [lang, setLang] = useState("English");
	const handleNext = (values) => {
		step == 1 ? setLang(values) : setData({ ...data, ...values });
		setStep(step + 1);
	};

	const handlePrev = () => {
		setStep(step - 1);
	};

	
	return (
		<div className="w-full flex">
			{step == 1 && <SelectLanguage onSubmit={handleNext} />}
			{step === 2 &&
				(currentTab === "Text" ? (
					<TextForm onSubmit={handleNext} onPrev={handlePrev} data={data} />
				) : currentTab === "Audio" ? (
					<AudioForm onSubmit={handleNext} onPrev={handlePrev} data={data} />
				) : currentTab === "Video" ? (
					<VideoForm onSubmit={handleNext} onPrev={handlePrev} data={data} />
				) : null)}

			{step == 3 && (
				<CustomizeSummary
					onPrev={handlePrev}
					data={data}
				/>
			)}
		</div>
	);
};

export default StepForm;
