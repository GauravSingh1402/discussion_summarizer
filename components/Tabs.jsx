import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useTheme } from "next-themes";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Tabs = () =>{
	let [categories] = useState({
		Recent: [
			{
				id: 1,
				title: "Does drinking coffee make you smarter?",
				date: "5h ago",
				commentCount: 5,
				shareCount: 2,
			},
			{
				id: 2,
				title: "So you've bought coffee... now what?",
				date: "2h ago",
				commentCount: 3,
				shareCount: 2,
			},
		],
		Popular: [
			{
				id: 1,
				title: "Is tech making coffee better or worse?",
				date: "Jan 7",
				commentCount: 29,
				shareCount: 16,
			},
			{
				id: 2,
				title: "The most innovative things happening in coffee",
				date: "Mar 19",
				commentCount: 24,
				shareCount: 12,
			},
		],
		Trending: [
			{
				id: 1,
				title: "Ask Me Anything: 10 answers to your questions about coffee",
				date: "2d ago",
				commentCount: 9,
				shareCount: 5,
			},
			{
				id: 2,
				title: "The worst advice we've ever heard about coffee",
				date: "4d ago",
				commentCount: 1,
				shareCount: 2,
			},
		],
	});
  const { theme, setTheme } = useTheme();
  console.log(theme)
	return (
		<div>
			<Tab.Group>
				<Tab.List className='bg-[#fafafa] flex space-x-1 rounded-xl p-1'>
						<Tab
							key='Text'
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-content",
									"focus:outline-none focus:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end",
									selected
										? "bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
										: "text-content hover:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
								)
							}
						>
							Text
						</Tab>
            	<Tab
							key='Audio'
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-content",
									"focus:outline-none focus:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end",
									selected
										? "bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
										: "text-content hover:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
								)
							}
						>
							Audio
						</Tab>
            	<Tab
							key='Video'
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-content",
									"focus:outline-none focus:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end",
									selected
										? "bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
										: "text-content hover:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
								)
							}
						>
							Video
						</Tab>
				</Tab.List>
				<Tab.Panels className="mt-2">
						<Tab.Panel
							key='Text'
							className={classNames(
								"rounded-xl bg-secondary text-content p-3",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
							)}
						>
							Text
						</Tab.Panel>
            <Tab.Panel
							key='Audio'
							className={classNames(
								"rounded-xl bg-secondary text-content p-3",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
							)}
						>
              Audio
						</Tab.Panel>
            <Tab.Panel
							key='Video'
							className={classNames(
								"rounded-xl bg-secondary text-content p-3",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
							)}
						>
              Video
						</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

export default Tabs