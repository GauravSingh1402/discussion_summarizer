import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div
			className={`flex gap-2 items-center relative rounded-full w-fit ${
				theme == "dark"
					? "bg-dark-secondary flex-row-reverse"
					: "bg-light-secondary"
			}`}
		>
			<button
				aria-label="Toggle dark mode"
				type="button"
				className={`${
					theme == "dark" ? "right-0" : "left-0"
				}absolute focus:outline-none bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-full z-10`}
				onClick={() => {
					setTimeout(() => {
						setTheme(theme === "dark" ? "light" : "dark");
					}, 1000);
				}}
			>
				{theme === "dark" ? (
					<div className="text-white p-2">
						<MoonIcon className="h-5 w-5" />
					</div>
				) : (
					<div className="text-white p-2">
						<SunIcon className="h-5 w-5" />
					</div>
				)}
			</button>
			<p className={`text-md py-1 ${theme == "dark" ? "pl-5" : "pr-5"}`}>
				{theme === "dark" ? "Dark mode" : "Light mode"}
			</p>
		</div>
	);
};

export default ThemeToggle;
