import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as rosterFor, r as MODE_LABELS } from "./router-Cx5ecOLj.mjs";
import { n as cn, r as teamInitials } from "./site-nav-CzMfviYu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-card-olNk5mOB.js
var import_jsx_runtime = require_jsx_runtime();
var MODE_CLASS = {
	SOLO: "border-solo text-solo",
	DUO: "border-duo text-duo",
	SQUAD: "border-gold text-gold",
	CS: "border-cs text-cs"
};
function TeamCard({ team, index, featured = false }) {
	const players = rosterFor(team);
	const mode = team.mode || "SQUAD";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("overflow-hidden rounded-card border border-line bg-raised", featured && "border-ember shadow-[0_20px_60px_rgba(255,90,31,0.18)]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-square bg-bg",
			children: [
				team.logoDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: team.logoDataUrl,
					alt: `${team.teamName} logo`,
					className: "size-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-full items-center justify-center bg-gradient-to-br from-ember to-gold font-display text-6xl font-bold text-bg",
					children: teamInitials(team.teamName)
				}),
				typeof index === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 font-display text-xs font-bold text-gold",
					children: ["#", String(index + 1).padStart(2, "0")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("absolute right-3 top-3 rounded-full border bg-bg/80 px-2.5 py-1 text-[11px] font-semibold", MODE_CLASS[mode]),
					children: MODE_LABELS[mode]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-bold leading-tight",
					children: team.teamName
				}),
				team.tagline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm italic text-gold",
					children: team.tagline
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-sm text-muted",
					children: players.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-ember" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: p.name
							}),
							i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-wide text-steel-light",
								children: "Captain"
							})
						]
					}, p.name + i))
				})
			]
		})]
	});
}
//#endregion
export { TeamCard as t };
