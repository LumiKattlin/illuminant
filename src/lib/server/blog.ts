import type { BlogPost } from '$lib/blogTypes';
import { type Post } from '$lib/server/prisma/client';

import { getPrismaClient } from './prisma';

export async function getBlogPosts(): Promise<BlogPost[]> {
	let client = await getPrismaClient();

	return (await client.post.findMany()).map((p: Post) => {
		return {
			title: p.title,
			author: p.author,
			content: p.content,
			identifier: p.id,
			publishDate: p.createdAt,
		} as BlogPost;
	}) as BlogPost[];
}

export async function getBlogPost(name: string): Promise<BlogPost | undefined> {
	let client = await getPrismaClient();

	let found =
		(await client.post.findFirst({ where: { id: name } })) as | Post | undefined;

	if (!found) {
		return undefined;
	}

	return {
		author: found.author,
		content: found.content,
		identifier: found.id,
		publishDate: found.createdAt,
		title: found.title,
	} as BlogPost;
}

export async function saveBlogPost(data: BlogPost): Promise<void> {
	const client = await getPrismaClient();
	console.log('saving blog post', data);
	await client.post.create({
		data: {
			id: data.identifier,
			title: data.title,
			content: data.content,
			author: data.author,
			createdAt: data.publishDate,
		}
	});
}
export async function deleteBlogPost(identifier: string): Promise<boolean> {
	const client = await getPrismaClient();
	console.log('deleting blog post', identifier);
	try {
		await client.post.delete({
			where: {
				id: identifier,
			}
		});
		return true;
	}
	catch (error) {
		return false;
	}
}
