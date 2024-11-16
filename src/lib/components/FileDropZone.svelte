<script>
  /** @type {{
   *   children: any
   *   acceptedFileTypes: string[]
   *   dropText: string
   *   currentFile: File
   * }} */
  let { 
    children,
    acceptedFileTypes,
    dropText,
    currentFile = $bindable(),
  } = $props();
  let isDragging = $state(false);
  let dragCounter = 0;

  /** @param e {DragEvent} */
  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  /** @param e {DragEvent} */
  function handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;

    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      isDragging = true;
    }
  }

  /** @param e {DragEvent} */
  function handleDragOut(e) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;

    if (dragCounter === 0) {
      isDragging = false;
    }
  }

  /** @param e {DragEvent} */
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = false;
    dragCounter = 0;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];

      if (!droppedFile) {
        alert("How did you do a drop with no files???");
        throw new Error("No file dropped");
      }

      if (
        !acceptedFileTypes.includes(droppedFile.type) &&
        !acceptedFileTypes.some(type => droppedFile.name.toLowerCase().endsWith(type.replace("*", "")))
      ) {
        alert("Invalid file type. Please upload a supported file type.");
        throw new Error("Invalid file type");
      }

      currentFile = droppedFile;
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  ondragenter={handleDragIn}
  ondragleave={handleDragOut}
  ondragover={handleDrag}
  ondrop={handleDrop}
  class="h-full w-full"
>
  {#if isDragging}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div class="animate-in fade-in zoom-in relative flex h-[90%] w-[90%] transform items-center justify-center rounded-xl border-2 border-dashed border-white/30 transition-all duration-200 ease-out">
        <p class="text-2xl font-semibold text-white">{dropText}</p>
      </div>
    </div>
  {/if}

  {@render children()}
</div>