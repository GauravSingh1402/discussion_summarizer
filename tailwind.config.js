/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				light: {
					primary: "#fafafa",
					secondary: "#E5E5E5",
					content: "#121212",
				},
				dark: {
					primary: "#121212",
					secondary: "#373737",
					content: "#fafafa",
				},
				"custom-gradient": {
					start: "#ff0f7b",
					end: "#f89b29",
				},
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
			},
		},
	},
	variants: {
		extend: {
			textColor: ["dark"],
			backgroundColor: ["dark"],
		},
	},
	plugins: [],
};
