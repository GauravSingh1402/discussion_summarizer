import React, { useState } from "react";
import SelectLanguage from "./SelectLanguage";
import TextForm from "../components/TextForm.jsx";
import AudioForm from "../components/AudioForm";
import VideoForm from "../components/VideoForm";
import CustomizeSummary from "./CustomizeSummary";
import axios from "axios";
import Router from "next/router";

const StepForm = ({ currentTab }) => {
	const [step, setStep] = useState(1);
	const [data, setData] = useState({ limit: 100, top: 10 });
	const [lang, setLang] = useState("English");
	const handleNext = (values) => {
		step === 1 ? setLang(values) : setData({ ...data, ...values });
		setStep(step + 1);
	};

	const handlePrev = () => {
		setStep(step - 1);
	};

	const handleSummarySubmit = async () => {
		console.log(data);
		const response = await axios.post("http://localhost:5000/summarize", data, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(response.data);
		Router.push({
			pathname: "/output",
			state: {
				kl: response.data["summary"]["kl"],
				lsa: response.data["summary"]["lsa"],
			},
		});
	};

	return (
		<div className="w-full flex">
			{step === 1 && <SelectLanguage onSubmit={handleNext} />}
			{step === 2 &&
				(currentTab === "Text" ? (
					<TextForm onSubmit={handleNext} onPrev={handlePrev} data={data} />
				) : currentTab === "Audio" ? (
					<AudioForm onSubmit={handleNext} onPrev={handlePrev} data={data} />
				) : currentTab === "Video" ? (
					<VideoForm onSubmit={handleNext} onPrev={handlePrev} data={data} />
				) : null)}

			{step === 3 && (
				<CustomizeSummary
					onSubmit={handleNext}
					onPrev={handlePrev}
					data={data}
				/>
			)}

			{step === 4 && (
				<div className="w-full flex flex-col items-center p-5 gap-10">
					<h1 className="font-heading text-lg font-semibold">
						Ready to Submit?
					</h1>
					<div className="flex w-[40%] justify-between self-center">
						<button
							className="w-[45%] font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md px-5 py-2 hover:scale-110 transition-all"
							onClick={handlePrev}
						>
							Previous
						</button>
						<button
							className="w-[45%] font-heading bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
							onClick={handleSummarySubmit}
						>
							Submit
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default StepForm;
