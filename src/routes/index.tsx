import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { RegisterForm } from "@/components/register-form";
import { TeamCard } from "@/components/team-card";
import { useTournament } from "@/lib/tournament-context";
import { MODE_LABELS, TOTAL_SLOTS, YT_URL, SUPPORT_TEL } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { registrations, settings, slotsLeft, error, ready } = useTournament();
  const rooms = settings.rooms;
  const activeModes = (["SOLO", "DUO", "SQUAD", "CS"] as const).filter((m) => rooms[m]?.id);
  const full = settings.closed || slotsLeft === 0;

  return (
    <div className="min-h-screen">
      <SiteNav />
      {error && registrations.length === 0 ? (
        <p className="mx-auto max-w-3xl px-5 pt-4 text-sm text-danger">{error}</p>
      ) : null}
      <header className="relative overflow-hidden border-b border-line pb-12 pt-10">
        <div className="hero-clip pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-5">
          <a
            href={YT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-raised py-1.5 pl-2 pr-4 text-sm font-semibold"
          >
            <span className="inline-flex size-6 items-center justify-center rounded-md bg-[#FF3B30] text-[10px] font-bold text-white">
              ▶
            </span>
            Khatri x ESP7
            <small className="font-normal text-muted">@VIHAAN_ESPx</small>
          </a>
          <div className="mb-3 inline-flex rounded-full border border-gold/40 bg-ember/15 px-3.5 py-1.5 font-display text-xs font-bold tracking-widest text-gold">
            1K SPECIAL TOURNAMENT
          </div>
          <p className="text-sm font-semibold tracking-wide text-gold">SQUAD REGISTRATION · FREE FIRE</p>
          <h1 className="mt-2 max-w-xl font-display text-[clamp(2.4rem,7vw,4rem)] font-bold leading-[0.98]">
            Khatri x ESP7
            <br />
            <em className="not-italic text-ember">Free Fire</em> Tournament
          </h1>
          <p className="mt-4 max-w-md text-[15px] text-muted">
            Upload your squad logo, lock your IGNs, and get a professional reveal card. Room ID & password drop here and on the live stream.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="min-w-28 rounded-xl border border-line bg-raised px-4 py-2.5">
              <div className="font-display text-2xl font-bold text-gold">{ready ? registrations.length : "—"}</div>
              <div className="text-xs text-muted">Teams registered</div>
            </div>
            <div className="min-w-28 rounded-xl border border-line bg-raised px-4 py-2.5">
              <div className="font-display text-2xl font-bold text-gold">{ready ? slotsLeft : "—"}</div>
              <div className="text-xs text-muted">Slots remaining</div>
            </div>
            <span className={cn("inline-flex items-center gap-2 text-sm font-semibold", full ? "text-danger" : "text-success")}>
              <span className={cn("size-2 rounded-full", full ? "bg-danger" : "bg-success")} />
              {!ready ? "Loading…" : settings.closed ? "Registration closed" : slotsLeft === 0 ? "Slots full" : "Registration open"}
            </span>
          </div>

          {activeModes.length > 0 ? (
            <div className="mt-5 rounded-xl border border-ember bg-raised p-4">
              <h4 className="mb-2 text-xs uppercase tracking-wide text-gold">Room details</h4>
              <div className="flex flex-wrap gap-6">
                {activeModes.map((m) => (
                  <div key={m}>
                    <div className="text-[11px] text-steel-light">
                      {MODE_LABELS[m]} — Room ID
                    </div>
                    <div className="font-display text-lg font-bold">{rooms[m].id}</div>
                    <div className="text-[11px] text-steel-light">Password</div>
                    <div className="font-display text-lg font-bold">{rooms[m].pass || "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <section className="border-b border-line py-11">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-[26px]">Tournament details</h2>
          <p className="mt-1 text-sm text-muted">Everything you need before you register.</p>
          <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-card border border-line sm:grid-cols-3">
            {[
              ["Game", "Free Fire"],
              ["Format", "Solo / Duo / Squad / CS"],
              ["Prize pool", "₹1,000"],
              ["Entry fee", "Free"],
              ["Total slots", `${TOTAL_SLOTS} teams`],
              ["Match date", "Announced on YouTube live"],
            ].map(([l, v]) => (
              <div key={l} className="border-line bg-raised p-4">
                <div className="text-[11px] uppercase tracking-wide text-steel-light">{l}</div>
                <div className="mt-1 font-display text-xl font-bold">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-11">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-[26px]">Rules</h2>
          <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-[14.5px] text-muted">
            <li>
              <strong className="text-fg">One entry per team.</strong> Duplicates from the same squad will be removed.
            </li>
            <li>
              <strong className="text-fg">IGN and UID must match</strong> your in-game profile exactly.
            </li>
            <li>
              <strong className="text-fg">No hacking, teaming, or emulator abuse.</strong> Fair play is enforced.
            </li>
            <li>
              <strong className="text-fg">Be online 15 minutes before</strong> match time. Room ID is posted above and on stream.
            </li>
            <li>
              <strong className="text-fg">Results and clips</strong> go on the Khatri x ESP7 YouTube channel.
            </li>
            <li>Host decisions during the tournament are final.</li>
          </ol>
        </div>
      </section>

      <section id="register" className="border-b border-line py-11">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-[26px]">Register your squad</h2>
          <p className="mt-1 text-sm text-muted">Add a logo and motto — they power your reveal card and VS poster.</p>
          <div className="mt-6">
            <RegisterForm />
          </div>
          <p className="mt-4 text-sm text-muted">
            Need help? Customer support:{" "}
            <a href={`tel:${SUPPORT_TEL}`} className="font-semibold text-gold">
              {SUPPORT_TEL}
            </a>
          </p>
        </div>
      </section>

      <section className="border-b border-line py-11">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-[26px]">Squad gallery</h2>
              <p className="mt-1 text-sm text-muted">Public cards only — WhatsApp and UID stay in admin.</p>
            </div>
            <Link to="/reveal" className="rounded-lg border border-gold/40 px-4 py-2 text-sm font-semibold text-gold">
              Open reveal stage →
            </Link>
          </div>
          { !ready ? (
            <div className="rounded-card border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
              Loading squads from Firebase…
            </div>
          ) : registrations.length === 0 ? (
            <div className="rounded-card border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
              No teams registered yet — be the first to lock a slot.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {registrations.map((t, i) => (
                <TeamCard key={t.id} team={t} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="px-5 py-12 text-center text-xs text-steel-light">
        <p>Khatri x ESP7 Free Fire Tournament · community-run event, not affiliated with Garena.</p>
        <a href={YT_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-gold">
          Watch live on YouTube
        </a>
        <p className="mt-3">
          Customer support:{" "}
          <a href={`tel:${SUPPORT_TEL}`} className="text-gold">
            {SUPPORT_TEL}
          </a>
        </p>
        <p className="mt-3 tracking-wide">Developed by Lord Plays</p>
      </footer>
    </div>
  );
}
