"use client";

import { useToast } from "./ToastProvider";

export default function ToastViewport() {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-lg border border-gray-700 bg-brand-charcoal px-4 py-3 text-sm shadow-card"
          role={toast.variant === "error" ? "alert" : "status"}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-gray-100">{toast.title}</p>
              {toast.description ? <p className="text-gray-400">{toast.description}</p> : null}
            </div>
            <button
              aria-label={`Dismiss ${toast.title} notification`}
              className="text-gray-400 transition hover:text-gray-100"
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
