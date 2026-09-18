export type GameMode = "SOLO" | "DUO" | "SQUAD" | "CS";

export type EntryStatus = "pending" | "confirmed" | "checked-in";

export type Player = {
  name: string;
  uid: string;
};

export type Registration = {
  id: string;
  teamName: string;
  mode: GameMode;
  tagline?: string;
  logoDataUrl?: string;
  captain: Player & { whatsapp: string; email?: string };
  teammate2: Player;
  teammate3: Player;
  teammate4: Player;
  createdAt: string;
  status: EntryStatus;
};

export type RoomInfo = { id: string; pass: string };

export type RoomSettings = Record<GameMode, RoomInfo>;

export type TournamentSettings = {
  closed: boolean;
  rooms: RoomSettings;
};

export const MODE_LABELS: Record<GameMode, string> = {
  SOLO: "Solo",
  DUO: "Duo",
  SQUAD: "Squad",
  CS: "Clash Squad",
};

export const TOTAL_SLOTS = 16;

export const EMPTY_ROOMS: RoomSettings = {
  SOLO: { id: "", pass: "" },
  DUO: { id: "", pass: "" },
  SQUAD: { id: "", pass: "" },
  CS: { id: "", pass: "" },
};

export const YT_URL = "https://youtube.com/@vihaan_espx?si=04AwPwUyIOK2nLon";
export const SUPPORT_TEL = "461430657";

export function rosterFor(t: Registration): Player[] {
  const list: Player[] = [{ name: t.captain?.name || "", uid: t.captain?.uid || "" }];
  if (t.mode === "SOLO") return list.filter((p) => p.name);
  if (t.teammate2) list.push(t.teammate2);
  if (t.mode === "DUO") return list.filter((p) => p.name);
  if (t.teammate3) list.push(t.teammate3);
  if (t.teammate4?.name) list.push(t.teammate4);
  return list.filter((p) => p.name);
}
