import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useTournament } from "./router-Cx5ecOLj.mjs";
import { t as SiteNav } from "./site-nav-CzMfviYu.mjs";
import { t as TeamCard } from "./team-card-olNk5mOB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hall-LhGwZWf1.js
var import_jsx_runtime = require_jsx_runtime();
function HallPage() {
	const { registrations } = useTournament();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-5xl px-4 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm tracking-[0.18em] text-gold",
					children: "PERMANENT RECORD"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl",
					children: "Hall of Fame"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-lg text-sm text-muted",
					children: "Every squad that locked a slot stays here — even after elimination. This is your esports card for the next cup."
				}),
				registrations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 rounded-card border border-dashed border-line px-4 py-12 text-center text-muted",
					children: "The hall is empty. First team in writes history."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: registrations.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCard, {
						team: t,
						index: i
					}, t.id))
				})
			]
		})]
	});
}
//#endregion
export { HallPage as component };
