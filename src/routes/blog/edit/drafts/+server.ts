import type { DraftData } from '$lib/blogTypes'
import { checkRequest } from '$lib/server/auth';
import { getDraft, getDrafts, saveDraft } from '$lib/server/drafts.js'
import { error, json } from '@sveltejs/kit'

export async function GET(event) {
    if (!checkRequest(event)) {
        return error(401);
    }

    let id = event.url.searchParams.get("id")

    if (id) {
        let draft = await getDraft(id);

        if (!draft) {
            return error(404)
        }

        return json(draft)
    }

    return json(await getDrafts())
}

export async function POST(event): Promise<Response> {
    if (!checkRequest(event)) {
        return error(401);
    }
    
    let draft = await event.request.json() as DraftData

    if (!draft) {
        return error(400)
    }

    draft = await saveDraft(draft)

    return json(draft)
}