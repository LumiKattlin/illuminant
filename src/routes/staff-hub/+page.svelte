<script lang="ts">
	const artists: { [name: string]: { image: string; subtitle: string } } = {
		ZeroLAV: {
			image: '/assets/Illuminant/SpockAndStep2_Full1.png',
			subtitle: 'Founder'
		},
		Konextrax: {
			image: '/assets/Illuminant/2026_Logo_White.png',
			subtitle: 'Co-owner, lead advisor, A&R'
		},
		Voidbreak: {
			image: '',
			subtitle: "Co-owner, A&R"
		},
		PXRTVLIVN: {
			image: '',
			subtitle: "A&R, concept art designer"
		},
		BreaKKr: {
			image: '/assets/Illuminant/1000005142-removebg-preview.png',
			subtitle: "A&R"
		},
	};
</script>

<main class="page-section">
	<h1>Staff</h1>

	<p>Some text here probably</p>
	<div class="artist-card-container">
		{#each Object.entries(artists) as [artist, info]}
			<a class="artist-card" href="/about?a={encodeURI(artist)}">
				<div class="funny-image">
					<img alt={artist} class="artist-logo" src={info.image} />
				</div>
				<div class="artist-sub">
					<h2>
						{artist}
					</h2>
					<p>{info.subtitle}</p>
				</div>
			</a>
		{/each}
	</div>
</main>

<style>
	main {
		margin-top: 30px;
	}

	.funny-image {
		width: 250px;
		height: 300px;
		background: radial-gradient(red, purple);
		border-radius: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.artist-card-container {
		gap: 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 80px;
	}

	.artist-card {
		width: 250px;
		height: 450px;
		color: white;
		text-decoration: none;
	}

	.artist-logo {
		width: 150px;
	}

	.artist-sub {
		margin: 5px;
	}

	h1 {
		margin-top: 0;
	}

	.artist-sub > h2 {
		margin: 0;
		margin-top: 15px;
	}
</style>
