export default async function middlewareAuth(request) {
	let cookieString = "";

	const allCookies = request.cookies.getAll();
	allCookies.forEach((item) => {
		cookieString += `${item.name}=${item.value} ;`;
	});

	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
		{
			credentials: "include",
			headers: {
				Cookie: cookieString,
			},
		},
	).then((res) => res.json());

	const { user } = data || {};

	return user;
}
