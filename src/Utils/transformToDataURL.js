export function transformToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      resolve(e.target.result);
    })
    reader.addEventListener('error', (error) => {
      reject(error);
    })
    reader.readAsDataURL(file);
  })

}
