import { o as __toESM } from "../_runtime.mjs";
import { _ as createRootRoute, b as require_jsx_runtime, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, y as useRouter, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { a as setDoc, c as doc, i as query, l as getFirestore, n as onSnapshot, o as updateDoc, r as orderBy, s as collection, t as deleteDoc } from "../_libs/@firebase/firestore+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cx5ecOLj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var MODE_LABELS = {
	SOLO: "Solo",
	DUO: "Duo",
	SQUAD: "Squad",
	CS: "Clash Squad"
};
var EMPTY_ROOMS = {
	SOLO: {
		id: "",
		pass: ""
	},
	DUO: {
		id: "",
		pass: ""
	},
	SQUAD: {
		id: "",
		pass: ""
	},
	CS: {
		id: "",
		pass: ""
	}
};
var YT_URL = "https://youtube.com/@vihaan_espx?si=04AwPwUyIOK2nLon";
var SUPPORT_TEL = "461430657";
function rosterFor(t) {
	const list = [{
		name: t.captain?.name || "",
		uid: t.captain?.uid || ""
	}];
	if (t.mode === "SOLO") return list.filter((p) => p.name);
	if (t.teammate2) list.push(t.teammate2);
	if (t.mode === "DUO") return list.filter((p) => p.name);
	if (t.teammate3) list.push(t.teammate3);
	if (t.teammate4?.name) list.push(t.teammate4);
	return list.filter((p) => p.name);
}
var firebaseConfig = {
	apiKey: "AIzaSyBIr6Y2y6prLKgd7P857yCnY60eUhIOd8o",
	authDomain: "kxl-9cd03.firebaseapp.com",
	projectId: "kxl-9cd03",
	storageBucket: "kxl-9cd03.firebasestorage.app",
	messagingSenderId: "617940943718",
	appId: "1:617940943718:web:9a3f2aa243e544ab12bea7",
	measurementId: "G-6FCS278QPV"
};
var REGISTRATIONS_COL = "ff_tournament_registrations_vihaan_espx";
var SETTINGS_COL = "ff_tournament_settings_vihaan_espx";
var SETTINGS_ID = "main";
var app = null;
var db = null;
function clean(value) {
	return JSON.parse(JSON.stringify(value));
}
function firestoreMessage(err) {
	const msg = err instanceof Error ? err.message : String(err);
	if (/exceeds|too large|1 MiB|1048576/i.test(msg)) return "Logo is too large for the database. Try a simpler square JPG.";
	if (/permission|insufficient/i.test(msg)) return "Firebase permission error. Check Firestore rules for this project.";
	return err instanceof Error ? err.message : "Firebase request failed";
}
function getDb() {
	if (typeof window === "undefined") return null;
	if (!getApps().length) app = initializeApp(firebaseConfig);
	else app = getApps()[0];
	if (!db) db = getFirestore(app);
	return db;
}
function subscribeRegistrations(onData, onError) {
	const database = getDb();
	if (!database) return () => {};
	const col = collection(database, REGISTRATIONS_COL);
	const apply = (rows) => {
		rows.sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
		onData(rows);
	};
	let unsub = () => {};
	unsub = onSnapshot(query(col, orderBy("createdAt")), (snap) => onData(snap.docs.map((d) => d.data())), () => {
		unsub();
		unsub = onSnapshot(col, (snap) => apply(snap.docs.map((d) => d.data())), (err) => onError?.(err));
	});
	return () => unsub();
}
function subscribeSettings(onData, onError) {
	const database = getDb();
	if (!database) return () => {};
	const ref = doc(database, SETTINGS_COL, SETTINGS_ID);
	return onSnapshot(ref, (snap) => {
		const data = snap.exists() ? snap.data() : {};
		onData({
			closed: !!data.closed,
			rooms: Object.assign({}, EMPTY_ROOMS, data.rooms || {})
		});
	}, (err) => onError?.(err));
}
async function saveRegistration(entry) {
	const database = getDb();
	if (!database) throw new Error("Firebase is not available");
	const id = "FF-" + Date.now().toString(36).toUpperCase();
	const payload = clean({
		...entry,
		logoDataUrl: entry.logoDataUrl || "",
		tagline: entry.tagline || "",
		id,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		status: "pending"
	});
	try {
		await setDoc(doc(database, REGISTRATIONS_COL, id), payload);
	} catch (err) {
		throw new Error(firestoreMessage(err));
	}
	return id;
}
async function updateRegistrationStatus(id, status) {
	const database = getDb();
	if (!database) return;
	await updateDoc(doc(database, REGISTRATIONS_COL, id), { status });
}
async function updateRegistrationLogo(id, logoDataUrl) {
	const database = getDb();
	if (!database) throw new Error("Firebase is not available");
	try {
		await updateDoc(doc(database, REGISTRATIONS_COL, id), { logoDataUrl });
	} catch (err) {
		throw new Error(firestoreMessage(err));
	}
}
async function deleteRegistration(id) {
	const database = getDb();
	if (!database) return;
	await deleteDoc(doc(database, REGISTRATIONS_COL, id));
}
async function clearAllRegistrations(ids) {
	await Promise.all(ids.map((id) => deleteRegistration(id)));
}
async function setManuallyClosed(val) {
	const database = getDb();
	if (!database) return;
	await setDoc(doc(database, SETTINGS_COL, SETTINGS_ID), { closed: val }, { merge: true });
}
async function saveRoomSettings(mode, id, pass, rooms) {
	const database = getDb();
	if (!database) return;
	const next = {
		...rooms,
		[mode]: {
			id,
			pass
		}
	};
	await setDoc(doc(database, SETTINGS_COL, SETTINGS_ID), { rooms: next }, { merge: true });
}
var TournamentContext = (0, import_react.createContext)(null);
function TournamentProvider({ children }) {
	const [registrations, setRegistrations] = (0, import_react.useState)([]);
	const [settings, setSettings] = (0, import_react.useState)({
		closed: false,
		rooms: EMPTY_ROOMS
	});
	const [ready, setReady] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const u1 = subscribeRegistrations((rows) => {
			setRegistrations(rows);
			setError(null);
			setReady(true);
		}, (err) => {
			setError(err.message);
			setReady(true);
		});
		const u2 = subscribeSettings((s) => {
			setSettings(s);
			setReady(true);
		}, (err) => setError(err.message));
		return () => {
			u1();
			u2();
		};
	}, []);
	const value = (0, import_react.useMemo)(() => {
		const slotsLeft = Math.max(16 - registrations.length, 0);
		const isClosed = settings.closed || slotsLeft === 0;
		return {
			registrations,
			settings,
			ready,
			error,
			slotsLeft,
			isClosed,
			save: saveRegistration,
			setStatus: updateRegistrationStatus,
			setLogo: updateRegistrationLogo,
			remove: deleteRegistration,
			clearAll: () => clearAllRegistrations(registrations.map((r) => r.id)),
			setClosed: setManuallyClosed,
			saveRoom: (mode, id, pass) => saveRoomSettings(mode, id, pass, settings.rooms)
		};
	}, [
		registrations,
		settings,
		ready,
		error
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TournamentContext.Provider, {
		value,
		children
	});
}
function useTournament() {
	const ctx = (0, import_react.useContext)(TournamentContext);
	if (!ctx) throw new Error("useTournament must be used inside TournamentProvider");
	return ctx;
}
var styles_default = "/assets/styles-CyzqZ1Vm.css";
var APP_NAME = "Khatri x ESP7 — Free Fire Tournament";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Register your squad for the Khatri x ESP7 1K Special Free Fire tournament. Team logos, player reveal, and matchday VS posters."
			},
			{
				name: "theme-color",
				content: "#0E0B08"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "ember-glow min-h-screen antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TournamentProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-CpGPp88u.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin--Ht3lZDD.mjs");
var Route$3 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./hall-LhGwZWf1.mjs");
var Route$2 = createFileRoute("/hall")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./reveal-BJboWz4r.mjs");
var Route$1 = createFileRoute("/reveal")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./vs-Ceo1IujN.mjs");
var Route = createFileRoute("/vs")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	AdminRoute: Route$3.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$5
	}),
	HallRoute: Route$2.update({
		id: "/hall",
		path: "/hall",
		getParentRoute: () => Route$5
	}),
	RevealRoute: Route$1.update({
		id: "/reveal",
		path: "/reveal",
		getParentRoute: () => Route$5
	}),
	VsRoute: Route.update({
		id: "/vs",
		path: "/vs",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { YT_URL as a, SUPPORT_TEL as i, useTournament as n, rosterFor as o, MODE_LABELS as r, router_exports as t };
