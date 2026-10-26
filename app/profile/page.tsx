"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BookmarkCheck,
  CalendarDays,
  Check,
  Copy,
  Heart,
  LogOut,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import FadeContent from "@/components/FadeContent";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getUserPages } from "@/lib/firestore";

interface SavedPage {
  slug: string;
  templateSlug: string;
  recipientName: string;
  senderName: string;
  occasionDate: string | null;
  message: string;
  theme: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const { t, language } = useLanguage();
  const router = useRouter();

  const [pages, setPages] = useState<SavedPage[]>([]);
  const [copied, setCopied] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      if (!user) return;

      try {
        // Fetch from Firestore
        const pages = await getUserPages(user.uid);
        setPages(pages);
      } catch (err) {
        console.error("Error fetching pages:", err);
        // Fallback to localStorage for backward compatibility
        try {
          const raw =
            localStorage.getItem("sweetmemos-pages") ||
            localStorage.getItem("sweetmoment-pages");
          if (raw) setPages(JSON.parse(raw));
        } catch {
          /* ignore */
        }
      }
    };

    fetchCards();
  }, [user]);

  const copy = async (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(slug);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await logout();
    router.push("/");
  };

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(
        language === "my" ? "my-MM" : "en-US",
        { year: "numeric", month: "long" }
      )
    : null;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#fbe8ed] text-[#d92d5c] flex items-center justify-center mx-auto mb-4 animate-spin">
            <span className="text-2xl">⏳</span>
          </div>
          <p className="text-sm text-[#8e7c81]">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Guest state
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
          <FadeContent effect="mist" duration={1.6} trigger="mount">
            {/* Header */}
            <div className="mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#b76176]">
                {t.profileBadge}
              </span>
              <h1 className="font-serif font-extrabold text-4xl sm:text-5xl text-[#432a32] tracking-tight mt-1">
                {t.profileTitle}
              </h1>
            </div>

            {/* Guest Card */}
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-white to-[#fdf0f3] border border-[#f4e6e9] rounded-3xl p-10 text-center shadow-lg space-y-5">
                <div className="w-20 h-20 rounded-2xl bg-[#fbe8ed] text-[#d92d5c] flex items-center justify-center mx-auto shadow-sm">
                  <UserIcon size={34} />
                </div>
                <div>
                  <h2 className="font-serif font-extrabold text-xl text-[#4b2935]">
                    {t.profileGuestTitle}
                  </h2>
                  <p className="text-xs text-[#8e7c81] mt-2 leading-relaxed max-w-xs mx-auto">
                    {t.profileGuestDesc}
                  </p>
                </div>
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#fff" opacity=".8" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#fff" opacity=".8" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fff" opacity=".8" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#fff" opacity=".8" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{t.profileGuestButton}</span>
                </Link>

                <div className="text-[11px] text-[#9b858b] pt-1">
                  <Link href="/templates" className="font-bold text-[#c32c54] hover:underline">
                    {language === "my" ? "အကောင့်မဝင်ဘဲ ဒီဇိုင်းများ ကြည့်ရှုရန်" : "Browse templates without signing in"}
                  </Link>
                </div>
              </div>
            </div>
          </FadeContent>
        </main>
        <Footer />
      </div>
    );
  }

  const recentPages = pages.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10">

        {/* ─── Page Header ─── */}
        <FadeContent effect="mist" duration={1.5} trigger="mount">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#b76176]">
              {t.profileBadge}
            </span>
            <h1 className="font-serif font-extrabold text-4xl sm:text-5xl text-[#432a32] tracking-tight mt-1">
              {t.profileTitle}
            </h1>
            <p className="text-sm text-[#88757a] mt-2">{t.profileSubtitle}</p>
          </div>
        </FadeContent>

        {/* ─── Profile Card + Stats ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Identity Card */}
          <FadeContent effect="mist" duration={1.6} delay={0.1} trigger="mount" className="lg:col-span-5">
            <div className="bg-gradient-to-br from-white to-[#fff4f6] border border-[#f4e6e9] rounded-3xl p-7 shadow-sm space-y-5">
              {/* Avatar + info */}
              <div className="flex items-center gap-4">
                {user!.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user!.photoURL}
                    alt={user!.displayName || "User"}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#f4cdd6] shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-[#fbe8ed] text-[#d92d5c] flex items-center justify-center font-extrabold text-2xl shadow-sm border border-[#f4cdd6]">
                    {user!.displayName?.charAt(0) || user!.email?.charAt(0) || "U"}
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="font-serif font-extrabold text-xl text-[#4b2935] truncate">
                    {user!.displayName || (language === "my" ? "မသိသောအသုံးပြုသူ" : "Unknown user")}
                  </h2>
                  <p className="text-xs text-[#9b858b] truncate mt-0.5">{user!.email}</p>
                  <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-[#f0faf4] text-[#3a8a5a] text-[10px] font-bold border border-[#c3e6d0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    {t.profileAccountBadge}
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white border border-[#f4e6e9] rounded-2xl p-4 text-center">
                  <p className="font-extrabold text-2xl text-[#d92d5c]">{pages.length}</p>
                  <p className="text-[10px] text-[#9b848a] mt-1 font-semibold leading-tight">
                    {t.profileStatsMoments}
                  </p>
                </div>
                <div className="bg-white border border-[#f4e6e9] rounded-2xl p-4 text-center">
                  <div className="flex justify-center mb-1">
                    <BookmarkCheck size={20} className="text-[#d92d5c]" />
                  </div>
                  <p className="text-[10px] text-[#9b848a] font-semibold leading-tight">
                    {t.profileStatsDevice}
                  </p>
                </div>
              </div>

              {/* Joined date */}
              {joinedDate && (
                <div className="flex items-center gap-2 text-xs text-[#9b848a] pt-1 border-t border-[#f4e6e9]">
                  <CalendarDays size={13} className="text-[#d92d5c] shrink-0" />
                  <span>{t.profileStatsJoined} {joinedDate}</span>
                </div>
              )}

              {/* Sign out */}
              {!confirmSignOut ? (
                <button
                  onClick={() => setConfirmSignOut(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-[#f4e6e9] text-[#a32846] hover:bg-[#fdf2f4] transition-colors text-xs font-bold cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>{t.profileSignOut}</span>
                </button>
              ) : (
                <div className="bg-[#fdf2f4] border border-[#f9d6de] rounded-2xl p-4 space-y-2.5">
                  <p className="text-xs text-[#a32846] font-semibold text-center">
                    {t.profileSignOutDesc}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmSignOut(false)}
                      className="flex-1 py-2 rounded-xl border border-[#f0dce1] text-[#573743] text-xs font-bold hover:bg-white transition-colors cursor-pointer"
                    >
                      {language === "my" ? "မထွက်တော့ပါ" : "Cancel"}
                    </button>
                    <button
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="flex-1 py-2 rounded-xl bg-[#d92d5c] hover:bg-[#bf214c] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {signingOut
                        ? (language === "my" ? "ထွက်နေသည်…" : "Signing out…")
                        : t.profileSignOut}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </FadeContent>

          {/* Right Column: Recent Moments + Quick Actions */}
          <div className="lg:col-span-7 space-y-5">

            {/* Recent Moments */}
            <FadeContent effect="mist" duration={1.6} delay={0.2} trigger="mount">
              <div className="bg-white border border-[#f4e6e9] rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#be7383]">
                      {t.profileMomentsDesc}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#4b2935] mt-0.5">
                      {t.profileMomentsTitle}
                    </h3>
                  </div>
                  <span className="w-9 h-9 rounded-xl bg-[#fbe8ed] text-[#cb3159] flex items-center justify-center shrink-0">
                    <Heart size={16} fill="currentColor" />
                  </span>
                </div>

                {recentPages.length > 0 ? (
                  <div className="divide-y divide-[#f8ebed]">
                    {recentPages.map((p) => (
                      <div
                        key={p.slug}
                        className="py-3.5 flex items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0">
                          <p className="font-serif font-bold text-sm text-[#56343e] group-hover:text-[#d92d5c] transition-colors truncate">
                            {language === "my" ? `${p.recipientName} အတွက်` : `For ${p.recipientName}`}
                          </p>
                          <p className="text-[11px] text-[#99848a] mt-0.5 truncate">
                            {language === "my" ? `${p.senderName} ထံမှ` : `From ${p.senderName}`}
                            {" · "}{new Date(p.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => copy(p.slug)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9b848a] hover:text-[#d92d5c] transition-colors cursor-pointer"
                          >
                            {copied === p.slug ? (
                              <Check size={12} className="text-green-600" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                          <Link
                            href={`/p/${p.slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#c32c54] hover:underline"
                          >
                            <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#fbe8ed] text-[#d2355c] flex items-center justify-center mx-auto mb-3">
                      <Sparkles size={20} />
                    </div>
                    <p className="text-sm font-serif font-bold text-[#56343e]">
                      {t.todayEmptyTitle}
                    </p>
                    <p className="text-xs text-[#9b848a] mt-1 mb-4">{t.todayEmptyDesc}</p>
                    <Link
                      href="/templates"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white text-xs font-bold shadow-xs transition-all"
                    >
                      {t.todayEmptyButton}
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                )}

                {pages.length > 3 && (
                  <div className="mt-4 pt-4 border-t border-[#f8ebed]">
                    <Link
                      href="/memories"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c32c54] hover:underline"
                    >
                      {t.profileViewAll} ({pages.length})
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            </FadeContent>

            {/* Quick Actions */}
            <FadeContent effect="mist" duration={1.6} delay={0.3} trigger="mount">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/templates"
                  className="group bg-gradient-to-br from-[#d92d5c] to-[#b52049] text-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <Sparkles size={20} className="mb-3 opacity-80" />
                  <p className="font-bold text-sm">
                    {language === "my" ? "ဒီဇိုင်းသစ် ဖန်တီးမယ်" : "Create new page"}
                  </p>
                  <p className="text-[11px] opacity-70 mt-0.5">
                    {language === "my" ? "ဒီဇိုင်းများ ကြည့်ရှုရန်" : "Browse templates"}
                  </p>
                </Link>

                <Link
                  href="/memories"
                  className="group bg-white border border-[#f4e6e9] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <BookmarkCheck size={20} className="mb-3 text-[#d92d5c]" />
                  <p className="font-bold text-sm text-[#4b2935]">
                    {language === "my" ? "အမှတ်တရများ" : "My moments"}
                  </p>
                  <p className="text-[11px] text-[#9b848a] mt-0.5">
                    {language === "my" ? "ဖန်တီးမှုများ ကြည့်ရှုရန်" : "View all creations"}
                  </p>
                </Link>
              </div>
            </FadeContent>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
