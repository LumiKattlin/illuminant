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
</main>

<style>
	main {
		width: min(100%, 1000px);
	}
</style>
