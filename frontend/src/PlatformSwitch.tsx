import { useState } from "react";
import "./platform-switch.css";

/**
 * Switch between the two NexziByte platforms from either login page.
 * Set the destination addresses with VITE_SALES_APP_URL and VITE_QUOTATION_APP_URL (see .env.example).
 * Without them the switch assumes both apps run on this host: sales on :5173, quotation on :5174.
 */
type Platform = "sales" | "quotation";

const env = ((import.meta as any).env || {}) as Record<string, string | undefined>;
const sameHost = (port: number) => `${window.location.protocol}//${window.location.hostname}:${port}`;
const destination = (platform: Platform) =>
  (platform === "sales" ? env.VITE_SALES_APP_URL : env.VITE_QUOTATION_APP_URL) || sameHost(platform === "sales" ? 5173 : 5174);

const OPTIONS: Array<{ id: Platform; name: string; brand: string }> = [
  { id: "sales", name: "Sales Management", brand: "NexVridhi" },
  { id: "quotation", name: "Quotation Management", brand: "NexLekha" },
];

export default function PlatformSwitch({ current }: { current: Platform }) {
  const [target, setTarget] = useState<Platform | null>(null);
  const go = (id: Platform) => {
    if (id === current || target) return;
    setTarget(id); // slide the thumb first, then open the other platform
    window.setTimeout(() => window.location.assign(destination(id)), 340);
  };
  const shown = target || current;
  return (
    <div className={`ps ps-${shown}${target ? " ps-going" : ""}`} role="group" aria-label="Switch platform">
      <span className="ps-thumb" aria-hidden="true" />
      {OPTIONS.map((option) => {
        const active = option.id === shown;
        return (
          <button
            key={option.id}
            type="button"
            className={`ps-opt${active ? " ps-active" : ""}`}
            aria-pressed={option.id === current}
            aria-label={option.id === current ? `${option.name} (current platform)` : `Switch to ${option.name}`}
            onClick={() => go(option.id)}
          >
            <span className="ps-text">
              <strong>{option.name}</strong>
              <small>{option.brand}</small>
            </span>
            {option.id !== current && (
              <svg className="ps-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
