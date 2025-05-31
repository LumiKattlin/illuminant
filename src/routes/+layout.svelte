<script lang="ts">
	import '../app.css';

	let { children } = $props();

	let navVisible = $state(false);

	function toggleNav() {
		navVisible = !navVisible;
		document.getElementById('nav')?.classList.toggle('nav-hidden');
	}
</script>

<header>
	<button onclick={toggleNav}>
		<span class="material-symbols-outlined"> menu </span>
	</button>

	<img src="/assets/Illuminant/Logos/Illuminant Wordmark2.png" alt="emblem" />

	<div>
		<a href="/#about">About</a>
		<a href="/#submission">Demo Submissions</a>
		<a href="/#artists">Artists</a>
		<a href="/#contact">Contact</a>
	</div>
</header>

<nav id="nav" class="nav-hidden">
	<a href="/#about" onclick={toggleNav}>About</a>
	<a href="/#submission" onclick={toggleNav}>Demo Submissions</a>
	<a href="/#artists" onclick={toggleNav}>Artists</a>
	<a href="/#contact" onclick={toggleNav}>Contact</a>
</nav>

<div class="content">
	<div class="content-body">
		{@render children()}
	</div>
</div>

<style>
	header {
		background-color: var(--color-bg-2);
		font-size: x-large;

		display: flex;
		gap: 48px;
		justify-items: center;
		align-items: center;

		box-shadow: 0px -5px 15px black;

		height: 64px;
		padding-left: 100px;

		@media (max-width: 1000px) {
			padding-left: 10px;
			padding-right: 10px;
		}
	}

	header > img {
		height: 48px;

		@media (max-width: 1000px) {
			position: absolute;
			left: 30%;
			width: 40%;
			height: auto;
		}
	}

	header > div {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		margin-right: auto;
		gap: 50px;
		@media (max-width: 1000px) {
			display: none;
		}
	}

	header > button {
		transition: 0.2s;
		border-radius: 100%;
		width: 40px;
		height: 40px;
		padding-top: 3px;
	}

	header > button:hover {
		background-color: var(--color-bg-3);
	}

	header > div > a {
		transition: 0.2s;
		color: var(--color-text);
		text-decoration: underline dotted 1px var(--color-bg-2);

		@media (max-width: 1000px) {
			display: none;
		}
	}

	header > div > a:hover {
		color: rgb(119, 170, 235);
		text-decoration: underline solid 4px rgb(119, 170, 235);
	}

	nav {
		display: none;

		@media (max-width: 1000px) {
			border: 2px solid var(--color-bg-3);
			border-left: 0;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;

			padding: 10px;
			box-shadow: 0px 15px 10px black;

			width: 225px;

			display: flex;
			flex-direction: column;
			gap: 20px;
			background-color: var(--color-bg-2);

			position: absolute;
			height: calc(100vh - 64px);
		}
	}

	.nav-hidden {
		display: none;
	}

	.content {
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-color: var(--color-text) var(--color-bg);
		height: calc(100vh - 64px);
	}

	.content-body {
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
