import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				// military: "#040f0a",
				// military: "#06140d",
				"military-900": "#071a10",
				"military-800": "#081f13",
				"military-700": "#0a2416",
				"military-600": "#0b291a",
				"military-500": "#0d2e1d",
				"military-400": "#0e3320",
				"military-300": "#264736",
				"military-200": "#3e5c4d",
				"military-100": "#567063",
				// military: "#6e8579",
				// military: "#879990",
				// military: "#9fada6",
				// military: "#b7c2bc",
				// military: "#cfd6d2",
				// military: "#e7ebe9",
				"meadow-900": "#665400",
				"meadow-800": "#806a00",
				"meadow-700": "#b39400",
				"meadow-600": "#cca900",
				"meadow-500": "#e6be00",
				"meadow-400": "#ffd300",
				"meadow-300": "#ffe04d",
				"meadow-200": "#ffe980",
				"meadow-100": "#fff2b3",
			},
		},
	},
	plugins: [],
} satisfies Config;
