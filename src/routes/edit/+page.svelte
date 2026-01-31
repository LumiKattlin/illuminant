<script lang="ts">
	import Blog from '$lib/components/blog.svelte';
	import { markdownText, type BlogPost } from '$lib/blogTypes';
	import { getAuth, getSessionHeaders } from '$lib/auth/blogAuthClient';
	import { uploadFile } from '$lib/uploadFile';
	import { bounceInOut } from 'svelte/easing';

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

	let aboutImage = $state<FileList>();
	let blogImage = $state<FileList>();
	let imagesChanged = [false, false];

	async function onImageChanged(index: number) {
		imagesChanged[index] = true;
	}

	async function onImageSaved() {
		let refresh = false;
		if (imagesChanged[0] && aboutImage) {
			console.log(aboutImage);
			await uploadFile(aboutImage, (_) => {}, 'about');
			refresh = true;
		}
		if (imagesChanged[1] && blogImage) {
			await uploadFile(blogImage, (_) => {}, 'blog');
			refresh = true;
		}
		window.location.reload();
	}
</script>

<section class="page-section">
	<h1>
		<span class="material-symbols-outlined"> note </span>
		Edit main page images
	</h1>
	<div>
		<h2>About</h2>
		<div class="image-section">
			<div class="preview-image-wrapper">
				<p>&lt;About text&gt;</p>
				<img src="/img?id=about" alt="<About icon>" />
			</div>

			<div>
				<h3>Change about image to</h3>
				<input onchange={() => onImageChanged(0)} bind:files={aboutImage} type="file" />
			</div>
		</div>
		<h2>Blog</h2>
		<div class="image-section">
			<div class="preview-image-wrapper">
				<img src="/img?id=blog" alt="<Blog icon>" />
				<p>
					&lt;Blog text&gt;
					<br />
					<button> Open blog </button>
					<br />
					&lt;Blog post&gt;
				</p>
			</div>

			<div>
				<h3>Change blog image to</h3>
				<input onchange={() => onImageChanged(1)} bind:files={blogImage} type="file" />
			</div>
		</div>
	</div>
	<div class="edit-controls reverse">
		<button class="link-button button-2 shadow" onclick={onImageSaved}>
			<span class="material-symbols-outlined"> check </span>Apply
		</button>
	</div>
</section>

<section class="page-section">
	<h1>
		<span class="material-symbols-outlined"> people </span>
		Edit Staff
	</h1>
	<div class="edit-controls">
		<a class="link-button button shadow" href="/edit/staff/artists">
			<span class="material-symbols-outlined"> edit </span>Edit Artists
		</a>

		<a class="link-button button-2 shadow" href="/edit/staff/staff">
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

	.preview-image-wrapper {
		height: 300px;
		width: 400px;
		display: flex;
		gap: 40px;
		justify-content: center;
		align-items: center;
		background-color: var(--color-bg);
		border-radius: 5px;
		border: 2px solid var(--color-bg-2);
		padding: 10px;
	}

	.preview-image-wrapper > img {
		width: 200px;
	}

	.image-section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 50px;
		justify-content: center;
		align-items: center;
	}

	.reverse {
		flex-direction: row-reverse;
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
