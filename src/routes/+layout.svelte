<script>
	// TODO: remove unused imports
	import '@fontsource/geist-sans/100.css';
	import '@fontsource/geist-sans/200.css';
	import '@fontsource/geist-sans/300.css';
	import '@fontsource/geist-sans/400.css';
	import '@fontsource/geist-sans/500.css';
	import '@fontsource/geist-sans/600.css';
	import '@fontsource/geist-sans/700.css';
	import '@fontsource/geist-sans/800.css';
	import '@fontsource/geist-sans/900.css';
	import '../app.css';

	import { UmamiAnalyticsEnv } from '@lukulent/svelte-umami';

	let { children } = $props();
</script>

<svelte:head>
	<title>QuickPic - Quick Tools For Images</title>
  <meta name="description" content="A bunch of svelte tools for images. All free. No BS." />
</svelte:head>

<!--* don't forget to update .env and uncomment this in production -->
<!-- <UmamiAnalyticsEnv /> -->

<main class="font-sans antialiased">
	{@render children()}
</main>