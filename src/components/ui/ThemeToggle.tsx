"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { iconButtonClass } from "@/components/ui/styles";

type Theme = "light" | "dark";

// The theme lives on <html data-theme>, set before paint by the inline script in layout.tsx.
// useSyncExternalStore reads it without causing a hydration mismatch: the server snapshot is
// "light", and React re-renders with the real value right after hydration.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

const getServerSnapshot = (): Theme => "light";

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Until the visitor picks a theme, keep following the system preference live.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme()) return;
      document.documentElement.setAttribute("data-theme", query.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the choice then lasts for this visit only.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`${iconButtonClass} ${className}`}
    >
      {/* Both icons are always rendered; CSS shows one, so server and browser markup match. */}
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
    </button>
  );
}
