import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { LogoPicker } from "@/components/logo-picker";
import { useTournament } from "@/lib/tournament-context";
import type { GameMode } from "@/lib/types";
import { MODE_LABELS, YT_URL } from "@/lib/types";
import { cn } from "@/lib/utils";

type Errors = Record<string, string>;

export function RegisterForm() {
  const { save, settings, slotsLeft } = useTournament();
  const [mode, setMode] = useState<GameMode>("SQUAD");
  const [logoPreview, setLogoPreview] = useState("");
  const [logoDataUrl, setLogoDataUrl] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [modalErr, setModalErr] = useState("");
  const [confirmId, setConfirmId] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [draft, setDraft] = useState<Record<string, string>>({});

  const closed = settings.closed || slotsLeft === 0;

  const required = useMemo(() => {
    const base = ["teamName", "capName", "capUid", "capWhatsapp"];
    if (mode === "SOLO") return base;
    if (mode === "DUO") return [...base, "p2Name", "p2Uid"];
    return [...base, "p2Name", "p2Uid", "p3Name", "p3Uid"];
  }, [mode]);

  function val(id: string) {
    const el = document.getElementById(id) as HTMLInputElement | null;
    return el?.value.trim() ?? "";
  }

  function validate() {
    const next: Errors = {};
    required.forEach((id) => {
      if (!val(id)) next[id] = "Required";
    });
    const wa = val("capWhatsapp").replace(/\D/g, "");
    if (wa && !/^\d{10}$/.test(wa)) next.capWhatsapp = "Enter a valid 10-digit number";
    const email = val("capEmail");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.capEmail = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function setLogo(data: string) {
    setLogoDataUrl(data);
    setLogoPreview(data);
    setErrors((e) => ({ ...e, logo: "" }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (closed) return;
    if (!validate()) return;
    setDraft({
      teamName: val("teamName"),
      tagline: val("tagline"),
      capName: val("capName"),
      capUid: val("capUid"),
      capWhatsapp: val("capWhatsapp"),
      capEmail: val("capEmail"),
      p2Name: val("p2Name"),
      p2Uid: val("p2Uid"),
      p3Name: val("p3Name"),
      p3Uid: val("p3Uid"),
      p4Name: val("p4Name"),
      p4Uid: val("p4Uid"),
    });
    setSubscribed(false);
    setModalErr("");
    setModalOpen(true);
  }

  async function finalize() {
    if (!subscribed) {
      setModalErr("Please subscribe and check the box to confirm.");
      return;
    }
    setBusy(true);
    try {
      const id = await save({
        teamName: draft.teamName || "",
        mode,
        tagline: draft.tagline || "",
        logoDataUrl,
        captain: {
          name: draft.capName || "",
          uid: draft.capUid || "",
          whatsapp: draft.capWhatsapp || "",
          email: draft.capEmail || "",
        },
        teammate2: { name: draft.p2Name || "", uid: draft.p2Uid || "" },
        teammate3: { name: draft.p3Name || "", uid: draft.p3Uid || "" },
        teammate4: { name: draft.p4Name || "", uid: draft.p4Uid || "" },
      });
      setConfirmId(id);
      setConfirmName(draft.teamName || "");
      setModalOpen(false);
      (document.getElementById("regForm") as HTMLFormElement | null)?.reset();
      setLogoPreview("");
      setLogoDataUrl("");
      setMode("SQUAD");
    } catch (err) {
      setModalErr(err instanceof Error ? err.message : "Could not save. Check your connection.");
    } finally {
      setBusy(false);
    }
  }

  const fieldClass =
    "rounded-lg border border-line bg-raised px-3 py-2.5 text-base text-fg outline-none placeholder:text-steel-light focus:border-ember";

  return (
    <>
      <form id="regForm" onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <fieldset className="flex flex-col gap-3.5">
          <legend className="font-display text-base font-bold text-gold">Team</legend>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Team name" id="teamName" error={errors.teamName}>
              <input id="teamName" className={cn(fieldClass, errors.teamName && "border-danger")} placeholder="e.g. Ember Squad" />
            </Field>
            <Field label="Mode" id="modeSelect">
              <select
                id="modeSelect"
                className={fieldClass}
                value={mode}
                onChange={(e) => setMode(e.target.value as GameMode)}
              >
                <option value="SOLO">Solo</option>
                <option value="DUO">Duo</option>
                <option value="SQUAD">Squad (BR)</option>
                <option value="CS">Clash Squad (CS)</option>
              </select>
            </Field>
          </div>
          <Field label="Tagline / motto" id="tagline" optional>
            <input id="tagline" className={fieldClass} placeholder="e.g. Born to clutch" maxLength={48} />
          </Field>
          <div>
            <label className="mb-1.5 block text-sm text-muted">
              Team logo <span className="text-steel-light">(optional, square works best)</span>
            </label>
            <LogoPicker
              value={logoPreview}
              onChange={setLogo}
              label="Upload team logo"
              hint="Tap, drop, or paste a JPG / PNG"
            />
            {errors.logo ? <p className="mt-1 text-xs text-danger">{errors.logo}</p> : null}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3.5">
          <legend className="font-display text-base font-bold text-gold">Captain</legend>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <TextField id="capName" label="Captain IGN" error={errors.capName} className={fieldClass} />
            <TextField id="capUid" label="Captain Free Fire UID" error={errors.capUid} className={fieldClass} placeholder="e.g. 123456789" />
            <TextField id="capWhatsapp" label="WhatsApp number" error={errors.capWhatsapp} className={fieldClass} placeholder="10-digit number" type="tel" />
            <TextField id="capEmail" label="Email" optional error={errors.capEmail} className={fieldClass} placeholder="you@example.com" type="email" />
          </div>
        </fieldset>

        {mode !== "SOLO" && (
          <PlayerPair legend="Teammate 2" prefix="p2" errors={errors} className={fieldClass} />
        )}
        {mode !== "SOLO" && mode !== "DUO" && (
          <PlayerPair legend="Teammate 3" prefix="p3" errors={errors} className={fieldClass} />
        )}
        {mode !== "SOLO" && mode !== "DUO" && (
          <PlayerPair legend="Teammate 4 (substitute, optional)" prefix="p4" errors={errors} className={fieldClass} optional />
        )}

        <div>
          <button
            type="submit"
            disabled={closed || busy}
            className="rounded-lg bg-gradient-to-br from-ember to-[#E23F00] px-8 py-3 font-display text-lg font-bold text-white shadow-[0_6px_20px_rgba(255,90,31,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {settings.closed ? "Registration closed" : slotsLeft === 0 ? "Registration full" : "Register team"}
          </button>
          <p className="mt-2.5 text-xs text-steel-light">
            Logos and squads sync live with Firebase. Captain contact stays private on the public gallery.
          </p>
        </div>
      </form>

      {confirmId ? (
        <div className="mt-6 rounded-card border border-success bg-raised p-6">
          <h3 className="font-display text-xl text-success">You're in</h3>
          <p className="mt-1 font-display text-gold">Registration ID: {confirmId}</p>
          <p className="mt-2 text-sm text-muted">
            {confirmName} is registered for {MODE_LABELS[mode]}. Watch the reveal page and YouTube live for match updates.
          </p>
        </div>
      ) : null}

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-md rounded-xl border border-ember bg-raised p-6 shadow-2xl">
            <h3 className="font-display text-2xl">One last step</h3>
            <p className="mt-2 text-sm text-muted">
              Subscribe to the Khatri x ESP7 YouTube channel to lock in your slot.
            </p>
            <a
              href={YT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#FF3B30] font-display text-base font-bold text-white"
            >
              Subscribe on YouTube
            </a>
            <label className="mt-4 flex items-start gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={subscribed}
                onChange={(e) => setSubscribed(e.target.checked)}
                className="mt-0.5 size-4 accent-ember"
              />
              I've subscribed to the Khatri x ESP7 YouTube channel
            </label>
            {modalErr ? <p className="mt-2 text-sm text-danger">{modalErr}</p> : null}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={finalize}
                className="rounded-lg bg-gradient-to-br from-ember to-[#E23F00] px-5 py-3 font-display font-bold text-white"
              >
                {busy ? "Saving…" : "Confirm & register"}
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg border border-line px-5 py-3 font-display font-bold text-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-muted">
        {label} {optional ? <span className="text-steel-light">(optional)</span> : null}
      </label>
      {children}
      <div className="min-h-3.5 text-xs text-danger">{error || ""}</div>
    </div>
  );
}

function TextField({
  id,
  label,
  error,
  className,
  optional,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  error?: string;
  className: string;
  optional?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <Field id={id} label={label} optional={optional} error={error}>
      <input
        id={id}
        type={type}
        placeholder={placeholder || "In-game name"}
        className={cn(className, error && "border-danger")}
      />
    </Field>
  );
}

function PlayerPair({
  legend,
  prefix,
  errors,
  className,
  optional,
}: {
  legend: string;
  prefix: string;
  errors: Errors;
  className: string;
  optional?: boolean;
}) {
  return (
    <fieldset className="flex flex-col gap-3.5">
      <legend className="font-display text-base font-bold text-gold">{legend}</legend>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <TextField id={`${prefix}Name`} label="IGN" optional={optional} error={errors[`${prefix}Name`]} className={className} />
        <TextField
          id={`${prefix}Uid`}
          label="Free Fire UID"
          optional={optional}
          error={errors[`${prefix}Uid`]}
          className={className}
          placeholder="e.g. 123456789"
        />
      </div>
    </fieldset>
  );
}
