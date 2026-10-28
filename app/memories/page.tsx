"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Heart,
  Link2,
  Mail,
  Sparkles,
  MoreVertical,
  Trash2,
  Star,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import FadeContent from "@/components/FadeContent";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { getUserPages, moveToTrash } from "@/lib/firestore";
import SwipeToast from "@/components/SwipeToast";
import {
  BirthdayRetroCamera,
  defaultBirthdayData,
  type BirthdayCardData,
} from "@/components/templates/BirthdayRetroCamera";

interface SavedPage {
  slug: string;
  templateSlug: string;
  recipientName: string;
  senderName: string;
  occasionDate: string | null;
  message: string;
  theme: string;
  createdAt: string | { toDate: () => Date };
  birthdayData?: BirthdayCardData;
}

export default function TodayPage() {
  const { t, language } = useLanguage();
  const { user, loading } = useAuth();
  const [pages, setPages] = useState<SavedPage[]>([]);
  const [copied, setCopied] = useState("");
  const [isLoadingPages, setIsLoadingPages] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [toasts, setToasts] = useState<{ id: number; type: 'success' | 'error'; title: string; description?: string }[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      if (!user) return;

      setIsLoadingPages(true);
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
          // ignore
        }
      } finally {
        setIsLoadingPages(false);
      }
    };

    fetchCards();
  }, [user]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#fbe8ed] text-[#d92d5c] flex items-center justify-center mx-auto mb-4 animate-spin">
            <span className="text-2xl">⏳</span>
          </div>
          <p className="text-sm text-[#8e7c81]">Loading your memories...</p>
        </div>
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white rounded-3xl border border-[#f4e6e9] p-8 text-center max-w-md w-full shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-[#fbe8ed] text-[#d2355c] flex items-center justify-center mx-auto mb-4">
            <Heart size={26} />
          </div>
          <h1 className="font-serif font-extrabold text-2xl text-[#512b38]">
            {language === "my"
              ? "အကောင့်ဝင်ရန် လိုအပ်ပါသည်"
              : "Sign in required"}
          </h1>
          <p className="text-xs text-[#8e7c81] mt-2 mb-6 leading-relaxed">
            {language === "my"
              ? "သင့်ဖန်တီးထားသော ကတ်များကို ကြည့်ရှုရန် ဦးစွာ ဝင်ရောက်ပါ"
              : "Please sign in to view your created cards."}
          </p>
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-xs shadow-sm transition-all"
          >
            <span>{language === "my" ? "ဝင်ရောက်မည်" : "Sign in"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const copy = async (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(slug);
      setToasts(t => [...t, { id: Date.now(), type: 'success', title: language === 'my' ? 'လင့်ခ် ကူးပြီးပါပြီ' : 'Link copied' }]);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setToasts(t => [...t, { id: Date.now(), type: 'error', title: language === 'my' ? 'လင့်ခ် ကူးမှု မအောင်မြင်ပါ' : 'Failed to copy link' }]);
      setCopied("");
    }
  };

  const toggleMenu = (slug: string) => {
    setMenuOpen(menuOpen === slug ? null : slug);
  };

  const handleFavorite = async (slug: string) => {
    // TODO: Implement favorite functionality
    setMenuOpen(null);
  };

  const handleDelete = async (slug: string) => {
    if (!user) return;

    try {
      await moveToTrash(slug);
      setPages((prev) => prev.filter((p) => p.slug !== slug));
      setMenuOpen(null);
      setToasts(t => [...t, { 
        id: Date.now(), 
        type: 'success', 
        title: language === 'my' ? 'ကတ်ကို ဖျက်ပြီးပါပြီ' : 'Card moved to trash',
        description: language === 'my' ? '၃၀ ရက်အတွင်း ပြန်လည်ရယူနိုင်ပါသည်' : 'Can be restored within 30 days'
      }]);
    } catch (err) {
      console.error("Error deleting card:", err);
      setToasts(t => [...t, { 
        id: Date.now(), 
        type: 'error', 
        title: language === 'my' ? 'ဖျက်ရာတွင် အမှားဖြစ်ပါသည်' : 'Failed to delete card'
      }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Header Section */}
        <FadeContent effect="mist" duration={1.6} trigger="mount">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#b76176]">
              {t.todayCornerBadge}
            </span>
            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#432a32] tracking-tight mt-1">
              {t.todayTitle}
            </h1>
            <p className="text-sm text-[#88757a] mt-2">{t.todaySubtitle}</p>
          </div>
        </FadeContent>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main List */}
          <div className="lg:col-span-8">
            <FadeContent
              effect="mist"
              duration={1.6}
              delay={0.4}
              trigger="mount"
            >
              <section className="bg-white rounded-3xl border border-[#f4e6e9] p-6 sm:p-8 shadow-sm">
                <div className="flex items-start justify-between pb-6 border-b border-[#f4e6e9] gap-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#be7383]">
                      {t.todaySavedBadge}
                    </span>
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#4b2935] mt-1">
                      {t.todaySectionTitle}
                    </h2>
                    <p className="text-xs text-[#8e7c81] mt-1">
                      {t.todaySectionDesc}
                    </p>
                  </div>

                  <span className="w-10 h-10 rounded-2xl bg-[#fbe8ed] text-[#cb3159] flex items-center justify-center shrink-0">
                    <Heart size={20} fill="currentColor" />
                  </span>
                </div>

                {isLoadingPages ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="group relative rounded-3xl border border-[#f4e6e9] bg-white p-4 shadow-sm overflow-hidden"
                      >
                        {/* Card Preview Skeleton */}
                        <div className="aspect-4/3 scale-[2.25] translate-y-12 rounded-2xl overflow-hidden bg-gray-100 mb-4 relative">
                          <div className="w-full h-full bg-rose-100 animate-pulse" />
                        </div>

                        <div className="h-20"></div>

                        <div className="absolute inset-0 z-5 bg-linear-to-t from-white via-white/50 from-5% via-60% to-80% flex flex-col justify-end p-4">
                          {/* Card Info Skeleton */}
                          <div className="space-y-2 z-10 relative">
                            <div className="h-6 bg-rose-100 rounded animate-pulse w-3/4" />
                            <div className="h-4 bg-rose-100 rounded animate-pulse w-1/2" />
                            <div className="h-3 bg-rose-100 rounded animate-pulse w-1/3" />
                          </div>

                          {/* Actions Skeleton */}
                          <div className="flex z-10 relative items-center gap-2 mt-3 pt-2 border-t border-[#f8ebed2e]">
                            <div className="flex-1 h-8 bg-rose-100 rounded-lg animate-pulse" />
                            <div className="w-8 h-8 bg-rose-100 rounded-lg animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : pages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {pages.map((p) => (
                      <div
                        key={p.slug}
                        className="group relative rounded-3xl border border-[#f4e6e9] bg-white p-4 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                      >
                        {/* Card Preview */}
                        <div className="aspect-4/3 scale-[2.25] translate-y-12 rounded-2xl overflow-hidden bg-linear-to-b mb-4 relative">
                          {p.templateSlug === "soft-confetti" ||
                          p.birthdayData ? (
                            <div className="w-full h-full transform scale-50 origin-top">
                              <BirthdayRetroCamera
                                data={
                                  p.birthdayData || {
                                    ...defaultBirthdayData,
                                    recipientName: p.recipientName,
                                    senderName: p.senderName.startsWith("—")
                                      ? p.senderName
                                      : `— ${p.senderName}`,
                                    occasionDate:
                                      p.occasionDate ||
                                      defaultBirthdayData.occasionDate,
                                    letterContent:
                                      p.message ||
                                      defaultBirthdayData.letterContent,
                                  }
                                }
                                mode="editor-preview"
                                theme={p.theme as "rose" | "lavender" | "gold"}
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#f8f6fd] to-[#f0edf9]">
                              <span className="text-6xl">💝</span>
                            </div>
                          )}
                        </div>

                        <div className="h-20"></div>

                        <div className="absolute top-0 right-0 p-4 z-10">
                          <div className="relative">
                            <button
                              onClick={() => toggleMenu(p.slug)}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/90 hover:bg-white text-[#806c72] hover:text-[#56343e] shadow-sm transition-colors cursor-pointer"
                              aria-label="More options"
                            >
                              <MoreVertical size={14} />
                            </button>

                            {menuOpen === p.slug && (
                              <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-[#f4e6e9] py-1 w-32 z-20">
                                <button
                                  onClick={() => handleFavorite(p.slug)}
                                  className="w-full px-3 py-2 text-left text-xs text-[#56343e] hover:bg-[#f8ebed] flex items-center gap-2 transition-colors"
                                >
                                  <Star size={12} />
                                  <span>Favorite</span>
                                </button>
                                <Link
                                  href={`/editor/${p.templateSlug}?slug=${p.slug}`}
                                  className="w-full px-3 py-2 text-left text-xs text-[#56343e] hover:bg-[#f8ebed] flex items-center gap-2 transition-colors"
                                  onClick={() => setMenuOpen(null)}
                                >
                                  <Sparkles size={12} />
                                  <span>Edit</span>
                                </Link>
                                <button
                                  onClick={() => handleDelete(p.slug)}
                                  className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                >
                                  <Trash2 size={12} />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="absolute inset-0 z-5 bg-linear-to-t from-white via-white/50 from-5% via-60% to-80% flex flex-col justify-end p-4">
                          {/* Card Info */}
                          <div className="space-y-1 z-10 relative">
                            <h3 className="font-serif font-bold text-lg text-[#56343e] truncate">
                              {language === "my"
                                ? `${p.recipientName} အတွက်`
                                : `For ${p.recipientName}`}
                            </h3>
                            <p className="text-[11px] text-[#99848a] truncate">
                              {language === "my"
                                ? `${p.senderName} မှ`
                                : `From ${p.senderName}`}
                            </p>
                            <p className="text-[10px] text-[#9b848a]">
                              {p.createdAt
                                ? new Date(
                                    typeof p.createdAt === "string"
                                      ? p.createdAt
                                      : p.createdAt.toDate(),
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex z-10 relative items-center gap-2 mt-3 pt-2 border-t border-[#f8ebed2e]">
                            <Link
                              href={`/p/${p.slug}`}
                              className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-[#d92d5c] hover:bg-[#bf214c] text-white text-[10px] font-bold transition-colors"
                            >
                              <span>{t.todayOpenPage}</span>
                              <ArrowUpRight size={11} />
                            </Link>
                            <button
                              onClick={() => copy(p.slug)}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#f8ebed] hover:bg-[#f0dce1] text-[#806c72] hover:text-[#56343e] transition-colors cursor-pointer"
                            >
                              {copied === p.slug ? (
                                <Check size={12} className="text-green-600" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#fbe8ed] text-[#d2355c] flex items-center justify-center mx-auto mb-4">
                      <Mail size={24} />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-[#53313c]">
                      {t.todayEmptyTitle}
                    </h3>
                    <p className="text-xs text-[#8e7c81] max-w-xs mx-auto mt-1 mb-5">
                      {t.todayEmptyDesc}
                    </p>
                    <Link
                      href="/templates"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-xs shadow-xs"
                    >
                      <span>{t.todayEmptyButton}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </section>
            </FadeContent>
          </div>

          {/* Sidebar Note */}
          <div className="lg:col-span-4">
            <FadeContent
              effect="mist"
              duration={1.6}
              delay={0.4}
              trigger="mount"
            >
              <aside className="bg-gradient-to-br from-white to-[#f9e9ed] rounded-3xl border border-[#f0dfe3] p-6 sm:p-7 shadow-sm space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#be7383]">
                  {t.todayReminderBadge}
                </span>

                <h3 className="font-serif font-bold text-xl text-[#522e3a] leading-snug">
                  {t.todayReminderTitle}
                </h3>

                <p className="text-xs text-[#7d686f] leading-relaxed">
                  {t.todayReminderDesc}
                </p>

                <Link
                  href="/templates"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c32c54] hover:underline pt-2 block"
                >
                  <span>{t.todayMakeAnother}</span>
                  <ArrowRight size={14} />
                </Link>

                <div className="pt-4 border-t border-[#f0dfe3] flex items-center gap-2 text-[11px] text-[#9a8289]">
                  <Link2 size={14} className="shrink-0" />
                  <span>
                    {language === "my"
                      ? "သင့်ကတ်များကို Cloud တွင် သိမ်းဆည်းထားပါသည်"
                      : "Your cards are saved in the cloud"}
                  </span>
                </div>
              </aside>
            </FadeContent>
          </div>
        </div>
      </main>

      <Footer />

      {/* Toast Notifications */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, zIndex: 9999 }}>
        {toasts.map(t => (
          <SwipeToast
            key={t.id}
            inline
            title={t.title}
            description={t.description}
            duration={3000}
            onClose={() => setToasts(s => s.filter(x => x.id !== t.id))}
            background={t.type === 'error' ? '#dc2626' : '#27272a'}
            color="#f5f5f5"
            fuseColor={t.type === 'error' ? '#ef4444' : '#f5a524'}
          />
        ))}
      </div>
    </div>
  );
}
