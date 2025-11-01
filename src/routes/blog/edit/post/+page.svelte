<script lang="ts">
	import { page } from '$app/state';
	import { hasBlogAuth } from '$lib/auth/blogAuthClient';
	import type { DraftData } from '$lib/blogTypes';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let title = $state<string>('');
	let author = $state<string>('');
	let content = $state<string>('');
	let postId = $state<string>('');

	onMount(async () => {
		// window.addEventListener('beforeunload', (event) => {
		// 	event.preventDefault();
		// 	event.returnValue = '';
		// });

		postId = page.url.searchParams.get('draft') ?? '';

		if (postId) {
			getDraft();
		}
	});

	async function saveDraft() {
		let result = await fetch('/blog/edit/drafts', {
			method: 'POST',
			body: JSON.stringify({
				title: title,
				author: author,
				content: content,
				identifier: postId
			})
		});

		postId = (await result.json()).identifier;
	}

	async function getDraft() {
		let result = await fetch(`/blog/edit/drafts?id=${postId}`);

		let resultData = (await result.json()) as DraftData;

		({ title, author, content } = resultData);
	}
</script>

<div class="container shadow">
	<h3>Create new blog article &mdash; {postId}</h3>

	<div class="metadata-controls">
		<div class="metadata-control">
			<h4>Article attributes</h4>
			<div class="publish-buttons">
				<input type="text" spellcheck="true" placeholder="Title..." bind:value={title} />
				<input type="text" spellcheck="true" placeholder="Author..." bind:value={author} />
			</div>
		</div>

		<div class="metadata-control">
			<h4>Publish</h4>
			<div class="publish-buttons">
				<button
					type="submit"
					class="submit-button"
					title="Save draft to continue working later"
					onclick={saveDraft}
				>
					<span class="material-symbols-outlined"> save </span>
					Save draft
				</button>
				<button type="submit" class="submit-button" title="Publish article">
					<span class="material-symbols-outlined"> check </span>
					Publish
				</button>
			</div>
		</div>
		<div class="metadata-control">
			<h4>Help</h4>
			<a href="https://www.markdownguide.org/basic-syntax/" target="_blank" class="submit-button">
				<span class="material-symbols-outlined"> open_in_new </span>
				Markdown syntax
			</a>
		</div>
	</div>

	<textarea bind:value={content} spellcheck="true" placeholder="Post content..."></textarea>

	<h3>Preview</h3>
	<div class="preview">
		<h1>
			Illuminant Blog&nbsp;&gt;&nbsp;{title.length ? title : '[Title missing]'}
		</h1>
		<h4>
			By {author.length ? author : '[Author missing]'} &mdash; {new Date(Date.now()).toDateString()}
		</h4>
		<hr />

		{@html marked(content ?? '')}
	</div>
</div>

<style>
	textarea {
		background-color: var(--color-bg);
		border: 1px solid var(--color-bg-highlight);
		width: 100%;
		height: 300px;
		resize: none;

		font-family: monospace;
	}

	.publish-buttons {
		display: flex;
		gap: 10px;
	}

	.metadata-controls {
		margin-bottom: 10px;
		display: flex;
		gap: 20px;
		align-items: stretch;
	}

	.metadata-control {
		height: 80px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		justify-content: center;
	}

	.submit-button {
		transition: 0.2s;

		padding: 8px;

		display: flex;

		justify-content: center;
		align-items: center;
		gap: 5px;

		background-color: var(--color-bg);
		border: 1px solid var(--color-bg-highlight);
		border-radius: 5px;
	}

	.submit-button:hover {
		background-color: var(--color-bg-3);
	}

	input {
		background-color: var(--color-bg);
		border: 1px solid var(--color-bg-highlight);
		width: 200px;
		border-radius: 5px;
	}

	div.preview {
		background-color: var(--color-bg);
		border: 1px solid var(--color-bg-highlight);
		height: calc(100vh - 600px);
		padding: 10px;
		overflow-y: scroll;
	}

	.container {
		width: 100%;
		height: 100%;

		margin: 10px;
		padding: 10px;

		background-color: var(--color-bg-2);
		border-radius: 10px;
	}

	h3 {
		font-size: x-large;
		font-weight: bold;
	}

	h1 {
		text-transform: capitalize;
	}

	hr {
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
