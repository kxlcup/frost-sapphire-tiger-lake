import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { TeamCard } from "@/components/team-card";
import { LogoPicker } from "@/components/logo-picker";
import { useTournament } from "@/lib/tournament-context";

export const Route = createFileRoute("/reveal")({ component: RevealPage });

function RevealPage() {
  const { registrations, setLogo, ready } = useTournament();
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [curtain, setCurtain] = useState(true);
  const [logoErr, setLogoErr] = useState("");

  useEffect(() => {
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

  useEffect(() => {
    const t = setTimeout(() => setCurtain(false), 400);
    return () => clearTimeout(t);
  }, [idx]);

  useEffect(() => {
    if (registrations.length === 0) {
      setIdx(0);
      return;
    }
    if (idx >= registrations.length) setIdx(0);
  }, [registrations.length, idx]);

  const team = registrations[idx];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="reveal-stage min-h-[calc(100vh-56px)] px-4 py-10">
        <div className="mx-auto max-w-lg text-center">
          <p className="font-display text-sm tracking-[0.2em] text-gold">SQUAD REVEAL</p>
          <h1 className="mt-2 font-display text-4xl">Team Showcase</h1>
          <p className="mt-2 text-sm text-muted">One card at a time — share-ready for stream and status.</p>
        </div>

        {!ready ? (
          <p className="mt-16 text-center text-muted">Loading squads…</p>
        ) : registrations.length === 0 ? (
          <p className="mt-16 text-center text-muted">No squads to reveal yet. Register first.</p>
        ) : (
          <>
            <p className="mt-8 text-center font-display text-gold">
              {String(idx + 1).padStart(2, "0")} / {String(registrations.length).padStart(2, "0")}
            </p>
            <div className="mx-auto mt-4 max-w-sm">
              <div
                className="transition-all duration-300"
                style={{
                  opacity: curtain ? 0 : 1,
                  transform: curtain ? "scale(0.94) translateY(12px)" : "scale(1) translateY(0)",
                }}
              >
                {team ? <TeamCard team={team} index={idx} featured /> : null}
              </div>
              {team ? (
                <div className="mt-5 rounded-xl border border-line bg-raised/80 p-4">
                  <p className="mb-3 font-display text-sm text-gold">Logo for {team.teamName}</p>
                  <LogoPicker
                    value={team.logoDataUrl || ""}
                    onChange={async (url) => {
                      setLogoErr("");
                      try {
                        await setLogo(team.id, url);
                      } catch (err) {
                        setLogoErr(err instanceof Error ? err.message : "Could not save logo");
                      }
                    }}
                    label={team.logoDataUrl ? "Replace logo" : "Upload logo"}
                    hint="Shows on this reveal card, gallery, and VS poster"
                  />
                  {logoErr ? <p className="mt-2 text-xs text-danger">{logoErr}</p> : null}
                </div>
              ) : null}
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-raised"
                onClick={() => {
                  setCurtain(true);
                  setIdx((i) => (i - 1 + registrations.length) % registrations.length);
                }}
                aria-label="Previous team"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ember px-5 font-display font-bold"
                onClick={() => setPlaying((p) => !p)}
              >
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                {playing ? "Pause" : "Auto-play"}
              </button>
              <button
                className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-raised"
                onClick={() => {
                  setCurtain(true);
                  setIdx((i) => (i + 1) % registrations.length);
                }}
                aria-label="Next team"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
