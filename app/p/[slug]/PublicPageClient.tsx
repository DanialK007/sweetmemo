"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Copy,
  Heart,
  LoaderCircle,
  Sparkles,
  Globe,
} from "lucide-react";
import { IconFor } from "@/components/IconFor";
import FadeContent from "@/components/FadeContent";
import { templates, type TemplateIcon } from "@/lib/templates";
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

export default function PublicPageClient({ slug }: { slug: string }) {
  const { t, language, toggleLanguage } = useLanguage();
  const [page, setPage] = useState<SavedPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem("sweetmemos-pages") ||
        localStorage.getItem("sweetmoment-pages");
      if (raw) {
        const pages: SavedPage[] = JSON.parse(raw);
        const found = pages.find((p) => p.slug === slug);
        if (found) {
          setPage(found);
        }
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, [slug]);

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyMessage(t.publicCopiedToast);
    } catch {
      setCopyMessage(t.publicCopyFallbackToast);
    }
    window.setTimeout(() => setCopyMessage(""), 2500);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white rounded-3xl border border-[#f4e6e9] p-8 text-center max-w-sm w-full shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-[#fbe8ed] text-[#d2355c] flex items-center justify-center mx-auto mb-4 animate-spin">
            <LoaderCircle size={24} />
          </div>
          <h2 className="font-serif font-bold text-xl text-[#522e3a]">
            {t.publicOpeningTitle}
          </h2>
          <p className="text-xs text-[#8e7c81] mt-1">
            {t.publicOpeningDesc}
          </p>
        </div>
      </main>
    );
  }

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-4">
        <FadeContent effect="mist" duration={1.5} trigger="mount">
          <div className="bg-white rounded-3xl border border-[#f4e6e9] p-8 text-center max-w-md w-full shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-[#fbe8ed] text-[#d2355c] flex items-center justify-center mx-auto mb-4">
              <Heart size={26} />
            </div>
            <h1 className="font-serif font-extrabold text-2xl text-[#512b38]">
              {t.publicNotFoundTitle}
            </h1>
            <p className="text-xs text-[#8e7c81] mt-2 mb-6 leading-relaxed">
              {t.publicNotFoundDesc}
            </p>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-xs shadow-sm transition-all"
            >
              <span>{t.publicNotFoundButton}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </FadeContent>
      </main>
    );
  }

  const template = templates.find((item) => item.slug === page.templateSlug);

  const cardGradient =
    page.theme === "lavender"
      ? "from-white via-[#f8f6fd] to-[#f1eef9]"
      : page.theme === "gold"
      ? "from-white via-[#fffdf6] to-[#f5edda]"
      : "from-white via-[#fff9fa] to-[#fae8ec]";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4 sm:p-8 relative">
      {/* Top Floating Language Switcher */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#573743] border border-[#f0dce1] text-xs font-bold shadow-xs cursor-pointer transition-all"
          title="Switch Language / ဘာသာစကားပြောင်းရန်"
        >
          <Globe size={14} className="text-[#d92d5c]" />
          <span>{language === "my" ? "🇲🇲 မြန်မာ" : "🇬🇧 English"}</span>
        </button>
      </div>

      {/* Keepsake Certificate Card */}
      <FadeContent effect="mist" duration={1.8} trigger="mount">
        <article
          className={`relative w-full max-w-xl min-h-[580px] bg-gradient-to-b ${cardGradient} border border-[#f4e6e9] rounded-[36px] p-8 sm:p-14 text-center shadow-2xl flex flex-col items-center justify-center overflow-hidden`}
        >
          {/* Subtle decorative background circles */}
          <div className="absolute -top-24 -left-24 w-64 h-64 border border-[#f0d6dc]/60 rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 border border-[#f0d6dc]/60 rounded-full pointer-events-none"></div>

          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#be7383] mb-4">
            {t.publicMadeForYou}
          </span>

          {/* Center Orb */}
          <div className="w-24 h-24 rounded-full bg-white/80 border border-[#f3dfe3] text-[#d94a70] flex items-center justify-center my-3 shadow-md">
            <IconFor
              icon={(template?.icon ?? "heart") as TemplateIcon}
              size={44}
            />
          </div>

          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#512b38] tracking-tight mt-3 mb-2">
            {language === "my"
              ? `${page.recipientName} အတွက် ချစ်စကားလွှာ`
              : `Dear ${page.recipientName},`}
          </h1>

          {page.occasionDate && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 text-[#8e7c81] text-xs font-medium border border-[#f4e6e9] my-2">
              <CalendarDays size={13} />
              <span>
                {new Date(
                  `${page.occasionDate}T12:00:00`
                ).toLocaleDateString(undefined, {
                  dateStyle: "long",
                })}
              </span>
            </div>
          )}

          <div className="w-16 h-px bg-[#dfb7c0] my-5"></div>

          <p className="text-sm sm:text-base text-[#765e67] leading-relaxed max-w-md whitespace-pre-wrap italic">
            {page.message ||
              (language === "my"
                ? "အချို့သော ခံစားချက်တွေဟာ စကားလုံးအများကြီး မလိုပါဘူး။ သင်ရှိနေပေးတာနဲ့တင် လုံလောက်နေပါပြီ။"
                : "Some moments don’t need many words. Just knowing you’re wonderful is enough.")}
          </p>

          <p className="font-serif font-bold text-base sm:text-lg text-[#6d4551] mt-6">
            {language === "my"
              ? `မေတ္တာများစွာဖြင့် ${page.senderName}`
              : `With love, ${page.senderName}`}
          </p>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#b76176] tracking-widest uppercase mt-6">
            <span>{language === "my" ? "မေတ္တာဖြင့် ဖန်တီးထားသည်" : "Made with"}</span>
            <Heart size={12} fill="currentColor" className="text-[#d92d5c]" />
            <span>sweetmemos</span>
          </div>

          {/* Share Button & Make Your Own Link */}
          <div className="mt-8 pt-6 border-t border-[#f4e6e9]/80 w-full flex flex-col items-center gap-3">
            <button
              onClick={copyPageLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#fff0f3] text-[#5a3741] font-bold text-xs border border-[#f0dce1] shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
            >
              <Copy size={14} />
              <span>{copyMessage ? copyMessage : (language === "my" ? "လင့်ခ်ကို ကူးယူ၍ မျှဝေရန်" : "Copy page link to share")}</span>
            </button>

            <Link
              href="/templates"
              className="text-xs font-bold text-[#c32c54] hover:underline"
            >
              {t.publicMakeOwn}
            </Link>
          </div>
        </article>
      </FadeContent>
    </main>
  );
}
