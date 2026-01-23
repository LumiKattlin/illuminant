import { getPrismaClient } from "./prisma";
import { v4 as uuidv4 } from "uuid";
import type { Artist } from "$lib/staffTypes";

export async function createArtist(artist: Artist) {
	const client = await getPrismaClient()

	console.log("update: ", artist)

	if (artist.id) {
		await updateArtist(artist);
		return artist;
	}

	artist.id = uuidv4();

	await client.artist.create({
		data: {
			name: artist.name,
			id: artist.id,
			about: artist.description,
			bio: artist.bio,
			image: artist.image,
			visible: artist.visible,
		},
	})
}

export async function getArtists(includeHidden: boolean): Promise<Artist[]> {
	const client = await getPrismaClient();

	let res = (await client.artist.findMany({
		where: includeHidden ? undefined : {
			visible: true
		}
	})).map((elem) => {
		return {
			id: elem.id,
			name: elem.name,
			description: elem.about,
			bio: elem.bio,
			color1: elem.color1,
			color2: elem.color2,
			image: elem.image,
			visible: elem.visible,
		} as Artist
	}).sort();

	return res;
}

export async function deleteArtist(artist: Artist) {
	const client = await getPrismaClient();

	await client.artist.delete({
		where: {
			id: artist.id,
		}
	})
}

export async function updateArtist(data: Artist) {
	const client = await getPrismaClient();

	await client.artist.update({
		where: {
			id: data.id,
		},
		data: {
			name: data.name,
			id: data.id,
			about: data.description,
			bio: data.bio,
			color1: data.color1,
			color2: data.color2,
			image: data.image,
			visible: data.visible,
		},
	});
}
