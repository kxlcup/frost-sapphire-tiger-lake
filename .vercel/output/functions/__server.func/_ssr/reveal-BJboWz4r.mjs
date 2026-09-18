import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ChevronLeft, m as ChevronRight, o as Play, s as Pause } from "../_libs/lucide-react.mjs";
import { n as useTournament } from "./router-Cx5ecOLj.mjs";
import { t as SiteNav } from "./site-nav-CzMfviYu.mjs";
import { t as LogoPicker } from "./logo-picker-CeE9Qddu.mjs";
import { t as TeamCard } from "./team-card-olNk5mOB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reveal-BJboWz4r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RevealPage() {
	const { registrations, setLogo } = useTournament();
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [curtain, setCurtain] = (0, import_react.useState)(true);
	const [logoErr, setLogoErr] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!playing || registrations.length === 0) return;
		const t = setInterval(() => {
			setCurtain(true);
			setTimeout(() => {
				setIdx((i) => (i + 1) % registrations.length);
				setCurtain(false);
			}, 280);
		}, 4200);
		return () => clearInterval(t);
	}, [playing, registrations.length]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setCurtain(false), 400);
		return () => clearTimeout(t);
	}, [idx]);
	(0, import_react.useEffect)(() => {
		if (registrations.length === 0) {
			setIdx(0);
			return;
		}
		if (idx >= registrations.length) setIdx(0);
	}, [registrations.length, idx]);
	const team = registrations[idx];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "reveal-stage min-h-[calc(100vh-56px)] px-4 py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-lg text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm tracking-[0.2em] text-gold",
						children: "SQUAD REVEAL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl",
						children: "Team Showcase"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "One card at a time — share-ready for stream and status."
					})
				]
			}), registrations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-16 text-center text-muted",
				children: "No squads to reveal yet. Register first."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-8 text-center font-display text-gold",
					children: [
						String(idx + 1).padStart(2, "0"),
						" / ",
						String(registrations.length).padStart(2, "0")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-4 max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "transition-all duration-300",
						style: {
							opacity: curtain ? 0 : 1,
							transform: curtain ? "scale(0.94) translateY(12px)" : "scale(1) translateY(0)"
						},
						children: team ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCard, {
							team,
							index: idx,
							featured: true
						}) : null
					}), team ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-xl border border-line bg-raised/80 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-3 font-display text-sm text-gold",
								children: ["Logo for ", team.teamName]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoPicker, {
								value: team.logoDataUrl || "",
								onChange: async (url) => {
									setLogoErr("");
									try {
										await setLogo(team.id, url);
									} catch (err) {
										setLogoErr(err instanceof Error ? err.message : "Could not save logo");
									}
								},
								label: team.logoDataUrl ? "Replace logo" : "Upload logo",
								hint: "Shows on this reveal card, gallery, and VS poster"
							}),
							logoErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-danger",
								children: logoErr
							}) : null
						]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "inline-flex size-11 items-center justify-center rounded-full border border-line bg-raised",
							onClick: () => {
								setCurtain(true);
								setIdx((i) => (i - 1 + registrations.length) % registrations.length);
							},
							"aria-label": "Previous team",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex min-h-11 items-center gap-2 rounded-full bg-ember px-5 font-display font-bold",
							onClick: () => setPlaying((p) => !p),
							children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), playing ? "Pause" : "Auto-play"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "inline-flex size-11 items-center justify-center rounded-full border border-line bg-raised",
							onClick: () => {
								setCurtain(true);
								setIdx((i) => (i + 1) % registrations.length);
							},
							"aria-label": "Next team",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
						})
					]
				})
			] })]
		})]
	});
}
//#endregion
export { RevealPage as component };
