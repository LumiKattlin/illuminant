<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import type { BlogPost } from '$lib/blogTypes';

	let props: {
		postComponent: Snippet<[BlogPost]>;
	} = $props();

	let searchQuery = $state('');
	let sortMode = $state('latest');

	let blogEntriesPromise = $state<Promise<BlogPost[]>>();
	async function loadBlogPosts() {
		let response = await fetch('/blog', {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			return response.json();
		}

		return Promise.reject(response.statusText);
	}

	onMount(() => {
		blogEntriesPromise = loadBlogPosts();
	});
</script>

<div class="list-controls">
	<input type="search" bind:value={searchQuery} class="shadow" placeholder="Search..." />
	<select bind:value={sortMode} class="hover shadow">
		<option value="latest">Latest</option>
		<option value="name">Name A...Z</option>
	</select>
</div>

<div class="blog-list">
	{#await blogEntriesPromise}
		Loading
	{:then blogEntries}
		{#each blogEntries?.sort((a, b) => {
			if (sortMode == 'latest') {
				return a.publishDate < b.publishDate ? 1 : -1;
			} else {
				return a.title > b.title ? 1 : -1;
			}
		}) as entry}
			{#if !searchQuery || entry.title.indexOf(searchQuery) != -1}
				{@render props.postComponent(entry as BlogPost)}
			{/if}
		{/each}
	{:catch err}
		<div class="error shadow">
			<div class="error-content">
				<span class="material-symbols-outlined">error</span>{err}
			</div>
		</div>
	{/await}
</div>

<style>
	.blog-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.list-controls {
		display: flex;
		gap: 20px;

		margin-bottom: 50px;
	}

	.list-controls > select {
		border: 2px solid var(--color-bg-2);
		border-radius: 5px;
		display: flex;
	}
</style>
