import type { Artist } from "$lib/staffTypes";
import { checkRequest } from "$lib/server/auth";
import { createArtist, getArtists } from "$lib/server/artists";
import { error, json } from "@sveltejs/kit";

export async function GET() {
	return json(await getArtists());
}

export async function POST(event) {
	 if (!checkRequest(event)) {
		return error(401);
	}
	
	return json(await createArtist(await event.request.json() as Artist));
}
