"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Trash2, RotateCcw, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import FadeContent from "@/components/FadeContent";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { getUserTrash, restoreFromTrash, permanentlyDeleteFromTrash, type PageData } from "@/lib/firestore";
import {
  BirthdayRetroCamera,
  defaultBirthdayData,
  type BirthdayCardData,
} from "@/components/templates/BirthdayRetroCamera";
import SwipeToast from "@/components/SwipeToast";

type TrashItem = PageData & {
  deletedAt: any;
  expiresAt: any;
};

export default function TrashPage() {
  const { t, language } = useLanguage();
  const { user, loading } = useAuth();
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<{ id: number; type: 'success' | 'error'; title: string; description?: string }[]>([]);

  useEffect(() => {
    const fetchTrash = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const items = await getUserTrash(user.uid);
        setTrashItems(items as TrashItem[]);
      } catch (err) {
        console.error("Error fetching trash:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrash();
  }, [user]);

  const handleRestore = async (slug: string) => {
    // Find the item to restore
    const itemToRestore = trashItems.find(item => item.slug === slug);
    if (!itemToRestore) return;

    // Optimistic: remove from UI immediately
    setTrashItems((prev) => prev.filter((item) => item.slug !== slug));

    // Show toast
    setToasts(t => [...t, {
      id: Date.now(),
      type: 'success',
      title: language === 'my' ? 'ကတ်ကို ပြန်လည်ရယူပြီးပါပြီ' : 'Card restored',
      description: language === 'my' ? 'မှတ်များသို့ ပြန်သွားပြီးပါပြီ' : 'Moved back to memories'
    }]);

    // Run restore in background
    try {
      await restoreFromTrash(slug);
    } catch (err) {
      console.error("Error restoring card:", err);
      // Restore the item in UI since restore failed
      setTrashItems((prev) => [...prev, itemToRestore]);
      setToasts(t => [...t, {
        id: Date.now(),
        type: 'error',
        title: language === 'my' ? 'ပြန်လည်ရယူရာတွင် အမှားဖြစ်ပါသည်' : 'Failed to restore card',
        description: ''
      }]);
    }
  };

  const handleDelete = async (slug: string) => {
    // Find the item to delete
    const itemToDelete = trashItems.find(item => item.slug === slug);
    if (!itemToDelete) return;

    // Optimistic: remove from UI immediately
    setTrashItems((prev) => prev.filter((item) => item.slug !== slug));

    // Show toast
    setToasts(t => [...t, {
      id: Date.now(),
      type: 'error',
      title: language === 'my' ? 'အမြဲစွာ ဖျက်ပြီးပါပြီ' : 'Permanently deleted',
      description: language === 'my' ? 'မပြန်လည်ရယူနိုင်ပါ' : 'This cannot be recovered'
    }]);

    // Run delete in background
    try {
      await permanentlyDeleteFromTrash(slug);
    } catch (err) {
      console.error("Error deleting card:", err);
      // Restore the item in UI since delete failed
      setTrashItems((prev) => [...prev, itemToDelete]);
      setToasts(t => [...t, {
        id: Date.now(),
        type: 'error',
        title: language === 'my' ? 'ဖျက်ရာတွင် အမှားဖြစ်ပါသည်' : 'Failed to delete',
        description: ''
      }]);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#fbe8ed] text-[#d92d5c] flex items-center justify-center mx-auto mb-4 animate-spin">
            <span className="text-2xl">⏳</span>
          </div>
          <p className="text-sm text-[#8e7c81]">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white rounded-3xl border border-[#f4e6e9] p-8 text-center max-w-md w-full shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-[#fbe8ed] text-[#d2355c] flex items-center justify-center mx-auto mb-4">
            <Trash2 size={26} />
          </div>
          <h1 className="font-serif font-extrabold text-2xl text-[#512b38]">
            {language === "my"
              ? "အကောင့်ဝင်ရန် လိုအပ်ပါသည်"
              : "Sign in required"}
          </h1>
          <p className="text-xs text-[#8e7c81] mt-2 mb-6 leading-relaxed">
            {language === "my"
              ? "ဖျက်ခဲ့ထားထားသော ကတ်များကို ကြည့်ရှုရန် ဦးစွာ ဝင်ရောက်ပါ"
              : "Please sign in to view your deleted cards."}
          </p>
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-xs shadow-sm transition-all"
          >
            <span>{language === "my" ? "ဝင်ရောက်မည်" : "Sign in"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
        {/* Header Section */}
        <FadeContent effect="mist" duration={1.6} trigger="mount">
          <div className="flex items-center gap-4">
            <Link
              href="/memories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7a5963] bg-white/80 px-3.5 py-1.5 rounded-full border border-[#f0dce1] shadow-2xs transition-all"
            >
              <ArrowLeft size={13} />
              <span>{language === 'my' ? 'မှတ်များသို့' : 'Back to Memories'}</span>
            </Link>
          </div>
          <div className="mt-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#b76176]">
              {language === 'my' ? 'ဖျက်ခဲ့ထား' : 'TRASH'}
            </span>
            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-[#432a32] tracking-tight mt-1">
              {language === 'my' ? 'ဖျက်ခဲ့ထားထားသော ကတ်များများ' : 'Deleted Cards'}
            </h1>
            <p className="text-sm text-[#88757a] mt-2">
              {language === 'my' 
                ? 'ဖျက်ခဲ့ထားထားသော ကတ်များများကို ၃၀ ရက်အတွင်း ပြန်လည်ရယူနိုင်ပါသည်' 
                : 'Deleted cards are kept for 30 days before permanent deletion'}
            </p>
          </div>
        </FadeContent>

        {/* Trash Items */}
        <FadeContent effect="mist" duration={1.6} delay={0.4} trigger="mount">
          <section className="bg-white rounded-3xl border border-[#f4e6e9] p-6 sm:p-8 shadow-sm">
            {isLoading ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#fbe8ed] text-[#d2355c] flex items-center justify-center mx-auto mb-4 animate-spin">
                  <Trash2 size={24} />
                </div>
                <p className="text-xs text-[#8e7c81]">Loading trash...</p>
              </div>
            ) : trashItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#fbe8ed] text-[#d2355c] flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={24} />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#53313c]">
                  {language === 'my' ? 'ဖျက်ခဲ့ထားမည်' : 'Trash is empty'}
                </h3>
                <p className="text-xs text-[#8e7c81] max-w-xs mx-auto mt-1 mb-5">
                  {language === 'my' 
                    ? 'လက်ခံထားသော ကတ်များမရှိပါ' 
                    : 'No deleted cards found'}
                </p>
                <Link
                  href="/memories"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-xs shadow-xs"
                >
                  <span>{language === 'my' ? 'မှတ်များသို့ ပြန်သွားမယ်' : 'Back to Memories'}</span>
                  <ArrowLeft size={14} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {trashItems.map((item, index) => (
                  <div
                    key={`${item.slug}-${index}`}
                    className="group relative rounded-3xl border border-[#f4e6e9] bg-white p-4 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                  >
                    {/* Card Preview */}
                    <div className="aspect-4/3 scale-[2.25] translate-y-12 rounded-2xl overflow-hidden bg-linear-to-b mb-4 relative">
                      {item.templateSlug === "soft-confetti" ||
                      item.birthdayData ? (
                        <div className="w-full h-full transform scale-50 origin-top">
                          <BirthdayRetroCamera
                            data={
                              item.birthdayData || {
                                ...defaultBirthdayData,
                                recipientName: item.recipientName,
                                senderName: item.senderName.startsWith("—")
                                  ? item.senderName
                                  : `— ${item.senderName}`,
                                occasionDate:
                                  item.occasionDate ||
                                  defaultBirthdayData.occasionDate,
                                letterContent:
                                  item.message ||
                                  defaultBirthdayData.letterContent,
                              }
                            }
                            mode="editor-preview"
                            theme={item.theme as "rose" | "lavender" | "gold"}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#f8f6fd] to-[#f0edf9]">
                          <span className="text-6xl">💝</span>
                        </div>
                      )}
                    </div>

                    <div className="h-20"></div>

                    <div className="absolute top-0 right-0 p-4 z-10">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRestore(item.slug)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-sm"
                        >
                          <RotateCcw size={12} />
                          <span>{language === 'my' ? 'ပြန်ရယူ' : 'Restore'}</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item.slug)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors shadow-sm"
                        >
                          <Trash2 size={12} />
                          <span>{language === 'my' ? 'အမြဲစွာဖျက်' : 'Delete'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="absolute inset-0 z-5 bg-linear-to-t from-white via-white/50 from-5% via-60% to-80% flex flex-col justify-end p-4">
                      {/* Card Info */}
                      <div className="space-y-1 z-10 relative">
                        <h3 className="font-serif font-bold text-lg text-[#56343e] truncate">
                          {language === "my"
                            ? `${item.recipientName} အတွက်`
                            : `For ${item.recipientName}`}
                        </h3>
                        <p className="text-[11px] text-[#99848a] truncate">
                          {language === "my"
                            ? `${item.senderName} မှ`
                            : `From ${item.senderName}`}
                        </p>
                        <p className="text-[10px] text-[#9b848a]">
                          {language === 'my' ? 'ဖျက်ခဲ့ထားသည့်ရက်: ' : 'Deleted: '}
                          {item.deletedAt?.toDate ? new Date(item.deletedAt.toDate()).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </FadeContent>
      </main>

      <Footer />

      {/* Toast Notifications */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, zIndex: 9999 }}>
        {toasts.map(t => (
          <SwipeToast
            key={t.id}
            inline
            title={t.title}
            description={t.description}
            duration={4000}
            onClose={() => setToasts(s => s.filter(x => x.id !== t.id))}
            background="#f5f5f5"
            color="#d52c5a"
            fuseColor="#d52c5a"
            width={356}
            radius={12}
            slideMs={400}
            settleBounce={0.2}
            swipeDistance={40}
            fuse="bottom"
            closeButton
          />
        ))}
      </div>
    </div>
  );
}
