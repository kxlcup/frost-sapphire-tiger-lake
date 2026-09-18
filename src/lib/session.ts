const KEY = "ff_tournament_admin_session_vihaan_espx";
export const ADMIN_ID = "espx_admin";
export const ADMIN_PASSWORD = "khatri1k";

const memory: Record<string, string> = {};

function readFrom(store: Storage | undefined): string | null {
  if (!store) return null;
  try {
    return store.getItem(KEY);
  } catch {
    return null;
  }
}

function writeTo(store: Storage | undefined, val: string | null) {
  if (!store) return;
  try {
    if (val === null) store.removeItem(KEY);
    else store.setItem(KEY, val);
  } catch {
    /* in-app browsers / iframe storage can throw */
  }
}

export function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  const v =
    memory[KEY] ??
    readFrom(window.localStorage) ??
    readFrom(window.sessionStorage) ??
    null;
  return v === "true";
}

export function loginAdmin() {
  memory[KEY] = "true";
  if (typeof window === "undefined") return;
  writeTo(window.localStorage, "true");
  writeTo(window.sessionStorage, "true");
}

export function logoutAdmin() {
  delete memory[KEY];
  if (typeof window === "undefined") return;
  writeTo(window.localStorage, null);
  writeTo(window.sessionStorage, null);
}

export function credentialsMatch(id: string, pass: string) {
  return id.trim().toLowerCase() === ADMIN_ID.toLowerCase() && pass.trim() === ADMIN_PASSWORD;
}
