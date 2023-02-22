import React, { useState } from "react";

const CustomizeSummary = ({ onPrev, onSubmit, data }) => {
	const [values, setValues] = useState(data);
	const handleChange = (e) => {
		console.log(e.target.value);
		setValues({ ...values, [e.target.name]: parseInt(e.target.values) });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(values);
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
					rows={8}
					className="bg-light-primary rounded-md p-5 flex-wrap text-black flex-grow"
					placeholder="Add number of sentences"
					name="num_sent"
					type="number"
					onChange={handleChange}
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
					onClick={handleSubmit}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default CustomizeSummary;
