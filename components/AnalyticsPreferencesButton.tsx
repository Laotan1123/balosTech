"use client";

const OPEN_PREFERENCES_EVENT = "balostech:open-analytics-preferences";

export default function AnalyticsPreferencesButton() {
  return (
    <button
      type="button"
      className="text-red-200 underline"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
    >
      Manage analytics preferences
    </button>
  );
}
