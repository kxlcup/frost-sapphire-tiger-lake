import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { useTournament } from "@/lib/tournament-context";
import { downloadBlob, renderVsPoster } from "@/lib/vs-poster";
import { teamInitials } from "@/lib/utils";

export const Route = createFileRoute("/vs")({ component: VsPage });

function VsPage() {
  const { registrations } = useTournament();
  const [aId, setAId] = useState("");
  const [bId, setBId] = useState("");
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

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
    const blob = await renderVsPoster(a, b);
    downloadBlob(blob, `${a.teamName}_vs_${b.teamName}.png`);
  }

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="font-display text-sm tracking-[0.18em] text-gold">MATCHDAY HYPE</p>
        <h1 className="mt-2 font-display text-4xl">VS Poster</h1>
        <p className="mt-2 text-sm text-muted">
          Combine two squad logos into a shareable matchup poster for stream and WhatsApp status.
        </p>

        {registrations.length < 2 ? (
          <p className="mt-10 text-muted">Need at least two registered teams to generate a poster.</p>
        ) : (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <TeamPick label="Team A" value={aId} onChange={setAId} />
              <TeamPick label="Team B" value={bId} onChange={setBId} />
            </div>
            {err ? <p className="mt-3 text-sm text-danger">{err}</p> : null}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => void generate()}
                disabled={busy}
                className="rounded-lg bg-gradient-to-br from-ember to-[#E23F00] px-5 py-3 font-display font-bold text-white disabled:opacity-50"
              >
                {busy ? "Building…" : "Generate poster"}
              </button>
              {preview ? (
                <button
                  onClick={() => void download()}
                  className="rounded-lg border border-line px-5 py-3 font-display font-bold text-muted"
                >
                  Download PNG
                </button>
              ) : null}
            </div>
            {preview ? (
              <img src={preview} alt="VS poster preview" className="mt-8 w-full max-w-md rounded-xl border border-line" />
            ) : a && b ? (
              <div className="mt-10 flex items-center justify-center gap-6">
                <Monogram name={a.teamName} src={a.logoDataUrl} />
                <span className="font-display text-4xl font-bold text-ember">VS</span>
                <Monogram name={b.teamName} src={b.logoDataUrl} />
              </div>
            ) : null}
          </>
        )}
      </main>
    </div>
  );
}

function TeamPick({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const { registrations } = useTournament();
  return (
    <label className="text-sm text-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-line bg-raised px-3 py-2.5 text-fg"
      >
        <option value="">Select team</option>
        {registrations.map((t) => (
          <option key={t.id} value={t.id}>
            {t.teamName}
          </option>
        ))}
      </select>
    </label>
  );
}

function Monogram({ name, src }: { name: string; src?: string }) {
  return src ? (
    <img src={src} alt={name} className="size-24 rounded-xl object-cover" />
  ) : (
    <div className="flex size-24 items-center justify-center rounded-xl bg-gradient-to-br from-ember to-gold font-display text-2xl font-bold text-bg">
      {teamInitials(name)}
    </div>
  );
}
