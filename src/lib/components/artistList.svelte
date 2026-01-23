<script lang="ts">
	import { type Artist } from '$lib/staffTypes';
	import ArtistThumbnail from './artistThumbnail.svelte';

	let props: {
		artists: Artist[];
	} = $props();
</script>

{#each props.artists as artist}
	<a class="artist-card shadow" href="/about?a={encodeURI(artist.id)}">
		<ArtistThumbnail {artist}></ArtistThumbnail>
		<div class="artist-sub">
			<h2 class="heading">
				{artist.name}
			</h2>
			<p>{artist.description}</p>
		</div>
	</a>
{/each}

<style lang="css">
	.artist-card {
		width: 300px;
		height: 300px;
		color: white;
		text-decoration: none;
		text-align: center;
		border-radius: 15px;
	}

	.artist-sub {
		margin: 5px;
	}

	.artist-sub > h2 {
		margin: 0;
	}
</style>
