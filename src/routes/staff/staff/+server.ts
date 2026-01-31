import type { StaffMember } from "$lib/staffTypes";
import { checkRequest } from "$lib/server/auth";
import { createStaffMember, getStaffMembers, deleteStaffMember } from "$lib/server/staff";
import { error, json } from "@sveltejs/kit";

export async function GET(event) {
	return json(await getStaffMembers(!!checkRequest(event)));
}

export async function POST(event) {
	console.log(event.request.method)

	if (!checkRequest(event)) {
		return error(401);
	}

	return json(await createStaffMember(await event.request.json() as StaffMember));
}

export async function DELETE(event) {
	if (!checkRequest(event)) {
		return error(401);
	}

	await deleteStaffMember(await event.request.json() as StaffMember);

	return new Response();
}