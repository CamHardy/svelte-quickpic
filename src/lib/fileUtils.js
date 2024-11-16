/** @param { File } file */
export function createFileChangeEvent(file) {
  const target = {
    files: [file],
    value: "",
    name: "",
    type: "file",
    accept: ".svg",
    multiple: false,
    webkitdirectory: false,
    className: "hidden",
  };

  return {
    target: target,
    currentTarget: target,
    preventDefault: () => {},
    stopPropagation: () => {},
    bubbles: true,
    cancelable: true,
    timeStamp: Date.now(),
    type: "change",
    nativeEvent: new Event("change"),
    isDefaultPrevented: () => false,
    isPropagationStopped: () => false,
    isTrusted: true,
    persist: () => {},
  }
}