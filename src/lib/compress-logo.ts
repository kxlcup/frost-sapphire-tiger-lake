const MAX_SIZE = 256;
const MAX_INPUT_BYTES = 12 * 1024 * 1024;
const MAX_DATA_URL = 650_000;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|bmp|heic|heif|avif|svg)$/i;

function readAsDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string" && result) resolve(result);
      else reject(new Error("Could not read that image."));
    };
    reader.onerror = () => reject(new Error("Could not read that image."));
    reader.readAsDataURL(blob);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image. Try a JPG or PNG."));
    img.src = src;
  });
}

function looksLikeImage(file: Blob): boolean {
  const type = file.type || "";
  const name = "name" in file && typeof (file as File).name === "string" ? (file as File).name : "";
  if (type.startsWith("image/")) return true;
  if (!type || type === "application/octet-stream") return true;
  if (IMAGE_EXT.test(name)) return true;
  return false;
}

async function sourceFromBlob(blob: Blob): Promise<{
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => void;
  release?: () => void;
}> {
  if (typeof createImageBitmap === "function") {
    let bmp: ImageBitmap | null = null;
    try {
      bmp = await createImageBitmap(blob);
      const width = bmp.width;
      const height = bmp.height;
      return {
        width,
        height,
        draw: (ctx, x, y, w, h) => {
          if (!bmp) return;
          ctx.drawImage(bmp, x, y, w, h);
        },
        release: () => {
          bmp?.close();
          bmp = null;
        },
      };
    } catch {
      bmp?.close();
    }
  }

  const dataUrl = await readAsDataURL(blob);
  const img = await loadImage(dataUrl);
  try {
    await img.decode();
  } catch {
    /* decode is optional */
  }
  return {
    width: img.naturalWidth || img.width,
    height: img.naturalHeight || img.height,
    draw: (ctx, x, y, w, h) => ctx.drawImage(img, x, y, w, h),
  };
}

export async function compressLogo(file: Blob): Promise<string> {
  if (!looksLikeImage(file)) {
    throw new Error("Please upload a JPG, PNG, or WebP image.");
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new Error("Logo must be under 12 MB.");
  }

  const src = await sourceFromBlob(file);
  try {
    if (!src.width || !src.height) {
      throw new Error("Could not read that image. Try a JPG or PNG.");
    }

    const canvas = document.createElement("canvas");
    canvas.width = MAX_SIZE;
    canvas.height = MAX_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not process the image.");
    ctx.fillStyle = "#17120D";
    ctx.fillRect(0, 0, MAX_SIZE, MAX_SIZE);

    const scale = Math.max(MAX_SIZE / src.width, MAX_SIZE / src.height);
    const w = src.width * scale;
    const h = src.height * scale;
    src.draw(ctx, (MAX_SIZE - w) / 2, (MAX_SIZE - h) / 2, w, h);

    for (const quality of [0.7, 0.55, 0.4]) {
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      if (dataUrl.length <= MAX_DATA_URL) return dataUrl;
    }

    throw new Error("Logo is too detailed — try a simpler square JPG or PNG.");
  } finally {
    src.release?.();
  }
}
