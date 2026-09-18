import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { TeamCard } from "@/components/team-card";
import { useTournament } from "@/lib/tournament-context";

export const Route = createFileRoute("/hall")({ component: HallPage });

function HallPage() {
  const { registrations, ready } = useTournament();

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <p className="font-display text-sm tracking-[0.18em] text-gold">PERMANENT RECORD</p>
        <h1 className="mt-2 font-display text-4xl">Hall of Fame</h1>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Every squad that locked a slot stays here — even after elimination. This is your esports card for the next cup.
        </p>
        {!ready ? (
          <div className="mt-10 rounded-card border border-dashed border-line px-4 py-12 text-center text-muted">
            Loading hall of fame…
          </div>
        ) : registrations.length === 0 ? (
          <div className="mt-10 rounded-card border border-dashed border-line px-4 py-12 text-center text-muted">
            The hall is empty. First team in writes history.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {registrations.map((t, i) => (
              <TeamCard key={t.id} team={t} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
