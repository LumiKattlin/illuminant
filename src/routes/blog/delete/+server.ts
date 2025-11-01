import type { BlogPost } from "$lib/blogTypes";
import { checkRequest } from "$lib/server/auth";
import { deleteBlogPost, saveBlogPost } from "$lib/server/blog";
import { error, json } from "@sveltejs/kit";

interface DeleteResponse {
    success: boolean;
}

export async function DELETE(event) {
    if (!checkRequest(event)) {
        return error(401);
    }
    let post = event.url.searchParams.get("id") ?? "";

    return json({ success: await deleteBlogPost(post) } as DeleteResponse);
}
