import type { BlogPost } from "$lib/blogTypes";
import { type Post } from "$lib/server/prisma/client";
import { EmbedBuilder, WebhookClient } from "discord.js";

import { getPrismaClient } from "./prisma";
import { v4 as uuidv4 } from "uuid";
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

	let found = (await client.post.findFirst({ where: { id: name } })) as
		| Post
		| undefined;

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

export async function saveBlogPost(data: BlogPost): Promise<BlogPost> {
	const client = await getPrismaClient();
	if (data.identifier) {
		await updateBlogPost(data);
		return data;
	}

	data.identifier = uuidv4();

	console.log("saving blog post", data);
	await client.post.create({
		data: {
			id: data.identifier,
			title: data.title,
			content: data.content,
			author: data.author,
			createdAt: data.publishDate,
		},
	});
	const webhookClient = new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL ?? "" }); 
	webhookClient.send({
	content: '@Blog Updates, new blog post published: `' + data.title + '`\n' + (process.env.ORIGIN ?? 'https://luna.illuminantrecs.com') + '/blog/read?article=' + data.identifier,
	username: 'Illuminant Bot',
	avatarURL: '',
	});
	return data;
}
export async function deleteBlogPost(identifier: string): Promise<boolean> {
	const client = await getPrismaClient();
	console.log("deleting blog post", identifier);
	try {
		await client.post.delete({
			where: {
				id: identifier,
			},
		});
		return true;
	} catch (error) {
		return false;
	}
}

export async function updateBlogPost(data: BlogPost): Promise<void> {
	const client = await getPrismaClient();
	console.log("updating blog post", data);
	await client.post.update({
		where: {
			id: data.identifier,
		},
		data: {
			title: data.title,
			content: data.content,
			author: data.author,
		},
	});
}
