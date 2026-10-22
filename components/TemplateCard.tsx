"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Heart } from "lucide-react";
import { IconFor } from "@/components/IconFor";
import type { Template } from "@/lib/templates";
import { useLanguage } from "@/context/LanguageContext";

export function TemplateArtwork({
  template,
  compact = false,
}: {
  template: Template;
  compact?: boolean;
}) {
  const { t } = useLanguage();

  const bgTheme =
    template.theme === "lavender"
      ? "from-[#e9e4f4] via-[#fff8f7] to-[#d9d2eb]"
      : template.theme === "gold"
      ? "from-[#f3e8ce] via-[#fffaf0] to-[#ead9ad]"
      : "from-[#f7e6e8] via-[#fff7f4] to-[#efd8de]";

  return (
    <div
      className={`relative w-full ${
        compact ? "h-48" : "h-64"
      } bg-gradient-to-br ${bgTheme} rounded-2xl flex items-center justify-center p-4 overflow-hidden shadow-inner`}
    >
      {/* Decorative Ornaments */}
      <span className="absolute right-5 top-5 text-[#d27b8d]/70 pointer-events-none">
        <Sparkles size={16} />
      </span>
      <span className="absolute left-5 bottom-5 text-[#d27b8d]/70 pointer-events-none">
        <Heart size={14} fill="currentColor" />
      </span>

      {/* Arched Inner Frame */}
      <div className="w-[82%] h-[84%] border border-white/60 bg-white/50 backdrop-blur-xs rounded-t-[70px] rounded-b-2xl flex flex-col items-center justify-center text-center p-4 shadow-sm">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#9e737e] uppercase mb-2">
          {t.designMadeForYou}
        </span>
        <div className="my-1 text-[#c55070]">
          <IconFor icon={template.icon} size={compact ? 28 : 36} />
        </div>
        <b className="font-serif font-bold text-lg text-[#693748] mt-1 mb-0.5 line-clamp-1">
          {template.title}
        </b>
        <span className="text-[9px] font-semibold tracking-wider text-[#9e737e]/90 uppercase">
          {t.designWithLove}
        </span>
      </div>
    </div>
  );
}

export function TemplateCard({ template }: { template: Template }) {
  const { t, language } = useLanguage();

  const categoryName = () => {
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
    <article className="group bg-white rounded-3xl border border-[#f4e6e9] p-3.5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      <Link
        href={`/templates/${template.slug}`}
        className="block no-underline flex-1"
      >
        <TemplateArtwork template={template} />

        <div className="pt-4 pb-2 px-1 flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#4a2d36] group-hover:text-[#d92d5c] transition-colors">
              {template.title}
            </h3>
            <p className="text-xs text-[#917d82] mt-1 line-clamp-2 leading-relaxed">
              {template.subtitle}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#f8ebed] flex items-center justify-between">
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#fbebef] text-[#ba5870] text-[11px] font-bold">
              {categoryName()}
            </span>
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#f8f1df] text-[#8d6d37] text-[11px] font-extrabold tracking-tight">
              {template.price.toLocaleString()} Ks
            </span>
          </div>

          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#c32c54] group-hover:gap-2 transition-all">
            {t.exploreDesign} <ArrowUpRight size={13} />
          </span>
        </div>
      </Link>
    </article>
  );
}
