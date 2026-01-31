<script lang="ts">
	import { getAuth, getSessionHeaders } from '$lib/auth/blogAuthClient';
	import { onMount } from 'svelte';

	let { id }: { id: string } = $props();

	let textPromise = $state<Promise<void>>();
	let text = $state('');

	onMount(async () => {
		textPromise = (async () => {
			let response = await fetch(`/staff/text?id=${encodeURIComponent(id)}`);

			text = await response.text();
		})();
	});

	async function save() {
		let _ = await fetch(`/staff/text?id=${encodeURIComponent(id)}`, {
			body: text,
			method: 'POST',
			headers: getSessionHeaders(getAuth()!),
		});
	}
</script>

<div class="container">
	{#await textPromise then}
		<textarea placeholder="Artists page description" bind:value={text}> </textarea>
		<button class="link-button button-2" onclick={save}>Save description</button>
	{/await}
</div>

<style>
	.container {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		margin-bottom: 20px;
		gap: 20px;
		align-items: end;
	}

	textarea {
		box-sizing: border-box;
		width: calc(100% - 180px);
		height: 200px;
		resize: vertical;
		padding: 10px;

		background-color: var(--color-bg);
		border: 0;
		color: var(--color-text);

		@media (max-width: 1000px) {
			width: 100%;
			resize: none;
		}
	}
</style>
