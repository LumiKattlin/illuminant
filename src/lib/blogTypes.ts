import { marked } from "marked";

export interface BlogPost {
    title: string,
    identifier: string,
    content: string,
    author: string,
    publishDate: Date,
}

export interface DraftData {
    title: string,
    author: string,
    content: string,
    identifier: string,
}

export function markdownText(markdown: string) {
    let s: string = '';

    let md = marked.lexer(markdown);

    for (let x of md) {
        const text = (x as any).text;

        s += text ? text + ' ' : '';
    }

    return s;
}
