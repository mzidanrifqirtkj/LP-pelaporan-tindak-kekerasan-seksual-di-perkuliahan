export async function compressImage(file: File, quality = 0.7): Promise<File> {
  if (!file.type.startsWith('image/')) {
    return file;
  }

  const img = await createImageBitmap(file);

  let { width, height } = img;
  const MAX_WIDTH = 1920;
  const MAX_HEIGHT = 1080;

  if (width > MAX_WIDTH || height > MAX_HEIGHT) {
    const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    img.close();
    return file;
  }

  ctx.drawImage(img, 0, 0, width, height);
  img.close();

  const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality });
  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

  return new File([blob], `${cleanName}.jpg`, { type: 'image/jpeg' });
}
