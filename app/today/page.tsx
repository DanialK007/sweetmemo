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
} from "lucide-react";
import { Footer } from "@/components/Footer";
import FadeContent from "@/components/FadeContent";
import { useLanguage } from "@/context/LanguageContext";

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

export default function TodayPage() {
  const { t, language } = useLanguage();
  const [pages, setPages] = useState<SavedPage[]>([]);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem("sweetmemos-pages") ||
        localStorage.getItem("sweetmoment-pages");
      if (raw) setPages(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const copy = async (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(slug);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
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
            <p className="text-sm text-[#88757a] mt-2">
              {t.todaySubtitle}
            </p>
          </div>
        </FadeContent>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main List */}
          <div className="lg:col-span-8">
            <FadeContent effect="mist" duration={1.6} delay={0.4} trigger="mount">
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

                {pages.length > 0 ? (
                  <div className="divide-y divide-[#f8ebed] mt-4">
                    {pages.map((p) => (
                      <article
                        key={p.slug}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                      >
                        <div>
                          <h3 className="font-serif font-bold text-base text-[#56343e] group-hover:text-[#d92d5c] transition-colors">
                            {language === "my"
                              ? `${p.recipientName} အတွက်`
                              : `For ${p.recipientName}`}
                          </h3>
                          <p className="text-xs text-[#99848a] mt-0.5">
                            {language === "my"
                              ? `${p.senderName} ထံမှ`
                              : `From ${p.senderName}`}{" "}
                            · {new Date(p.createdAt).toLocaleDateString()}
                          </p>

                          <div className="flex items-center gap-3 mt-2">
                            <Link
                              href={`/p/${p.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#c32c54] hover:underline"
                            >
                              <span>{t.todayOpenPage}</span>
                              <ArrowUpRight size={13} />
                            </Link>

                            <button
                              onClick={() => copy(p.slug)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#806c72] hover:text-[#56343e] cursor-pointer"
                            >
                              {copied === p.slug ? (
                                <>
                                  <Check size={13} className="text-green-600" />
                                  <span className="text-green-600">
                                    {t.todayCopied}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy size={13} />
                                  <span>{t.todayCopyLink}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#fbebef] text-[#ba5870] text-[10px] font-bold uppercase tracking-wider">
                          {p.theme}
                        </span>
                      </article>
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
            <FadeContent effect="mist" duration={1.6} delay={0.4} trigger="mount">
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
                  <span>{t.todayStorageNotice}</span>
                </div>
              </aside>
            </FadeContent>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
