import { getPrismaClient } from "./prisma";
import { v4 as uuidv4 } from "uuid";
import type { Artist } from "$lib/staffTypes";

export async function createArtist(artist: Artist) {
	const client = await getPrismaClient()

	console.log(artist)

	if (artist.id) {
		await updateArtist(artist);
		return artist;
	}

	artist.id = uuidv4();

	console.log("new artist!", artist)

	await client.artist.create({
		data: {
			id: artist.id,
			name: artist.name,
			about: artist.description
		},
	})
}

export async function getArtists(): Promise<Artist[]> {
	const client = await getPrismaClient();

	let res = (await client.artist.findMany()).map((elem) => {
		return {
			id: elem.id,
			name: elem.name,
			description: elem.about,
		} as Artist
	}).sort();
	console.log(res);
	return res;
}

export async function updateArtist(data: Artist) {
	const client = await getPrismaClient();
	console.log("updating artist", data);
	await client.artist.update({
		where: {
			id: data.id,
		},
		data: {
			name: data.name,
			id: data.id,
			about: data.description,
		},
	});
}
