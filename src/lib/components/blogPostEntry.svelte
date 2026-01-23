<script lang="ts">
	import type { BlogPost } from '$lib/blogTypes';
	import { markdownText } from '$lib/blogTypes';

	let { entry, hintText }: { entry: BlogPost; hintText: string } = $props();
</script>

<a class="blog-entry page-section shadow" href="/blog/read?article={entry.identifier}">
	<div class="blog-entry-heading">
		<h3 class="heading">{entry.title}</h3>
		<span class="material-symbols-outlined"> open_in_new </span>
	</div>
	<h4 class="heading">By {entry.author} &mdash; {new Date(entry.publishDate).toDateString()}</h4>

	<p>
		{markdownText(
			entry.content.length > 256 ? entry.content.substring(0, 256) + '\u2026' : entry.content
		)}
	</p>
	<footer class="entry-footer">{hintText}</footer>
</a>

<style>
	.blog-entry {
		padding: 10px;
	}

	.blog-entry > p {
		overflow-y: hidden;
		max-height: 8em;
		line-height: 1.5em;
		margin-top: 10px;
		width: 100%;
	}

	.blog-entry-heading {
		display: flex;
		align-items: center;
	}

	.blog-entry-heading > span {
		margin-left: auto;
	}

	.entry-footer {
		font-size: small;
		font-style: italic;
		color: var(--color-text-2);

		@media (max-width: 1000px) {
			font-size: medium;
			padding: 0.5em;
		}
	}

	h3 {
		margin-top: 5px;
		margin-bottom: 10px;
		font-size: x-large;
	}
	h4 {
		margin-top: 0;
		color: lightgrey;
		font-size: 16px;
	}
</style>
