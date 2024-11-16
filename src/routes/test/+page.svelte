<script>
  // this page is for testing stuff
  import BorderRadiusSelector from "$lib/components/BorderRadiusSelector.svelte";
  import FileDropzone from "$lib/components/FileDropzone.svelte";
  import OptionSelector from "$lib/components/OptionSelector.svelte";
  import SvgScaleSelector from "$lib/components/SvgScaleSelector.svelte";
  import UploadBox from "$lib/components/UploadBox.svelte";

  /** @type {File} */
  let file;
</script>

<div class="flex flex-col items-center gap-2">
  <FileDropzone 
    acceptedFileTypes={["image/*", ".jpg", ".jpeg", ".png", ".webp", ".svg"]}
    dropText="Drop image file"
    bind:currentFile={file}
  >
    <p class="flex flex-col items-center">u can drop files here i think? idk lmao</p>
  </FileDropzone>

  <OptionSelector
    title="Race"
    options={["white", "black", "transparent"]}
    selectedOption={"white"}
    onChange={(option) => console.log(option)}
    formatOption={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
  />

  <BorderRadiusSelector
    title="Border Radius"
    options={[2, 4, 8, 16, 32, 64]}
    selectedOption={4}
    onChange={(option) => console.log(option)}
    customValue={4}
    onCustomValueChange={(value) => console.log(value)}
  />

  <SvgScaleSelector
    title="Scale Factor"
    options={[1, 2, 4, 8, 16, 32, 64]}
    selectedOption={1}
    onChange={(option) => console.log(option)}
    customValue={1}
    onCustomValueChange={(value) => console.log(value)}
  />

  <UploadBox
    title="Add rounded borders to your images. Quick and easy."
    subtitle="Allows pasting images from clipboard"
    description="Upload Image"
    accept="image/*"
    onChange={(event) => {console.log("event occurred: ", event)}}
  />
</div>