import { createCookieStr } from "./createCookieStr";

export default async function middlewareAuth(request) {
	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
		{
			credentials: "include",
			headers: {
				Cookie: createCookieStr(request.cookies),
			},
		},
	).then((res) => res.json());

	const { user } = data || {};

	return user;
}
