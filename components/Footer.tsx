"use client";

import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-[#f0dfe3] bg-white py-8 text-sm text-[#967f85]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif font-extrabold text-base text-[#4c2834]"
        >
          <span className="w-6 h-6 rounded-lg bg-[#f9e3e8] text-[#d52c5a] flex items-center justify-center">
            <Heart size={13} fill="currentColor" />
          </span>
          <span>sweetmemos</span>
        </Link>
        <span className="text-xs text-[#967f85] text-center sm:text-left">
          {t.footerTagline}
        </span>
        <Link
          href="/templates"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c32c54] hover:underline"
        >
          <span>{t.footerFindMoment}</span>
          <ArrowUpRight size={13} />
        </Link>
      </div>
    </footer>
  );
}
