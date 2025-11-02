import type { DraftData } from "$lib/blogTypes";
import { type Draft } from "$lib/server/prisma/client";
import { v4 as uuidv4 } from "uuid";

import { getPrismaClient } from "./prisma";

export async function getDrafts() {
    let client = await getPrismaClient();

    return (await client.draft.findMany()).map((p: Draft) => {
        return {
            title: p.title,
            author: p.author,
            content: p.content,
            identifier: p.id,
        } as DraftData;
    }) as DraftData[];
}

export async function getDraft(
    identifier: string,
): Promise<DraftData | undefined> {
    let client = await getPrismaClient();

    let found = (await client.draft.findFirst({ where: { id: identifier } })) as
        | Draft
        | undefined;

    if (!found) {
        return undefined;
    }

    return {
        author: found.author,
        content: found.content,
        identifier: found.id,
        title: found.title,
    } as DraftData;
}

export async function saveDraft(data: DraftData): Promise<DraftData> {
    if (data.identifier) {
        updateDraft(data);
		return data;
    }
    
	data.identifier = `draft-${uuidv4()}`;

    const client = await getPrismaClient();
    console.log("saving draft", data);
    await client.draft.create({
        data: {
            id: data.identifier,
            title: data.title,
            content: data.content,
            author: data.author,
        },
    });

    return data;
}

export async function deleteDraft(identifier: string): Promise<boolean> {
    const client = await getPrismaClient();
    console.log("deleting draft", identifier);
    try {
        await client.draft.delete({
            where: {
                id: identifier,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
}
export async function updateDraft(data: DraftData): Promise<void> {
    const client = await getPrismaClient();

    await client.draft.update({
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
