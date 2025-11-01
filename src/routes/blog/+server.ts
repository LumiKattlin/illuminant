import { json } from "@sveltejs/kit";
import { getBlogPosts } from "$lib/server/blog";

export function GET() {

    return json(getBlogPosts())
}