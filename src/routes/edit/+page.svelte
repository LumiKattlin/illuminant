<script lang="ts">
	import Blog from '$lib/components/blog.svelte';
	import { markdownText, type BlogPost } from '$lib/blogTypes';
	import { getAuth, getSessionHeaders } from '$lib/auth/blogAuthClient';

	async function deletePost(post: BlogPost) {
		if (!confirm(`Really delete the post ${post.title}?`)) {
			return;
		}

		const response = await fetch(`/blog/delete?id=${post.identifier}`, {
			headers: getSessionHeaders(getAuth()!),
			method: 'DELETE'
		});
		const responseJson = (await response.json()) as boolean;

		if (!responseJson) {
			alert('Failed to delete post!');
		}
		window.location.reload();
	}
</script>

<section class="page-section">
	<h1>
		<span class="material-symbols-outlined"> people </span>
		Edit Staff
	</h1>
	<div class="edit-controls">
		<a class="link-button button shadow" href="/edit/staff/artists">
			<span class="material-symbols-outlined"> edit </span>Edit Artists
		</a>

		<a class="link-button button-2 shadow" href="/edit/blog/drafts">
			<span class="material-symbols-outlined"> edit </span>Edit A&amp;R
		</a>
	</div>
</section>

<section class="page-section">
	<h1 class="heading">
		<span class="material-symbols-outlined"> book </span>
		Edit Blog
	</h1>
	<div class="edit-controls">
		<a class="link-button button shadow" href="/edit/blog/post">
			<span class="material-symbols-outlined"> add </span>New Post
		</a>

		<a class="link-button button-2 shadow" href="/edit/blog/drafts">
			<span class="material-symbols-outlined"> edit </span>View Drafts
		</a>
	</div>

	<hr />

	<h2>Current Posts</h2>

	<Blog>
		{#snippet postComponent(post: BlogPost)}
			<div class="blog-entry shadow">
				<div class="blog-entry-heading">
					<h3 class="heading">{post.title}</h3>
					<a
						title="View post"
						href="/blog/read?article={post.identifier}"
						class="material-symbols-outlined hover small-button"
					>
						open_in_new
					</a>
					<a
						title="Edit post"
						href="/edit/blog/post?post={post.identifier}"
						class="material-symbols-outlined hover small-button"
					>
						edit
					</a>
					<button
						title="Delete post"
						class="material-symbols-outlined hover small-button"
						onclick={async () => await deletePost(post)}
					>
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
</section>

<style>
	section {
		margin-top: 50px;
		width: min(100%, 1000px);
	}

	.edit-controls {
		display: flex;
		justify-items: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 20px;
	}

	.blog-entry {
		box-sizing: border-box;
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

	h4 {
		margin-top: 0;
	}

	.blog-entry-heading > h3 {
		margin-right: auto;
	}
</style>
