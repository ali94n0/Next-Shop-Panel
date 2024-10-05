import "../../globals.css";
import { vazirFont } from "@/constants/localFonts";
import Providers from "../../Providers";
import { Toaster } from "react-hot-toast";
import SubLayAdmin from "./SubLayAdmin";


export const metadata = {
	title: "Next Shop Panel | Admin dashboard",
	description: "پنل ادمین",
};

export default function Layout({ children }) {
	return (
		<html
			lang="fa"
			dir="rtl"
		>
			<body className={`${vazirFont.variable} font-sans`}>
				<div className="container xl:max-w-screen-xl">
					<Providers>
						<Toaster />
						<SubLayAdmin>
							{children}
						</SubLayAdmin>
					</Providers>
				</div>
			</body>
		</html>
	);
}
