<script lang="ts">
	import Blog from '$lib/components/blog.svelte';
	import { markdownText, type BlogPost } from '$lib/blogTypes';
</script>

<h1>Edit Blog</h1>
<div class="blog-controls">
	<a class="link-button shadow" href="/blog/edit/post">
		<span class="material-symbols-outlined"> add </span>New Post
	</a>

	<a class="link-button shadow" href="/blog/edit/drafts">
		<span class="material-symbols-outlined"> edit </span>View Drafts
	</a>

	<a href="/blog/logout" class="link-button shadow">
		<span class="material-symbols-outlined"> logout </span>Log out
	</a>
</div>

<hr />

<h2>Current Posts</h2>

<Blog>
	{#snippet postComponent(post: BlogPost)}
		<div class="blogEntry shadow">
			<div class="blog-entry-heading">
				<h3>{post.title}</h3>
				<button
					title="Copy post link to clipboard"
					class="material-symbols-outlined hover small-button"
				>
					link
				</button>
				<a title="View post" href="/blog/read?" class="material-symbols-outlined hover small-button">
					open_in_new
				</a>
				<a
					title="Edit post"
					href="/blog/edit/post?existing=true&post={post.identifier}"
					class="material-symbols-outlined hover small-button"
				>
					edit
				</a>
				<button title="Delete post" class="material-symbols-outlined hover small-button">
					delete
				</button>
			</div>
			<h4>By {post.author} &mdash; {new Date(post.publishDate).toDateString()}</h4>
			<p>
				{markdownText(
					post.content.length > 256 ? post.content.substring(0, 256) + '\u2026' : post.content
				)}
			</p>
		</div>
	{/snippet}
</Blog>

<style>
	.blogEntry {
		width: 100%;

		background-color: var(--color-bg-2);
		padding: 10px;

		border-radius: 5px;
	}

	.blog-entry-heading {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	hr {
		margin-top: 30px;
		margin-bottom: 10px;
	}

	.blog-entry-heading > h3 {
		margin-right: auto;
	}
</style>
