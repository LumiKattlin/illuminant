<script lang="ts">
	import { type StaffMember } from '$lib/staffTypes';
	import ArtistThumbnail from './artistThumbnail.svelte';

	let props: {
		artists: StaffMember[];
	} = $props();
</script>

{#each props.artists as artist}
	<a
		class="artist-card shadow"
		href="/about?a={encodeURI(artist.id)}{artist.isStaff ? '&staff=1' : ''}"
	>
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
