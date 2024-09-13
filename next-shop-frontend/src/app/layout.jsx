import "./globals.css";
import { vazirFont } from "@/constants/localFonts";
import Header from "@/app/Header.jsx";
import Providers from "./Providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
	title: "Next Shop Panel",
	description: "پروژه پنل فروشگاهی با نکست",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="fa"
			dir="rtl"
		>
			<body className={`${vazirFont.variable} font-sans`}>
				<div className="container xl:max-w-screen-xl">
					<Providers>
						<Toaster />
						<Header />
						{children}
					</Providers>
				</div>
			</body>
		</html>
	);
}
