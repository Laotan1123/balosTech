"use client";

import { useEffect, useState } from "react";

type AnalyticsConsentValue = "unknown" | "accepted" | "declined";

const CONSENT_STORAGE_KEY = "balostech-analytics-consent";
const PLAUSIBLE_SCRIPT_ID = "balostech-plausible";
const OPEN_PREFERENCES_EVENT = "balostech:open-analytics-preferences";

declare global {
  interface Window {
    plausible?: (...args: unknown[]) => void;
  }
}

export default function AnalyticsConsent() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const [consent, setConsent] = useState<AnalyticsConsentValue>("unknown");
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    const savedValue =
      storedConsent === "accepted" || storedConsent === "declined" ? storedConsent : "unknown";

    setConsent(savedValue);
    setIsOpen(savedValue === "unknown" && Boolean(domain));
    setReady(true);

    const openPreferences = () => setIsOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);

    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    };
  }, [domain]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (consent !== "accepted" || !domain) {
      if (window.plausible) {
        window.plausible = () => undefined;
      }
      document.getElementById(PLAUSIBLE_SCRIPT_ID)?.remove();
      return;
    }

    delete window.plausible;
    const script = document.createElement("script");
    script.id = PLAUSIBLE_SCRIPT_ID;
    script.src = "https://plausible.io/js/script.js";
    script.defer = true;
    script.dataset.domain = domain;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [consent, domain, ready]);

  function chooseConsent(value: Exclude<AnalyticsConsentValue, "unknown">) {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setConsent(value);
    setIsOpen(false);
  }

  if (!ready || !isOpen) {
    return null;
  }

  return (
    <section
      aria-label="Analytics preferences"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-gray-700 bg-brand-charcoal p-5 shadow-card"
      role="region"
    >
      <h2 className="text-base font-semibold text-white">Optional analytics</h2>
      <p className="mt-2 text-sm text-gray-300">
        {domain
          ? "Allow privacy-focused Plausible analytics to help us understand site usage. Analytics stays off unless you opt in."
          : "Analytics is not configured, so no analytics script is loaded."}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {domain && (
          <>
            <button type="button" className="btn" onClick={() => chooseConsent("accepted")}>
              Allow analytics
            </button>
            <button type="button" className="btn" onClick={() => chooseConsent("declined")}>
              No thanks
            </button>
          </>
        )}
        <button type="button" className="btn" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </div>
    </section>
  );
}
