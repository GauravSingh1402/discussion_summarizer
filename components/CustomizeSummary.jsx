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
			.post(`${link}summarize`, body, {
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
						text:data["text"],
					},
				});
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="flex flex-col items-center w-full px-5 py-8 justify-center gap-10">
			<h1 className="text-center font-heading font-semibold text-md sm:text-lg">
				Customize Summary Requirements
			</h1>
			<div className="flex w-[80%] flex-col sm:flex-row justify-between gap-5 md:gap-10 items-center">
				<h2 className="font-heading font-medium text-sm sm:text-md text-center">
					Set number of sentences for the summary
				</h2>
				<input
					className="bg-light-primary rounded-md p-5 w-full text-black"
					placeholder="Number of sentences"
					name="num_sent"
					type="number"
					value={values}
					onChange={(e) => {
						setValues(e.target.value);
					}}
				/>
			</div>
			<div className="w-full flex gap-2 justify-center items-center">
				<button
					className="font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md text-sm sm:text-lg px-2 py-1 sm:px-5 sm:py-2 hover:scale-110 transition-all"
					onClick={onPrev}
				>
					Back
				</button>
				<button
					className="font-heading text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all"
					onClick={handleSummarySubmit}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default CustomizeSummary;
