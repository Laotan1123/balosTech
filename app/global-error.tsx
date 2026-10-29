"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-xl space-y-3 p-8" role="alert">
          <h1 className="text-2xl font-bold">This page couldn’t load</h1>
          <p>Please check your connection and try again.</p>
          <button type="button" className="btn" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
