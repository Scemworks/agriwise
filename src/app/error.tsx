"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GlobalError({ error }: { error: Error }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-surface-foreground">
      <main className="flex-grow container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="max-w-xl text-center bg-card p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-foreground">
            {t.errorTitle}
          </h1>
          <p className="mb-6 text-muted">{t.errorMessage}</p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-brand text-brand-foreground rounded-md hover:opacity-95"
            >
              {t.retry}
            </button>
            <Link
              href="/"
              className="px-5 py-2 border border-gray-300 rounded-md text-muted"
            >
              {t.goHome}
            </Link>
          </div>

          <div className="mt-4 text-xs text-muted">
            {process.env.NEXT_PUBLIC_APP_NAME ?? "AgriWise"}
          </div>
          <div className="mt-2 text-xs text-muted">{error?.message}</div>
        </div>
      </main>
    </div>
  );
}
