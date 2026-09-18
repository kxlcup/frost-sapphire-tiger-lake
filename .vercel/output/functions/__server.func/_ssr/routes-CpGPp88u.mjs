import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as Link, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as YT_URL, i as SUPPORT_TEL, n as useTournament, r as MODE_LABELS } from "./router-Cx5ecOLj.mjs";
import { n as cn, t as SiteNav } from "./site-nav-CzMfviYu.mjs";
import { t as LogoPicker } from "./logo-picker-CeE9Qddu.mjs";
import { t as TeamCard } from "./team-card-olNk5mOB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CpGPp88u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterForm() {
	const { save, settings, slotsLeft } = useTournament();
	const [mode, setMode] = (0, import_react.useState)("SQUAD");
	const [logoPreview, setLogoPreview] = (0, import_react.useState)("");
	const [logoDataUrl, setLogoDataUrl] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [subscribed, setSubscribed] = (0, import_react.useState)(false);
	const [modalErr, setModalErr] = (0, import_react.useState)("");
	const [confirmId, setConfirmId] = (0, import_react.useState)("");
	const [confirmName, setConfirmName] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)({});
	const closed = settings.closed || slotsLeft === 0;
	const required = (0, import_react.useMemo)(() => {
		const base = [
			"teamName",
			"capName",
			"capUid",
			"capWhatsapp"
		];
		if (mode === "SOLO") return base;
		if (mode === "DUO") return [
			...base,
			"p2Name",
			"p2Uid"
		];
		return [
			...base,
			"p2Name",
			"p2Uid",
			"p3Name",
			"p3Uid"
		];
	}, [mode]);
	function val(id) {
		return document.getElementById(id)?.value.trim() ?? "";
	}
	function validate() {
		const next = {};
		required.forEach((id) => {
			if (!val(id)) next[id] = "Required";
		});
		const wa = val("capWhatsapp").replace(/\D/g, "");
		if (wa && !/^\d{10}$/.test(wa)) next.capWhatsapp = "Enter a valid 10-digit number";
		const email = val("capEmail");
		if (email && !/^\S+@\S+\.\S+$/.test(email)) next.capEmail = "Enter a valid email";
		setErrors(next);
		return Object.keys(next).length === 0;
	}
	function setLogo(data) {
		setLogoDataUrl(data);
		setLogoPreview(data);
		setErrors((e) => ({
			...e,
			logo: ""
		}));
	}
	function onSubmit(e) {
		e.preventDefault();
		if (closed) return;
		if (!validate()) return;
		setDraft({
			teamName: val("teamName"),
			tagline: val("tagline"),
			capName: val("capName"),
			capUid: val("capUid"),
			capWhatsapp: val("capWhatsapp"),
			capEmail: val("capEmail"),
			p2Name: val("p2Name"),
			p2Uid: val("p2Uid"),
			p3Name: val("p3Name"),
			p3Uid: val("p3Uid"),
			p4Name: val("p4Name"),
			p4Uid: val("p4Uid")
		});
		setSubscribed(false);
		setModalErr("");
		setModalOpen(true);
	}
	async function finalize() {
		if (!subscribed) {
			setModalErr("Please subscribe and check the box to confirm.");
			return;
		}
		setBusy(true);
		try {
			const id = await save({
				teamName: draft.teamName || "",
				mode,
				tagline: draft.tagline || "",
				logoDataUrl,
				captain: {
					name: draft.capName || "",
					uid: draft.capUid || "",
					whatsapp: draft.capWhatsapp || "",
					email: draft.capEmail || ""
				},
				teammate2: {
					name: draft.p2Name || "",
					uid: draft.p2Uid || ""
				},
				teammate3: {
					name: draft.p3Name || "",
					uid: draft.p3Uid || ""
				},
				teammate4: {
					name: draft.p4Name || "",
					uid: draft.p4Uid || ""
				}
			});
			setConfirmId(id);
			setConfirmName(draft.teamName || "");
			setModalOpen(false);
			document.getElementById("regForm")?.reset();
			setLogoPreview("");
			setLogoDataUrl("");
			setMode("SQUAD");
		} catch (err) {
			setModalErr(err instanceof Error ? err.message : "Could not save. Check your connection.");
		} finally {
			setBusy(false);
		}
	}
	const fieldClass = "rounded-lg border border-line bg-raised px-3 py-2.5 text-base text-fg outline-none placeholder:text-steel-light focus:border-ember";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			id: "regForm",
			onSubmit,
			noValidate: true,
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "flex flex-col gap-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-display text-base font-bold text-gold",
							children: "Team"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3.5 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Team name",
								id: "teamName",
								error: errors.teamName,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "teamName",
									className: cn(fieldClass, errors.teamName && "border-danger"),
									placeholder: "e.g. Ember Squad"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Mode",
								id: "modeSelect",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "modeSelect",
									className: fieldClass,
									value: mode,
									onChange: (e) => setMode(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SOLO",
											children: "Solo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "DUO",
											children: "Duo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SQUAD",
											children: "Squad (BR)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "CS",
											children: "Clash Squad (CS)"
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tagline / motto",
							id: "tagline",
							optional: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "tagline",
								className: fieldClass,
								placeholder: "e.g. Born to clutch",
								maxLength: 48
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mb-1.5 block text-sm text-muted",
								children: ["Team logo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-steel-light",
									children: "(optional, square works best)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoPicker, {
								value: logoPreview,
								onChange: setLogo,
								label: "Upload team logo",
								hint: "Tap, drop, or paste a JPG / PNG"
							}),
							errors.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-danger",
								children: errors.logo
							}) : null
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "flex flex-col gap-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "font-display text-base font-bold text-gold",
						children: "Captain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3.5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								id: "capName",
								label: "Captain IGN",
								error: errors.capName,
								className: fieldClass
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								id: "capUid",
								label: "Captain Free Fire UID",
								error: errors.capUid,
								className: fieldClass,
								placeholder: "e.g. 123456789"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								id: "capWhatsapp",
								label: "WhatsApp number",
								error: errors.capWhatsapp,
								className: fieldClass,
								placeholder: "10-digit number",
								type: "tel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
								id: "capEmail",
								label: "Email",
								optional: true,
								error: errors.capEmail,
								className: fieldClass,
								placeholder: "you@example.com",
								type: "email"
							})
						]
					})]
				}),
				mode !== "SOLO" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPair, {
					legend: "Teammate 2",
					prefix: "p2",
					errors,
					className: fieldClass
				}),
				mode !== "SOLO" && mode !== "DUO" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPair, {
					legend: "Teammate 3",
					prefix: "p3",
					errors,
					className: fieldClass
				}),
				mode !== "SOLO" && mode !== "DUO" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPair, {
					legend: "Teammate 4 (substitute, optional)",
					prefix: "p4",
					errors,
					className: fieldClass,
					optional: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: closed || busy,
					className: "rounded-lg bg-gradient-to-br from-ember to-[#E23F00] px-8 py-3 font-display text-lg font-bold text-white shadow-[0_6px_20px_rgba(255,90,31,0.25)] disabled:cursor-not-allowed disabled:opacity-50",
					children: settings.closed ? "Registration closed" : slotsLeft === 0 ? "Registration full" : "Register team"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 text-xs text-steel-light",
					children: "Logos and squads sync live with Firebase. Captain contact stays private on the public gallery."
				})] })
			]
		}),
		confirmId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-card border border-success bg-raised p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl text-success",
					children: "You're in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-display text-gold",
					children: ["Registration ID: ", confirmId]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						confirmName,
						" is registered for ",
						MODE_LABELS[mode],
						". Watch the reveal page and YouTube live for match updates."
					]
				})
			]
		}) : null,
		modalOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-xl border border-ember bg-raised p-6 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: "One last step"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Subscribe to the Khatri x ESP7 YouTube channel to lock in your slot."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: YT_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-4 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#FF3B30] font-display text-base font-bold text-white",
						children: "Subscribe on YouTube"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 flex items-start gap-2.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: subscribed,
							onChange: (e) => setSubscribed(e.target.checked),
							className: "mt-0.5 size-4 accent-ember"
						}), "I've subscribed to the Khatri x ESP7 YouTube channel"]
					}),
					modalErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-danger",
						children: modalErr
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: finalize,
							className: "rounded-lg bg-gradient-to-br from-ember to-[#E23F00] px-5 py-3 font-display font-bold text-white",
							children: busy ? "Saving…" : "Confirm & register"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setModalOpen(false),
							className: "rounded-lg border border-line px-5 py-3 font-display font-bold text-muted",
							children: "Cancel"
						})]
					})
				]
			})
		}) : null
	] });
}
function Field({ id, label, optional, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				htmlFor: id,
				className: "text-sm text-muted",
				children: [
					label,
					" ",
					optional ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-steel-light",
						children: "(optional)"
					}) : null
				]
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-3.5 text-xs text-danger",
				children: error || ""
			})
		]
	});
}
function TextField({ id, label, error, className, optional, placeholder, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		id,
		label,
		optional,
		error,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			type,
			placeholder: placeholder || "In-game name",
			className: cn(className, error && "border-danger")
		})
	});
}
function PlayerPair({ legend, prefix, errors, className, optional }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "flex flex-col gap-3.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "font-display text-base font-bold text-gold",
			children: legend
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3.5 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
				id: `${prefix}Name`,
				label: "IGN",
				optional,
				error: errors[`${prefix}Name`],
				className
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
				id: `${prefix}Uid`,
				label: "Free Fire UID",
				optional,
				error: errors[`${prefix}Uid`],
				className,
				placeholder: "e.g. 123456789"
			})]
		})]
	});
}
function Home() {
	const { registrations, settings, slotsLeft, error } = useTournament();
	const rooms = settings.rooms;
	const activeModes = [
		"SOLO",
		"DUO",
		"SQUAD",
		"CS"
	].filter((m) => rooms[m]?.id);
	const full = settings.closed || slotsLeft === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-3xl px-5 pt-4 text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative overflow-hidden border-b border-line pb-12 pt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-clip pointer-events-none absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-3xl px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: YT_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-raised py-1.5 pl-2 pr-4 text-sm font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex size-6 items-center justify-center rounded-md bg-[#FF3B30] text-[10px] font-bold text-white",
									children: "▶"
								}),
								"Khatri x ESP7",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									className: "font-normal text-muted",
									children: "@VIHAAN_ESPx"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 inline-flex rounded-full border border-gold/40 bg-ember/15 px-3.5 py-1.5 font-display text-xs font-bold tracking-widest text-gold",
							children: "1K SPECIAL TOURNAMENT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold tracking-wide text-gold",
							children: "SQUAD REGISTRATION · FREE FIRE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-2 max-w-xl font-display text-[clamp(2.4rem,7vw,4rem)] font-bold leading-[0.98]",
							children: [
								"Khatri x ESP7",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "not-italic text-ember",
									children: "Free Fire"
								}),
								" Tournament"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-[15px] text-muted",
							children: "Upload your squad logo, lock your IGNs, and get a professional reveal card. Room ID & password drop here and on the live stream."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-28 rounded-xl border border-line bg-raised px-4 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-2xl font-bold text-gold",
										children: registrations.length
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted",
										children: "Teams registered"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-28 rounded-xl border border-line bg-raised px-4 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-2xl font-bold text-gold",
										children: slotsLeft
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted",
										children: "Slots remaining"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("inline-flex items-center gap-2 text-sm font-semibold", full ? "text-danger" : "text-success"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", full ? "bg-danger" : "bg-success") }), settings.closed ? "Registration closed" : slotsLeft === 0 ? "Slots full" : "Registration open"]
								})
							]
						}),
						activeModes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-xl border border-ember bg-raised p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-2 text-xs uppercase tracking-wide text-gold",
								children: "Room details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-6",
								children: activeModes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] text-steel-light",
										children: [MODE_LABELS[m], " — Room ID"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-lg font-bold",
										children: rooms[m].id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-steel-light",
										children: "Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-lg font-bold",
										children: rooms[m].pass || "—"
									})
								] }, m))
							})]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-line py-11",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-[26px]",
							children: "Tournament details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Everything you need before you register."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid grid-cols-2 overflow-hidden rounded-card border border-line sm:grid-cols-3",
							children: [
								["Game", "Free Fire"],
								["Format", "Solo / Duo / Squad / CS"],
								["Prize pool", "₹1,000"],
								["Entry fee", "Free"],
								["Total slots", `16 teams`],
								["Match date", "Announced on YouTube live"]
							].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-line bg-raised p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] uppercase tracking-wide text-steel-light",
									children: l
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-display text-xl font-bold",
									children: v
								})]
							}, l))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-line py-11",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-[26px]",
						children: "Rules"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-5 list-decimal space-y-2.5 pl-5 text-[14.5px] text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-fg",
								children: "One entry per team."
							}), " Duplicates from the same squad will be removed."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-fg",
								children: "IGN and UID must match"
							}), " your in-game profile exactly."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-fg",
								children: "No hacking, teaming, or emulator abuse."
							}), " Fair play is enforced."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-fg",
								children: "Be online 15 minutes before"
							}), " match time. Room ID is posted above and on stream."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-fg",
								children: "Results and clips"
							}), " go on the Khatri x ESP7 YouTube channel."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Host decisions during the tournament are final." })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "register",
				className: "border-b border-line py-11",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-[26px]",
							children: "Register your squad"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Add a logo and motto — they power your reveal card and VS poster."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterForm, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-muted",
							children: [
								"Need help? Customer support:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${SUPPORT_TEL}`,
									className: "font-semibold text-gold",
									children: SUPPORT_TEL
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-line py-11",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-5xl px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-[26px]",
							children: "Squad gallery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Public cards only — WhatsApp and UID stay in admin."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/reveal",
							className: "rounded-lg border border-gold/40 px-4 py-2 text-sm font-semibold text-gold",
							children: "Open reveal stage →"
						})]
					}), registrations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-card border border-dashed border-line px-4 py-10 text-center text-sm text-muted",
						children: "No teams registered yet — be the first to lock a slot."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: registrations.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCard, {
							team: t,
							index: i
						}, t.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "px-5 py-12 text-center text-xs text-steel-light",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Khatri x ESP7 Free Fire Tournament · community-run event, not affiliated with Garena." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: YT_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-3 inline-block font-semibold text-gold",
						children: "Watch live on YouTube"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3",
						children: [
							"Customer support:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${SUPPORT_TEL}`,
								className: "text-gold",
								children: SUPPORT_TEL
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 tracking-wide",
						children: "Developed by Lord Plays"
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
