export function base64ToBlob(base64String, type) {
  const raw = atob(base64String);
  var array = new Uint8Array(raw.length);

  for(let i = 0; i < raw.length; i++) {
    array[i] = raw.charCodeAt(i);
  }
  const blob = new Blob([array], { type });
  return blob;
}
