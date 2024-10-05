export const createCookieStr = (cookies) => {
	let cookieString = "";

	const allCookies = cookies.getAll();
	allCookies.forEach((item) => {
		cookieString += `${item.name}=${item.value} ;`;
	});

	return cookieString;
};
