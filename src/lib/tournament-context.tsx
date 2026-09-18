import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  subscribeRegistrations,
  subscribeSettings,
  saveRegistration,
  updateRegistrationStatus,
  updateRegistrationLogo,
  deleteRegistration,
  clearAllRegistrations,
  setManuallyClosed,
  saveRoomSettings,
} from "./firebase";
import type { GameMode, Registration, TournamentSettings } from "./types";
import { EMPTY_ROOMS, TOTAL_SLOTS } from "./types";

type Ctx = {
  registrations: Registration[];
  settings: TournamentSettings;
  ready: boolean;
  error: string | null;
  slotsLeft: number;
  isClosed: boolean;
  save: typeof saveRegistration;
  setStatus: typeof updateRegistrationStatus;
  setLogo: typeof updateRegistrationLogo;
  remove: typeof deleteRegistration;
  clearAll: () => Promise<void>;
  setClosed: typeof setManuallyClosed;
  saveRoom: (mode: GameMode, id: string, pass: string) => Promise<void>;
};

const TournamentContext = createContext<Ctx | null>(null);

export function TournamentProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [settings, setSettings] = useState<TournamentSettings>({
    closed: false,
    rooms: EMPTY_ROOMS,
  });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const u1 = subscribeRegistrations(
      (rows) => {
        setRegistrations(rows);
        setError(null);
        setReady(true);
      },
      (err) => {
        setError(err.message);
        setReady(true);
      },
    );
    const u2 = subscribeSettings(
      (s) => {
        setSettings(s);
        setReady(true);
      },
      (err) => setError(err.message),
    );
    return () => {
      u1();
      u2();
    };
  }, []);

  const value = useMemo<Ctx>(() => {
    const slotsLeft = Math.max(TOTAL_SLOTS - registrations.length, 0);
    const isClosed = settings.closed || slotsLeft === 0;
    return {
      registrations,
      settings,
      ready,
      error,
      slotsLeft,
      isClosed,
      save: saveRegistration,
      setStatus: updateRegistrationStatus,
      setLogo: updateRegistrationLogo,
      remove: deleteRegistration,
      clearAll: () => clearAllRegistrations(registrations.map((r) => r.id)),
      setClosed: setManuallyClosed,
      saveRoom: (mode, id, pass) => saveRoomSettings(mode, id, pass, settings.rooms),
    };
  }, [registrations, settings, ready, error]);

  return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>;
}

export function useTournament() {
  const ctx = useContext(TournamentContext);
  if (!ctx) throw new Error("useTournament must be used inside TournamentProvider");
  return ctx;
}
