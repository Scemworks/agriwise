"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Globe, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [_userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          if (data?.valid && data.user) {
            setIsLoggedIn(true);
            setUserName(data.user.name || data.user.email || null);
            return;
          }
        }
        setIsLoggedIn(false);
        setUserName(null);
      } catch (_err) {
        setIsLoggedIn(false);
        setUserName(null);
      }
    }
    checkAuth();
    return () => {
      mounted = false;
    };
  }, []);

  const languages = [
    { code: "en" as const, name: "English", flag: "🇺🇸" },
    { code: "hi" as const, name: "हिन्दी", flag: "🇮🇳" },
    { code: "ml" as const, name: "മലയാളം", flag: "🇮🇳" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <header className="bg-brand-600 text-brand-foreground shadow-sm overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus-ring px-4 py-2"
      >
        Skip to content
      </a>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center">
              <span className="text-brand-600 font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold">AgriWise</span>
          </Link>

          {/* Desktop Nav - hidden on small screens */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="hidden md:inline text-surface-foreground hover:underline"
            >
              {t.home}
            </Link>
            <Link
              href="/marketplace"
              className="hidden md:inline text-surface-foreground hover:underline"
            >
              {t.marketplace}
            </Link>
            <Link
              href="/recommendations"
              className="hidden md:inline text-surface-foreground hover:underline"
            >
              {t.recommendations}
            </Link>
          </nav>

          {/* Right side controls for desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-surface-foreground hover:opacity-90"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="sr-only">{t.language}</span>
                  <span className="hidden sm:inline">
                    {currentLanguage?.flag} {currentLanguage?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-surface border border-gray-200 rounded-md shadow-lg z-50">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <span>{lang.flag}</span>
                    <span className="text-foreground">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="text-surface-foreground hover:underline"
                >
                  {t.dashboard ?? "Dashboard"}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-surface-foreground hover:opacity-90"
                  onClick={async () => {
                    try {
                      const res = await fetch("/api/auth/logout", {
                        method: "POST",
                      });
                      if (res.ok) {
                        setIsLoggedIn(false);
                        setUserName(null);
                        // navigate to home
                        window.location.href = "/";
                      }
                    } catch (_err) {
                      // ignore for now
                    }
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{t.logout}</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-surface-foreground hover:bg-white/10"
                >
                  <Link href="/login" className="px-2 py-1">
                    {t.login}
                  </Link>
                </Button>
                <Button size="sm" className="btn-primary">
                  <Link href="/register" className="px-3 py-1">
                    {t.register}
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-surface-foreground hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            aria-label="Mobile"
          >
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.home}
              </Link>
              <Link
                href="/recommendations"
                className="px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.recommendations}
              </Link>
              <Link
                href="/chat"
                className="px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.chat}
              </Link>
              <Link
                href="/marketplace"
                className="px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.marketplace}
              </Link>
              <Link
                href="/weather"
                className="px-4 py-2 hover:bg-green-700 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.weather}
              </Link>
              <Link
                href="/carbon-credits"
                className="px-4 py-2 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.carbonCredits}
              </Link>

              {/* Mobile language selector */}
              <div className="px-4 pt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-surface-foreground hover:bg-white/10"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      <span>
                        {currentLanguage?.flag} {currentLanguage?.name}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full bg-surface border border-gray-200 rounded-md shadow-lg z-50">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <span>{lang.flag}</span>
                        <span className="text-foreground">{lang.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile auth actions */}
              <div className="px-4 pt-4 flex space-x-2">
                {isLoggedIn ? (
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/auth/logout", {
                          method: "POST",
                        });
                        if (res.ok) {
                          setIsLoggedIn(false);
                          setUserName(null);
                          setIsMenuOpen(false);
                          window.location.href = "/";
                        }
                      } catch (_err) {}
                    }}
                    className="btn-ghost w-full"
                  >
                    {t.logout}
                  </button>
                ) : (
                  <>
                    <Link href="/login" className="w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t.login}
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button
                        size="sm"
                        className="btn-primary w-full"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t.register}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
