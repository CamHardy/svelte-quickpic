<script>
  /**
   * @type {{
   *   title: string
   *   options: number[]
   *   selected: number | "custom"
   *   onChange: (option: number | "custom") => void
   *   customValue?: number
   *   onCustomValueChange: (value: number) => void
   * }}
   */
  let {
    title,
    options,
    selected,
    onChange,
    customValue,
    onCustomValueChange
  } = $props();

  /** @param {Event} event */
  function handleInputChange(event) {
    //TODO
  }

  /** @param {Event} event */
  function handleKeyDown(event) {
    //TODO
  }
</script>

<div class="flex flex-col items-center gap-2">
  <span class="text-sm text-white/60">{title}</span>
  <div class="flex flex-col items-center gap-2">
    <div id="containerRef" class="relative inline-flex rounded-lg bg-white/5 p-1">
      <div id="highlightRef" class="absolute inset-y-1 rounded-md bg-blue-600 transition-all duration-200"></div>
      {#each [...options, "custom"] as option}
        <button
          id="selectedRef"
          onclick={() =>
            onChange(typeof option === "number" ? option : "custom")
          }
          class={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            option === selected
              ? "text-white"
              : "text-white/80 hover:text-white"
          }`}
        >
          {option === "custom" ? "Custom" : option}
        </button>
      {/each}
    </div>
    {#if selected === "custom"}
      <div class="flex items-center gap-2">
        <div class="relative flex items-center">
          <input
            type="number"
            min="0"
            max="999"
            value={customValue}
            onchange={handleInputChange}
            onkeydown={handleKeyDown}
            class="w-24 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white"
            placeholder="Enter radius"
          />
          <span class="absolute right-3 text-sm text-white/60">px</span>
        </div>
      </div>
    {/if}
  </div>
</div>