"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Flower2,
  CheckCircle2,
  Share2,
  BookmarkCheck,
  Palette,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { TemplateCard } from "@/components/TemplateCard";
import FadeContent from "@/components/FadeContent";
import { templates } from "@/lib/templates";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      title: t.step1Title,
      desc: t.step1Desc,
      icon: Palette,
    },
    {
      num: "02",
      title: t.step2Title,
      desc: t.step2Desc,
      icon: CheckCircle2,
    },
    {
      num: "03",
      title: t.step3Title,
      desc: t.step3Desc,
      icon: Share2,
    },
    {
      num: "04",
      title: t.step4Title,
      desc: t.step4Desc,
      icon: BookmarkCheck,
    },
  ];

  const testimonials = [
    {
      quote: t.testimonial1Quote,
      author: t.testimonial1Author,
      city: t.testimonial1City,
    },
    {
      quote: t.testimonial2Quote,
      author: t.testimonial2Author,
      city: t.testimonial2City,
    },
    {
      quote: t.testimonial3Quote,
      author: t.testimonial3Author,
      city: t.testimonial3City,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#f5cbd5] selection:text-[#542331]">
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-16 md:py-24 bg-white/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <FadeContent
                effect="mist"
                duration={1.6}
                ease="power2.out"
                trigger="mount"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce5ea] text-[#b76176] text-xs font-extrabold uppercase tracking-widest">
                  <Sparkles size={13} className="text-[#d92d5c]" />
                  <span>{t.heroBadge}</span>
                </div>

                <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-5xl tracking-tight text-[#492631] leading-[1.15] mt-4">
                  {t.heroTitlePrefix}{" "}
                  <em className="italic text-[#d42b58] font-normal">
                    {t.heroTitleKeep}
                  </em>
                </h1>

                <p className="text-base sm:text-lg text-[#806c72] leading-relaxed max-w-xl mt-4">
                  {t.heroSubtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-4 pb-2">
                  <Link
                    href="/templates"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>{t.heroFindTemplate}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/memories"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-[#fbf4f6] text-[#5a3741] font-bold text-sm border border-[#f0dce1] shadow-xs transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>{t.heroYourMoments}</span>
                  </Link>
                </div>

                <p className="text-xs text-[#9b848a] pt-1">{t.heroTagline}</p>
              </FadeContent>
            </div>

            {/* Right Column: Interactive Envelope Preview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <FadeContent
                effect="mist"
                duration={1.8}
                delay={0.4}
                ease="power2.out"
                trigger="mount"
              >
                <div className="relative w-76 sm:w-84">
                  {/* Glowing background halo */}
                  <div className="absolute -inset-4 bg-radial from-[#f9d7df] via-[#fae6eb]/60 to-transparent rounded-full blur-xl -z-10 animate-pulse"></div>

                  {/* Little Ornaments */}
                  <span className="absolute -top-3 -left-3 text-[#d78f9e]">
                    <Sparkles size={24} />
                  </span>
                  <span className="absolute -bottom-2 -right-2 text-[#d78f9e]">
                    <Heart size={22} fill="currentColor" />
                  </span>

                  {/* Letter Card */}
                  <div className="bg-gradient-to-b from-white to-[#fff9fa] border border-[#f3dfe3] rounded-3xl p-7 text-center shadow-xl shadow-[#773849]/10 rotate-1 hover:rotate-0 transition-transform duration-500">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#be7383]">
                      {t.heroCardBadge}
                    </span>

                    <div className="w-28 h-28 my-5 mx-auto rounded-full bg-radial from-white via-[#fae6ea] to-white border border-[#f4cdd6] flex items-center justify-center text-[#d94a70] shadow-inner">
                      <Flower2 size={46} strokeWidth={1.2} />
                    </div>

                    <div className="w-14 h-px bg-[#dfb7c0] mx-auto my-3"></div>

                    <h2 className="font-serif font-bold text-xl text-[#57323d] mt-2 mb-1">
                      {t.heroCardTitle}
                    </h2>
                    <p className="text-xs text-[#987f85] leading-relaxed">
                      {t.heroCardDesc}
                    </p>

                    <div className="w-14 h-px bg-[#dfb7c0] mx-auto my-3"></div>

                    <span className="text-[9px] font-bold tracking-widest text-[#be7383] uppercase">
                      {t.heroCardLove}
                    </span>
                  </div>
                </div>
              </FadeContent>
            </div>
          </div>
        </section>

        {/* 4 STEPS SECTION */}
        <section className="py-16 bg-pink-50/50 border-y border-[#f8ebed]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <FadeContent
              effect="mist"
              duration={1.5}
              threshold={0.2}
              trigger="scroll"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-extrabold tracking-wider text-[#b76176] uppercase">
                    {t.stepsBadge}
                  </span>
                  <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4b2b35] mt-1">
                    {t.stepsTitle}
                  </h2>
                </div>
                <p className="text-sm text-[#88757a]">{t.stepsSubtitle}</p>
              </div>
            </FadeContent>
            <FadeContent
              effect="mist"
              duration={1.5}
              threshold={0.4}
              delay={0.1}
              trigger="scroll"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <article
                    key={step.num}
                    className="bg-white rounded-2xl border border-[#f4e6e9] p-6 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#fbe9ed] text-[#cb3159] font-extrabold text-sm flex items-center justify-center mb-4">
                      {step.num}
                    </div>
                    <div className="flex items-center gap-2 mb-1 text-[#53313c]">
                      <IconComponent size={16} className="text-[#cb3159]" />
                      <h3 className="font-bold text-base">{step.title}</h3>
                    </div>
                    <p className="text-xs text-[#8e7c81] leading-relaxed">
                      {step.desc}
                    </p>
                  </article>
                );
              })}
            </FadeContent>
          </div>
        </section>

        {/* FEATURED TEMPLATES */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <FadeContent
              effect="mist"
              duration={1.5}
              threshold={0.2}
              trigger="scroll"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-extrabold tracking-wider text-[#b76176] uppercase">
                    {t.featuredBadge}
                  </span>
                  <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4b2b35] mt-1">
                    {t.featuredTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#88757a] mt-1">
                    {t.featuredSubtitle}
                  </p>
                </div>

                <Link
                  href="/templates"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#c32c54] hover:underline"
                >
                  <span>{t.featuredBrowseAll}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.slice(0, 3).map((template) => (
                  <TemplateCard key={template.slug} template={template} />
                ))}
              </div>
            </FadeContent>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 bg-pink-50/50 border-t border-[#f4dce2]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <FadeContent
              effect="mist"
              duration={1.5}
              threshold={0.2}
              trigger="scroll"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-extrabold tracking-wider text-[#b76176] uppercase">
                    {t.testimonialsBadge}
                  </span>
                  <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#4b2b35] mt-1">
                    {t.testimonialsTitle}
                  </h2>
                </div>
                <Heart
                  size={26}
                  className="text-[#cf4165]"
                  fill="currentColor"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((item, idx) => (
                  <article
                    key={idx}
                    className="bg-white rounded-2xl border border-[#f4e6e9] p-6 shadow-xs flex flex-col justify-between"
                  >
                    <div className="text-amber-500 tracking-widest text-xs mb-3">
                      ★★★★★
                    </div>
                    <p className="text-sm text-[#6e575e] leading-relaxed italic mb-4">
                      {item.quote}
                    </p>
                    <b className="text-xs font-bold text-[#4c2c36]">
                      {item.author}, {item.city}
                    </b>
                  </article>
                ))}
              </div>
            </FadeContent>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <FadeContent
              effect="mist"
              duration={1.5}
              threshold={0.3}
              trigger="scroll"
            >
              <div className="rounded-3xl bg-gradient-to-r from-white via-[#fff4f6] to-[#fae8ec] border border-[#f4e6e9] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-extrabold tracking-wider text-[#b76176] uppercase">
                    {t.ctaBadge}
                  </span>
                  <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-[#4b2935] tracking-tight mt-2 mb-2">
                    {t.ctaTitle}
                  </h2>
                  <p className="text-sm text-[#88757a]">{t.ctaSubtitle}</p>
                </div>

                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <span>{t.ctaButton}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </FadeContent>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
