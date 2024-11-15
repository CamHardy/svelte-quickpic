<script>
  import { slide } from "svelte/transition";
  /**
   * @type {{
   *   title: string
   *   options: number[]
   *   selectedOption: number | "custom"
   *   onChange: (option: number | "custom") => void
   *   customValue?: number
   *   onCustomValueChange: (value: number) => void
   * }}
   */
  let {
    title,
    options,
    selectedOption = $bindable(),
    onChange,
    customValue,
    onCustomValueChange
  } = $props();

  /** @param {number | "custom"} option */
  function _onChange(option) {
    selectedOption = option;
    if (option !== "custom") customValue = option;
    onChange?.(option);
  }

  /** @param {Event} event */
  function handleInputChange(event) {
    const value = Math.min(999, Math.max(0, parseInt(/** @type {HTMLInputElement} */ (event.target).value) || 0));
  }

  /** @param {KeyboardEvent} event */
  function handleKeyDown(event) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

    event.preventDefault();
    const currentValue = customValue ?? 0;
    let step = 1;

    if (event.shiftKey) step = 10;
    if (event.altKey) step = 0.1;

    const newValue =
      event.key === "ArrowUp" ? currentValue + step : currentValue - step;

    const clampedValue = Math.min(
      999,
      Math.max(0, Number(newValue.toFixed(1))),
    );
    onCustomValueChange?.(clampedValue);
  }

  /** @type {HTMLDivElement} */
	let buttonGroup;
	let highlightStyle = $state({ left: 0, width: 0 });

  function updateHighlight() {
    /** @type {HTMLButtonElement | null} */
    const selectedButton = buttonGroup.querySelector(`button[id="${selectedOption}"]`);
    if (selectedButton) {
			const { offsetLeft, offsetWidth } = selectedButton;
			highlightStyle = { left: offsetLeft, width: offsetWidth };
    }
  }
	
  $effect(updateHighlight);
</script>

<div class="flex flex-col items-center gap-2">
  <span class="text-sm text-white/60">{title}</span>
  <div class="flex flex-col items-center gap-2">
    <div bind:this={buttonGroup} class="relative inline-flex rounded-lg bg-white/5 p-1">
      <div 
        class="absolute inset-y-1 rounded-md bg-blue-600 transition-all duration-200"
        style="left: {`${highlightStyle.left}px`}; width: {`${highlightStyle.width}px`};"
      ></div>
      {#each [...options, "custom"] as option}
        <button
          id={`${option}`}
          onclick={() =>
            _onChange(typeof option === "number" ? option : "custom")
          }
          class={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            option === selectedOption
              ? "text-white"
              : "text-white/80 hover:text-white"
          }`}
        >
          {option === "custom" ? "Custom" : option}
        </button>
      {/each}
    </div>
    {#if selectedOption === "custom"}
      <div transition:slide class="flex items-center">
        <div class="relative flex items-center rounded-lg bg-white/5 px-3 py-1.5 gap-1">
          <input
            type="number"
            min="0"
            max="999"
            value={customValue}
            onchange={handleInputChange}
            onkeydown={handleKeyDown}
            class="w-12 text-sm bg-transparent text-white"
            placeholder="Enter radius"
          />
          <span class="text-sm text-white/60">px</span>
        </div>
      </div>
    {/if}
  </div>
</div>