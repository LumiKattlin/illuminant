import { type RequestEvent } from "@sveltejs/kit";

export function checkRequest(event: RequestEvent): boolean {
	const passwordHeader = "X-Session-Passwd".toLowerCase();
	const userHeader = "X-Session-User".toLowerCase();

	const _username = import.meta.env.VITE_BLOG_USERNAME;
	const _password = import.meta.env.VITE_BLOG_PASSWORD;

	let password = "";
	let user = "";

	for (const [name, value] of event.request.headers) {
		if (name === passwordHeader) {
			password = value;
		}

		if (name === userHeader) {
			user = value;
		}
	}

	return user === _username && password === _password;
}
