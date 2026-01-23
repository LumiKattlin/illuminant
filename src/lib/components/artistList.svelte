<script lang="ts">
	import { type Artist } from '$lib/staffTypes';

	let props: {
		artists: Artist[];
	} = $props();
</script>

{#each props.artists as artist}
	<a class="artist-card" href="/about?a={encodeURI(artist.id)}">
		<div class="funny-image">
			<img alt={artist.name} class="artist-logo" src={''} />
		</div>
		<div class="artist-sub">
			<h2 class="heading">
				{artist}
			</h2>
			<p>Some description</p>
		</div>
	</a>
{/each}

<style lang="css">
	.artist-card {
		width: 400px;
		height: 400px;
		color: white;
		text-decoration: none;
		text-align: center;
	}

	.funny-image {
		width: 400px;
		height: 300px;
		background: radial-gradient(red, purple);
		border-radius: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.artist-logo {
		width: 150px;
	}

	.artist-sub {
		margin: 5px;
	}

	.artist-sub > h2 {
		margin: 0;
	}
</style>
