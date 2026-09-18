import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as LoaderCircle, l as ImagePlus, t as X } from "../_libs/lucide-react.mjs";
import { n as cn } from "./site-nav-CzMfviYu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-picker-CeE9Qddu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_SIZE = 256;
var MAX_INPUT_BYTES = 12582912;
var MAX_DATA_URL = 65e4;
var IMAGE_EXT = /\.(jpe?g|png|webp|gif|bmp|heic|heif|avif|svg)$/i;
function readAsDataURL(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result;
			if (typeof result === "string" && result) resolve(result);
			else reject(/* @__PURE__ */ new Error("Could not read that image."));
		};
		reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that image."));
		reader.readAsDataURL(blob);
	});
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that image. Try a JPG or PNG."));
		img.src = src;
	});
}
function looksLikeImage(file) {
	const type = file.type || "";
	const name = "name" in file && typeof file.name === "string" ? file.name : "";
	if (type.startsWith("image/")) return true;
	if (!type || type === "application/octet-stream") return true;
	if (IMAGE_EXT.test(name)) return true;
	return false;
}
async function sourceFromBlob(blob) {
	if (typeof createImageBitmap === "function") {
		let bmp = null;
		try {
			bmp = await createImageBitmap(blob);
			return {
				width: bmp.width,
				height: bmp.height,
				draw: (ctx, x, y, w, h) => {
					if (!bmp) return;
					ctx.drawImage(bmp, x, y, w, h);
				},
				release: () => {
					bmp?.close();
					bmp = null;
				}
			};
		} catch {
			bmp?.close();
		}
	}
	const img = await loadImage(await readAsDataURL(blob));
	try {
		await img.decode();
	} catch {}
	return {
		width: img.naturalWidth || img.width,
		height: img.naturalHeight || img.height,
		draw: (ctx, x, y, w, h) => ctx.drawImage(img, x, y, w, h)
	};
}
async function compressLogo(file) {
	if (!looksLikeImage(file)) throw new Error("Please upload a JPG, PNG, or WebP image.");
	if (file.size > MAX_INPUT_BYTES) throw new Error("Logo must be under 12 MB.");
	const src = await sourceFromBlob(file);
	try {
		if (!src.width || !src.height) throw new Error("Could not read that image. Try a JPG or PNG.");
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
		for (const quality of [
			.7,
			.55,
			.4
		]) {
			const dataUrl = canvas.toDataURL("image/jpeg", quality);
			if (dataUrl.length <= MAX_DATA_URL) return dataUrl;
		}
		throw new Error("Logo is too detailed — try a simpler square JPG or PNG.");
	} finally {
		src.release?.();
	}
}
function LogoPicker({ value, onChange, label = "Upload logo", hint = "JPG, PNG, or WebP — tap, drop, or paste", compact = false }) {
	const inputRef = (0, import_react.useRef)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function handleFile(file) {
		if (!file) return;
		setError("");
		setBusy(true);
		try {
			await onChange(await compressLogo(file));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setBusy(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	}
	function onDrop(e) {
		e.preventDefault();
		e.stopPropagation();
		handleFile(e.dataTransfer.files?.[0]);
	}
	function onPaste(e) {
		const file = Array.from(e.clipboardData.items).find((i) => i.type.startsWith("image/"))?.getAsFile();
		if (file) {
			e.preventDefault();
			handleFile(file);
		}
	}
	const input = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref: inputRef,
		type: "file",
		accept: "image/*,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif",
		className: "sr-only",
		onChange: (e) => {
			const file = e.target.files?.[0];
			if (file) handleFile(file);
		}
	});
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [
			input,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: busy,
				onClick: () => inputRef.current?.click(),
				onDragOver: (e) => e.preventDefault(),
				onDrop,
				className: "relative size-10 overflow-hidden rounded-lg border border-line bg-raised",
				"aria-label": label,
				children: [value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: "",
					className: "size-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "mx-auto size-4 text-gold" }), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-0 grid place-items-center bg-bg/70",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-gold" })
				}) : null]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-28 text-[10px] text-danger",
				children: error
			}) : null
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		onPaste,
		children: [
			input,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-20 shrink-0 overflow-hidden rounded-xl border border-line bg-raised",
					children: value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: value,
						alt: "Logo preview",
						className: "size-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-full items-center justify-center text-[11px] text-steel-light",
						children: "No logo"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => inputRef.current?.click(),
						onDragOver: (e) => e.preventDefault(),
						onDrop,
						className: cn("flex min-h-11 w-full items-center gap-3 rounded-xl border border-dashed border-line bg-raised px-3 py-2.5 text-left", busy && "opacity-70"),
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 shrink-0 animate-spin text-gold" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold text-fg",
							children: busy ? "Processing…" : label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-steel-light",
							children: hint
						})] })]
					}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "mt-1.5 inline-flex items-center gap-1 text-xs text-muted",
						onClick: () => void onChange(""),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" }), "Remove logo"]
					}) : null]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-danger",
				children: error
			}) : null
		]
	});
}
//#endregion
export { LogoPicker as t };
