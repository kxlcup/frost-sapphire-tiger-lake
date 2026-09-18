import { Link, useRouterState } from "@tanstack/react-router";
import { Flame, Swords, Trophy, Clapperboard, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Register", icon: Flame },
  { to: "/reveal", label: "Reveal", icon: Clapperboard },
  { to: "/vs", label: "VS Poster", icon: Swords },
  { to: "/hall", label: "Hall of Fame", icon: Trophy },
  { to: "/admin", label: "Admin", icon: Shield },
] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl min-w-0 flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-wide">
          <span className="inline-flex size-8 items-center justify-center rounded-md bg-ember text-fg">
            <Flame className="size-4" />
          </span>
          <span>
            KHATRI <span className="text-ember">×</span> ESP7
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1">
          {LINKS.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-sm font-semibold",
                  active
                    ? "border-ember bg-raised text-fg"
                    : "border-transparent text-muted hover:border-line hover:text-fg",
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
