<script lang="ts">
	import ArtistList from '$lib/components/artistList.svelte';
	import type { StaffMember } from '$lib/staffTypes';
	import { onMount } from 'svelte';

	let artistPromise = $state<Promise<StaffMember[]>>();

	let { title, id, source }: { title: string; id: string; source: string } =
		$props();

	let descriptionPromise = $state<Promise<string>>();

	onMount(async () => {
		const found = fetch(source);
		const description = fetch(`/staff/text?id=${encodeURIComponent(id)}`);

		artistPromise = (await found).json();
		descriptionPromise = (await description).text();
	});
</script>

<h1 class="heading">{title}</h1>

{#await descriptionPromise}
	<p></p>
{:then description} 
	<p>{description}</p>	
{/await}
{#await artistPromise}
	<h2>Loading...</h2>
{:then loadedArtists}
	<div class="artist-card-container">
		<ArtistList artists={loadedArtists ?? []} />
	</div>
{/await}

<style>
	.artist-card-container {
		gap: 50px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 40px;
		margin-bottom: 40px;
	}

	h1 {
		margin-top: 0;
	}
</style>
