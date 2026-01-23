export function hasBlogAuth(): boolean {
	return getAuth() != null;
}
type AuthResponse = {
	authenticated: boolean;
};
type AuthRequest = {
	username: string;
	password: string;
};

interface Session {
	user: string;
	password: string;
}

export function getAuth(): Session | null {
	const splitValues = document.cookie.split(";");

	const user = "auth_user=";
	const password = "auth_password=";

	let foundUser = "";
	let foundPassword = "";

	for (let value of splitValues) {
		value = value.trim()

		if (value.indexOf(user) == 0) {
			const token = value.substring(user.length, value.length);

			if (!token) {
				continue;
			}
			foundUser = token;
		} else if (value.indexOf(password) == 0) {
			const token = value.substring(password.length, value.length);

			if (!token) {
				continue;
			}
			foundPassword = token;
		}
	}

	if (foundUser && foundPassword) {
		return {
			password: foundPassword,
			user: foundUser,
		};
	}

	return null;
}

export function getSessionHeaders(session: Session): Headers {
	return new Headers({
		"X-Session-User": session.user,
		"X-Session-Passwd": session.password,
	});
}

export function redirectIfNoAuth(): boolean {
	if (!hasBlogAuth()) {
		window.location.href = "/login?redirect=" +
			encodeURI(window.location.href);
		return true;
	}
	return false;
}

export async function tryAuth(
	user: string,
	password: string,
): Promise<boolean> {
	const request: AuthRequest = { username: user, password: password };
	const authRequest = await fetch(
		"/login",
		{ method: "POST", body: JSON.stringify(request) },
	);

	const requestJson = await authRequest.json();
	console.log(requestJson);
	if (!requestJson.authenticated) {
		return false;
	}
	document.cookie = `auth_user=${user}; maxAge=86400; path=/`;
	document.cookie = `auth_password=${password}; maxAge=86400; path=/`;

	return true;
}

export async function logout() {
	document.cookie =
		"auth_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	document.cookie =
		"auth_password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}
