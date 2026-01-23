<script lang="ts">
	import { getSessionHeaders, getAuth } from '$lib/auth/blogAuthClient';
	import { markdownText, type DraftData } from '$lib/blogTypes';
	import { onMount } from 'svelte';

	let postsPromise = $state<Promise<DraftData[]>>();
	let searchQuery = $state('');

	function loadPosts() {
		let loadPosts = async (): Promise<DraftData[]> => {
			return (
				await fetch('/edit/blog/drafts', {
					headers: getSessionHeaders(getAuth()!)
				})
			).json();
		};

		postsPromise = loadPosts();
	}

	onMount(loadPosts);

	async function deleteDraft(draft: DraftData) {
		const result = (
			await fetch(`/edit/blog/drafts?id=${draft.identifier}`, {
				headers: getSessionHeaders(getAuth()!),
				method: 'DELETE'
			})
		).json();

		loadPosts();
	}
</script>

<main class="page-section">
	{#await postsPromise}
		<p class="heading">Loading</p>
	{:then posts}
		<h1 class="heading">Blog Post Drafts</h1>

		<div class="search-controls">
			<input bind:value={searchQuery} type="search" placeholder="Search drafts..." />
		</div>
		<div class="posts-grid">
			{#each searchQuery ? posts!.filter((p) => p.title
							.toLowerCase()
							.includes(searchQuery.toLowerCase())) : posts as post}
				<div class="post-button hover shadow">
					<a href="/edit/blog/post?draft={post.identifier}">
						<h3>{post.title ? post.title : '[No name]'}</h3>

						<p>
							{markdownText(post.content)}
						</p>
					</a>
					<div class="post-button-controls">
						<button
							class="small-button hover material-symbols-outlined"
							onclick={async () => await deleteDraft(post)}
						>
							delete
						</button>
					</div>
				</div>
			{/each}

			<div class="new-button shadow">
				<a href="/edit/blog/post" class="link-button button">
					<span class="material-symbols-outlined">add</span> New Draft
				</a>
			</div>
		</div>
	{/await}
</main>

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
		box-sizing: border-box;
	}

	.new-button {
		width: 320px;
		height: 150px;
		display: flex;
		border-radius: 5px;
		border: 2px solid var(--color-bg-2);
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}

	.post-button > a > p {
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

	h3 {
		margin: 0;
		margin-left: 5px;
		margin-right: 5px;
	}
	p {
		margin: 5px;
	}
</style>
