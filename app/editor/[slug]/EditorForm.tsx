"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { IconFor } from "@/components/IconFor";
import FadeContent from "@/components/FadeContent";
import { templates, type Theme } from "@/lib/templates";
import { useLanguage } from "@/context/LanguageContext";

interface CelebrationPageInput {
  templateSlug: string;
  recipientName: string;
  senderName: string;
  occasionDate: string | null;
  message: string;
  theme: Theme;
}

export default function EditorForm({ slug }: { slug: string }) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const template = templates.find((t) => t.slug === slug) ?? templates[0];

  const [form, setForm] = useState<CelebrationPageInput>({
    templateSlug: template.slug,
    recipientName: "",
    senderName: "",
    occasionDate: null,
    message: "",
    theme: template.theme,
  });
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const update = <K extends keyof CelebrationPageInput>(
    key: K,
    value: CelebrationPageInput[K]
  ) => setForm((old) => ({ ...old, [key]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!form.recipientName.trim() || !form.senderName.trim()) {
      setError(t.editorErrorNames);
      return;
    }

    setIsPending(true);

    const pageSlug = `${template.slug}-${Date.now().toString(36)}`;
    const page = {
      slug: pageSlug,
      templateSlug: template.slug,
      recipientName: form.recipientName.trim(),
      senderName: form.senderName.trim(),
      occasionDate: form.occasionDate,
      message: form.message.trim(),
      theme: form.theme,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("sweetmemos-pages") ||
        localStorage.getItem("sweetmoment-pages") ||
        "[]"
      );
      localStorage.setItem(
        "sweetmemos-pages",
        JSON.stringify([page, ...existing])
      );
      router.push(`/p/${pageSlug}`);
    } catch {
      setError(t.editorErrorSave);
      setIsPending(false);
    }
  };

  const previewTheme =
    form.theme === "lavender"
      ? "from-[#fbf9ff] to-[#eae4f5]"
      : form.theme === "gold"
      ? "from-[#fffcf4] to-[#f3e8ce]"
      : "from-[#fff9fa] to-[#f6dfe4]";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Back Link */}
        <FadeContent effect="fade" duration={1.2} trigger="mount">
          <div className="mb-6">
            <Link
              href={`/templates/${template.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c32c54] hover:underline"
            >
              <ArrowLeft size={15} />
              <span>
                {t.editorBackTo} {template.title}
              </span>
            </Link>
          </div>
        </FadeContent>

        {/* Section Head */}
        <FadeContent effect="mist" duration={1.5} trigger="mount">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#b76176]">
                {t.editorHeaderBadge}
              </span>
              <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-[#432a32] tracking-tight mt-1">
                {t.editorHeaderTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[#88757a] mt-1">
                {t.editorHeaderSubtitle}
              </p>
            </div>
            <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[#fbebef] text-[#ba5870] text-xs font-bold">
              {t.editorStep}
            </span>
          </div>
        </FadeContent>

        {/* Form + Live Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Panel */}
          <div className="lg:col-span-7">
            <FadeContent effect="mist" duration={1.6} delay={0.4} trigger="mount">
              <form
                onSubmit={submit}
                className="bg-white rounded-3xl border border-[#f4e6e9] p-6 sm:p-8 shadow-sm space-y-5"
              >
                {/* Template Header Badge */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#fff9fa] border border-[#fae6ea]">
                  <div className="w-10 h-10 rounded-xl bg-[#fbe8ed] text-[#cb3159] flex items-center justify-center shrink-0">
                    <IconFor icon={template.icon} size={20} />
                  </div>
                  <div>
                    <b className="text-sm font-bold text-[#56323e] block">
                      {template.title}
                    </b>
                    <span className="text-xs text-[#99848a]">
                      {template.category}
                    </span>
                  </div>
                </div>

                {/* Recipient */}
                <div>
                  <label
                    htmlFor="recipient"
                    className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-2"
                  >
                    {t.editorForWhomLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="recipient"
                    type="text"
                    maxLength={100}
                    required
                    value={form.recipientName}
                    onChange={(e) => update("recipientName", e.target.value)}
                    placeholder={t.editorForWhomPlaceholder}
                    className="w-full px-4 py-3 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5] transition-all"
                  />
                </div>

                {/* Sender */}
                <div>
                  <label
                    htmlFor="sender"
                    className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-2"
                  >
                    {t.editorSenderLabel} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="sender"
                    type="text"
                    maxLength={100}
                    required
                    value={form.senderName}
                    onChange={(e) => update("senderName", e.target.value)}
                    placeholder={t.editorSenderPlaceholder}
                    className="w-full px-4 py-3 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5] transition-all"
                  />
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-2"
                  >
                    {t.editorDateLabel}{" "}
                    <span className="text-[#99848a] font-normal lowercase">
                      {t.editorDateOptional}
                    </span>
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={form.occasionDate ?? ""}
                    onChange={(e) =>
                      setForm((old) => ({
                        ...old,
                        occasionDate: e.target.value || null,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-[#684a54] uppercase tracking-wider"
                    >
                      {t.editorMessageLabel}{" "}
                      <span className="text-[#99848a] font-normal lowercase">
                        {t.editorMessageOptional}
                      </span>
                    </label>
                    <span className="text-[11px] text-[#99848a]">
                      {form.message.length} / 1500
                    </span>
                  </div>
                  <textarea
                    id="message"
                    maxLength={1500}
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder={t.editorMessagePlaceholder}
                    className="w-full px-4 py-3 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5] transition-all resize-y"
                  />
                </div>

                {/* Theme Selector */}
                <div>
                  <label
                    htmlFor="theme"
                    className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-2"
                  >
                    {t.editorThemeLabel}
                  </label>
                  <select
                    id="theme"
                    value={form.theme}
                    onChange={(e) => update("theme", e.target.value as Theme)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5] transition-all cursor-pointer"
                  >
                    <option value="rose">{t.editorThemeRose}</option>
                    <option value="lavender">{t.editorThemeLavender}</option>
                    <option value="gold">{t.editorThemeGold}</option>
                  </select>
                </div>

                {/* Error Message */}
                {error && (
                  <p
                    role="alert"
                    className="text-xs font-semibold text-[#b52d4d] bg-[#fdf2f4] p-3 rounded-xl border border-[#f9d6de]"
                  >
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" />
                        <span>{t.editorSubmitting}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.editorSubmitButton}</span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-[#9b858b] text-center mt-2.5">
                    {t.editorReadyInstant}
                  </p>
                </div>
              </form>
            </FadeContent>
          </div>

          {/* Live Preview Panel */}
          <aside className="lg:col-span-5 sticky top-24">
            <FadeContent effect="mist" duration={1.6} delay={0.4} trigger="mount" className="space-y-3">
              <div
                className={`rounded-3xl bg-gradient-to-b ${previewTheme} border border-[#f4e6e9] p-8 text-center shadow-lg transition-colors duration-300 min-h-[460px] flex flex-col items-center justify-center`}
              >
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#be7383]">
                  {language === "my" ? t.editorPreviewTitle : `${t.editorPreviewTitle} ${form.recipientName.trim() || t.editorPreviewSomeone}`}
                </span>

                <div className="w-20 h-20 rounded-full bg-white/80 border border-[#f3dfe3] text-[#d94a70] flex items-center justify-center my-4 shadow-sm">
                  <IconFor icon={template.icon} size={36} />
                </div>

                <h2 className="font-serif font-bold text-2xl text-[#55313d] break-words max-w-[280px]">
                  {form.recipientName.trim() || (language === "my" ? "ချစ်ခင်ရသူ တစ်ဦး" : "Someone wonderful")}
                </h2>

                <span className="text-xs text-[#8e7c81] mt-1">
                  {language === "my"
                    ? `${form.senderName.trim() || "ချစ်ခင်သူ"} ${t.editorPreviewFrom}`
                    : `${t.editorPreviewFrom} ${form.senderName.trim() || t.editorPreviewSomeone}`}
                </span>

                {form.occasionDate && (
                  <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-white/70 text-[#9b7582] text-[11px] font-semibold">
                    <CalendarDays size={12} />
                    <span>{new Date(form.occasionDate).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="w-14 h-px bg-[#dfb7c0] my-4"></div>

                <p className="text-xs text-[#79646b] leading-relaxed max-w-[260px] italic">
                  {form.message.trim() ||
                    (language === "my"
                      ? "“ဒီနေရာလေးမှာ သင့်ရဲ့ လှပတဲ့ ဆုမွန်ကောင်းစကားလေးတွေ ပေါ်လာပါမယ်…”"
                      : "“Your heartfelt message will appear here in their keepsake…”")}
                </p>

                <div className="w-14 h-px bg-[#dfb7c0] my-4"></div>

                <span className="text-[10px] font-bold text-[#b55870] tracking-wider uppercase">
                  {t.designWithLove}
                </span>
              </div>
            </FadeContent>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
