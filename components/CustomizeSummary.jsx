import React, { useState,useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import RingLoader from "react-spinners/RingLoader";
const CustomizeSummary = ({ onPrev, onSubmit, data }) => {
	const link="http://localhost:5000/"
	const handleSummarySubmit = async () => {
		const body = {
			text: data["text"],
			isConversation: data["isConversation"],
			doCheck: data["doCheck"],
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
				if (response.data["summary"]["convo_bart"]!= undefined && response.data["summary"]["convo_bart"]!=null)
				{
				
					Router.push({
						pathname: "/output",
						query: {
							title:response.data["summary"]["title"],
							text:data["text"],
							bart:response.data["summary"]["bart"],
							convo_bart:response.data["summary"]["convo_bart"],
						},
					});
				}
				else
				{
					Router.push({
						pathname: "/output",
						query: {
							kl: response.data["summary"]["kl"],
							lsa: response.data["summary"]["lsa"],
							title:response.data["summary"]["title"],
							text:data["text"],
							bart:response.data["summary"]["bart"],
						},
					});
				}
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		handleSummarySubmit();
	}, [])
	return (
		<div className="flex flex-col items-center w-full px-5 py-8 justify-center gap-10">
<RingLoader color=" #f89b29" size={120}  speedMultiplier={0.5}/>
<h1 className="text-center font-heading font-semibold text-md sm:text-lg">
				Generating Summary ...
			</h1>
		</div>
	);
};

export default CustomizeSummary;
