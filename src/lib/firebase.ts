import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  type Firestore,
} from "firebase/firestore";
import type { GameMode, Registration, RoomSettings, TournamentSettings } from "./types";
import { EMPTY_ROOMS } from "./types";

const firebaseConfig = {
  apiKey: "AIzaSyBIr6Y2y6prLKgd7P857yCnY60eUhIOd8o",
  authDomain: "kxl-9cd03.firebaseapp.com",
  projectId: "kxl-9cd03",
  storageBucket: "kxl-9cd03.firebasestorage.app",
  messagingSenderId: "617940943718",
  appId: "1:617940943718:web:9a3f2aa243e544ab12bea7",
  measurementId: "G-6FCS278QPV",
};

export const REGISTRATIONS_COL = "ff_tournament_registrations_vihaan_espx";
export const SETTINGS_COL = "ff_tournament_settings_vihaan_espx";
export const SETTINGS_ID = "main";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

function clean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function firestoreMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (/exceeds|too large|1 MiB|1048576/i.test(msg)) {
    return "Logo is too large for the database. Try a simpler square JPG.";
  }
  if (/permission|insufficient/i.test(msg)) {
    return "Firebase permission error. Check Firestore rules for this project.";
  }
  return err instanceof Error ? err.message : "Firebase request failed";
}

export function getDb(): Firestore | null {
  if (typeof window === "undefined") return null;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0]!;
  }
  if (!db) db = getFirestore(app);
  return db;
}

export function subscribeRegistrations(
  onData: (rows: Registration[]) => void,
  onError?: (err: Error) => void,
) {
  const database = getDb();
  if (!database) return () => {};
  const col = collection(database, REGISTRATIONS_COL);
  return onSnapshot(
    col,
    (snap) => {
      const rows = snap.docs.map((d) => {
        const data = d.data() as Registration;
        return { ...data, id: data.id || d.id };
      });
      rows.sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
      onData(rows);
    },
    (err) => onError?.(err),
  );
}

export function subscribeSettings(
  onData: (s: TournamentSettings) => void,
  onError?: (err: Error) => void,
) {
  const database = getDb();
  if (!database) return () => {};
  const ref = doc(database, SETTINGS_COL, SETTINGS_ID);
  return onSnapshot(
    ref,
    (snap) => {
      const data = snap.exists() ? snap.data() : {};
      onData({
        closed: !!data.closed,
        rooms: Object.assign({}, EMPTY_ROOMS, (data.rooms || {}) as RoomSettings),
      });
    },
    (err) => onError?.(err),
  );
}

export async function saveRegistration(entry: Omit<Registration, "id" | "createdAt" | "status">) {
  const database = getDb();
  if (!database) throw new Error("Firebase is not available");
  const id = "FF-" + Date.now().toString(36).toUpperCase();
  const payload: Registration = clean({
    ...entry,
    logoDataUrl: entry.logoDataUrl || "",
    tagline: entry.tagline || "",
    id,
    createdAt: new Date().toISOString(),
    status: "pending",
  });
  try {
    await setDoc(doc(database, REGISTRATIONS_COL, id), payload);
  } catch (err) {
    throw new Error(firestoreMessage(err));
  }
  return id;
}

export async function updateRegistrationStatus(id: string, status: Registration["status"]) {
  const database = getDb();
  if (!database) return;
  await updateDoc(doc(database, REGISTRATIONS_COL, id), { status });
}

export async function updateRegistrationLogo(id: string, logoDataUrl: string) {
  const database = getDb();
  if (!database) throw new Error("Firebase is not available");
  try {
    await updateDoc(doc(database, REGISTRATIONS_COL, id), { logoDataUrl });
  } catch (err) {
    throw new Error(firestoreMessage(err));
  }
}

export async function deleteRegistration(id: string) {
  const database = getDb();
  if (!database) return;
  await deleteDoc(doc(database, REGISTRATIONS_COL, id));
}

export async function clearAllRegistrations(ids: string[]) {
  await Promise.all(ids.map((id) => deleteRegistration(id)));
}

export async function setManuallyClosed(val: boolean) {
  const database = getDb();
  if (!database) return;
  await setDoc(doc(database, SETTINGS_COL, SETTINGS_ID), { closed: val }, { merge: true });
}

export async function saveRoomSettings(mode: GameMode, id: string, pass: string, rooms: RoomSettings) {
  const database = getDb();
  if (!database) return;
  const next = { ...rooms, [mode]: { id, pass } };
  await setDoc(doc(database, SETTINGS_COL, SETTINGS_ID), { rooms: next }, { merge: true });
}
