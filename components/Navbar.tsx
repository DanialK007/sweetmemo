"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  Sparkles,
  ArrowRight,
  LogOut,
  User as UserIcon,
  BookmarkCheck,
  Globe,
  Check,
} from "lucide-react";
import GooeyNav, { type GooeyNavItem } from "@/components/GooeyNav";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Hide on public shared keepsake pages
  if (pathname.startsWith("/p/")) {
    return null;
  }

  const navItems: (GooeyNavItem & { route: string })[] = [
    { label: t.navHome, href: "/", route: "/" },
    { label: t.navTemplates, href: "/templates", route: "/templates" },
    { label: t.navMoments, href: "/today", route: "/today" },
  ];

  // Find active index based on current path
  const activeIndex = navItems.findIndex((item) => {
    if (item.route === "/") return pathname === "/";
    return pathname.startsWith(item.route);
  });

  const currentIndex = activeIndex === -1 ? 0 : activeIndex;

  return (
    <>
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-[#f4e6e9] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#4c2834] font-extrabold text-xl tracking-tight no-underline group hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="w-9 h-9 rounded-xl bg-[#f9e3e8] text-[#d52c5a] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Heart size={18} fill="currentColor" />
          </span>
          <span className="font-serif">sweetmemos</span>
        </Link>

        {/* Mobile Nav links */}
        {/* <div className="flex md:hidden items-center gap-1.5">
          <Link
            href="/templates"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              pathname.startsWith("/templates")
                ? "bg-[#d92d5c] text-white"
                : "text-[#725a60] hover:bg-[#f9e6ea]"
            }`}
          >
            {t.navTemplates}
          </Link>
          <Link
            href="/today"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              pathname.startsWith("/today")
                ? "bg-[#d92d5c] text-white"
                : "text-[#725a60] hover:bg-[#f9e6ea]"
            }`}
          >
            {t.navMoments}
          </Link>
        </div> */}

        {/* Right Action: Language Globe, Auth & Template CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Globe Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setMenuOpen(false);
              }}
              className="flex items-center gap-1.5 p-1 rounded-full bg-white hover:bg-[#fff0f3] text-[#5c3c46] border border-[#f0dce1] hover:border-[#d92d5c] transition-all cursor-pointer shadow-xs"
              aria-label="Change language"
              title={language === "my" ? "ဘာသာစကားပြောင်းရန်" : "Change language"}
            >
              <Globe size={18} className="text-[#d92d5c]" />
              <span className="hidden md:block text-xs font-bold text-[#5c3c46]">
                {language === "my" ? "မြန်မာ" : "EN"}
              </span>
            </button>

            {langMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-[#f4e6e9] shadow-xl py-1.5 z-50 text-xs overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2 text-[10px] font-bold text-[#a1888f] uppercase tracking-wider border-b border-[#f4e6e9]">
                    {language === "my" ? "ဘာသာစကား ရွေးချယ်ရန်" : "Language"}
                  </div>

                  {/* Burmese Option */}
                  <button
                    onClick={() => {
                      setLanguage("my");
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-[#fff5f7] transition-colors cursor-pointer text-left ${
                      language === "my"
                        ? "font-bold text-[#d92d5c] bg-[#fff5f7]"
                        : "text-[#573743]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">🇲🇲</span>
                      <span>မြန်မာ (Burmese)</span>
                    </div>
                    {language === "my" && (
                      <Check size={14} className="text-[#d92d5c]" />
                    )}
                  </button>

                  {/* English Option */}
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-[#fff5f7] transition-colors cursor-pointer text-left ${
                      language === "en"
                        ? "font-bold text-[#d92d5c] bg-[#fff5f7]"
                        : "text-[#573743]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none">🇬🇧</span>
                      <span>English</span>
                    </div>
                    {language === "en" && (
                      <Check size={14} className="text-[#d92d5c]" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {!loading && user ? (
            <div className="relative">
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setLangMenuOpen(false);
                }}
                className="flex items-center gap-2 p-0.5 md:p-1 rounded-full bg-white border border-[#f0dce1] hover:border-[#d92d5c] transition-all cursor-pointer shadow-xs"
              >
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-7 h-7 rounded-full object-cover border border-[#f4cdd6]"
                  />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-[#fbe8ed] text-[#d92d5c] flex items-center justify-center font-bold text-xs">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                  </span>
                )}
                <span className="text-xs me-1 font-semibold text-[#573743] max-w-[90px] truncate hidden sm:inline">
                  {user.displayName?.split(" ")[0] || t.navProfile}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-[#f4e6e9] shadow-xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-[#f4e6e9]">
                      <p className="font-bold text-[#492631] truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-[11px] text-[#9b858b] truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[#573743] hover:bg-[#fff5f7] transition-colors"
                    >
                      <UserIcon size={14} className="text-[#d92d5c]" />
                      <span>{t.navProfile}</span>
                    </Link>

                    <Link
                      href="/today"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[#573743] hover:bg-[#fff5f7] transition-colors"
                    >
                      <BookmarkCheck size={14} className="text-[#d92d5c]" />
                      <span>{t.navMoments}</span>
                    </Link>

                    <button
                      onClick={async () => {
                        setMenuOpen(false);
                        await logout();
                        router.push("/");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[#a32846] hover:bg-[#fdf2f4] transition-colors cursor-pointer text-left"
                    >
                      <LogOut size={14} />
                      <span>{t.navSignOut}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
            className="inline-flex items-center gap-0.5 px-4 py-2 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5"
            >
              <UserIcon size={13}/>
              <span>{t.navSignIn}</span>
              <ArrowRight size={13} className="ms-1"/>
            </Link>
          )}

          {/* <Link
            href="/templates"
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5"
          >
            <Sparkles size={13} />
            <span>{t.navMakePage}</span>
            
          </Link> */}
        </div>
      </div>
    </header>

    {/* Center: Gooey Navigation */}
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 md:bottom-auto md:top-3 z-999 flex justify-center">
          <GooeyNav
            key={language}
            items={navItems}
            activeIndex={currentIndex}
            theme="light"
            size="md"
            frame
            color="#d92d5c"
            activeTextColor="#ffffff"
            particleCount={15}
            spread={56}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.5}
            hoverEffect
            onChange={(index) => {
              const target = navItems[index];
              if (target?.href && target.href !== pathname) {
                router.push(target.href);
              }
            }}
            colors={["#f86464", "#e34f76", "#e77fa7"]}
          />
        </div>
    </>
  );
}
