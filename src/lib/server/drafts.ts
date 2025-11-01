import type { DraftData } from "$lib/blogTypes";
import { type Draft } from "$lib/server/prisma/client";

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
    const client = await getPrismaClient();
    console.log("saving draft", data);
    await client.draft.create({
        data: {
            id: data.identifier ?? `draft-${await client.draft.count()}`,
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
