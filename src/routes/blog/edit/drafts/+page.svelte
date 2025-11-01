<script lang="ts">
	import { markdownText, type DraftData } from '$lib/blogTypes';
	import { onMount } from 'svelte';

	let postsPromise = $state<Promise<DraftData[]>>();
	let searchQuery = $state('');

	onMount(async () => {
		let loadPosts = async (): Promise<DraftData[]> => {
			return (await fetch('/blog/edit/drafts')).json();
		};

		postsPromise = loadPosts();
	});
</script>

{#await postsPromise}
	Loading
{:then posts}
	<h1>Blog Post Drafts</h1>

	<div class="search-controls">
		<input bind:value={searchQuery} type="search" placeholder="Search drafts..." />
	</div>
	<div class="posts-grid">
		{#each searchQuery ? posts!.filter((p) => p.title
						.toLowerCase()
						.includes(searchQuery.toLowerCase())) : posts as post}
			<a href="/blog/edit/post?draft={post.identifier}" class="post-button hover shadow">
				<h3>{post.title ? post.title : '[No name]'}</h3>

				<p>
					{markdownText(post.content)}
				</p>
				<div class="post-button-controls">
					<button class="small-button hover material-symbols-outlined"> delete </button>
				</div>
			</a>
		{/each}

		<div class="new-button shadow">
			<a href="/blog/edit/post" class="link-button shadow">
				<span class="material-symbols-outlined">add</span> New Draft
			</a>
		</div>
	</div>
{/await}

<style>
	.posts-grid {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
        justify-content: center;
		grid-template-columns: 10fr 10fr 10fr;
		gap: 10px;
	}

	.post-button {
		padding: 5px;
		width: 320px;
		height: 150px;
		border-radius: 5px;
	}

	.new-button {
		width: 320px;
		height: 150px;
        display: flex;
        border-radius: 5px;
        border: 2px solid var(--color-bg-2);
        justify-content: center;
        align-items: center;
	}

	.post-button > p {
		height: 65px;
		overflow-y: hidden;
	}

	.post-button-controls {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: end;
	}

	.search-controls {
		margin-bottom: 20px;
	}

	input {
		width: 100%;
		border: 2px solid var(--color-bg-2);
		background-color: var(--color-bg);
		border-radius: 5px;
	}
</style>
