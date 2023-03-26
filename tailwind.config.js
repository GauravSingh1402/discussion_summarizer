/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const rotateY = plugin(function ({ addUtilities }) {
	addUtilities({
		".rotate-y-20": {
			transform: "rotateY(180deg)",
		},
	});
});

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				light: {
					primary: "#fafafa",
					secondary: "#E5E5E5",
					content: "#121212",
					timepass: "#33ca47",
				},
				dark: {
					primary: "#121212",
					secondary: "#373737",
					content: "#fafafa",
					timepass: "#dd358f",
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
	plugins: [rotateY],
};

