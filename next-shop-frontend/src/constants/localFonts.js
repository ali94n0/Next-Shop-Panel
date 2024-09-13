import localFont from "next/font/local";

export const vazirFont = localFont({
	src: [
		{
			path: "../../public/fonts/vazir/Vazirmatn-Regular.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/vazir/Vazirmatn-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/vazir/Vazirmatn-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/vazir/Vazirmatn-ExtraBold.woff2",
			weight: "800",
			style: "normal",
		},
		{
			path: "../../public/fonts/vazir/Vazirmatn-Black.woff2",
			weight: "900",
			style: "normal",
		},
	],
	variable: "--font-vazir",
});
