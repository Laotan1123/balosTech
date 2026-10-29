"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function AppError({
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
    <main className="card space-y-3" role="alert">
      <h1 className="text-2xl font-bold text-white">This page couldn’t load</h1>
      <p className="text-sm text-gray-300">Please check your connection and try again.</p>
      <button type="button" className="btn w-fit" onClick={reset}>Try again</button>
    </main>
  );
}
