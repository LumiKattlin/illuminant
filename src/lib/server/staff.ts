import { getPrismaClient } from "./prisma";
import { v4 as uuidv4 } from "uuid";
import type { StaffMember as StaffMember } from "$lib/staffTypes";

export async function createStaffMember(staffMember: StaffMember) {
	const client = await getPrismaClient()

	if (staffMember.id) {
		await updateStaffMember(staffMember);
		return staffMember;
	}

	staffMember.id = uuidv4();

	await client.staff.create({
		data: {
			name: staffMember.name,
			id: staffMember.id,
			about: staffMember.description,
			bio: staffMember.bio,
			image: staffMember.image,
			visible: staffMember.visible,
			color1: staffMember.color1,
			color2: staffMember.color2,
		},
	})
}

export async function getStaffMembers(includeHidden: boolean): Promise<StaffMember[]> {
	const client = await getPrismaClient();

	let res = (await client.staff.findMany({
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
			isStaff: true,
		} as StaffMember
	}).sort();

	return res;
}

export async function deleteStaffMember(staffMember: StaffMember) {
	const client = await getPrismaClient();

	await client.staff.delete({
		where: {
			id: staffMember.id,
		}
	})
}

export async function updateStaffMember(data: StaffMember) {
	const client = await getPrismaClient();

	await client.staff.update({
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
