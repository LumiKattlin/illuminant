import { getPrismaClient } from "./prisma";

export async function getPageText(pageName: string): Promise<string> {
	const client = await getPrismaClient();
	const found = await client.pageText.findFirst({
		where: {
			identifier: pageName,
		}
	});

	return found?.text ?? "";
}

export async function setPageText(pageName: string, content: string) {
	const client = await getPrismaClient();
	const found = await client.pageText.count({
		where: {
			identifier: pageName,
		}
	});

	if (found > 0) {
		await client.pageText.update({
			data: {
				identifier: pageName,
				text: content
			},
			where: {
				identifier: pageName
			}
		});
		return;
	}

	await client.pageText.create({
		data: {
			identifier: pageName,
			text: content,
		},
	});
}
