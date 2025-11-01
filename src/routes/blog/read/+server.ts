import { error, json } from "@sveltejs/kit";
import { getBlogPost } from "$lib/server/blog";

export function GET(event) {

    let post = getBlogPost(event.url.searchParams.get("article") ?? "")

    if (!post) {
        return error(404)
    }

    return json(post)
}