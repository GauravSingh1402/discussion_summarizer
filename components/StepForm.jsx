import React, { useState } from "react";
import SelectLanguage from "./SelectLanguage";
import TextForm from "../components/TextForm.jsx";
import AudioForm from "../components/AudioForm";
import VideoForm from "../components/VideoForm";
import CustomizeSummary from "./CustomizeSummary";
import axios from "axios";

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

	const handleSummarySubmit = async () => {
		console.log(data);
		const response = await axios
			.post("http://localhost:5000/summarize", data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log(response.data.summary.ls);
			})
			.catch((err) => console.log(err));
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
					onSubmit={handleNext}
					onPrev={handlePrev}
					data={data}
				/>
			)}
			{step == 4 && handleSummarySubmit()}
		</div>
	);
};

export default StepForm;
