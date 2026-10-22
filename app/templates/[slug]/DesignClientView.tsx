"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Smartphone,
  Share2,
  PenTool,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { IconFor } from "@/components/IconFor";
import FadeContent from "@/components/FadeContent";
import type { Template } from "@/lib/templates";
import { useLanguage } from "@/context/LanguageContext";

export default function DesignClientView({ template }: { template: Template }) {
  const { t, language } = useLanguage();

  const phoneTheme =
    template.theme === "lavender"
      ? "from-[#fbf9ff] via-[#f1eef9] to-[#eae4f5]"
      : template.theme === "gold"
      ? "from-[#fffdf6] via-[#fbf5e6] to-[#f3e8ce]"
      : "from-[#fff9fa] via-[#fae6eb] to-[#f6dfe4]";

  const getCategoryName = () => {
    switch (template.category) {
      case "Love note":
        return language === "my" ? t.catLoveNote : "Love note";
      case "Anniversary":
        return language === "my" ? t.catAnniversary : "Anniversary";
      case "Birthday":
        return language === "my" ? t.catBirthday : "Birthday";
      case "Wedding":
        return language === "my" ? t.catWedding : "Wedding";
      case "Friendship":
        return language === "my" ? t.catFriendship : "Friendship";
      case "Memory":
        return language === "my" ? t.catMemory : "Memory";
      default:
        return template.category;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Back Link */}
        <FadeContent effect="fade" duration={1.2} trigger="mount">
          <div className="mb-6">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c32c54] hover:underline"
            >
              <ArrowLeft size={15} />
              <span>{t.designAllTemplates}</span>
            </Link>
          </div>
        </FadeContent>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Phone Preview Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <FadeContent
              effect="mist"
              duration={1.6}
              ease="power2.out"
              trigger="mount"
            >
              <div className="w-[300px] sm:w-[320px] h-[580px] bg-[#3b2a30] rounded-[42px] p-3 shadow-2xl border-4 border-[#503a42] relative flex flex-col">
                {/* Notch */}
                <div className="w-28 h-4.5 bg-[#251a1e] rounded-full mx-auto mb-2.5"></div>

                {/* Inner Screen */}
                <div
                  className={`flex-1 rounded-[32px] bg-gradient-to-b ${phoneTheme} p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner`}
                >
                  <span className="text-[10px] font-extrabold tracking-widest text-[#be7383] uppercase mb-4">
                    {t.designMadeForYou}
                  </span>

                  <div className="w-24 h-24 rounded-full bg-white/70 border border-[#f3dfe3] text-[#d94a70] flex items-center justify-center shadow-md mb-4">
                    <IconFor icon={template.icon} size={42} />
                  </div>

                  <h2 className="font-serif font-bold text-2xl text-[#55313d] leading-snug">
                    {template.title}
                  </h2>

                  <p className="text-xs text-[#8b737a] mt-2 leading-relaxed max-w-[200px]">
                    {template.subtitle}
                  </p>

                  <div className="w-12 h-px bg-[#dfb7c0] my-4"></div>

                  <p className="text-xs font-serif font-semibold text-[#6d4551]">
                    {t.designWithLove}
                  </p>

                  <span className="mt-4 px-3 py-1 rounded-full bg-white/80 text-[#ba5870] text-[10px] font-bold shadow-xs">
                    {getCategoryName()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#9b858b] text-center mt-4">
                {t.designPreviewMockup}
              </p>
            </FadeContent>
          </div>

          {/* Details & Customization Action Column */}
          <div className="lg:col-span-7">
            <FadeContent
              effect="mist"
              duration={1.6}
              delay={0.4}
              ease="power2.out"
              trigger="mount"
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#b76176]">
                  {getCategoryName()} · Sweetmemos Design
                </span>
                <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#4b2935] tracking-tight mt-1">
                  {template.title}
                </h1>
                <p className="text-sm sm:text-base text-[#806c72] leading-relaxed mt-3">
                  {template.subtitle}
                </p>
              </div>

              {/* Price Banner */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-white to-[#fff7f8] border border-[#f0dce1]">
                <div>
                  <span className="text-xs text-[#8a7178] block font-medium">
                    {t.designTemplatePrice}
                  </span>
                  <span className="text-xs text-[#9b848a]">
                    {t.designNoSubs}
                  </span>
                </div>
                <strong className="font-serif font-extrabold text-2xl sm:text-3xl text-[#c32c54]">
                  {template.price.toLocaleString()} Ks
                </strong>
              </div>

              {/* Feature Highlights */}
              <div className="p-5 rounded-2xl bg-white border border-[#f0dfe3] space-y-3">
                <div className="flex items-center justify-between">
                  <b className="text-sm font-bold text-[#573743]">
                    {t.designPersonalizedInSecs}
                  </b>
                  <Sparkles size={16} className="text-amber-500" />
                </div>
                <p className="text-xs text-[#806e73] leading-relaxed">
                  {t.designPersonalizedDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-[#6e575e]">
                    <Smartphone size={14} className="text-[#d92d5c]" />
                    <span>{t.designFeaturePhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6e575e]">
                    <Share2 size={14} className="text-[#d92d5c]" />
                    <span>{t.designFeatureLink}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6e575e]">
                    <PenTool size={14} className="text-[#d92d5c]" />
                    <span>{t.designFeatureNoLogin}</span>
                  </div>
                </div>
              </div>

              {/* Color Feeling */}
              <div>
                <span className="text-xs font-bold text-[#684a54] uppercase tracking-wider block mb-2">
                  {t.designColorsIncluded}
                </span>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-1.5 text-xs text-[#79666c]">
                    <span className="w-5 h-5 rounded-full bg-[#d74b70] border-2 border-white shadow-xs"></span>
                    <span>{t.designColorRose}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#79666c]">
                    <span className="w-5 h-5 rounded-full bg-[#9384bd] border-2 border-white shadow-xs"></span>
                    <span>{t.designColorLavender}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#79666c]">
                    <span className="w-5 h-5 rounded-full bg-[#c6a151] border-2 border-white shadow-xs"></span>
                    <span>{t.designColorGold}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href={`/editor/${template.slug}`}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>{t.designMakeNow}</span>
                  <ArrowRight size={17} />
                </Link>
                <p className="text-xs text-[#9b858b] mt-3">
                  {t.designSavedPrivate}
                </p>
              </div>
            </FadeContent>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
