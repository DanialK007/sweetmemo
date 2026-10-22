"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  BookmarkCheck,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import FadeContent from "@/components/FadeContent";

export default function SignInClient() {
  const { user, signInWithGoogle, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/today";

  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already signed in, provide a direct shortcut
  if (!loading && user) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <FadeContent effect="mist" duration={1.6} trigger="mount">
            <div className="bg-white rounded-3xl border border-[#f4e6e9] p-8 sm:p-10 text-center max-w-md w-full shadow-lg space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#fbe8ed] text-[#cb3159] flex items-center justify-center mx-auto shadow-sm">
                <Heart size={28} fill="currentColor" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#be7383]">
                  {t.signInAlreadyBadge}
                </span>
                <h1 className="font-serif font-extrabold text-2xl text-[#4b2935] mt-1">
                  {t.signInAlreadyTitle} {user.displayName || "friend"}!
                </h1>
                <p className="text-xs text-[#8e7c81] mt-2">
                  {user.email} {t.signInAlreadyDesc}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => router.push(redirectUrl)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-xs shadow-md transition-all duration-200 cursor-pointer"
                >
                  <span>{t.signInAlreadyContinue}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </FadeContent>
        </main>
        <Footer />
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setSigningIn(true);
      await signInWithGoogle();
      router.push(redirectUrl);
    } catch (err: unknown) {
      setSigningIn(false);
      const errorObj = err as { code?: string; message?: string };
      if (
        errorObj.code === "auth/popup-closed-by-user" ||
        errorObj.code === "auth/cancelled-popup-request"
      ) {
        return;
      }
      if (errorObj.code === "auth/unauthorized-domain") {
        setError(
          "This domain is not yet authorized in Firebase. Please check Firebase Console > Authentication > Settings > Authorized Domains."
        );
      } else {
        setError(
          errorObj.message || "Failed to sign in with Google. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <FadeContent effect="mist" duration={1.6} trigger="mount">
          <div className="w-full max-w-md mx-auto">
            {/* Card Container */}
            <div className="bg-white rounded-[32px] border border-[#f4e6e9] p-8 sm:p-10 shadow-xl shadow-[#773849]/5 text-center relative overflow-hidden">
              {/* Decorative top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-[#d92d5c] to-transparent rounded-full"></div>

              {/* Heart Badge */}
              <div className="w-14 h-14 rounded-2xl bg-[#fbe8ed] text-[#cb3159] flex items-center justify-center mx-auto mb-5 shadow-xs">
                <Heart size={26} fill="currentColor" />
              </div>

              {/* Headings */}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#be7383]">
                <Sparkles size={12} className="text-[#d92d5c]" />
                <span>{t.signInWelcomeBadge}</span>
              </span>

              <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#492631] tracking-tight mt-1 mb-2">
                {t.signInTitle}
              </h1>

              <p className="text-xs sm:text-sm text-[#88757a] leading-relaxed max-w-xs mx-auto mb-8">
                {t.signInSubtitle}
              </p>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-3.5 rounded-2xl bg-[#fdf2f4] border border-[#f9d6de] text-left flex items-start gap-2.5 text-xs text-[#a32846]">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              {/* Google Sign In Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={signingIn}
                className="w-full inline-flex items-center justify-center gap-3.5 py-3.5 px-6 rounded-full bg-white hover:bg-[#fff9fa] text-[#4b2935] font-bold text-sm border-2 border-[#eed6dc] hover:border-[#d92d5c] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {signingIn ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin text-[#d92d5c]"
                    />
                    <span>{t.signInConnecting}</span>
                  </>
                ) : (
                  <>
                    {/* Official Google G Icon */}
                    <svg
                      className="w-5 h-5 shrink-0 group-hover:scale-105 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{t.signInWithGoogle}</span>
                  </>
                )}
              </button>

              {/* Security info */}
              <div className="pt-6 mt-6 border-t border-[#f4e6e9] space-y-2.5 text-left">
                <div className="flex items-center gap-2 text-[11px] text-[#7d686f]">
                  <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                  <span>{t.signInBenefit1}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#7d686f]">
                  <BookmarkCheck
                    size={14}
                    className="text-[#d92d5c] shrink-0"
                  />
                  <span>{t.signInBenefit2}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#7d686f]">
                  <Smartphone size={14} className="text-[#c6a151] shrink-0" />
                  <span>{t.signInBenefit3}</span>
                </div>
              </div>
            </div>

            {/* Back to browsing link */}
            <p className="text-xs text-[#9b858b] text-center mt-5">
              {t.signInJustBrowsing}{" "}
              <Link
                href="/templates"
                className="font-bold text-[#c32c54] hover:underline"
              >
                {t.signInBrowseTemplates}
              </Link>
            </p>
          </div>
        </FadeContent>
      </main>

      <Footer />
    </div>
  );
}
