<script lang="ts">
	import Blog from '$lib/components/blog.svelte';
	import type { BlogPost } from '$lib/blogTypes';
	import BlogPostEntry from '$lib/components/blogPostEntry.svelte';
</script>

<svelte:head>
	<title>Illuminant Blog</title>
</svelte:head>

<main>
	<h1 class="heading">Illuminant Blog</h1>

	<Blog>
		{#snippet postComponent(post: BlogPost)}
			<BlogPostEntry entry={post} hintText="Read more..." />
		{/snippet}
	</Blog>

	<footer>
		<a href="/blog/rss">RSS Feed</a> &#9679; <a href="/">Main Page</a>
	</footer>
</main>

<style>
	main {
		width: min(100%, 1000px);
	}

	footer {
		margin: 10px;
		margin-top: 50px;
		color: var(--color-text-2);
	}

	footer > a:hover {
		text-decoration: underline;
	}
</style>
