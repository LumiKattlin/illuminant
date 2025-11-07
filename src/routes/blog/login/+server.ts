import { json } from '@sveltejs/kit';

type AuthResponse = {
    authenticated: boolean;
} 
type AuthRequest = {
    username: string; password: string
}

export async function POST(event) {
    const _username = process.env.BLOG_USERNAME;
    const _password = process.env.BLOG_PASSWORD;

    const data = await event.request.json() as AuthRequest;

    if (data.username != _username || data.password != _password) {
        return json({ authenticated: false });
    }
    return json({ authenticated: true });
}