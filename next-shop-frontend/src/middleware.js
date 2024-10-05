import { NextResponse } from "next/server";
import { http } from "./services/httpService";
import middlewareAuth from "./utils/middlewareAuth";

export async function middleware(request) {
	const url = request.url;

	if (request.nextUrl.pathname.startsWith("/profile")) {
		const user = await middlewareAuth(request);
		if (user && user.role === "ADMIN") {
			return NextResponse.redirect(new URL("/admin", url));
		}
		if (!user) return NextResponse.redirect(new URL("/auth", url));
	}

	if (request.nextUrl.pathname.startsWith("/admin")) {
		const user = await middlewareAuth(request);
		if (user && user.role === "USER") {
			return NextResponse.redirect(new URL("/profile", url));
		}
		if (!user) return NextResponse.redirect(new URL("/auth", url));
	}
}

export const config = {
	matcher: ["/admin/:path*", "/profile/:path*"],
};
