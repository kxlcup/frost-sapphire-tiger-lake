import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useTournament, o as rosterFor, r as MODE_LABELS } from "./router-Cx5ecOLj.mjs";
import { r as teamInitials, t as SiteNav } from "./site-nav-CzMfviYu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vs-Ceo1IujN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function load(src) {
	if (!src) return Promise.resolve(null);
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => resolve(null);
		img.src = src;
	});
}
function roundRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}
function drawLogo(ctx, img, name, cx, cy, size) {
	const x = cx - size / 2;
	const y = cy - size / 2;
	ctx.save();
	roundRect(ctx, x, y, size, size, 28);
	ctx.clip();
	if (img) ctx.drawImage(img, x, y, size, size);
	else {
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
async function renderVsPoster(a, b) {
	const W = 1080;
	const H = 1350;
	const canvas = document.createElement("canvas");
	canvas.width = W;
	canvas.height = H;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas unavailable");
	const [imgA, imgB] = await Promise.all([load(a.logoDataUrl || ""), load(b.logoDataUrl || "")]);
	const bg = ctx.createLinearGradient(0, 0, W, H);
	bg.addColorStop(0, "#140E09");
	bg.addColorStop(.5, "#0E0B08");
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
			else reject(/* @__PURE__ */ new Error("Could not export poster"));
		}, "image/png");
	});
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
function VsPage() {
	const { registrations } = useTournament();
	const [aId, setAId] = (0, import_react.useState)("");
	const [bId, setBId] = (0, import_react.useState)("");
	const [preview, setPreview] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const a = registrations.find((t) => t.id === aId);
	const b = registrations.find((t) => t.id === bId);
	async function generate() {
		if (!a || !b) {
			setErr("Pick two different teams.");
			return;
		}
		if (a.id === b.id) {
			setErr("Pick two different teams.");
			return;
		}
		setErr("");
		setBusy(true);
		try {
			const blob = await renderVsPoster(a, b);
			if (preview) URL.revokeObjectURL(preview);
			setPreview(URL.createObjectURL(blob));
		} catch (e) {
			setErr(e instanceof Error ? e.message : "Could not build poster");
		} finally {
			setBusy(false);
		}
	}
	async function download() {
		if (!a || !b) return;
		downloadBlob(await renderVsPoster(a, b), `${a.teamName}_vs_${b.teamName}.png`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-4 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm tracking-[0.18em] text-gold",
					children: "MATCHDAY HYPE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl",
					children: "VS Poster"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Combine two squad logos into a shareable matchup poster for stream and WhatsApp status."
				}),
				registrations.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-muted",
					children: "Need at least two registered teams to generate a poster."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamPick, {
							label: "Team A",
							value: aId,
							onChange: setAId
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamPick, {
							label: "Team B",
							value: bId,
							onChange: setBId
						})]
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-danger",
						children: err
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void generate(),
							disabled: busy,
							className: "rounded-lg bg-gradient-to-br from-ember to-[#E23F00] px-5 py-3 font-display font-bold text-white disabled:opacity-50",
							children: busy ? "Building…" : "Generate poster"
						}), preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void download(),
							className: "rounded-lg border border-line px-5 py-3 font-display font-bold text-muted",
							children: "Download PNG"
						}) : null]
					}),
					preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: preview,
						alt: "VS poster preview",
						className: "mt-8 w-full max-w-md rounded-xl border border-line"
					}) : a && b ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex items-center justify-center gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {
								name: a.teamName,
								src: a.logoDataUrl
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-4xl font-bold text-ember",
								children: "VS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {
								name: b.teamName,
								src: b.logoDataUrl
							})
						]
					}) : null
				] })
			]
		})]
	});
}
function TeamPick({ label, value, onChange }) {
	const { registrations } = useTournament();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "text-sm text-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 w-full rounded-lg border border-line bg-raised px-3 py-2.5 text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "Select team"
			}), registrations.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: t.id,
				children: t.teamName
			}, t.id))]
		})]
	});
}
function Monogram({ name, src }) {
	return src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: name,
		className: "size-24 rounded-xl object-cover"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex size-24 items-center justify-center rounded-xl bg-gradient-to-br from-ember to-gold font-display text-2xl font-bold text-bg",
		children: teamInitials(name)
	});
}
//#endregion
export { VsPage as component };
