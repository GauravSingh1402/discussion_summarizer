import React, { useState } from "react";

const TextForm = ({ onSubmit, onPrev, data }) => {
	const [values, setValues] = useState(data);
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(values);
	};
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	return (
		<div className="flex flex-col items-center w-full px-5 py-8 justify-center gap-5">
			<h1 className="font-heading font-semibold text-lg">
				Add Original Content
			</h1>
			<textarea
				rows={8}
				className="bg-light-primary rounded-md p-5 w-[90%] sm:w-[80%] flex-wrap text-black"
				placeholder="Add your content here"
				name="text"
				type="text"
				onChange={handleChange}
			/>
			<div className="w-full flex gap-2 justify-center items-center">
				<button
					className="font-heading border-x-custom-gradient-start border-2 border-y-custom-gradient-end text-transparent bg-clip-text bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end bg-white rounded-md text-sm sm:text-lg px-2 py-1 sm:px-5 sm:py-2 hover:scale-110 transition-all"
					onClick={onPrev}
				>
					Back
				</button>
				<button
					className="font-heading text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all"
					onClick={handleSubmit}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default TextForm;
