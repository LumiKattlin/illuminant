import type { DraftData } from "$lib/blogTypes";

let drafts: {[identifier: string]: DraftData} = {}
let draftNumber: number = 0

export function getDrafts() {
    return Object.values(drafts);
}

export function getDraft(identifier: string) {
    return Object.values(drafts).find((d) => d.identifier == identifier);
}

export function saveDraft(data: DraftData): DraftData {

    if (!data.identifier.length) {
        data.identifier = "draft" + draftNumber++
    }

    drafts[data.identifier] = data;

    return data;
}