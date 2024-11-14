<script>
  /** 
   * @type {{
   *   title: string
   *   options: string[]
   *   selectedOption: string
   *   onChange: (option: string) => void
   *   formatOption: (option: string) => string
   * }}
  */
	let {
		title = 'Booger Picker',
	  options = ['1', '22', '333'],
	  selectedOption = $bindable('1'),
		onChange = (option) => {selectedOption = option},
		formatOption = (o)=>`${o}`
	} = $props();

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

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div class="m-8 flex flex-col items-center gap-2">
  <span class="text-sm text-white/60">{title}</span>
  <div class="flex flex-col items-center gap-2">
    <div bind:this={buttonGroup} class="relative inline-flex rounded-lg bg-white/5 p-1">
      <div
        class="absolute top-1 bottom-1 rounded-md bg-blue-600 transition-all"
        style="left: {`${highlightStyle.left}px`}; width: {`${highlightStyle.width}px`};"
      ></div>
      {#each options as option}
        <button
					id={option}
          class="relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors {option === selectedOption ? 'text-white' : 'text-white/80 hover:text-white'}"
          onclick={() => onChange?.(option)}
        >
          {formatOption(option)}
        </button>
      {/each}
    </div>
  </div>
</div>
