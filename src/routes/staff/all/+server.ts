import type { StaffMember } from "$lib/staffTypes";
import { checkRequest } from "$lib/server/auth";
import { createArtist, getArtists, deleteArtist } from "$lib/server/artists";
import { error, json } from "@sveltejs/kit";
import { getStaffMembers } from "$lib/server/staff.js";

function shuffle(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
export async function GET(event) {
	return json(shuffle([...await getArtists(false), ...await getStaffMembers(false)]));
}

