<script>
  import FileDropzone from "$lib/components/FileDropzone.svelte";
  import OptionSelector from "$lib/components/OptionSelector.svelte";
  import UploadBox from "$lib/components/UploadBox.svelte";

  /**
   * @type {{ 
   *  canvas: HTMLCanvasElement | null; 
   *  imageContent: string; 
   *  radius: number; 
   *  background: ('transparent' | 'black' | 'white'); 
   *  fileName?: string; 
   *  imageMetadata: { width: number; height: number; name: string }; 
   * }}
   */
  let {
    canvas,
    imageContent,
    radius,
    background,
    fileName,
    imageMetadata,
  } = $props();

  function setBackground(option) {
    // store option in localstorage
    localStorage.setItem("background", option);
  }




  function useImageConverter(props) {
    const {width, height} = {width: props.imageMetadata.width, height: props.imageMetadata.height};
    const convertToPng = async () => {
      const ctx = props.canvas?.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");

      const saveImage = () => {
        if (props.canvas) {
          const dataURL = props.canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataURL;
          const imageFileName = props.imageMetadata.name ?? "image_converted";
          link.download = `${imageFileName.replace(/\..+$/, "")}.png`;
          link.click();
        }
      };

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = props.background;
        ctx.fillRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(props.radius, 0);
        ctx.lineTo(width - props.radius, 0);
        ctx.quadraticCurveTo(width, 0, width, props.radius);
        ctx.lineTo(width, height - props.radius);
        ctx.quadraticCurveTo(width, height, width - props.radius, height);
        ctx.lineTo(props.radius, height);
        ctx.quadraticCurveTo(0, height, 0, height - props.radius);
        ctx.lineTo(0, props.radius);
        ctx.quadraticCurveTo(0, 0, props.radius, 0);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0);
        saveImage();
      };

      img.src = props.imageContent;
    };

    return {
      convertToPng,
      canvasProps: { width, height },
    };
  }

  
</script>

<svelte:head>
  <title>Corner Rounder - QuickPic</title>
  <meta name="description" content="Round corners on an image (for free because duh)" />
</svelte:head>

<FileDropzone
  setCurrentFile={fileUploaderProps.handleFileUpload}
  acceptedFileTypes={["image/*", ".jpg", ".jpeg", ".png", ".webp", ".svg"]}
  dropText="Drop image file"
>
  {#if !imageMetadata}
    <UploadBox
      title="Add rounded borders to your images. Quick and easy."
      subtitle="Allows pasting images from clipboard"
      description="Upload Image"
      accept="image/*"
      onChange={handleFileUploadEvent}
    />
  {:else}
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 p-6">
      <div className="flex w-full flex-col items-center gap-4 rounded-xl p-6">
        <ImageRenderer
          imageContent={imageContent}
          radius={radius}
          background={background}
        />
        <p className="text-lg font-medium text-white/80">
          {imageMetadata.name}
        </p>
      </div>

      <div className="flex flex-col items-center rounded-lg bg-white/5 p-3">
        <span className="text-sm text-white/60">Original Size</span>
        <span className="font-medium text-white">
          {imageMetadata.width} × {imageMetadata.height}
        </span>
      </div>

      <BorderRadiusSelector
        title="Border Radius"
        options={[2, 4, 8, 16, 32, 64]}
        selected={isCustomRadius ? "custom" : radius}
        onChange={handleRadiusChange}
        customValue={radius}
        onCustomValueChange={setRadius}
      />

      <OptionSelector
        title="Background"
        options={["white", "black", "transparent"]}
        bind:selectedOption={background}
        onChange={setBackground}
        formatOption={(option) =>
          option.charAt(0).toUpperCase() + option.slice(1)
        }
      />

      <div className="flex gap-3">
        <button
          onClick={cancel}
          className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-red-800"
        >
          Cancel
        </button>
        <SaveAsPngButton
          imageContent={imageContent}
          radius={radius}
          background={background}
          imageMetadata={imageMetadata}
        />
      </div>
    </div>
  {/if}
</FileDropzone>