import { onMount } from "svelte";

/**
 * @param {(file: File) => void} onPaste
 * @param {string[]} acceptedFileTypes 
 */
export function useClipboardPaste(
  onPaste,
  acceptedFileTypes
 ) {
  /** @param {ClipboardEvent} event */
  async function handlePaste(event) {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (!file) continue;
        
        const isAcceptedType = acceptedFileTypes.some(
          (type) =>
            type === "image/*" ||
            type === item.type ||
            file.name.toLowerCase().endsWith(type.replace("*", ""))
        );

        if (isAcceptedType) {
          event.preventDefault();
          onPaste(file);
          break;
        }
      }
    }
  }

  onMount(() => {
    /** @param {ClipboardEvent} event */
    const handler = (event) => {
      handlePaste(event);
    };

    document.addEventListener("paste", handler);
    return () => {
      document.removeEventListener("paste", handler);
    };
  });
}