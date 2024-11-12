<script>
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col justify-between p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
  <div class="fixed left-4 top-4 z-50">
    <a
      href="/"
      class="flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-gray-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back
    </a>
  </div>
  <main class="flex flex-grow flex-col items-center justify-center">
    {@render children()}
  </main>
  <footer class="mt-8 text-center text-sm text-gray-500">
    <a
      href="https://github.com/t3dotgg/quickpic"
      target="_blank"
      rel="noopener noreferrer"
      class="hover:underline"
    >
      View on GitHub
    </a>
  </footer>
</div>