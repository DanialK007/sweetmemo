"use client";

import { useState, useMemo } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { TemplateCard } from "@/components/TemplateCard";
import FadeContent from "@/components/FadeContent";
import { templates, categories } from "@/lib/templates";
import { useLanguage } from "@/context/LanguageContext";

export default function TemplatesPage() {
  const { t, language } = useLanguage();
  const [category, setCategory] = useState("All moments");

  const shown = useMemo(
    () =>
      category === "All moments"
        ? templates
        : templates.filter((t) => t.category === category),
    [category]
  );

  const getCategoryLabel = (c: string) => {
    switch (c) {
      case "All moments":
        return t.catAll;
      case "Love note":
        return t.catLoveNote;
      case "Anniversary":
        return t.catAnniversary;
      case "Birthday":
        return t.catBirthday;
      case "Wedding":
        return t.catWedding;
      case "Friendship":
        return t.catFriendship;
      case "Memory":
        return t.catMemory;
      default:
        return c;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full space-y-8">
        {/* Header Section */}
        <FadeContent effect="mist" duration={1.6} trigger="mount">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#b76176]">
                <Sparkles size={12} className="text-[#d92d5c]" />
                <span>{t.templatesBadge}</span>
              </span>
              <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#432a32] tracking-tight mt-2">
                {t.templatesTitle}
              </h1>
              <p className="text-sm text-[#88757a] mt-2 max-w-xl">
                {t.templatesSubtitle}
              </p>
            </div>

            <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[#fbebef] text-[#ba5870] text-xs font-bold">
              {shown.length} {t.templatesCountSuffix}
            </span>
          </div>
        </FadeContent>

        {/* Filter Pills Section */}
        <FadeContent effect="mist" duration={1.5} delay={0.4} trigger="mount">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  category === c
                    ? "bg-[#d92d5c] text-white shadow-sm"
                    : "bg-white text-[#826a71] border border-[#f0dce1] hover:bg-[#fcecef] hover:text-[#ba5870]"
                }`}
              >
                {getCategoryLabel(c)}
              </button>
            ))}
          </div>
        </FadeContent>

        {/* Template Grid Section */}
        <FadeContent effect="mist" duration={1.6} delay={0.4} trigger="mount">
          {shown.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shown.map((template) => (
                <TemplateCard key={template.slug} template={template} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-[#e9cbd3] rounded-3xl bg-[#fff9fa]">
              <div className="w-14 h-14 rounded-2xl bg-[#fbe8ed] text-[#d2355c] flex items-center justify-center mx-auto mb-4">
                <Heart size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#522e3a]">
                {t.templatesEmptyTitle}
              </h3>
              <p className="text-xs text-[#8e7c81] mt-1">
                {t.templatesEmptyDesc}
              </p>
            </div>
          )}
        </FadeContent>
      </main>

      <Footer />
    </div>
  );
}
