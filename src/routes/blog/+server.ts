import type { BlogPost } from "$lib/blogTypes";
import { checkRequest } from "$lib/server/auth";
import { getBlogPosts, saveBlogPost } from "$lib/server/blog";
import { error, json } from "@sveltejs/kit";

export async function GET() {
    return json(await getBlogPosts());
}

export async function POST(event) {
     if (!checkRequest(event)) {
        return error(401);
    }
    
    return json(await saveBlogPost(await event.request.json() as BlogPost));
}
