<script>
	const artists = {
		ZeroLAV: '/assets/Illuminant/border2.png',
		EntropicVoxels: '/assets/Illuminant/NEW_logo.png',
		BreaKKr: '/assets/Illuminant/1000005142-removebg-preview.png',
		'Kandy Choppe': '/assets/Illuminant/Kandy_Logo_Text.png',
		'Son of The Mob': '/assets/Illuminant/SOTM_transparent.png',
		'Lizzy Choppe': '/assets/Illuminant/Lizzy_Signature_Blank.png',
		Ne10: '/assets/Illuminant/Ne10_Logo_White.png',
		SpockAndStep: '/assets/Illuminant/SpockAndStep2_Full1.png',
		'FRVME PRFCT': '/assets/Illuminant/FPLOGOWHITE.png'
	};
</script>

<svelte:head>
	<title>Illuminant</title>
</svelte:head>

<div>
	<h1 id="about">About us</h1>
	<p>
		Illuminant is an independent EDM label built to spotlight the raw energy, emotion, and
		innovation pulsing through the underground. Founded with a mission to break boundaries and
		uplift emerging talent, we are here to illuminate the underground — one track, one artist, one
		moment at a time.
	</p>
	<p>
		In a scene often dominated by the same sounds and faces, we champion the outsiders — the
		beatmakers, producers, and DJs crafting their own path. From deep warehouse grooves and hypnotic
		techno to experimental bass and euphoric melodic anthems, we thrive on diversity and edge. If it
		hits hard and speaks truth, it belongs here.
	</p>
	<p>
		Our community is global, but our roots are local. We believe in building platforms that empower
		artists to grow authentically — through cutting-edge releases, immersive events, and
		collaborative spaces where creativity runs wild.
	</p>
	<p>
		Illuminant isn’t just a label. It’s a movement. A mindset. A reminder that even in the darkest
		corners of the dance floor, there’s always a light worth chasing.
	</p>

	<h1 id="submission">Demo Submissions</h1>
	<div>
		<a
			class="link-button"
			href="https://docs.google.com/forms/d/1tudkB2tI8dMn7PyAMJy1iu4pPwNJKT7chb507lqlz_k/viewform?ts=6791b5c9&edit_requested=true&pli=1"
			target="_blank"
		>
			<span class="material-symbols-outlined"> open_in_new </span>
			Submission form
		</a>
	</div>
	<h1 id="artists">Artists</h1>
	<div class="artist-list">
		{#each Object.entries(artists) as [name, icon]}
			<div class="artist-entry">
				<img class="artist-logo" src={icon} alt={name} title={name} />
			</div>
		{/each}
	</div>
	<h1 id="contact">Contact</h1>

	<div class="contact-section">
		<div>
			<p>
				Email us at <i>contact@illuminantrecs.com</i>
			</p>

			<div>
				<a class="link-button" href="mailto:contact@illuminantrecs.com">
					<span class="material-symbols-outlined"> mail </span>
					Send mail
				</a>
			</div>
		</div>

		<div class="contact-list">
			<a href="https://soundcloud.com/illuminantrecords">
				<img
					class="contact-element"
					src="/assets/soundcloud.png"
					alt="soundcloud"
					title="soundcloud"
				/>
			</a>
			<a href="https://bsky.app/profile/illuminantrecords.bsky.social">
				<img class="contact-element" src="/assets/bluesky-icon.png" alt="bluesky" title="bluesky" />
			</a>
			<a href="https://www.instagram.com/illuminantrecordsus/">
				<img
					class="contact-element"
					src="/assets/ig-instagram-icon.png"
					alt="instagram"
					title="instagram"
				/>
			</a>
		</div>
	</div>
</div>

<style>
	.artist-logo {
		height: auto;
		width: 150px;
	}

	.artist-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 30px;
	}

	.artist-entry {
		display: flex;
		justify-items: center;
		align-items: center;
		width: 150px;
		height: 150px;
	}

	.contact-list {
		display: flex;
		gap: 2em;
		align-items: center;
		margin: 0.5em;
		@media (max-width: 800px) {
			gap: 1em;
		}
	}

	.contact-element {
		height: auto;
		width: 60px;
	}

	.contact-section {
		display: flex;
		gap: 4em;
		margin-bottom: 8em;

		@media (max-width: 800px) {
			flex-direction: column;
		}
	}
</style>
