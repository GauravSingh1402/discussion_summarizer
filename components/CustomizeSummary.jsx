import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
const CustomizeSummary = ({ onPrev, onSubmit, data }) => {
	const [values, setValues] = useState("");
	const handleSummarySubmit = async () => {
		const body = {
			text: data["text"],
			num_sent: parseInt(values),
		};
		console.log(body);
		const response = await axios
			.post("https://discussionsummarizerbackend-production.up.railway.app/summarize", body, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log(response.data);
				console.log(JSON.stringify(response.data));
				Router.push({
					pathname: "/output",
					query: {
						kl: response.data["summary"]["kl"],
						lsa: response.data["summary"]["lsa"],
						title:response.data["summary"]["title"],
						text:data["text"]
					},
				});
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="flex flex-col items-center w-full px-5 py-8 justify-center gap-10">
			<h1 className="font-heading font-semibold text-lg">
				Customize Summary Requirements
			</h1>
			<div className="flex w-[80%] justify-between gap-10 items-center">
				<h2 className="font-heading font-medium">
					Set number of sentences for the summary
				</h2>
				<input
					className="bg-light-primary rounded-md p-5 flex-wrap text-black flex-grow"
					placeholder="Add number of sentences"
					name="num_sent"
					type="number"
					value={values}
					onChange={(e) => {
						setValues(e.target.value);
					}}
				/>
			</div>
			<div className="flex w-[25%] justify-between">
				<button
					className="font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end w-[40%] text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md px-5 py-2 hover:scale-110 transition-all"
					onClick={onPrev}
				>
					Back
				</button>
				<button
					className="font-heading text-white w-[50%] bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-5 py-2 hover:scale-110 transition-all"
					onClick={handleSummarySubmit}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default CustomizeSummary;
