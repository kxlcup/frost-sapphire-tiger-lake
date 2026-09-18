import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useTournament } from "@/lib/tournament-context";
import type { EntryStatus, GameMode, Registration } from "@/lib/types";
import { MODE_LABELS, TOTAL_SLOTS, rosterFor } from "@/lib/types";
import { loginAdmin, logoutAdmin, credentialsMatch, isAdminLoggedIn } from "@/lib/session";
import { LogoPicker } from "@/components/logo-picker";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";

export function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [err, setErr] = useState("");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    setAuthed(isAdminLoggedIn());
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (credentialsMatch(id, pass)) {
      loginAdmin();
      setAuthed(true);
      setErr("");
    } else {
      setErr("Incorrect admin ID or password.");
    }
  }

  if (!authed) {
    return (
      <div className="mx-auto mt-16 max-w-sm rounded-xl border border-line bg-raised p-8">
        <h2 className="font-display text-2xl">Admin login</h2>
        <p className="mt-1 text-sm text-muted">Khatri x ESP7 — 1K Special Tournament</p>
        <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit} autoComplete="off">
          <label className="text-sm text-muted">
            Admin ID
            <input
              name="admin-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-fg"
            />
          </label>
          <label className="text-sm text-muted" htmlFor="admin-pass">
            Password
          </label>
          <div className="relative">
            <input
              id="admin-pass"
              name="admin-pass"
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="w-full rounded-lg border border-line bg-bg px-3 py-2.5 pr-11 text-fg"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted"
              onClick={() => setShowPass((v) => !v)}
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <p className="min-h-4 text-sm text-danger">{err}</p>
          <button
            type="submit"
            className="min-h-11 rounded-lg bg-gradient-to-br from-ember to-[#E23F00] py-3 font-display font-bold text-white"
          >
            Log in
          </button>
        </form>
        <Link to="/" className="mt-4 block text-center text-sm text-muted">
          ← Back to registration
        </Link>
      </div>
    );
  }

  return (
    <Dashboard
      onLogout={() => {
        logoutAdmin();
        setAuthed(false);
      }}
    />
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { registrations, settings, setStatus, setLogo, remove, clearAll, setClosed, saveRoom, error } =
    useTournament();
  const [q, setQ] = useState("");
  const [rooms, setRooms] = useState(settings.rooms);
  const [saved, setSaved] = useState<string>("");

  useEffect(() => {
    setRooms(settings.rooms);
  }, [settings.rooms]);

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    if (!term) return registrations;
    return registrations.filter((t) => {
      const hay = [
        t.teamName,
        t.mode,
        t.captain?.name,
        t.captain?.uid,
        t.captain?.whatsapp,
        t.teammate2?.name,
        t.teammate3?.name,
        t.teammate4?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [registrations, q]);

  const counts = {
    solo: registrations.filter((t) => t.mode === "SOLO").length,
    duo: registrations.filter((t) => t.mode === "DUO").length,
    squad: registrations.filter((t) => (t.mode || "SQUAD") === "SQUAD").length,
    cs: registrations.filter((t) => t.mode === "CS").length,
    conf: registrations.filter((t) => t.status === "confirmed").length,
    in: registrations.filter((t) => t.status === "checked-in").length,
  };

  function exportCsv() {
    if (registrations.length === 0) return;
    const header = [
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
      "P4 UID",
    ];
    const rows = registrations.map((t) => [
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
      t.teammate4?.uid || "",
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "khatri_esp7_registrations.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl">Admin dashboard</h1>
        <div className="flex gap-2">
          <Link to="/" className="rounded-lg border border-line px-3 py-2 text-sm text-muted">
            ← Back to site
          </Link>
          <button onClick={onLogout} className="rounded-lg border border-line px-3 py-2 text-sm text-muted">
            Log out
          </button>
        </div>
      </div>

      {error ? (
        <p className="mb-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>
      ) : null}

      <div className="mb-6 grid grid-cols-2 overflow-hidden rounded-card border border-line sm:grid-cols-4 lg:grid-cols-8">
        {[
          [registrations.length, "Total"],
          [TOTAL_SLOTS - registrations.length, "Slots left"],
          [counts.solo, "Solo"],
          [counts.duo, "Duo"],
          [counts.squad, "Squad"],
          [counts.cs, "CS"],
          [counts.conf, "Confirmed"],
          [counts.in, "Checked in"],
        ].map(([n, l]) => (
          <div key={String(l)} className="border-line bg-raised p-4 even:border-l">
            <div className="font-display text-2xl font-bold text-gold">{n}</div>
            <div className="text-xs text-steel-light">{l}</div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search team, captain, UID…"
          className="min-w-56 rounded-lg border border-line bg-raised px-3 py-2 text-fg"
        />
        <div className="flex gap-2">
          <button onClick={exportCsv} className="rounded-lg border border-line px-3 py-2 text-sm text-muted">
            Export CSV
          </button>
          <button
            onClick={() => {
              if (confirm("Clear ALL registrations?")) void clearAll();
            }}
            className="rounded-lg border border-line px-3 py-2 text-sm text-danger"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-card border border-line">
        <table className="min-w-[860px] w-full text-left text-sm">
          <thead className="bg-raised text-[11px] uppercase tracking-wide text-steel-light">
            <tr>
              {["#", "Team", "Mode", "Captain", "Squad", "Status", ""].map((h) => (
                <th key={h} className="px-3 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-10 text-center text-muted">
                  No registrations match.
                </td>
              </tr>
            ) : (
              filtered.map((t, i) => (
                <AdminRow key={t.id} t={t} i={i} onStatus={setStatus} onRemove={remove} onLogo={setLogo} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <section className="mt-8 rounded-card border border-line bg-raised p-6">
        <h3 className="font-display text-lg">Tournament settings</h3>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-line py-3">
          <div className="text-sm text-muted">
            Registration status
            <small className="mt-0.5 block text-steel-light">Closes / opens the public form</small>
          </div>
          <button
            onClick={() => void setClosed(!settings.closed)}
            className="rounded-lg border border-line px-3 py-2 text-sm text-muted"
          >
            {settings.closed ? "Reopen registration" : "Close registration"}
          </button>
        </div>
        <div className="flex items-center justify-between py-3 text-sm text-muted">
          Total slots
          <span className="text-fg">{TOTAL_SLOTS}</span>
        </div>
      </section>

      <section className="mt-6 rounded-card border border-line bg-raised p-6">
        <h3 className="font-display text-lg">Room ID & password</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {(["SOLO", "DUO", "SQUAD", "CS"] as GameMode[]).map((mode) => (
            <div key={mode} className="rounded-lg border border-line bg-bg p-4">
              <h4 className="mb-3 font-display text-gold">{MODE_LABELS[mode]}</h4>
              <label className="mb-2 block text-xs text-muted">
                Room ID
                <input
                  value={rooms[mode]?.id || ""}
                  onChange={(e) => setRooms({ ...rooms, [mode]: { ...rooms[mode], id: e.target.value } })}
                  className="mt-1 w-full rounded-md border border-line bg-raised px-3 py-2 text-fg"
                />
              </label>
              <label className="block text-xs text-muted">
                Password
                <input
                  value={rooms[mode]?.pass || ""}
                  onChange={(e) => setRooms({ ...rooms, [mode]: { ...rooms[mode], pass: e.target.value } })}
                  className="mt-1 w-full rounded-md border border-line bg-raised px-3 py-2 text-fg"
                />
              </label>
              <button
                className="mt-3 rounded-md border border-line px-3 py-1.5 text-xs text-muted"
                onClick={async () => {
                  await saveRoom(mode, rooms[mode].id.trim(), rooms[mode].pass.trim());
                  setSaved(mode);
                  setTimeout(() => setSaved(""), 1600);
                }}
              >
                Save {MODE_LABELS[mode]}
              </button>
              {saved === mode ? <span className="ml-2 text-xs text-success">Saved</span> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AdminRow({
  t,
  i,
  onStatus,
  onRemove,
  onLogo,
}: {
  t: Registration;
  i: number;
  onStatus: (id: string, s: EntryStatus) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  onLogo: (id: string, logoDataUrl: string) => Promise<void>;
}) {
  const squad = rosterFor(t)
    .slice(1)
    .map((p) => `${p.name} (${p.uid || "—"})`)
    .join(" · ");
  return (
    <tr className="border-t border-line bg-bg align-top">
      <td className="px-3 py-3">{i + 1}</td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <LogoPicker
            compact
            value={t.logoDataUrl || ""}
            onChange={(url) => onLogo(t.id, url)}
            label={`Upload ${t.teamName} logo`}
          />
          <div>
            <b>{t.teamName}</b>
            <div className="text-xs text-muted">{t.id}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-3 text-gold">{MODE_LABELS[t.mode]}</td>
      <td className="px-3 py-3 text-xs text-muted">
        <b className="text-fg">{t.captain.name}</b> ({t.captain.uid})
        <div>{t.captain.whatsapp}</div>
      </td>
      <td className="px-3 py-3 text-xs text-muted">{squad || "—"}</td>
      <td className="px-3 py-3">
        <select
          className="rounded-md border border-line bg-raised px-2 py-1 text-xs"
          value={t.status || "pending"}
          onChange={(e) => void onStatus(t.id, e.target.value as EntryStatus)}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="checked-in">Checked in</option>
        </select>
      </td>
      <td className="px-3 py-3">
        <button
          className="rounded-md border border-line px-2 py-1 text-xs text-danger"
          onClick={() => {
            if (confirm("Remove this team?")) void onRemove(t.id);
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
