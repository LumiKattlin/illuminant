import { checkRequest } from "$lib/server/auth.js";
import { error, text } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";

const IMAGE_PATH = "./img";

export async function GET(event): Promise<Response> {

	let id = event.url.searchParams.get("id");

	if (!id) {
		return error(400);
	}

	if (id.includes('/')) {
		return error(400);
	}

	if (!fs.existsSync(IMAGE_PATH)) {
		fs.mkdirSync(IMAGE_PATH);
	}

	const data = fs.readFileSync(IMAGE_PATH + "/" + id);
	// Determine the Content-Type from the file extension
	const contentType = 'image/png';

	return new Response(data, {
		headers: {
			"Content-Type": contentType,
		},
		status: 200,
	});
}

export async function POST(event): Promise<Response> {

	if (!checkRequest(event)) {
		return error(401);
	}

	console.log(process.cwd());
	if (!fs.existsSync(IMAGE_PATH)) {
		fs.mkdirSync(IMAGE_PATH);
	}

	let id = uuidv4();

	let responseBytes = await event.request.bytes();

	fs.writeFileSync(IMAGE_PATH + "/" + id, responseBytes, {
		encoding: "binary",
	});

	return text(id);
}
