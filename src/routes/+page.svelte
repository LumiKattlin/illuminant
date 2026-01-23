<script>
</script>

<svelte:head>
	<title>Illuminant</title>
</svelte:head>

<div class="opening-section">
	<img
		class="title-image"
		src="/assets/Illuminant/Logos/Illuminant Wordmark2.png"
		alt="Illuminant"
	/>
	<p>Illuminating the Underground &mdash; Fairly</p>
	<nav>
		<a class="link-button button" href="contact">Contact</a>
		<a class="link-button button-2" href="demo">Demo submission</a>
	</nav>
</div>

<main>
	<div class="page-image-section page-section">
		<div class="about-text">
			<h2 class="heading">About us</h2>
			<p>
				Illuminant is an independent EDM label built to spotlight the raw energy, emotion, and
				innovation pulsing through the underground. Founded with a mission to break boundaries and
				uplift emerging talent, we are here to illuminate the underground - one track, one artist,
				one moment at a time. In a scene often dominated by the same sounds and faces, we champion
				the outsiders - the beatmakers, producers, and DJs crafting their own path. From deep
				warehouse grooves and hypnotic techno to experimental bass and euphoric melodic anthems, we
				thrive on diversity and edge. If it hits hard and speaks truth, it belongs here. Our
				community is global, but our roots are local. We believe in building platforms that empower
				artists to grow authentically - through cutting-edge releases, immersive events, and
				collaborative spaces where creativity runs wild. Illuminant isn't just a label. It's a
				movement. A mindset. A reminder that even in the darkest corners of the dance floor, there's
				always a light worth chasing.
			</p>
		</div>
		<div class="funny-image"></div>
	</div>

	<div class="page-image-section page-section">
		<div class="funny-image"></div>

		<div class="blog-text">
			<h2 class="heading">Blog</h2>
			<p>Here is where we post updates about releases or general announcements.</p>
			<a class="link-button button" href="/blog">
				<span class="material-symbols-outlined"> open_in_new </span>
				View Blog
			</a>
		</div>
	</div>

	<div class="page-section">
		<div class="artists-header">
			<h2 class="heading">Artist and A&amp;R</h2>
			<p>Artists who have released with us and our team.</p>
			<div class="artists-buttons">
				<a class="link-button button" href="/artist-hub">Artists</a>
				<a class="link-button button-2" href="/staff-hub">A&amp;R</a>
			</div>
		</div>
		<div class="artist-list">
			<div class="funny-image"></div>
			<div class="funny-image"></div>
			<div class="funny-image"></div>
			<div class="funny-image"></div>
			<div class="funny-image"></div>
			<div class="funny-image"></div>
			<div class="funny-image"></div>
			<div class="funny-image"></div>
			<div class="funny-image"></div>
		</div>
	</div>
</main>

<style>
	main {
		width: min(100%, 1200px);
	}

	nav {
		display: flex;
		gap: 16px;
		@media (max-width: 1000px) {
			width: 100%;
			flex-direction: column;
		}
	}

	.opening-section {
		align-items: center;
		display: flex;
		flex-direction: column;
		margin-bottom: 100px;
		font-size: large;
		width: 100%;
		@media (max-width: 1000px) {
			margin-top: calc(50vh - 250px);
			margin-bottom: calc(50vh - 250px);
		}
	}

	.title-image {
		width: calc(100% - 300px);
		margin: 50px;
		@media (max-width: 1000px) {
			width: 300px;
			margin: 35px;
		}
	}

	.page-image-section {
		display: grid;
		grid-template-columns: repeat(3, calc(33% - 10px));
		gap: 20px;
		@media (max-width: 1000px) {
			grid-template-columns: repeat(1, calc(33% - 10px));
		}
	}

	.about-text {
		grid-column: 1/3;
	}

	.blog-text {
		grid-column: 2/4;
		@media (max-width: 1000px) {
			grid-column: 1/4;
		}
	}

	.blog-text > p {
		margin-bottom: 40px;
	}

	.funny-image {
		width: 100%;
		height: 400px;
		background: radial-gradient(red, purple);
		border-radius: 15px;

		@media (max-width: 1000px) {
			grid-row: -1;
			grid-column: 1/4;
		}
	}

	.artist-list {
		height: 400px;
		width: 100%;
		gap: 20px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-around;
		overflow-x: scroll;
	}

	h2 {
		font-size: 40px;
		margin-top: 5px;
		margin-bottom: 15px;
	}

	.artist-list > div {
		width: 300px;
	}

	.artists-header {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40px;
	}

	.artists-buttons {
		display: flex;
		gap: 10px;
		flex-direction: row;
		flex-wrap: wrap;

		@media (max-width: 1000px) {
			flex-direction: column;
			width: 100%;
			justify-content: stretch;
		}
	}
</style>
