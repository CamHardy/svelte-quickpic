import { useClipboardPaste } from "./clipboardPaste";
import { onMount } from "svelte";

/**
 * @param { string } content 
 * @param { string } fileName 
 */
function parseSvgFile(content, fileName) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(content, "image/svg+xml");
  const svgElement = svgDoc.documentElement;
  const width = parseInt(svgElement.getAttribute("width") ?? "300");
  const height = parseInt(svgElement.getAttribute("height") ?? "150");

  // Convert SVG content to a data URL
  const svgBlob = new Blob([content], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);

  return {
    content: svgUrl,
    metadata: {
      width,
      height,
      name: fileName,
    }
  };
}

/**
 * @param { string } content 
 * @param { string } fileName 
 */
function parseImageFile(content, fileName) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        content,
        metadata: {
          width: img.width,
          height: img.height,
          name: fileName
        }
      });
    };
    img.src = content;
  });
}

export function useFileUploader() {
  let imageContent = $state('');
  let rawContent = $state('');
  /** @type { { width: number; height: number; name: string } | null } */
  let imageMetadata = $state(null);

  /** @param { File } file */
  function processFile(file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = /** @type { string } */ (e.target?.result);
      rawContent = content;

      if (file.type === 'image/svg+html') {
        const {content: svgContent, metadata } = parseSvgFile(content, file.name);

        imageContent = svgContent;
        imageMetadata = metadata;
      } else {
        const { content: imgContent, metadata } = await parseImageFile(content, file.name);

        imageContent = imgContent;
        imageMetadata = metadata;
      }
    };

    if (file.type === "image/svg+xml") {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  }

  /** @param { Event } event */
  function handleFileUploadEvent(event) {
    const inputElement = /** @type {HTMLInputElement} */ (event.target);
    const file = inputElement.files?.[0];
    if (file) {
      processFile(file);
    }
  }

  useClipboardPaste({
    onPaste: processFile, 
    acceptedFileTypes: ['image/*', 'image/svg+xml']
  });

  function cancel() {
    imageContent = '';
    imageMetadata = null;
  }

  return {
    imageContent,
    rawContent,
    imageMetadata,
    handleFileUpload: processFile,
    handleFileUploadEvent,
    cancel
  }
}
