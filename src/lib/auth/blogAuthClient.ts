export function hasBlogAuth(): boolean {
	return getAuth() != null
}

interface Session {
	user: string,
	password: string,
}

export function getAuth(): Session | null {
	const splitValues = document.cookie.split(";");

	const searchFor = "auth_token=";

	console.log(document.cookie)

	for (const value of splitValues) {
		if (value.indexOf(searchFor) == 0) {
			const token = value.substring(searchFor.length, value.length);

			if (!token) {
				continue;
			}

			return {
				password: token,
				user: ""
			}
		}
	}

	return null
}

export function getSessionHeaders(session: Session): Headers {
	return new Headers({
		"X-Session-User": session.user,
		"X-Session-Passwd": session.password,
	});
}

export function redirectIfNoAuth(): boolean {
	if (!hasBlogAuth()) {
		window.location.href = "/blog/login?redirect=" + encodeURI(window.location.href)
		return true
	}
	return false
}

export async function tryAuth(user: string, password: string): Promise<boolean> {
	document.cookie = `auth_token=${password}; maxAge=86400; path=/blog`

	return true
}

export async function logout() {
	document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/blog";
}