import type { Registration } from "./types";
import { MODE_LABELS, rosterFor } from "./types";
import { teamInitials } from "./utils";

function load(src: string): Promise<HTMLImageElement | null> {
  if (!src) return Promise.resolve(null);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawLogo(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  name: string,
  cx: number,
  cy: number,
  size: number,
) {
  const x = cx - size / 2;
  const y = cy - size / 2;
  ctx.save();
  roundRect(ctx, x, y, size, size, 28);
  ctx.clip();
  if (img) {
    ctx.drawImage(img, x, y, size, size);
  } else {
    const g = ctx.createLinearGradient(x, y, x + size, y + size);
    g.addColorStop(0, "#FF5A1F");
    g.addColorStop(1, "#FFB627");
    ctx.fillStyle = g;
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = "#0E0B08";
    ctx.font = "700 72px Rajdhani, Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(teamInitials(name), cx, cy + 4);
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(255,182,39,0.55)";
  ctx.lineWidth = 4;
  roundRect(ctx, x, y, size, size, 28);
  ctx.stroke();
}

export async function renderVsPoster(a: Registration, b: Registration): Promise<Blob> {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  const [imgA, imgB] = await Promise.all([
    load(a.logoDataUrl || ""),
    load(b.logoDataUrl || ""),
  ]);

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#140E09");
  bg.addColorStop(0.5, "#0E0B08");
  bg.addColorStop(1, "#1A1008");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(255,90,31,0.16)";
  ctx.beginPath();
  ctx.ellipse(180, -40, 420, 280, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,182,39,0.10)";
  ctx.beginPath();
  ctx.ellipse(920, 1400, 380, 260, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#FFB627";
  ctx.font = "700 28px Rajdhani, sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("KHATRI  ×  ESP7", W / 2, 78);
  ctx.fillStyle = "#F2EDE6";
  ctx.font = "700 54px Rajdhani, sans-serif";
  ctx.letterSpacing = "0px";
  ctx.fillText("MATCHDAY", W / 2, 140);
  ctx.fillStyle = "#B8AFA4";
  ctx.font = "500 22px Inter, sans-serif";
  ctx.fillText("1K SPECIAL  ·  FREE FIRE", W / 2, 180);

  drawLogo(ctx, imgA, a.teamName, W / 2, 430, 280);
  ctx.fillStyle = "#F2EDE6";
  ctx.font = "700 42px Rajdhani, sans-serif";
  ctx.fillText(a.teamName.toUpperCase(), W / 2, 610);
  ctx.fillStyle = "#FFB627";
  ctx.font = "600 20px Inter, sans-serif";
  ctx.fillText((a.tagline || MODE_LABELS[a.mode]).toUpperCase(), W / 2, 648);

  ctx.fillStyle = "#FF5A1F";
  ctx.font = "700 92px Rajdhani, sans-serif";
  ctx.fillText("VS", W / 2, 760);

  drawLogo(ctx, imgB, b.teamName, W / 2, 980, 280);
  ctx.fillStyle = "#F2EDE6";
  ctx.font = "700 42px Rajdhani, sans-serif";
  ctx.fillText(b.teamName.toUpperCase(), W / 2, 1162);
  ctx.fillStyle = "#FFB627";
  ctx.font = "600 20px Inter, sans-serif";
  ctx.fillText((b.tagline || MODE_LABELS[b.mode]).toUpperCase(), W / 2, 1200);

  ctx.fillStyle = "#565D67";
  ctx.font = "500 16px Inter, sans-serif";
  const ra = rosterFor(a).map((p) => p.name).join("  ·  ");
  const rb = rosterFor(b).map((p) => p.name).join("  ·  ");
  ctx.fillText(ra.slice(0, 70), W / 2, 1268);
  ctx.fillText(rb.slice(0, 70), W / 2, 1294);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not export poster"));
    }, "image/png");
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
