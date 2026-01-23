<script lang="ts">
	import { page } from '$app/state';
	import { getSessionHeaders, getAuth } from '$lib/auth/blogAuthClient';
	import type { DraftData, BlogPost } from '$lib/blogTypes';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let title = $state<string>('');
	let author = $state<string>('');
	let content = $state<string>('');
	let draftId = $state<string>('');
	let postId = $state<string>('');

	onMount(async () => {
		// window.addEventListener('beforeunload', (event) => {
		// 	event.preventDefault();
		// 	event.returnValue = '';
		// });

		draftId = page.url.searchParams.get('draft') ?? '';
		postId = page.url.searchParams.get('post') ?? '';

		if (draftId) {
			getDraft();
		}
		if (postId) {
			getPost();
		}
	});

	async function saveDraft() {
		const result = await fetch('/edit/blog/drafts', {
			method: 'POST',
			headers: getSessionHeaders(getAuth()!),
			body: JSON.stringify({
				title: title,
				author: author,
				content: content,
				identifier: draftId
			})
		});

		const resultJson = await result.json();

		console.log('Created draft', resultJson);

		draftId = resultJson.identifier;
	}

	async function publishPost() {
		if (!confirm('Really publish this post?')) {
			return;
		}

		const result = await fetch('/blog', {
			method: 'POST',
			headers: getSessionHeaders(getAuth()!),
			body: JSON.stringify({
				title: title,
				author: author,
				content: content,
				identifier: postId ?? '',
				publishDate: new Date(Date.now())
			} as BlogPost)
		});

		const resultJson = await result.json();

		console.log('Created post', resultJson);
		window.location.href = '/blog';
	}

	async function getDraft() {
		let result = await fetch(`/edit/blog/drafts?id=${draftId}`, {
			headers: getSessionHeaders(getAuth()!)
		});

		let resultData = (await result.json()) as DraftData;

		({ title, author, content } = resultData);
	}

	async function getPost() {
		let result = await fetch(`/blog/read?article=${postId}`);

		let resultData = (await result.json()) as DraftData;

		console.log(resultData);

		({ title, author, content } = resultData);
	}
</script>

<main class="page-section container">
	<h3 class="heading">
		Edit blog article &mdash; {title ?? ''}
		{#if postId}
			<a class="published-tag" href="/blog/read?article={postId}"> Published </a>
		{/if}
		{#if draftId}
			<span class="published-tag"> Draft </span>
		{/if}
	</h3>

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
					class="link-button button"
					title="Save draft to continue working later"
					onclick={saveDraft}
				>
					<span class="material-symbols-outlined"> save </span>
					Save draft
				</button>
				<button
					type="submit"
					class="link-button button-2"
					title="Publish article"
					onclick={publishPost}
				>
					<span class="material-symbols-outlined"> check </span>
					Publish
				</button>
			</div>
		</div>
		<div class="metadata-control metadata-control-last">
			<h4>Help</h4>
			<a
				href="https://www.markdownguide.org/basic-syntax/"
				target="_blank"
				class="link-button button-2"
			>
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
</main>

<style>
	textarea {
		background-color: var(--color-bg);
		border: 1px solid var(--color-bg-highlight);
		width: calc(100% - 18px);
		height: 300px;
		padding: 8px;
		margin-top: 10px;
		resize: none;
		color: var(--color-text);
		font-size: 16px;

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
		flex-wrap: wrap;
	}

	.metadata-control {
		height: 80px;
		margin-right: auto;
		display: flex;
		flex-direction: column;
		gap: 5px;
		justify-content: center;
	}

	h4 {
		margin: 0;
	}

	h3 {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.metadata-control-last {
		margin: 0;
	}

	.published-tag {
		font-size: 15px;
		font-weight: normal;
		background-color: var(--color-bg-highlight);
		margin-left: 10px;
		margin-right: 10px;
		border-radius: 16px;
		padding: 8px;
		box-sizing: border-box;
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
		padding: 10px;
		overflow-y: scroll;
	}

	.container {
		width: 100%;

		margin: 10px;
		padding: 20px;
		box-sizing: border-box;
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
