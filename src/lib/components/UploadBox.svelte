<script>
  /** @type {{
   *   title: string
   *   subtitle?: string
   *   description: string
   *   accept: string
   *   onChange: (event: Event) => void
   * }} */
  let {
    title,
    subtitle,
    description,
    accept,
    onChange
  } = $props();
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
  <div class="flex flex-col items-center gap-2">
    <p class="text-center text-white">{title}</p>
    {#if subtitle}
      <p class="inline-block rounded-full border border-white/30 bg-white/5 px-2 py-0.5 text-center text-sm text-white/60">
        {subtitle}
      </p>
    {/if}
  </div>
  <div class="flex w-72 flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-white/30 bg-white/10 p-6 backdrop-blur-sm">
    <svg
      class="h-8 w-8 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
    <p class="text-sm text-gray-400">Drag and Drop</p>
    <p class="text-sm text-gray-500">or</p>
    <label class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
      <span>{description}</span>
      <input
        type="file"
        onchange={onChange}
        accept={accept}
        class="hidden"
      />
    </label>
  </div>
</div>