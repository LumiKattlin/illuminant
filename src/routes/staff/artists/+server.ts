import type { Artist } from "$lib/staffTypes";
import { checkRequest } from "$lib/server/auth";
import { createArtist, getArtists, deleteArtist } from "$lib/server/artists";
import { error, json } from "@sveltejs/kit";

export async function GET(event) {
	return json(await getArtists(!!checkRequest(event)));
}

export async function POST(event) {
	console.log(event.request.method)

	if (!checkRequest(event)) {
		return error(401);
	}

	return json(await createArtist(await event.request.json() as Artist));
}

export async function DELETE(event) {
	if (!checkRequest(event)) {
		return error(401);
	}

	await deleteArtist(await event.request.json() as Artist);

	return new Response();
}