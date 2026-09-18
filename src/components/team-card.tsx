import type { Registration } from "@/lib/types";
import { MODE_LABELS, rosterFor } from "@/lib/types";
import { cn, teamInitials } from "@/lib/utils";

const MODE_CLASS: Record<string, string> = {
  SOLO: "border-solo text-solo",
  DUO: "border-duo text-duo",
  SQUAD: "border-gold text-gold",
  CS: "border-cs text-cs",
};

export function TeamCard({
  team,
  index,
  featured = false,
}: {
  team: Registration;
  index?: number;
  featured?: boolean;
}) {
  const players = rosterFor(team);
  const mode = team.mode || "SQUAD";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-card border border-line bg-raised",
        featured && "border-ember shadow-[0_20px_60px_rgba(255,90,31,0.18)]",
      )}
    >
      <div className="relative aspect-square bg-bg">
        {team.logoDataUrl ? (
          <img
            src={team.logoDataUrl}
            alt={`${team.teamName} logo`}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-ember to-gold font-display text-6xl font-bold text-bg">
            {teamInitials(team.teamName)}
          </div>
        )}
        {typeof index === "number" && (
          <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 font-display text-xs font-bold text-gold">
            #{String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full border bg-bg/80 px-2.5 py-1 text-[11px] font-semibold",
            MODE_CLASS[mode],
          )}
        >
          {MODE_LABELS[mode]}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl font-bold leading-tight">{team.teamName}</h3>
        {team.tagline ? (
          <p className="mt-1 text-sm italic text-gold">{team.tagline}</p>
        ) : null}
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {players.map((p, i) => (
            <li key={p.name + i} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-ember" />
              <span className="font-medium text-fg">{p.name}</span>
              {i === 0 && <span className="text-[11px] uppercase tracking-wide text-steel-light">Captain</span>}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
