"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Upload,
  Check,
  Eye,
  Edit3,
  LoaderCircle,
  Plus,
  Trash2,
  Maximize2,
  X,
} from "lucide-react";
import {
  BirthdayRetroCamera,
  defaultBirthdayData,
  type BirthdayCardData,
} from "@/components/templates/BirthdayRetroCamera";
import { uploadCardPhoto } from "@/lib/storage";
import { savePageToFirestore } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import FadeContent from "@/components/FadeContent";
import { PhoneMockupCard } from "@/components/mockups/phone-mockup-card";

interface BirthdayCardEditorProps {
  slug: string;
}

export function BirthdayCardEditor({ slug }: BirthdayCardEditorProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [data, setData] = useState<BirthdayCardData>(defaultBirthdayData);
  const [activeTab, setActiveTab] = useState<"text" | "photos">("text");
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<"rose" | "lavender" | "gold">("gold");

  const updateField = <K extends keyof BirthdayCardData>(
    field: K,
    value: BirthdayCardData[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    target: "main" | number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const targetKey = target === "main" ? "main" : `polaroid-${target}`;
    setUploadingTarget(targetKey);
    setError("");

    try {
      // Convert to base64 for local preview (no Cloudinary upload yet)
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64URL = event.target?.result as string;
        if (target === "main") {
          updateField("mainPhotoURL", base64URL);
        } else {
          const photos = [...(data.polaroidPhotos || [])];
          photos[target] = base64URL;
          updateField("polaroidPhotos", photos);
        }
        setUploadingTarget(null);
      };
      reader.onerror = () => {
        setError(
          language === "my"
            ? "ပုံဖတ်ရာတွင် အဆင်မပြေဖြစ်သွားပါသည်၊ ပြန်လည်ကြိုးစားပေးပါ"
            : "Failed to read image. Please try again."
        );
        setUploadingTarget(null);
      };
      reader.readAsDataURL(file);
    } catch {
      setError(
        language === "my"
          ? "ပုံတင်ရာတွင် အဆင်မပြေဖြစ်သွားပါသည်၊ ပြန်လည်ကြိုးစားပေးပါ"
          : "Failed to load image. Please try again."
      );
      setUploadingTarget(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if user is authenticated
    if (!user) {
      setError(
        language === "my"
          ? "ကတ်သိမ်းဆည်းရန် ဦးစွာ ဝင်ရောက်ပါ"
          : "Please sign in to save your card."
      );
      return;
    }

    if (!data.recipientName?.trim() || !data.senderName?.trim()) {
      setError(
        language === "my"
          ? "လက်ခံမည့်သူနှင့် ပို့သူအမည်ကို ဖြည့်သွင်းပေးပါ"
          : "Please enter recipient and sender name."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload base64 images to Cloudinary
      const finalData = { ...data };

      // Upload main photo if it's base64
      if (finalData.mainPhotoURL?.startsWith("data:")) {
        const base64Data = finalData.mainPhotoURL;
        const file = dataURLtoFile(base64Data, "main-photo.jpg");
        finalData.mainPhotoURL = await uploadCardPhoto(user.uid, file);
      }

      // Upload polaroid photos if they are base64
      if (finalData.polaroidPhotos && finalData.polaroidPhotos.length > 0) {
        const uploadedPhotos = await Promise.all(
          finalData.polaroidPhotos.map(async (photo, index) => {
            if (photo?.startsWith("data:")) {
              const file = dataURLtoFile(photo, `polaroid-${index}.jpg`);
              return await uploadCardPhoto(user.uid, file);
            }
            return photo;
          })
        );
        finalData.polaroidPhotos = uploadedPhotos;
      }

      const pageSlug = `${slug}-${Date.now().toString(36)}`;
      const pageItem = {
        slug: pageSlug,
        templateSlug: slug,
        recipientName: finalData.recipientName!.trim(),
        senderName: finalData.senderName!.trim(),
        occasionDate: finalData.occasionDate || null,
        message: finalData.letterContent || "",
        theme: selectedTheme,
        birthdayData: finalData,
      };

      // Save to Firestore
      await savePageToFirestore(user.uid, pageItem);

      router.push(`/p/${pageSlug}`);
    } catch (err) {
      console.error("Error saving card:", err);
      setError(
        language === "my"
          ? "စာမျက်နှာကို သိမ်းဆည်းရာတွင် အမှားတစ်ခု ဖြစ်ပေါ်ခဲ့ပါသည်"
          : "Failed to save card. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  // Helper function to convert base64 to File
  const dataURLtoFile = (dataURL: string, filename: string): File => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f4e6e9]">
          <Link
            href={`/templates/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c32c54] hover:underline"
          >
            <ArrowLeft size={14} />
            <span>
              {language === "my"
                ? "ဒီဇိုင်းအသေးစိတ်ဆီ ပြန်သွားရန်"
                : "Back to template"}
            </span>
          </Link>

          {/* Mobile Edit / Preview Toggle */}
          <div className="flex lg:hidden items-center bg-[#fdebf0] p-1 rounded-full border border-[#f5ccd7]">
            <button
              onClick={() => setMobileView("editor")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                mobileView === "editor"
                  ? "bg-[#d92d5c] text-white shadow-xs"
                  : "text-[#77525d]"
              }`}
            >
              <Edit3 size={12} />
              <span>{language === "my" ? "ပြင်ဆင်မယ်" : "Edit"}</span>
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                mobileView === "preview"
                  ? "bg-[#d92d5c] text-white shadow-xs"
                  : "text-[#77525d]"
              }`}
            >
              <Eye size={12} />
              <span>{language === "my" ? "ကြည့်ရှုမယ်" : "Preview"}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editor Form */}
          <div
            className={`lg:col-span-6 space-y-6 ${
              mobileView === "preview" ? "hidden lg:block" : "block"
            }`}
          >
            <div className="bg-white rounded-3xl border border-[#f4e6e9] p-6 sm:p-7 shadow-xs">
              {/* Badge & Title */}
              <div className="mb-5">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#b76176]">
                  {language === "my" ? "မွေးနေ့ကတ် ဒီဇိုင်း" : "Birthday Card Customizer"}
                </span>
                <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#432a32] mt-1">
                  {language === "my" ? "ကတ် အချက်အလက်များ ပြင်ဆင်ရန်" : "Customize Your Birthday Card"}
                </h1>
                <p className="text-xs text-[#8c747b] mt-1">
                  {language === "my"
                    ? "စာသားနှင့် ဓာတ်ပုံများကို ပြောင်းလဲ၍ ညာဘက်တွင် တိုက်ရိုက် ကြည့်ရှုနိုင်ပါသည်"
                    : "Edit text and photos below. Your changes update the live preview instantly."}
                </p>
              </div>

              {/* Sub-tabs: Text vs Photos */}
              <div className="flex border-b border-[#f4e6e9] mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("text")}
                  className={`pb-2.5 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "text"
                      ? "border-[#d92d5c] text-[#d92d5c]"
                      : "border-transparent text-[#7e656d] hover:text-[#432a32]"
                  }`}
                >
                  <Edit3 size={13} />
                  <span>{language === "my" ? "စာသားများ (Text)" : "Text Content"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("photos")}
                  className={`pb-2.5 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "photos"
                      ? "border-[#d92d5c] text-[#d92d5c]"
                      : "border-transparent text-[#7e656d] hover:text-[#432a32]"
                  }`}
                >
                  <ImageIcon size={13} />
                  <span>{language === "my" ? "ဓာတ်ပုံများ (Photos)" : "Photos (7 slots)"}</span>
                </button>
              </div>

              {error && (
                <div className="p-3 mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Theme Selection - Always Visible */}
              <div className="border-t border-[#f4e6e9] py-5">
                <span className="text-xs font-bold text-[#684a54] uppercase tracking-wider block mb-2">
                  {language === "my" ? "ပါဝင်သော အရောင်ခံစားချက်များ" : "Color Theme"}
                </span>
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    onClick={() => setSelectedTheme("rose")}
                    className={`flex items-center gap-1.5 text-xs ${
                      selectedTheme === "rose" ? "text-[#d74b70] font-bold" : "text-[#79666c]"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full bg-[#d74b70] border-2 shadow-xs ${
                      selectedTheme === "rose" ? "border-[#d74b70] ring-2 ring-[#d74b70]/30" : "border-white"
                    }`}></span>
                    <span>{language === "my" ? "နှင်းဆီနီ" : "Rose"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTheme("lavender")}
                    className={`flex items-center gap-1.5 text-xs ${
                      selectedTheme === "lavender" ? "text-[#9384bd] font-bold" : "text-[#79666c]"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full bg-[#9384bd] border-2 shadow-xs ${
                      selectedTheme === "lavender" ? "border-[#9384bd] ring-2 ring-[#9384bd]/30" : "border-white"
                    }`}></span>
                    <span>{language === "my" ? "ခရမ်းနု" : "Lavender"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTheme("gold")}
                    className={`flex items-center gap-1.5 text-xs ${
                      selectedTheme === "gold" ? "text-[#c6a151] font-bold" : "text-[#79666c]"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full bg-[#c6a151] border-2 shadow-xs ${
                      selectedTheme === "gold" ? "border-[#c6a151] ring-2 ring-[#c6a151]/30" : "border-white"
                    }`}></span>
                    <span>{language === "my" ? "ရွှေရောင်" : "Gold"}</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* ─── TAB 1: TEXT ─── */}
                {activeTab === "text" && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Row: Name + Age */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-1.5">
                          {language === "my" ? "မွေးနေ့ရှင် အမည်" : "Recipient Name"} *
                        </label>
                        <input
                          type="text"
                          required
                          value={data.recipientName || ""}
                          onChange={(e) => updateField("recipientName", e.target.value)}
                          placeholder="မိုးမိုး"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-1.5">
                          {language === "my" ? "အသက် (ဂဏန်း)" : "Age"} *
                        </label>
                        <input
                          type="text"
                          required
                          value={data.age || ""}
                          onChange={(e) => updateField("age", e.target.value)}
                          placeholder="5"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm text-center font-bold focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5]"
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-1.5">
                        {language === "my" ? "ရက်စွဲ" : "Occasion Date"}
                      </label>
                      <input
                        type="text"
                        value={data.occasionDate || ""}
                        onChange={(e) => updateField("occasionDate", e.target.value)}
                        placeholder="20 · 09 · 2026"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5]"
                      />
                    </div>

                    {/* Subtitle */}
                    <div>
                      <label className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-1.5">
                        {language === "my" ? "ခေါင်းစဉ်ငယ်" : "Subtitle Greeting"}
                      </label>
                      <input
                        type="text"
                        value={data.subtitle || ""}
                        onChange={(e) => updateField("subtitle", e.target.value)}
                        placeholder="ဒီနေ့က မိုးမိုး ရဲ့ မွေး ၅ နှစ်ပြည့်မွေးနေ့ 🎉"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5]"
                      />
                    </div>

                    {/* Sticky Note Text */}
                    <div>
                      <label className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-1.5">
                        {language === "my" ? "စတစ်ကာ စာသား" : "Tape Sticky Note"}
                      </label>
                      <input
                        type="text"
                        value={data.stickyNoteText || ""}
                        onChange={(e) => updateField("stickyNoteText", e.target.value)}
                        placeholder="Today is all about you!"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5]"
                      />
                    </div>

                    {/* Letter Note Header */}
                    <div>
                      <label className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-1.5">
                        {language === "my" ? "စာလွှာ ခေါင်းစဉ်" : "Letter Note Title"}
                      </label>
                      <input
                        type="text"
                        value={data.noteHeader || ""}
                        onChange={(e) => updateField("noteHeader", e.target.value)}
                        placeholder="Happy 5th, မိုးမိုး!"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5]"
                      />
                    </div>

                    {/* Letter Body */}
                    <div>
                      <label className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-1.5">
                        {language === "my" ? "ပေးစာ အပြည့်အစုံ" : "Heartfelt Letter Content"}
                      </label>
                      <textarea
                        rows={4}
                        value={data.letterContent || ""}
                        onChange={(e) => updateField("letterContent", e.target.value)}
                        placeholder="မိုးမိုးလေးရေ... ၅ နှစ်ပြည့် မွေးနေ့မှာ အများကြီး ပျော်ပါစေနော်..."
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5] resize-y"
                      />
                    </div>

                    {/* Sender Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-1.5">
                        {language === "my" ? "ပေးပို့သူ အမည် / လက်မှတ်" : "Sender Signature"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={data.senderName || ""}
                        onChange={(e) => updateField("senderName", e.target.value)}
                        placeholder="— ဖေဖေ နဲ့ မေမေ"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5]"
                      />
                    </div>

                    {/* Closing Subtitle */}
                    <div>
                      <label className="block text-xs font-bold text-[#684a54] uppercase tracking-wider mb-1.5">
                        {language === "my" ? "အောက်ခြေ နှုတ်ခွန်းဆက် စာသား" : "Footer Blessing"}
                      </label>
                      <input
                        type="text"
                        value={data.closingSubtitle || ""}
                        onChange={(e) => updateField("closingSubtitle", e.target.value)}
                        placeholder="မိုးမိုး ကြီးကြီးလာလေ ပိုချစ်စရာကောင်းလေပဲ 💕"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-[#ead8de] bg-[#fffcfc] text-[#50323d] text-sm focus:outline-none focus:border-[#d95776] focus:ring-3 focus:ring-[#f8dfe5]"
                      />
                    </div>
                  </div>
                )}

                {/* ─── TAB 2: PHOTOS ─── */}
                {activeTab === "photos" && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Main Camera Photo */}
                    <div className="p-4 rounded-2xl bg-[#fff9fa] border border-[#f6d7df] space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <b className="text-xs font-extrabold text-[#532e3a] uppercase tracking-wider block">
                            {language === "my" ? "၁။ ကင်မရာထဲက ပင်မဓာတ်ပုံ" : "1. Main Camera Screen Photo"}
                          </b>
                          <span className="text-[11px] text-[#937880]">
                            {language === "my"
                              ? "ပူဖောင်းများ ဖောက်ပြီးပါက ပေါ်လာမည့် ပုံဖြစ်ပါသည်"
                              : "Revealed when the recipient pops balloons"}
                          </span>
                        </div>
                        {uploadingTarget === "main" && (
                          <LoaderCircle size={16} className="animate-spin text-[#d92d5c]" />
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Preview */}
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-neutral-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={data.mainPhotoURL}
                            alt="Main photo"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Upload Controls */}
                        <div className="flex-1 space-y-2">
                          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#f0dce1] hover:border-[#d92d5c] text-xs font-bold text-[#56333f] cursor-pointer shadow-2xs hover:bg-[#fff7f9] transition-all">
                            <Upload size={13} className="text-[#d92d5c]" />
                            <span>
                              {uploadingTarget === "main"
                                ? (language === "my" ? "တင်နေပါသည်..." : "Uploading...")
                                : (language === "my" ? "ပုံအသစ် တင်မယ်" : "Upload Photo")}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, "main")}
                            />
                          </label>
                          <input
                            type="text"
                            value={data.mainPhotoURL || ""}
                            onChange={(e) => updateField("mainPhotoURL", e.target.value)}
                            placeholder="https://..."
                            className="w-full px-3 py-1.5 rounded-xl border border-[#ead8de] bg-white text-xs text-[#50323d] focus:outline-none focus:border-[#d95776]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Polaroid Gallery Grid (6 slots) */}
                    <div className="space-y-3">
                      <div>
                        <b className="text-xs font-extrabold text-[#532e3a] uppercase tracking-wider block">
                          {language === "my" ? "၂။ အမှတ်တရ ပိုလာရွိုက် ဓာတ်ပုံများ (၆ ပုံ)" : "2. Polaroid Memories (6 Photos)"}
                        </b>
                        <span className="text-[11px] text-[#937880]">
                          {language === "my"
                            ? "ပိုလာရွိုက်ကတ်ပြားငယ်တစ်ခုချင်းစီအတွက် ပုံများကို ပြောင်းလဲနိုင်ပါသည်"
                            : "Click any slot to upload or replace photos"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Array.from({ length: 6 }).map((_, idx) => {
                          const photo = data.polaroidPhotos?.[idx];
                          const isUploading = uploadingTarget === `polaroid-${idx}`;
                          return (
                            <div
                              key={idx}
                              className="p-2.5 rounded-2xl bg-[#fffcfc] border border-[#f2dde3] text-center space-y-2 shadow-2xs group hover:border-[#d92d5c] transition-all"
                            >
                              <div className="w-full aspect-square rounded-xl overflow-hidden bg-neutral-100 relative shadow-inner">
                                {photo ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={photo}
                                    alt={`Polaroid ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <Camera size={22} />
                                  </div>
                                )}
                                {isUploading && (
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <LoaderCircle size={20} className="animate-spin text-white" />
                                  </div>
                                )}
                              </div>

                              <label className="block w-full py-1.5 px-2 bg-white rounded-lg border border-[#f0dce1] text-[11px] font-bold text-[#623f4b] hover:bg-[#fff0f4] hover:text-[#d92d5c] cursor-pointer transition-colors">
                                <span>{isUploading ? "..." : (language === "my" ? `ပုံ ${idx + 1} ပြောင်းရန်` : `Change #${idx + 1}`)}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(e, idx)}
                                />
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit CTA */}
                <div className="pt-4 border-t border-[#f4e6e9]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#d92d5c] to-[#b51c47] hover:from-[#c2214f] hover:to-[#9c133a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" />
                        <span>{language === "my" ? "သိမ်းဆည်းနေပါသည်..." : "Creating page..."}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>{language === "my" ? "ပြီးပါပြီ · ကတ်ကို ထုတ်ယူမယ်" : "Save & Generate Card"}</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Live Interactive Card Preview */}
          <div
            className={`lg:col-span-6 sticky top-10 ${
              mobileView === "editor" ? "hidden lg:block" : "block"
            }`}
          >
            <div className="flex items-center justify-between mb-2.5 px-1 max-w-md mx-auto">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#b76176] inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {language === "my" ? "တိုက်ရိုက် အစမ်းကြည့်ရှုခြင်း" : "Live Preview"}
              </span>

              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#fff0f4] text-[#d92d5c] border border-[#f3ccd7] text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                title="View Fullscreen"
              >
                <Maximize2 size={12} />
                <span>{language === "my" ? "မျက်နှာပြင်ပြည့် ကြည့်မယ်" : "Full Screen"}</span>
              </button>
            </div>

            {/* Opensource UI Phone Mockup Card */}
            <div className="flex justify-center pt-2">
              <PhoneMockupCard
                variant="titanium"
                showDynamicIsland={true}
                className="w-[310px] sm:w-[330px]"
              >
                <BirthdayRetroCamera data={data} mode="editor-preview" theme={selectedTheme} />
              </PhoneMockupCard>
            </div>
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
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
        >
          {/* Header */}
          <div className="w-full max-w-md flex items-center justify-between pb-3 px-2 text-white">
            <span className="text-xs font-bold tracking-wider uppercase opacity-85">
              {language === "my" ? "မျက်နှာပြင်ပြည့် အစမ်းကြည့်ရှုခြင်း" : "Full Screen Live Preview"}
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
            className="w-full max-w-md h-[92vh] bg-[#faf5ee] rounded-[36px] border-4 border-[#3c2a31] shadow-2xl overflow-y-auto overscroll-contain relative"
          >
            <BirthdayRetroCamera
              data={data}
              mode="editor-preview"
              theme={selectedTheme}
              onBackClick={() => setIsFullscreen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
