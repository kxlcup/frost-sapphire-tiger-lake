import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { TournamentProvider } from "@/lib/tournament-context";
import appCss from "../styles.css?url";

const APP_NAME = "Khatri x ESP7 — Free Fire Tournament";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Register your squad for the Khatri x ESP7 1K Special Free Fire tournament. Team logos, player reveal, and matchday VS posters.",
      },
      { name: "theme-color", content: "#0E0B08" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="ember-glow min-h-screen antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <TournamentProvider>
            <Outlet />
          </TournamentProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
