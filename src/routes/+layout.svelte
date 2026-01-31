<script lang="ts">
	import { hasBlogAuth } from '$lib/auth/blogAuthClient';
	import { onMount } from 'svelte';
	import '../app.css';
	import { afterNavigate } from '$app/navigation';

	let { children } = $props();

	let navVisible = $state(false);
	let hasAuth = $state(false);

	function toggleNav() {
		navVisible = !navVisible;
		document.getElementById('nav')?.classList.toggle('nav-hidden');
	}

	onMount(() => {
		hasAuth = hasBlogAuth();
	});

	afterNavigate(() => {
		// Navigate to top because svelte doesn't seem to reset this.
		document.getElementById('content')?.scrollTo(0, 0);
	});
</script>

<div id="content" class="content">
	<header>
		<nav class="desktop-nav">
			<span class="nav-section nav-reverse">
				<a class="heading" href="/artist-hub">Artists</a>
				<a class="heading" href="/">About</a>
			</span>
			<a class="logo-container" href="/">
				<img src="/assets/Illuminant/Logos/Illuminant Wordmark2.png" alt="Illuminant" />
			</a>
			<span class="nav-section">
				<a class="heading" href="/staff-hub">A&amp;R</a>
				<a class="heading" href="/blog">Blog</a>
				{#if hasAuth}
					<a class="heading edit-segment" href="/edit">Edit</a>
					<a class="heading edit-segment" href="/logout">Log out</a>
				{/if}
			</span>
		</nav>
		<div class="mobile-header">
			<button class="nav-button" onclick={toggleNav}>
				<span class="material-symbols-outlined"> menu </span>
			</button>
			<a class="logo-container" href="/">
				<img src="/assets/Illuminant/Logos/Illuminant Wordmark2.png" alt="Illuminant" />
			</a>
			<div class="nav-symmetry"></div>
		</div>
	</header>
	<nav class="mobile-nav nav-hidden" id="nav">
		<a class="heading" href="/">About</a>
		<a class="heading" href="/artist-hub">Artists</a>
		<a class="heading" href="/staff-hub">A&amp;R</a>
		<a class="heading" href="/blog">Blog</a>
		{#if hasAuth}
			<hr />
			<span>
				<a class="heading edit-segment" href="/edit">Edit</a>
				<a class="heading edit-segment" href="/logout">Log out</a>
			</span>
		{/if}
	</nav>

	<div class="content-body">
		<div class="container">
			{@render children()}
		</div>
	</div>
</div>

<style>
	header {
		background-color: var(--color-bg-2);
		font-size: x-large;

		display: flex;
		gap: 48px;
		justify-content: center;
		align-items: center;

		box-shadow: 0px -5px 15px var(--color-shadow);

		width: 100%;
		height: 80px;
	}

	.logo-container > img {
		height: 48px;
		width: auto;
	}

	.mobile-header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		@media (min-width: 1000px) {
			display: none;
		}
	}

	.logo-container {
		width: fit-content;
		height: 48px;
	}

	.desktop-nav {
		display: flex;
		align-items: center;
		gap: 50px;
		@media (max-width: 1000px) {
			display: none;
		}
	}

	hr {
		width: 100%;
	}

	.nav-button {
		width: 48px;
		height: 48px;
		border-radius: 24px;
		border: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: auto;
		margin-left: 5px;
		background-color: var(--color-bg-2);
		color: white;
	}

	.nav-symmetry {
		width: 48px;
		margin-left: auto;
		margin-right: 5px;
	}

	.mobile-nav {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 10px;
		height: 250px;
		overflow: hidden;
		transition: 0.2s;
		@media (min-width: 1000px) {
			display: none;
		}
	}

	.nav-hidden {
		height: 0;
	}

	.nav-section {
		height: 100%;
		width: 400px;
		display: flex;
		align-items: center;
		gap: 50px;

		@media (max-width: 1200px) {
			gap: 20px;
		}
	}

	.nav-reverse {
		flex-direction: row-reverse;
	}

	header {
		display: flex;
		justify-content: center;
	}

	nav > span > a,
	.mobile-nav > a {
		transition: 0.2s;
		box-sizing: border-box;
		color: white;
		font-size: 28px;
		text-decoration: underline dotted 1px var(--color-bg-2);

		@media (max-width: 1000px) {
			font-size: 28px;
			margin-left: 10px;
		}
	}

	nav > span > a:hover {
		color: rgb(119, 170, 235);
		text-decoration: underline solid 4px rgb(119, 170, 235);
	}

	.content {
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-color: var(--color-text) var(--color-bg);
		height: calc(100vh);
	}

	.content-body {
		width: 100%;
		background: linear-gradient(190deg, #1c0c38, #472e8a, #6b46d2, #a44ae7, #cc89f9);
		display: flex;
		justify-content: center;
	}

	.edit-segment {
		font-size: 20px;

		@media (max-width: 1000px) {
			font-size: 15px;
			color: lightgray;
		}
	}

	.container {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
		min-height: calc(100vh - 80px);
		width: min(100%, 1400px);
		padding-left: 25px;
		padding-right: 25px;

		@media (max-width: 1000px) {
			flex-direction: column;
			padding-left: 15px;
			padding-right: 15px;
		}
	}
</style>
