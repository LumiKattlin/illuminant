import type { StaffMember } from "$lib/staffTypes";
import { checkRequest } from "$lib/server/auth";
import { createStaffMember, getStaffMembers, deleteStaffMember } from "$lib/server/staff";
import { error, json, text } from "@sveltejs/kit";
import { getPageText, setPageText } from "$lib/server/pageText.js";

export async function GET(event) {
	console.log(event.url.searchParams.get("id"))
	return text(await getPageText(event.url.searchParams.get("id") ?? "artists"));
}

export async function POST(event) {
	console.log(event.request.method)

	if (!checkRequest(event)) {
		return error(401);
	}

	await setPageText(event.url.searchParams.get("id") ?? "artists", await event.request.text())

	return new Response(null, {
		status: 200,
	});
}
