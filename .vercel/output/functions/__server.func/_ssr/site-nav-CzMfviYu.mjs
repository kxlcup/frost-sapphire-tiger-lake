import { b as require_jsx_runtime, d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, i as Swords, n as Trophy, p as Clapperboard, u as Flame } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-nav-CzMfviYu.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function teamInitials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "FF";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[1][0]).toUpperCase();
}
var LINKS = [
	{
		to: "/",
		label: "Register",
		icon: Flame
	},
	{
		to: "/reveal",
		label: "Reveal",
		icon: Clapperboard
	},
	{
		to: "/vs",
		label: "VS Poster",
		icon: Swords
	},
	{
		to: "/hall",
		label: "Hall of Fame",
		icon: Trophy
	},
	{
		to: "/admin",
		label: "Admin",
		icon: Shield
	}
];
function SiteNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl min-w-0 flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 font-display text-lg font-bold tracking-wide",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex size-8 items-center justify-center rounded-md bg-ember text-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"KHATRI ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ember",
						children: "×"
					}),
					" ESP7"
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-wrap items-center gap-1",
				children: LINKS.map(({ to, label, icon: Icon }) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						className: cn("inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-sm font-semibold", pathname === to ? "border-ember bg-raised text-fg" : "border-transparent text-muted hover:border-line hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), label]
					}, to);
				})
			})]
		})
	});
}
//#endregion
export { cn as n, teamInitials as r, SiteNav as t };
