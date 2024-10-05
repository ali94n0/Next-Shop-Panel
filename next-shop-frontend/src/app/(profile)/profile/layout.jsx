import "../../globals.css";
import { vazirFont } from "@/constants/localFonts";
import Providers from "../../Providers";
import { Toaster } from "react-hot-toast";
// import SideBar from "./sidebar";
// import { useState } from "react";
import SubLay from "./SubLay";

export const metadata = {
	title: "Next Shop Panel | user dashboard",
	description: "پنل کاربر",
};

export default function Layout({ children }) {
	


	return (
		<html
			lang="fa"
			dir="rtl"
		>
			<body className={`${vazirFont.variable} font-sans`}>
				<div className="lg:container xl:max-w-screen-xl">
					<Providers>
						<Toaster />
						<SubLay>
							{children}
						</SubLay>
					</Providers>
				</div>
			</body>
		</html>
	);
}
