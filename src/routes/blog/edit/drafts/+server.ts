import type { DraftData } from '$lib/blogTypes'
import { getDraft, getDrafts, saveDraft } from '$lib/server/drafts.js'
import { error, json } from '@sveltejs/kit'

export async function GET(event) {
    let id = event.url.searchParams.get("id")

    if (id) {
        let draft = getDraft(id);

        if (!draft) {
            return error(404)
        }

        return json(draft)
    }

    return json(getDrafts())
}

export async function POST(event): Promise<Response> {
    let draft = await event.request.json() as DraftData

    if (!draft) {
        return error(400)
    }

    draft = saveDraft(draft)

    return json(draft)
}