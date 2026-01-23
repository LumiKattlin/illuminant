<script lang="ts">
	import { page } from '$app/state';
	import type { BlogPost } from '$lib/blogTypes';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let articlePromise = $state<Promise<BlogPost>>();
	let articleIdentifier = page.url.searchParams.get('article');
	let articleName = $state('');

	onMount(async () => {
		articlePromise = loadArticle(articleIdentifier ?? '');
		articleName = (await articlePromise).title;
	});

	async function loadArticle(name: string): Promise<BlogPost> {
		let response = await fetch(`/blog/read?article=${name}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			return response.json();
		}

		return Promise.reject(response.status + ': ' + response.statusText);
	}

	function capitalizeFirstLetter(str: string) {
		return str.replace(
			/\w\S*/g,
			(text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
		);
	}
</script>

<svelte:head>
	<title>Illuminant Blog&nbsp;&gt;&nbsp;{capitalizeFirstLetter(articleName)}</title>
</svelte:head>

<main class="page-section">
	{#await articlePromise}
		Loading...
	{:then article}
		<h2 class="heading">
			<a href="/blog">/ Illuminant Blog /</a>
		</h2>
		<h1 class="heading">
			{article?.title}
		</h1>
		<h2 class="heading">By {article?.author} &mdash; {new Date(article?.publishDate ?? 0).toDateString()}</h2>
		<hr />
		<div>{@html marked(article?.content ?? '')}</div>
	{:catch err}
		<h1>Illuminant Blog</h1>

		<div class="error shadow">
			<div class="error-content">
				<span class="material-symbols-outlined">error</span>
				{err}
			</div>
			<a href="/blog">Return to blog page</a>
		</div>
	{/await}
</main>

<style>
	main {
		margin-top: 40px;
		width: min(100%, 1000px);
	}

	.error {
		margin-top: 40px;
	}

	a:hover {
		text-decoration: underline;
	}

	h1 {
		text-transform: capitalize;
	}

	h2 {
		font-size: 17px;
		color: lightgrey;
	}

	hr {
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
