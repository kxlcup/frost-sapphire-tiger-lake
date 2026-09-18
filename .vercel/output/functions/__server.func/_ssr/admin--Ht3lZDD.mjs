import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Eye, f as EyeOff } from "../_libs/lucide-react.mjs";
import { n as useTournament, o as rosterFor, r as MODE_LABELS } from "./router-Cx5ecOLj.mjs";
import { t as SiteNav } from "./site-nav-CzMfviYu.mjs";
import { t as LogoPicker } from "./logo-picker-CeE9Qddu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin--Ht3lZDD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "ff_tournament_admin_session_vihaan_espx";
var memory = {};
function readFrom(store) {
	if (!store) return null;
	try {
		return store.getItem(KEY);
	} catch {
		return null;
	}
}
function writeTo(store, val) {
	if (!store) return;
	try {
		if (val === null) store.removeItem(KEY);
		else store.setItem(KEY, val);
	} catch {}
}
function isAdminLoggedIn() {
	if (typeof window === "undefined") return false;
	return (memory[KEY] ?? readFrom(window.localStorage) ?? readFrom(window.sessionStorage) ?? null) === "true";
}
function loginAdmin() {
	memory[KEY] = "true";
	if (typeof window === "undefined") return;
	writeTo(window.localStorage, "true");
	writeTo(window.sessionStorage, "true");
}
function logoutAdmin() {
	delete memory[KEY];
	if (typeof window === "undefined") return;
	writeTo(window.localStorage, null);
	writeTo(window.sessionStorage, null);
}
function credentialsMatch(id, pass) {
	return id.trim().toLowerCase() === "espx_admin".toLowerCase() && pass.trim() === "khatri1k";
}
function AdminDashboard() {
	const [authed, setAuthed] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [id, setId] = (0, import_react.useState)("");
	const [pass, setPass] = (0, import_react.useState)("");
	const [showPass, setShowPass] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setAuthed(isAdminLoggedIn());
	}, []);
	function onSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		if (credentialsMatch(id, pass)) {
			loginAdmin();
			setAuthed(true);
			setErr("");
		} else setErr("Incorrect admin ID or password.");
	}
	if (!authed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto mt-16 max-w-sm rounded-xl border border-line bg-raised p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Admin login"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Khatri x ESP7 — 1K Special Tournament"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 flex flex-col gap-4",
				onSubmit,
				autoComplete: "off",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-muted",
						children: ["Admin ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "admin-id",
							value: id,
							onChange: (e) => setId(e.target.value),
							autoComplete: "off",
							autoCapitalize: "none",
							autoCorrect: "off",
							spellCheck: false,
							className: "mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-fg"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm text-muted",
						children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative mt-1 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "admin-pass",
								type: showPass ? "text" : "password",
								value: pass,
								onChange: (e) => setPass(e.target.value),
								autoComplete: "off",
								autoCapitalize: "none",
								autoCorrect: "off",
								spellCheck: false,
								className: "w-full rounded-lg border border-line bg-bg px-3 py-2.5 pr-11 text-fg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted",
								onClick: () => setShowPass((v) => !v),
								"aria-label": showPass ? "Hide password" : "Show password",
								children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-h-4 text-sm text-danger",
						children: err
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "min-h-11 rounded-lg bg-gradient-to-br from-ember to-[#E23F00] py-3 font-display font-bold text-white",
						children: "Log in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 block text-center text-sm text-muted",
				children: "← Back to registration"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, { onLogout: () => {
		logoutAdmin();
		setAuthed(false);
	} });
}
function Dashboard({ onLogout }) {
	const { registrations, settings, setStatus, setLogo, remove, clearAll, setClosed, saveRoom, error } = useTournament();
	const [q, setQ] = (0, import_react.useState)("");
	const [rooms, setRooms] = (0, import_react.useState)(settings.rooms);
	const [saved, setSaved] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setRooms(settings.rooms);
	}, [settings.rooms]);
	const filtered = (0, import_react.useMemo)(() => {
		const term = q.toLowerCase();
		if (!term) return registrations;
		return registrations.filter((t) => {
			return [
				t.teamName,
				t.mode,
				t.captain?.name,
				t.captain?.uid,
				t.captain?.whatsapp,
				t.teammate2?.name,
				t.teammate3?.name,
				t.teammate4?.name
			].filter(Boolean).join(" ").toLowerCase().includes(term);
		});
	}, [registrations, q]);
	const counts = {
		solo: registrations.filter((t) => t.mode === "SOLO").length,
		duo: registrations.filter((t) => t.mode === "DUO").length,
		squad: registrations.filter((t) => (t.mode || "SQUAD") === "SQUAD").length,
		cs: registrations.filter((t) => t.mode === "CS").length,
		conf: registrations.filter((t) => t.status === "confirmed").length,
		in: registrations.filter((t) => t.status === "checked-in").length
	};
	function exportCsv() {
		if (registrations.length === 0) return;
		const csv = [[
			"ID",
			"Team",
			"Mode",
			"Tagline",
			"Status",
			"Registered At",
			"Captain Name",
			"Captain UID",
			"Captain WhatsApp",
			"Captain Email",
			"P2 Name",
			"P2 UID",
			"P3 Name",
			"P3 UID",
			"P4 Name",
			"P4 UID"
		], ...registrations.map((t) => [
			t.id,
			t.teamName,
			t.mode,
			t.tagline || "",
			t.status,
			t.createdAt,
			t.captain.name,
			t.captain.uid,
			t.captain.whatsapp,
			t.captain.email || "",
			t.teammate2?.name || "",
			t.teammate2?.uid || "",
			t.teammate3?.name || "",
			t.teammate3?.uid || "",
			t.teammate4?.name || "",
			t.teammate4?.uid || ""
		])].map((r) => r.map((v) => `"${String(v).replace(/"/g, "\"\"")}"`).join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "khatri_esp7_registrations.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: "Admin dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "rounded-lg border border-line px-3 py-2 text-sm text-muted",
						children: "← Back to site"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onLogout,
						className: "rounded-lg border border-line px-3 py-2 text-sm text-muted",
						children: "Log out"
					})]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 grid grid-cols-2 overflow-hidden rounded-card border border-line sm:grid-cols-4 lg:grid-cols-8",
				children: [
					[registrations.length, "Total"],
					[16 - registrations.length, "Slots left"],
					[counts.solo, "Solo"],
					[counts.duo, "Duo"],
					[counts.squad, "Squad"],
					[counts.cs, "CS"],
					[counts.conf, "Confirmed"],
					[counts.in, "Checked in"]
				].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-line bg-raised p-4 even:border-l",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-bold text-gold",
						children: n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-steel-light",
						children: l
					})]
				}, String(l)))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search team, captain, UID…",
					className: "min-w-56 rounded-lg border border-line bg-raised px-3 py-2 text-fg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: exportCsv,
						className: "rounded-lg border border-line px-3 py-2 text-sm text-muted",
						children: "Export CSV"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							if (confirm("Clear ALL registrations?")) clearAll();
						},
						className: "rounded-lg border border-line px-3 py-2 text-sm text-danger",
						children: "Clear all"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-card border border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "min-w-[860px] w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-raised text-[11px] uppercase tracking-wide text-steel-light",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
							"#",
							"Team",
							"Mode",
							"Captain",
							"Squad",
							"Status",
							""
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3",
							children: h
						}, h)) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 7,
						className: "px-3 py-10 text-center text-muted",
						children: "No registrations match."
					}) }) : filtered.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminRow, {
						t,
						i,
						onStatus: setStatus,
						onRemove: remove,
						onLogo: setLogo
					}, t.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-card border border-line bg-raised p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg",
						children: "Tournament settings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-line py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted",
							children: ["Registration status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "mt-0.5 block text-steel-light",
								children: "Closes / opens the public form"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void setClosed(!settings.closed),
							className: "rounded-lg border border-line px-3 py-2 text-sm text-muted",
							children: settings.closed ? "Reopen registration" : "Close registration"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between py-3 text-sm text-muted",
						children: ["Total slots", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: 16
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-card border border-line bg-raised p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg",
					children: "Room ID & password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [
						"SOLO",
						"DUO",
						"SQUAD",
						"CS"
					].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-line bg-bg p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-3 font-display text-gold",
								children: MODE_LABELS[mode]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mb-2 block text-xs text-muted",
								children: ["Room ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: rooms[mode]?.id || "",
									onChange: (e) => setRooms({
										...rooms,
										[mode]: {
											...rooms[mode],
											id: e.target.value
										}
									}),
									className: "mt-1 w-full rounded-md border border-line bg-raised px-3 py-2 text-fg"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs text-muted",
								children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: rooms[mode]?.pass || "",
									onChange: (e) => setRooms({
										...rooms,
										[mode]: {
											...rooms[mode],
											pass: e.target.value
										}
									}),
									className: "mt-1 w-full rounded-md border border-line bg-raised px-3 py-2 text-fg"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "mt-3 rounded-md border border-line px-3 py-1.5 text-xs text-muted",
								onClick: async () => {
									await saveRoom(mode, rooms[mode].id.trim(), rooms[mode].pass.trim());
									setSaved(mode);
									setTimeout(() => setSaved(""), 1600);
								},
								children: ["Save ", MODE_LABELS[mode]]
							}),
							saved === mode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs text-success",
								children: "Saved"
							}) : null
						]
					}, mode))
				})]
			})
		]
	});
}
function AdminRow({ t, i, onStatus, onRemove, onLogo }) {
	const squad = rosterFor(t).slice(1).map((p) => `${p.name} (${p.uid || "—"})`).join(" · ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-t border-line bg-bg align-top",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: i + 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoPicker, {
						compact: true,
						value: t.logoDataUrl || "",
						onChange: (url) => onLogo(t.id, url),
						label: `Upload ${t.teamName} logo`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: t.teamName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: t.id
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3 text-gold",
				children: MODE_LABELS[t.mode]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "px-3 py-3 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "text-fg",
						children: t.captain.name
					}),
					" (",
					t.captain.uid,
					")",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t.captain.whatsapp })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3 text-xs text-muted",
				children: squad || "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "rounded-md border border-line bg-raised px-2 py-1 text-xs",
					value: t.status || "pending",
					onChange: (e) => void onStatus(t.id, e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "pending",
							children: "Pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "confirmed",
							children: "Confirmed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "checked-in",
							children: "Checked in"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "rounded-md border border-line px-2 py-1 text-xs text-danger",
					onClick: () => {
						if (confirm("Remove this team?")) onRemove(t.id);
					},
					children: "Remove"
				})
			})
		]
	});
}
function AdminPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboard, {})]
	});
}
//#endregion
export { AdminPage as component };
