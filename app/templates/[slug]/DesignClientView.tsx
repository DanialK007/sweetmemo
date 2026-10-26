"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Smartphone,
  Share2,
  PenTool,
  Maximize2,
  X,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { IconFor } from "@/components/IconFor";
import FadeContent from "@/components/FadeContent";
import type { Template } from "@/lib/templates";
import { useLanguage } from "@/context/LanguageContext";
import { BirthdayRetroCamera } from "@/components/templates/BirthdayRetroCamera";
import { PhoneMockupCard } from "@/components/mockups/phone-mockup-card";

export default function DesignClientView({ template }: { template: Template }) {
  const { t, language } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<"rose" | "lavender" | "gold">(template.theme || "gold");

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
            {/* Full Screen Action Button */}
            {template.slug === "soft-confetti" && (
              <div className="mb-3 w-full max-w-[320px] flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#fff0f4] text-[#d92d5c] border border-[#f3ccd7] text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <Maximize2 size={13} />
                  <span>{language === "my" ? "မျက်နှာပြင်ပြည့် ကြည့်ရှုရန်" : "Full Screen"}</span>
                </button>
              </div>
            )}

            <FadeContent
              effect="mist"
              duration={1.6}
              ease="power2.out"
              trigger="mount"
            >
              <PhoneMockupCard
                variant={
                  template.theme === "lavender"
                    ? "purple"
                    : template.theme === "gold"
                    ? "orange"
                    : "cherry"
                }
                showDynamicIsland={true}
              >
                {template.slug === "soft-confetti" ? (
                  <BirthdayRetroCamera mode="editor-preview" theme={selectedTheme} />
                ) : (
                  <div
                    className={`min-h-full rounded-[32px] bg-gradient-to-b ${phoneTheme} p-6 flex flex-col items-center justify-center text-center relative overflow-hidden`}
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
                )}
              </PhoneMockupCard>

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
              {template.slug === "soft-confetti" && (
                <div>
                  <span className="text-xs font-bold text-[#684a54] uppercase tracking-wider block mb-2">
                    {t.designColorsIncluded}
                  </span>
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => setSelectedTheme("rose")}
                      className={`flex items-center gap-1.5 text-xs ${
                        selectedTheme === "rose" ? "text-[#d74b70] font-bold" : "text-[#79666c]"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-[#d74b70] border-2 shadow-xs ${
                        selectedTheme === "rose" ? "border-[#d74b70] ring-2 ring-[#d74b70]/30" : "border-white"
                      }`}></span>
                      <span>{t.designColorRose}</span>
                    </button>
                    <button
                      onClick={() => setSelectedTheme("lavender")}
                      className={`flex items-center gap-1.5 text-xs ${
                        selectedTheme === "lavender" ? "text-[#9384bd] font-bold" : "text-[#79666c]"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-[#9384bd] border-2 shadow-xs ${
                        selectedTheme === "lavender" ? "border-[#9384bd] ring-2 ring-[#9384bd]/30" : "border-white"
                      }`}></span>
                      <span>{t.designColorLavender}</span>
                    </button>
                    <button
                      onClick={() => setSelectedTheme("gold")}
                      className={`flex items-center gap-1.5 text-xs ${
                        selectedTheme === "gold" ? "text-[#c6a151] font-bold" : "text-[#79666c]"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-[#c6a151] border-2 shadow-xs ${
                        selectedTheme === "gold" ? "border-[#c6a151] ring-2 ring-[#c6a151]/30" : "border-white"
                      }`}></span>
                      <span>{t.designColorGold}</span>
                    </button>
                  </div>
                </div>
              )}

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

      {/* Fullscreen Interactive Modal */}
      {isFullscreen && (
        <div
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
        >
          {/* Top Bar with Close button */}
          <div className="w-full max-w-lg flex items-center justify-between pb-3 px-2 text-white">
            <span className="text-xs font-bold tracking-wider uppercase opacity-85">
              {language === "my" ? "မျက်နှာပြင်ပြည့် အစမ်းကြည့်ရှုခြင်း" : "Full Screen Preview"}
            </span>
            <button
              onClick={() => setIsFullscreen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
              title="Close / ပိတ်ရန်"
            >
              <X size={18} />
            </button>
          </div>

          {/* Full Screen Viewport */}
          <div
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            onWheel={(e) => e.stopPropagation()}
            className="w-full max-w-lg h-[90vh] bg-[#faf5ee] rounded-[36px] border-4 border-[#3c2a31] shadow-2xl overflow-y-auto overscroll-contain relative"
          >
            <BirthdayRetroCamera
              mode="editor-preview"
              theme={selectedTheme}
              onBackClick={() => setIsFullscreen(false)}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
