import { useRef, useState, type ClipboardEvent, type DragEvent } from "react";
import { ImagePlus, LoaderCircle, X } from "lucide-react";
import { compressLogo } from "@/lib/compress-logo";
import { cn } from "@/lib/utils";

export function LogoPicker({
  value,
  onChange,
  label = "Upload logo",
  hint = "JPG, PNG, or WebP — tap, drop, or paste",
  compact = false,
}: {
  value: string;
  onChange: (dataUrl: string) => void | Promise<void>;
  label?: string;
  hint?: string;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const data = await compressLogo(file);
      await onChange(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    void handleFile(e.dataTransfer.files?.[0]);
  }

  function onPaste(e: ClipboardEvent) {
    const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith("image/"));
    const file = item?.getAsFile();
    if (file) {
      e.preventDefault();
      void handleFile(file);
    }
  }

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif"
      className="sr-only"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) void handleFile(file);
      }}
    />
  );

  if (compact) {
    return (
      <div className="relative">
        {input}
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="relative size-10 overflow-hidden rounded-lg border border-line bg-raised"
          aria-label={label}
        >
          {value ? (
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <ImagePlus className="mx-auto size-4 text-gold" />
          )}
          {busy ? (
            <span className="absolute inset-0 grid place-items-center bg-bg/70">
              <LoaderCircle className="size-4 animate-spin text-gold" />
            </span>
          ) : null}
        </button>
        {error ? <p className="mt-1 max-w-28 text-[10px] text-danger">{error}</p> : null}
      </div>
    );
  }

  return (
    <div onPaste={onPaste}>
      {input}
      <div className="flex items-center gap-4">
        <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-line bg-raised">
          {value ? (
            <img src={value} alt="Logo preview" className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-[11px] text-steel-light">No logo</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className={cn(
              "flex min-h-11 w-full items-center gap-3 rounded-xl border border-dashed border-line bg-raised px-3 py-2.5 text-left",
              busy && "opacity-70",
            )}
          >
            {busy ? (
              <LoaderCircle className="size-4 shrink-0 animate-spin text-gold" />
            ) : (
              <ImagePlus className="size-4 shrink-0 text-gold" />
            )}
            <span>
              <span className="block text-sm font-semibold text-fg">{busy ? "Processing…" : label}</span>
              <span className="block text-xs text-steel-light">{hint}</span>
            </span>
          </button>
          {value ? (
            <button
              type="button"
              className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted"
              onClick={() => void onChange("")}
            >
              <X className="size-3" />
              Remove logo
            </button>
          ) : null}
        </div>
      </div>
      {error ? <p className="mt-1.5 text-xs text-danger">{error}</p> : null}
    </div>
  );
}
