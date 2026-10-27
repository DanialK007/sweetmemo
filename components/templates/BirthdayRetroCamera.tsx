"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Check, Maximize2 } from "lucide-react";
import {
  FadeIn,
  SlideUp,
  ZoomIn,
  PopUp,
  SlideLeft,
  SlideRight,
  Bounce,
} from "@/components/ui/reveal";

export interface BirthdayCardData {
  occasionDate?: string;
  recipientName?: string;
  age?: string | number;
  subtitle?: string;
  stickyNoteText?: string;
  cameraHint?: string;
  cameraSectionTitle?: string;
  cameraSectionDesc?: string;
  mainPhotoURL?: string;
  galleryTitle?: string;
  polaroidPhotos?: string[];
  noteHeader?: string;
  letterContent?: string;
  senderName?: string;
  closingTitle?: string;
  closingSubtitle?: string;
}

export const defaultBirthdayData: BirthdayCardData = {
  occasionDate: "30 · 09 · 2026",
  recipientName: "မိုးမိုး",
  age: "5",
  subtitle: "ဒီနေ့က မိုးမိုး ရဲ့ နေ့! ၅ နှစ်ပြည့်ပြီနော် 🎉",
  stickyNoteText: "Today is all about you!",
  cameraHint: "ကင်မရာထဲက ပူဖောင်းလေးတွေ ဖောက်ကြည့်ရအောင် ↓",
  cameraSectionTitle: "ကင်မရာထဲမှာ ပုံလေးတွေ ပုန်းနေတယ်",
  cameraSectionDesc:
    "ပူဖောင်းကို နှိပ်ပြီး ဖောက်လိုက်။ သုံးလုံး ပေါက်ရင် ပုံလေး ပေါ်လာမယ်။",
  mainPhotoURL:
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=700&q=80",
  galleryTitle: "Yay! ၅ နှစ် ပြည့်ပြီ",
  polaroidPhotos: [
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=500&q=80",
  ],
  noteHeader: "Happy 5th, မိုးမိုး!",
  letterContent: `မိုးမိုးလေးရေ… ၅ နှစ်ပြည့် မွေးနေ့မှာ အများကြီး ပျော်ပါစေနော် 🎈\n\nကျန်းကျန်းမာမာနဲ့ အမြဲ ရယ်နေပါစေ။ မေမေနဲ့ ဖေဖေက မိုးမိုးကို ကမ္ဘာ့အကြီးဆုံး ပူဖောင်းထက်တောင် ပိုချစ်တယ်။`,
  senderName: "— မေမေ နဲ့ ဖေဖေ",
  closingTitle: "Happy Birthday!",
  closingSubtitle: "မိုးမိုး ကြီးကြီးလာလေ ပိုချစ်စရာကောင်းလေပဲ 💕",
};

// Web Audio synthesizer pop sound
function playPopSound() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.11);
  } catch {
    /* ignore */
  }
}

interface BirthdayRetroCameraProps {
  data?: BirthdayCardData;
  mode?: "preview" | "public" | "editor-preview";
  onBackClick?: () => void;
  shareURL?: string;
  theme?: "rose" | "lavender" | "gold";
}

export function BirthdayRetroCamera({
  data: customData,
  mode = "public",
  onBackClick,
  shareURL,
  theme = "gold",
}: BirthdayRetroCameraProps) {
  const data = { ...defaultBirthdayData, ...customData };
  const photos =
    data.polaroidPhotos && data.polaroidPhotos.length > 0
      ? data.polaroidPhotos
      : defaultBirthdayData.polaroidPhotos!;

  // Theme color palettes
  const themeColors = {
    rose: {
      primary: "#e91e63",
      secondary: "#ff4081",
      tertiary: "#f48fb1",
      quaternary: "#f8bbd0",
      quinary: "#fce4ec",
      accent: "#c2185b",
      muted: "#ad1457",
      accent2: "#ec407a",
      bg: "#fff0f5",
      bgLight: "#ffe4e8",
      text: "#880e4f",
      border: "#e99bb5c7",
    },
    lavender: {
      primary: "#c77dff",
      secondary: "#ffd60a",
      tertiary: "#4cc9f0",
      quaternary: "#a7f3d0",
      quinary: "#f472b6",
      accent: "#9333ea",
      muted: "#a855f7",
      accent2: "#10b981",
      bg: "#f8f6fd",
      bgLight: "#f0edf9",
      text: "#2d2a35",
      border: "#d8c4e0",
    },
    gold: {
      primary: "#f59e0b",
      secondary: "#fbbf24",
      tertiary: "#fcd34d",
      quaternary: "#fde68a",
      quinary: "#fef3c7",
      accent: "#d97706",
      muted: "#f97316",
      accent2: "#84cc16",
      bg: "#fffdf6",
      bgLight: "#fff7e0",
      text: "#2d2820",
      border: "#f0d6a0",
    },
  };

  const colors = themeColors[theme];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  // Independent reveal state for each of the photos (initially all hidden/unrevealed)
  const [revealedPhotos, setRevealedPhotos] = useState<boolean[]>(() =>
    Array(Math.max(6, photos.length)).fill(false),
  );
  // Track popped balloon IDs per photo index
  const [photoBalloonsPopped, setPhotoBalloonsPopped] = useState<
    Record<number, number[]>
  >({});
  // Track 7-point comic burst POP! effects
  const [popEffects, setPopEffects] = useState<
    { id: string; top: string; left: string; color: string }[]
  >([]);
  const [releaseCount, setReleaseCount] = useState(0);
  const [copied, setCopied] = useState(false);

  // 28 Upward flying balloons clustered in close group release intervals (0.0s to 1.62s)
  const flyingBalloons = [
    { x: "6%", s: "48px", d: "12.2s", dl: "0.00s", color: colors.primary },
    { x: "34%", s: "58px", d: "12.8s", dl: "0.06s", color: colors.secondary },
    { x: "74%", s: "66px", d: "13.1s", dl: "0.12s", color: colors.tertiary },
    { x: "18%", s: "52px", d: "12.0s", dl: "0.18s", color: colors.quaternary },
    { x: "58%", s: "62px", d: "12.9s", dl: "0.24s", color: colors.quinary },
    { x: "86%", s: "54px", d: "13.4s", dl: "0.30s", color: colors.muted },
    { x: "12%", s: "70px", d: "12.4s", dl: "0.36s", color: colors.accent },
    { x: "46%", s: "46px", d: "13.5s", dl: "0.42s", color: colors.accent2 },
    { x: "80%", s: "64px", d: "12.3s", dl: "0.48s", color: colors.secondary },
    { x: "26%", s: "50px", d: "12.7s", dl: "0.54s", color: colors.tertiary },
    { x: "68%", s: "58px", d: "12.1s", dl: "0.60s", color: colors.quaternary },
    { x: "16%", s: "60px", d: "13.0s", dl: "0.66s", color: colors.quinary },
    { x: "52%", s: "54px", d: "13.3s", dl: "0.72s", color: colors.primary },
    { x: "90%", s: "50px", d: "12.0s", dl: "0.78s", color: colors.muted },
    { x: "4%", s: "66px", d: "13.6s", dl: "0.84s", color: colors.secondary },
    { x: "40%", s: "46px", d: "12.6s", dl: "0.90s", color: colors.tertiary },
    { x: "76%", s: "68px", d: "13.2s", dl: "0.96s", color: colors.accent },
    { x: "22%", s: "56px", d: "12.2s", dl: "1.02s", color: colors.accent2 },
    { x: "64%", s: "62px", d: "12.8s", dl: "1.08s", color: colors.quinary },
    { x: "10%", s: "50px", d: "13.4s", dl: "1.14s", color: colors.primary },
    { x: "50%", s: "60px", d: "12.5s", dl: "1.20s", color: colors.muted },
    { x: "84%", s: "52px", d: "13.7s", dl: "1.26s", color: colors.quaternary },
    { x: "30%", s: "66px", d: "12.1s", dl: "1.32s", color: colors.secondary },
    { x: "58%", s: "48px", d: "13.0s", dl: "1.38s", color: colors.tertiary },
    { x: "92%", s: "56px", d: "12.4s", dl: "1.44s", color: colors.quinary },
    { x: "20%", s: "54px", d: "13.5s", dl: "1.50s", color: colors.accent },
    { x: "72%", s: "60px", d: "12.7s", dl: "1.56s", color: colors.accent2 },
    { x: "36%", s: "52px", d: "13.1s", dl: "1.62s", color: colors.primary },
  ];

  // Distinct balloon positions and vibrant colors for each photo (preserving user's custom layout for Photo 1)
  const photoBalloonLayouts = [
    // Photo 1 (User's custom coordinates)
    [
      { id: 1, top: "44%", left: "22%", color: colors.primary },
      { id: 2, top: "32%", left: "68%", color: colors.secondary },
      { id: 3, top: "72%", left: "30%", color: colors.tertiary },
    ],
    // Photo 2
    [
      { id: 1, top: "28%", left: "35%", color: colors.quaternary },
      { id: 2, top: "58%", left: "75%", color: colors.muted },
      { id: 3, top: "70%", left: "25%", color: colors.quinary },
    ],
    // Photo 3
    [
      { id: 1, top: "34%", left: "72%", color: colors.primary },
      { id: 2, top: "45%", left: "26%", color: colors.accent2 },
      { id: 3, top: "74%", left: "65%", color: colors.secondary },
    ],
    // Photo 4
    [
      { id: 1, top: "30%", left: "25%", color: colors.quinary },
      { id: 2, top: "68%", left: "48%", color: colors.tertiary },
      { id: 3, top: "36%", left: "75%", color: colors.accent },
    ],
    // Photo 5
    [
      { id: 1, top: "65%", left: "22%", color: colors.secondary },
      { id: 2, top: "28%", left: "55%", color: colors.quaternary },
      { id: 3, top: "66%", left: "76%", color: colors.primary },
    ],
    // Photo 6
    [
      { id: 1, top: "32%", left: "30%", color: colors.muted },
      { id: 2, top: "72%", left: "32%", color: colors.accent2 },
      { id: 3, top: "48%", left: "72%", color: colors.quinary },
    ],
  ];

  const screenBalloons =
    photoBalloonLayouts[activePhotoIdx % photoBalloonLayouts.length];

  const currentPopped = photoBalloonsPopped[activePhotoIdx] || [];
  const isRevealed = Boolean(revealedPhotos[activePhotoIdx]);

  const popBalloon = (b: {
    id: number;
    top: string;
    left: string;
    color: string;
  }) => {
    if (currentPopped.includes(b.id)) return;
    playPopSound();
    const updated = [...currentPopped, b.id];
    setPhotoBalloonsPopped((prev) => ({
      ...prev,
      [activePhotoIdx]: updated,
    }));

    // Trigger 7-point comic burst POP! effect at balloon coordinates
    const effectId = `${activePhotoIdx}-${b.id}-${Date.now()}`;
    setPopEffects((prev) => [
      ...prev,
      { id: effectId, top: b.top, left: b.left, color: b.color },
    ]);
    setTimeout(() => {
      setPopEffects((prev) => prev.filter((p) => p.id !== effectId));
    }, 750);

    const targetIdx = activePhotoIdx;
    if (updated.length >= 3) {
      // Delay image reveal slightly so user can enjoy the 3rd balloon's "POP!" burst animation
      setTimeout(() => {
        setRevealedPhotos((prev) => {
          const next = [...prev];
          next[targetIdx] = true;
          return next;
        });
      }, 550);
    }
  };

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const triggerReleaseBalloons = () => {
    playPopSound();
    setReleaseCount((c) => c + 1);
  };

  const handleCopy = async () => {
    const url =
      shareURL || (typeof window !== "undefined" ? window.location.href : "");
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  // Convert Burma/Western age
  const displayAge = data.age || "5";

  return (
    <div
      className="pop-wrap w-full font-sans relative overflow-hidden pb-16 selection:bg-[#ffcfe0] selection:text-[#a01646]"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {/* Scoped CSS for Upward Flying Balloons, Camera Intro & POP! Effects */}
      <style>{`
        @keyframes popFlyUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(-2800px) rotate(16deg);
            opacity: 0;
          }
        }
        @keyframes camBalloonFlyIn {
          0% {
            transform: translate(-50%, 240px) scale(0.65) rotate(-5deg);
            opacity: 0;
          }
          1% {
            opacity: 1;
          }
          55% {
            transform: translate(-50%, 30px) scale(0.96) rotate(3deg);
          }
          80% {
            transform: translate(-50%, -54%) scale(1.03) rotate(-2deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes camBalloonBob {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(3.5deg);
          }
        }
        @keyframes popStarBurst {
          0% {
            transform: translate(-50%, -50%) scale(0.15) rotate(-22deg);
            opacity: 0;
          }
          20% {
            transform: translate(-50%, -50%) scale(1.35) rotate(8deg);
            opacity: 1;
          }
          60% {
            transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.65) rotate(18deg);
            opacity: 0;
          }
        }
        @keyframes stickerFloat {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotate, 0deg));
          }
          50% {
            transform: translateY(-12px) rotate(var(--rotate, 0deg));
          }
        }
      `}</style>

      {/* Floating Flying Balloons Animation Layer - strictly contained inside card */}
      {releaseCount > 0 && (
        <div
          key={releaseCount}
          className="sendoff absolute inset-0 pointer-events-none overflow-hidden z-40"
          aria-hidden="true"
        >
          {flyingBalloons.map((f, idx) => (
            <div
              key={idx}
              className="fly absolute"
              style={{
                left: f.x,
                bottom: "-120px",
                width: f.s,
                animation: `popFlyUp ${f.d} cubic-bezier(0.25, 0.46, 0.45, 0.94) ${f.dl} forwards`,
              }}
            >
              <svg
                viewBox="0 0 60 104"
                className="w-full h-auto drop-shadow-md"
              >
                <path
                  d="M30 64 q-6 10 2 20 q7 9 -1 20"
                  stroke={
                    theme === "gold"
                      ? "#92400e"
                      : theme === "lavender"
                        ? "#7c3aed"
                        : "#8b6f7a"
                  }
                  strokeWidth="1.3"
                  fill="none"
                />
                <path
                  d="M30 2 C50 2 58 18 58 32 C58 50 42 62 30 64 C18 62 2 50 2 32 C2 18 10 2 30 2Z"
                  fill={f.color}
                />
                <path
                  d="M30 2 C50 2 58 18 58 32 C58 50 42 62 30 64 C18 62 2 50 2 32 C2 18 10 2 30 2Z"
                  fill="url(#pop-bshade)"
                />
                <ellipse
                  cx="19"
                  cy="19"
                  rx="7"
                  ry="11"
                  fill="#fff"
                  opacity=".6"
                  transform="rotate(-25 19 19)"
                  filter="url(#pop-soft)"
                />
                <ellipse
                  cx="17"
                  cy="16"
                  rx="2.6"
                  ry="4.2"
                  fill="#fff"
                  opacity=".95"
                  transform="rotate(-25 17 16)"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* ─── SVG GRADIENT AND PATTERN DEFINITIONS ─── */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="pop-glit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor={
                theme === "gold"
                  ? "#fef08a"
                  : theme === "lavender"
                    ? "#fef08a"
                    : "#fff385"
              }
            />
            <stop
              offset="40%"
              stopColor={
                theme === "gold"
                  ? "#facc15"
                  : theme === "lavender"
                    ? "#fbbf24"
                    : "#ffd000"
              }
            />
            <stop
              offset="100%"
              stopColor={
                theme === "gold"
                  ? "#f97316"
                  : theme === "lavender"
                    ? "#f472b6"
                    : "#ff9500"
              }
            />
          </linearGradient>
          <linearGradient id="pop-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pop-fg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.accent} />
            <stop
              offset="100%"
              stopColor={
                theme === "gold"
                  ? "#b45309"
                  : theme === "lavender"
                    ? "#9f1239"
                    : "#be123c"
              }
            />
          </linearGradient>
          <radialGradient id="pop-bshade" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </radialGradient>
          <filter id="pop-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>
      </svg>

      {/* Top Bar Navigation */}
      {mode !== "editor-preview" && (
        <header className="max-w-xl mx-auto pt-4 px-4 flex items-center justify-between">
          {onBackClick ? (
            <button
              onClick={onBackClick}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7a5963] bg-white/80 px-3.5 py-1.5 rounded-full border border-[#f0dce1] shadow-2xs transition-all cursor-pointer"
              style={{ color: colors.accent }}
            >
              <ArrowLeft size={13} />
              <span>ဒီဇိုင်းများဆီ ပြန်သွားမယ်</span>
            </button>
          ) : (
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7a5963] bg-white/80 px-3.5 py-1.5 rounded-full border border-[#f0dce1] shadow-2xs transition-all"
              style={{ color: colors.accent }}
            >
              <ArrowLeft size={13} />
              <span>ဒီဇိုင်းများဆီ ပြန်သွားမယ်</span>
            </Link>
          )}

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/90 hover:bg-white px-3.5 py-1.5 rounded-full border border-[#f4c8d3] shadow-2xs transition-all cursor-pointer"
            style={{ color: colors.accent }}
          >
            {copied ? (
              <Check size={13} className="text-emerald-600" />
            ) : (
              <Share2 size={13} />
            )}
            <span>{copied ? "လင့်ခ် ကူးပြီးပြီ" : "မျှဝေမယ်"}</span>
          </button>
        </header>
      )}

      {/* ─── HERO HEADER ─── */}
      <header className="hero flex flex-col items-center pt-12 px-4 text-center max-w-xl mx-auto relative">
        {/* Date Tape */}
        <FadeIn delay={0.05}>
          <p className="datetape inline-block px-5 py-1 text-xs font-extrabold tracking-widest text-[#7a4652] bg-white/70 backdrop-blur-xs border-x-2 border-dashed border-[#e8bac5] shadow-2xs rounded-xs uppercase mb-3">
            {data.occasionDate}
          </p>
        </FadeIn>

        {/* ─── RANSOM CUTOUT "HAPPY BIRTHDAY" LETTERS ─── */}
        <ZoomIn delay={0.12} duration={0.65}>
          <h1
            className="ransom relative scale-80 flex flex-col items-center gap-2 select-none my-2"
            aria-label="Happy Birthday"
          >
            {/* Party Kitten Sticker Left */}
            <img
              src="/img/bd1.png"
              alt="confetti"
              style={{ transform: "rotate(-9deg)", animation: "stickerFloat 3s ease-in-out infinite", "--rotate": "-9deg" } as React.CSSProperties}
              className="absolute -left-14 -bottom-32 h-36 object-contain select-none filter drop-shadow-md z-10 pointer-events-none"
            />

            {/* Row 1: H A P P Y + Star */}
            <span
              className="row flex items-center justify-center gap-1 sm:gap-1.5"
              aria-hidden="true"
            >
              {/* H */}
              <b
                style={{
                  transform: "rotate(-6deg) translateY(-2px)",
                  height: "46px",
                  fontSize: "32px",
                  background:
                    theme === "gold"
                      ? "linear-gradient(135deg,#dc2626,#991b1b 55%,#ef4444)"
                      : theme === "lavender"
                        ? "linear-gradient(135deg,#c026d3,#9333ea 55%,#d946ef)"
                        : "linear-gradient(135deg,#e0303f,#b0132a 55%,#e5505f)",
                  color: "#fff",
                  fontFamily: "Georgia,serif",
                  fontWeight: 900,
                  clipPath:
                    "polygon(0% 5.5%,35% 1.7%,70% 1.3%,95.6% 3.2%,98% 50%,95.5% 95.5%,62% 96.7%,28% 95.9%,3.8% 95.1%,1.5% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[36px] px-2 shadow-md"
              >
                <span>H</span>
              </b>

              {/* A */}
              <b
                style={{
                  transform: "rotate(5deg) translateY(1px)",
                  height: "56px",
                  fontSize: "42px",
                  background:
                    "radial-gradient(rgba(0,0,0,.14) .6px,transparent .9px) 0 0/3px 3px,linear-gradient(#f2eddf,#e4dcc8)",
                  color: "#1b1815",
                  fontFamily: "Georgia,serif",
                  fontWeight: 700,
                  clipPath:
                    "polygon(2.2% 4.2%,35% 4.2%,70% 0.3%,95.9% 2.8%,94.5% 50%,95.2% 99.3%,62% 96.9%,28% 94.5%,4.1% 96.1%,3.5% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[42px] px-2 shadow-md"
              >
                <span>A</span>
              </b>

              {/* P */}
              <b
                style={{
                  transform: "rotate(3deg) translateY(-1px)",
                  height: "52px",
                  fontSize: "40px",
                  background:
                    theme === "gold"
                      ? "linear-gradient(#fde047,#facc15)"
                      : theme === "lavender"
                        ? "linear-gradient(#fde047,#facc15)"
                        : "linear-gradient(#ffeb6e,#ffd633)",
                  color: "#2b2b2b",
                  fontFamily: "Impact,sans-serif",
                  fontWeight: 400,
                  clipPath:
                    "polygon(5.5% 5.5%,35% 2.2%,70% 2%,95% 2%,99.1% 50%,98.2% 97.4%,62% 98.2%,28% 94.4%,3.3% 95.6%,5.3% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[38px] px-2 shadow-md"
              >
                <span>p</span>
              </b>

              {/* P */}
              <b
                style={{
                  transform: "rotate(1deg) translateY(2px)",
                  height: "48px",
                  fontSize: "36px",
                  background:
                    theme === "gold"
                      ? "linear-gradient(160deg,#78350f,#451a03)"
                      : theme === "lavender"
                        ? "linear-gradient(160deg,#4c1d95,#2e1065)"
                        : "linear-gradient(160deg,#2e2e2e,#0c0c0c)",
                  color: "#fff",
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  clipPath:
                    "polygon(0.4% 1.6%,35% 3.4%,70% 3.1%,97.5% 1.2%,94.5% 50%,99.7% 97.8%,62% 97.9%,28% 96%,5.5% 96.9%,1% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[36px] px-2 shadow-md"
              >
                <span>P</span>
              </b>

              {/* Y */}
              <b
                style={{
                  transform: "rotate(-1deg)",
                  height: "46px",
                  fontSize: "34px",
                  background:
                    theme === "gold"
                      ? "linear-gradient(#fcd34d,#fbbf24)"
                      : theme === "lavender"
                        ? "linear-gradient(#a5b4fc,#818cf8)"
                        : "linear-gradient(#c4e5ff,#9ccdfa)",
                  color: "#1b4b9a",
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  clipPath:
                    "polygon(2.4% 1.7%,35% 2.2%,70% 2.5%,98% 3.2%,96.3% 50%,98.6% 94.6%,62% 97.3%,28% 94.8%,3.8% 96.2%,3.1% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[34px] px-2 shadow-md"
              >
                <span>Y</span>
              </b>

              {/* Gold Glitter Star */}
              <span
                style={{ transform: "rotate(14deg)" }}
                className="inline-block w-8 h-8 ml-1 drop-shadow-md select-none"
              >
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <path
                    d="M24 2l6.6 14.6 15.9 1.7-11.9 10.7 3.4 15.7L24 36.6 10 44.7l3.4-15.7L1.5 18.3l15.9-1.7z"
                    fill="url(#pop-glit)"
                    stroke="#fff"
                    strokeWidth="4"
                    paintOrder="stroke"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 2l6.6 14.6 15.9 1.7-11.9 10.7 3.4 15.7L24 36.6 10 44.7l3.4-15.7L1.5 18.3l15.9-1.7z"
                    fill="url(#pop-sheen)"
                  />
                </svg>
              </span>
            </span>

            {/* Row 2: B I R T H D A Y */}
            <span
              className="row flex items-center justify-center gap-0.5 sm:gap-1"
              aria-hidden="true"
            >
              {/* B */}
              <b
                style={{
                  transform: "rotate(-3deg) translateY(-2px)",
                  height: "56px",
                  fontSize: "44px",
                  background:
                    theme === "gold"
                      ? "radial-gradient(rgba(120,53,15,.28) .7px,transparent 1px) 1px 2px/5px 4px,linear-gradient(#fde68a,#fbbf24)"
                      : theme === "lavender"
                        ? "radial-gradient(rgba(120,50,20,.28) .7px,transparent 1px) 1px 2px/5px 4px,linear-gradient(#e9d5ff,#c084fc)"
                        : "radial-gradient(rgba(90,50,20,.28) .7px,transparent 1px) 1px 2px/5px 4px,linear-gradient(#cda478,#b98d5f)",
                  color: "#2b1a0e",
                  fontFamily: "Courier New,monospace",
                  fontWeight: 700,
                  clipPath:
                    "polygon(3% 4.1%,35% 5.6%,70% 2.4%,95.8% 1.5%,96.5% 50%,97.9% 98%,62% 97.7%,28% 95.2%,5.3% 99.3%,4.9% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[36px] px-1.5 shadow-md"
              >
                <span>B</span>
              </b>

              {/* I */}
              <b
                style={{
                  transform: "rotate(-5deg) translateY(1px)",
                  height: "52px",
                  fontSize: "40px",
                  background:
                    theme === "gold"
                      ? "linear-gradient(135deg,#fdba74,#ea580c)"
                      : theme === "lavender"
                        ? "linear-gradient(135deg,#f0abfc,#c026d3)"
                        : "linear-gradient(135deg,#ffc29a,#e46d6d)",
                  color: "#fff",
                  fontFamily: "Georgia,serif",
                  fontWeight: 900,
                  clipPath:
                    "polygon(0.5% 2.4%,35% 0.9%,70% 0.5%,94% 1.3%,96.2% 50%,99.1% 97.3%,62% 96.4%,28% 99.2%,5.5% 94.7%,5.3% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[28px] px-1.5 shadow-md"
              >
                <span>I</span>
              </b>

              {/* R */}
              <b
                style={{
                  transform: "rotate(6deg) translateY(-1px)",
                  height: "48px",
                  fontSize: "36px",
                  background:
                    theme === "gold"
                      ? "linear-gradient(120deg,#fef9c3,#fffbeb 30%,#fde68a 50%,#fef3c7 70%,#fbbf24)"
                      : theme === "lavender"
                        ? "linear-gradient(120deg,#e9d5ff,#faf5ff 30%,#c4b5fd 50%,#f3e8ff 70%,#d8b4fe)"
                        : "linear-gradient(120deg,#c9cdd3,#fafbfc 30%,#a4aab3 50%,#eef0f3 70%,#b4bac2)",
                  color: "#3a3f47",
                  fontFamily: "Georgia,serif",
                  fontWeight: 700,
                  fontStyle: "italic",
                  clipPath:
                    "polygon(5.3% 5.4%,35% 4.6%,70% 1.7%,99.9% 1.5%,99.5% 50%,100% 96.3%,62% 98.6%,28% 95.6%,2.9% 95.9%,1.4% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[32px] px-1.5 shadow-md"
              >
                <span>r</span>
              </b>

              {/* T */}
              <b
                style={{
                  transform: "rotate(4deg) translateY(2px)",
                  height: "46px",
                  fontSize: "40px",
                  background:
                    theme === "gold"
                      ? "repeating-linear-gradient(90deg,#fef3c7 0 6px,#fef08a 6px 12px)"
                      : theme === "lavender"
                        ? "repeating-linear-gradient(90deg,#f3e8ff 0 6px,#e9d5ff 6px 12px)"
                        : "repeating-linear-gradient(90deg,#ffcfe0 0 6px,#ffe5ee 6px 12px)",
                  color:
                    theme === "gold"
                      ? "#ea580c"
                      : theme === "lavender"
                        ? "#c026d3"
                        : "#cf2a67",
                  fontFamily: "cursive",
                  fontWeight: 700,
                  clipPath:
                    "polygon(5.3% 1.4%,35% 2.2%,70% 5.4%,99.3% 2.9%,100% 50%,94.5% 96.2%,62% 94.5%,28% 99.9%,5.4% 98.9%,5.8% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[30px] px-1.5 shadow-md"
              >
                <span>T</span>
              </b>

              {/* H */}
              <b
                style={{
                  transform: "rotate(2deg)",
                  height: "56px",
                  fontSize: "44px",
                  background:
                    "radial-gradient(#0e8f8f 1px,transparent 1.3px) 0 0/4px 4px,#c4f0ea",
                  color:
                    theme === "gold"
                      ? "#713f12"
                      : theme === "lavender"
                        ? "#5b21b6"
                        : "#0a4f4f",
                  fontFamily: "Georgia,serif",
                  fontWeight: 700,
                  clipPath:
                    "polygon(3.4% 4.1%,35% 1.6%,70% 1.3%,98.7% 3.4%,99.7% 50%,95.4% 95.8%,62% 95.7%,28% 97%,0.2% 99.3%,5.5% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[36px] px-1.5 shadow-md"
              >
                <span>H</span>
              </b>

              {/* D */}
              <b
                style={{
                  transform: "rotate(0deg) translateY(-2px)",
                  height: "52px",
                  fontSize: "40px",
                  background:
                    theme === "gold"
                      ? "linear-gradient(135deg,#dc2626,#991b1b 55%,#ef4444)"
                      : theme === "lavender"
                        ? "linear-gradient(135deg,#c026d3,#9333ea 55%,#d946ef)"
                        : "linear-gradient(135deg,#e0303f,#b0132a 55%,#e5505f)",
                  color: "#fff",
                  fontFamily: "Georgia,serif",
                  fontWeight: 900,
                  clipPath:
                    "polygon(0.8% 4.1%,35% 5.4%,70% 0.2%,94.7% 5.2%,94% 50%,94.3% 95.4%,62% 97.5%,28% 98.5%,4.4% 94.7%,2.4% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[34px] px-1.5 shadow-md"
              >
                <span>D</span>
              </b>

              {/* a */}
              <b
                style={{
                  transform: "rotate(-2deg) translateY(1px)",
                  height: "48px",
                  fontSize: "36px",
                  background:
                    theme === "gold"
                      ? "linear-gradient(160deg,#78350f,#451a03)"
                      : theme === "lavender"
                        ? "linear-gradient(160deg,#4c1d95,#2e1065)"
                        : "linear-gradient(160deg,#2e2e2e,#0c0c0c)",
                  color: "#fff",
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  clipPath:
                    "polygon(1.4% 2.4%,35% 5.3%,70% 3.4%,97.9% 3.7%,95.6% 50%,98% 95.6%,62% 97.5%,28% 98.8%,1.9% 94.1%,6% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[32px] px-1.5 shadow-md"
              >
                <span>a</span>
              </b>

              {/* Y */}
              <b
                style={{
                  transform: "rotate(-4deg) translateY(-1px)",
                  height: "46px",
                  fontSize: "34px",
                  background:
                    theme === "gold"
                      ? "linear-gradient(#fde047,#facc15)"
                      : theme === "lavender"
                        ? "linear-gradient(#fde047,#facc15)"
                        : "linear-gradient(#ffeb6e,#ffd633)",
                  color: "#2b2b2b",
                  fontFamily: "Impact,sans-serif",
                  fontWeight: 400,
                  clipPath:
                    "polygon(3.8% 5.2%,35% 5.5%,70% 1.2%,96.1% 0.8%,97% 50%,96.7% 95.4%,62% 94.3%,28% 97.1%,1.1% 97.3%,1% 48%)",
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.22))",
                }}
                className="inline-flex items-center justify-center min-w-[32px] px-1.5 shadow-md"
              >
                <span>Y</span>
              </b>
            </span>
          </h1>
        </ZoomIn>

        {/* ─── NAME WRAP: 3D VINYL NAME + AGE FOIL BALLOON + CAT STICKERS ─── */}
        <PopUp delay={0.22} duration={0.6}>
          <div className="namewrap flex items-center justify-center gap-3 relative my-3 w-full">
            {/* 3D Vinyl Name (Thick puffy sticker effect) */}
            <div className="vinyl floaty relative select-none">
              <span
                className="font-extrabold text-4xl sm:text-5xl font-['Burmese_Handwriting'] tracking-wider"
                style={{
                  color: colors.primary,
                  textShadow:
                    "3px 3px 0 #fff, -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 0 6px 12px rgba(230,40,90,0.25)",
                }}
              >
                {data.recipientName}
              </span>
            </div>

            {/* SVG 3D Foil Balloon Age */}
            <div className="agefoil floaty w-20 h-22 sm:w-24 sm:h-24 select-none relative -mt-1">
              <svg
                viewBox="0 0 120 132"
                className="w-full h-full filter drop-shadow-lg"
              >
                <text
                  x="60"
                  y="96"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  fontWeight="700"
                  fontSize="112"
                  fill="url(#pop-fg)"
                  stroke={
                    theme === "gold"
                      ? "#fcd34d"
                      : theme === "lavender"
                        ? "#e879f9"
                        : "#ffb3cc"
                  }
                  strokeWidth="2.5"
                  paintOrder="stroke"
                  strokeLinejoin="round"
                >
                  {displayAge}
                </text>
                {/* String */}
                <path
                  d="M60 100 q-6 12 2 22 q6 8 -2 10"
                  stroke={
                    theme === "gold"
                      ? "#dc2626"
                      : theme === "lavender"
                        ? "#e11d48"
                        : "#d43f6c"
                  }
                  strokeWidth="1.6"
                  fill="none"
                  opacity=".6"
                />
              </svg>
            </div>

            {/* Kitten Sticker Right */}
            <img
              src="/img/bd2.png"
              alt="confetti"
              style={{ transform: "rotate(8deg)", animation: "stickerFloat 3.5s ease-in-out infinite", "--rotate": "8deg" } as React.CSSProperties}
              className="absolute -right-16 top-2 h-28 object-contain select-none filter drop-shadow-md z-10 pointer-events-none"
            />
          </div>
        </PopUp>

        {/* Subtitle */}
        <FadeIn delay={0.3}>
          <p
            className="line text-sm font-semibold mt-1 font-['Burmese_Handwriting']"
            style={{ color: colors.text }}
          >
            {data.subtitle}
          </p>
        </FadeIn>

        {/* Sticky Note */}
        <SlideLeft delay={0.38}>
          <div className="sticky relative transform -rotate-2 mt-3 mb-2">
            <p
              className="px-5 py-1.5 rounded-xs font-serif italic font-extrabold text-sm shadow-2xs tracking-wide"
              style={{
                backgroundColor: colors.bgLight,
                borderColor: colors.border,
                color: colors.accent,
              }}
            >
              {data.stickyNoteText}
            </p>
          </div>
        </SlideLeft>

        {/* Hint */}
        <FadeIn delay={0.46}>
          <p className="hint text-xs text-[#8f6e77] mt-1 font-medium font-['Burmese_Handwriting']">
            {data.cameraHint}
          </p>
        </FadeIn>
      </header>

      {/* ─── RETRO CAMERA & BALLOON POPPING ZONE ─── */}
      <section className="px-4 mt-6 max-w-xl mx-auto flex flex-col items-center">
        <FadeIn delay={0.05}>
          <p
            className="kicker font-serif italic font-bold text-xs mt-1"
            style={{ color: colors.primary }}
          >
            pop, pop, hooray!
          </p>
          <h2
            className="font-serif font-extrabold text-lg mt-0.5 text-center"
            style={{ color: colors.text }}
          >
            {data.cameraSectionTitle}
          </h2>
          <p
            className="sub text-xs text-center max-w-xs mt-1 mb-4 font-['Burmese_Handwriting']"
            style={{ color: colors.muted }}
          >
            {data.cameraSectionDesc}
          </p>
        </FadeIn>

        <ZoomIn delay={0.12} duration={0.7}>
          <div className="camzone relative w-full max-w-[325px]">
            {/* Peeking Kitten */}
            <img
              src="/img/bd3.png"
              alt="confetti"
              style={{ transform: "rotate(-8deg)", animation: "stickerFloat 4s ease-in-out infinite", "--rotate": "-8deg" } as React.CSSProperties}
              className="absolute -top-7 -left-3 w-16 h-16 object-contain select-none z-10 filter drop-shadow-xs pointer-events-none"
            />
            {/* Sunglasses Kitten */}
            <img
              src="/img/bd4.png"
              alt="confetti"
              style={{ transform: "rotate(-6deg)", animation: "stickerFloat 3.2s ease-in-out infinite", "--rotate": "-6deg" } as React.CSSProperties}
              className="absolute -bottom-2 -left-5 w-16 h-16 object-contain select-none z-30 filter drop-shadow-xs pointer-events-none"
            />

            {/* ─── THE RETRO CAMERA ─── */}
            <div
              className="cam shadow-2xl relative overflow-hidden"
              style={{
                width: "280px",
                padding: "12px 12px 14px",
                borderRadius: "30px 30px 34px 34px",
                background:
                  "radial-gradient(120% 60% at 20% 0px, rgba(255, 255, 255, 0.9), transparent 55%), " +
                  "linear-gradient(100deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 60%), " +
                  "linear-gradient(165deg, #f6f5f2, #dcdbd7 38%, #efeee9 58%, #c8c7c3)",
                boxShadow:
                  "inset 0 2px 1px #fff, " +
                  "inset 0 -4px 8px rgba(0,0,0,0.16), " +
                  "inset 0 0 0 1px rgba(0,0,0,0.08), " +
                  "0 2px 0 #b6b5b1, " +
                  "0 26px 34px -18px rgba(40,30,40,0.55)",
              }}
            >
              {/* Top Bar */}
              <div
                className="cam-top flex items-center justify-between"
                style={{ height: "22px", margin: "0 4px 8px" }}
              >
                <span className="speaker flex gap-0.5">
                  {Array.from({ length: 13 }).map((_, i) => (
                    <i
                      key={i}
                      className="w-1 h-1 rounded-full bg-gray-300 block"
                    />
                  ))}
                </span>
                <span className="brand font-extrabold tracking-widest text-gray-400 text-[9px]">
                  PIXIE&nbsp;5.0
                </span>
                <span className="led w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Mid Section: Screen Bezel + Side Controls */}
              <div
                className="cam-mid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 35px",
                  gap: "8px",
                  alignItems: "start",
                }}
              >
                {/* Bezel & LCD Screen */}
                <div
                  className="bezel flex-1 rounded-[26px] p-2 shadow-inner border-2"
                  style={{
                    backgroundColor:
                      theme === "gold"
                        ? "#4a4036"
                        : theme === "lavender"
                          ? "#3a3336"
                          : "#3a3336",
                    borderColor:
                      theme === "gold"
                        ? "#5a4a40"
                        : theme === "lavender"
                          ? "#544c50"
                          : "#544c50",
                  }}
                >
                  <div className="lcd relative aspect-[4/4.4] rounded-[18px] overflow-hidden bg-black flex flex-col">
                    {/* Photo Display */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photos[activePhotoIdx] || data.mainPhotoURL}
                      alt="Photo shot"
                      className={`w-full h-full object-cover transition-all ${
                        isRevealed
                          ? "scale-100 filter-none duration-700"
                          : "scale-105 filter blur-md brightness-75"
                      }`}
                    />

                    {/* Popping Balloons Mini-Game Overlay */}
                    {!isRevealed && (
                      <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center p-2 text-center">
                        <div
                          className="bg-white/60 pointer-events-none z-30 relative backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-[10px] font-bold mb-2"
                          style={{
                            color:
                              theme === "gold"
                                ? "#b9244d"
                                : theme === "lavender"
                                  ? "#a855f7"
                                  : "#b9244d",
                          }}
                        >
                          🎈 ပူဖောင်း ၃ လုံး ဖောက်ပါ ({currentPopped.length}/3)
                        </div>

                        {/* SVG In-Screen Poppable Balloons - Slow, graceful buoyant balloon float */}
                        {screenBalloons.map((b, bIdx) => {
                          const isPopped = currentPopped.includes(b.id);
                          if (isPopped) return null;
                          return (
                            <div
                              key={`${activePhotoIdx}-${b.id}`}
                              className="absolute z-20 cursor-pointer pointer-events-auto"
                              style={{
                                top: b.top,
                                left: b.left,
                                animation: `camBalloonFlyIn 700ms ease-out ${bIdx * 0.32}s both`,
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => popBalloon(b)}
                                className="block transform cursor-pointer transition-transform mt-12 hover:scale-110 active:scale-90"
                                style={{
                                  animation: `camBalloonBob 3.6s ease-in-out infinite ${0.5 + bIdx * 0.35}s`,
                                }}
                                aria-label="Pop balloon"
                              >
                                <svg
                                  viewBox="0 0 60 104"
                                  className="w-[110px] h-[155px] drop-shadow-lg"
                                >
                                  <path
                                    d="M30 64 q-6 10 2 20 q7 9 -1 20"
                                    stroke={
                                      theme === "gold"
                                        ? "#92400e"
                                        : theme === "lavender"
                                          ? "#7c3aed"
                                          : "#8b6f7a"
                                    }
                                    strokeWidth="1.3"
                                    fill="none"
                                  />
                                  <path
                                    d="M30 2 C50 2 58 18 58 32 C58 50 42 62 30 64 C18 62 2 50 2 32 C2 18 10 2 30 2Z"
                                    fill={b.color}
                                  />
                                  <path
                                    d="M30 2 C50 2 58 18 58 32 C58 50 42 62 30 64 C18 62 2 50 2 32 C2 18 10 2 30 2Z"
                                    fill="url(#pop-bshade)"
                                  />
                                  <ellipse
                                    cx="19"
                                    cy="19"
                                    rx="7"
                                    ry="11"
                                    fill="#fff"
                                    opacity=".6"
                                    transform="rotate(-25 19 19)"
                                    filter="url(#pop-soft)"
                                  />
                                  <ellipse
                                    cx="17"
                                    cy="16"
                                    rx="2.6"
                                    ry="4.2"
                                    fill="#fff"
                                    opacity=".95"
                                    transform="rotate(-25 17 16)"
                                  />
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 7-Angled Comic Starburst POP! Effects - at LCD level so last balloon never gets cut off */}
                    {popEffects.map((p) => (
                      <div
                        key={p.id}
                        className="absolute pointer-events-none z-30 select-none"
                        style={{
                          top: p.top,
                          left: p.left,
                          animation:
                            "popStarBurst 0.65s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
                        }}
                      >
                        <svg
                          viewBox="0 0 100 100"
                          className="w-24 h-24 filter drop-shadow-xl"
                        >
                          <defs>
                            <radialGradient
                              id={`popGrad-${p.id}`}
                              cx="50%"
                              cy="50%"
                              r="50%"
                            >
                              <stop
                                offset="0%"
                                stopColor={
                                  theme === "gold"
                                    ? "#fef08a"
                                    : theme === "lavender"
                                      ? "#fef08a"
                                      : "#fff875"
                                }
                              />
                              <stop
                                offset="45%"
                                stopColor={
                                  theme === "gold"
                                    ? "#facc15"
                                    : theme === "lavender"
                                      ? "#fbbf24"
                                      : "#ffb703"
                                }
                              />
                              <stop
                                offset="100%"
                                stopColor={
                                  theme === "gold"
                                    ? "#f97316"
                                    : theme === "lavender"
                                      ? "#f472b6"
                                      : "#fb5607"
                                }
                              />
                            </radialGradient>
                          </defs>
                          {/* 7-angled comic star burst */}
                          <polygon
                            points="50,4 60.8,27.5 85.9,21.3 74.4,44.4 94.8,60.2 69.5,65.5 70,91.5 50,75 30,91.5 30.5,65.5 5.2,60.2 25.6,44.4 14.1,21.3 39.2,27.5"
                            fill={`url(#popGrad-${p.id})`}
                            stroke="#ffffff"
                            strokeWidth="3.5"
                            paintOrder="stroke"
                            strokeLinejoin="round"
                          />
                          {/* Sparkle dots at tips */}
                          <circle cx="50" cy="4" r="2.5" fill="#fff" />
                          <circle cx="85.9" cy="21.3" r="2.5" fill="#fff" />
                          <circle cx="94.8" cy="60.2" r="2.5" fill="#fff" />
                          <circle cx="70" cy="91.5" r="2.5" fill="#fff" />
                          <circle cx="30" cy="91.5" r="2.5" fill="#fff" />
                          <circle cx="5.2" cy="60.2" r="2.5" fill="#fff" />
                          <circle cx="14.1" cy="21.3" r="2.5" fill="#fff" />
                          {/* Comic text POP! */}
                          <text
                            x="50"
                            y="56"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontFamily="'Impact', 'Arial Black', sans-serif"
                            fontWeight="900"
                            fontSize="24"
                            fill="#ffffff"
                            stroke="#ba181b"
                            strokeWidth="3.2"
                            paintOrder="stroke"
                            letterSpacing="0.5"
                          >
                            POP!
                          </text>
                        </svg>
                      </div>
                    ))}

                    {/* OSD Screen Info */}
                    <div className="osd absolute top-1.5 left-2 right-2 flex items-center justify-between text-white/90 text-[9px] font-mono font-bold pointer-events-none drop-shadow-xs">
                      <span className="tl flex items-center gap-1">
                        <b className="text-emerald-400">▶</b>
                        <span>
                          {activePhotoIdx + 1}/{photos.length}
                        </span>
                      </span>
                      <span className="stamp font-mono text-amber-300">
                        &apos;26 9 30
                      </span>
                    </div>
                  </div>
                </div>

                {/* Camera Right Side Controls */}
                <div
                  className="side flex flex-col items-center select-none"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    width: "35px",
                    paddingTop: "4px",
                  }}
                >
                  <div
                    className="rocker cursor-pointer active:scale-95 flex flex-col items-center font-bold"
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "26px",
                      height: "54px",
                      padding: "5px 0",
                      borderRadius: "13px",
                      background:
                        "linear-gradient(90deg, #c4c3bf, #f4f3f0 45%, #bdbdb8)",
                      boxShadow:
                        "inset 0 1px 1px #fff, 0 2px 3px rgba(0,0,0,0.25)",
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "#7d7c78",
                    }}
                  >
                    <span>T</span>
                    <span>W</span>
                  </div>
                  <span
                    className="pill cursor-pointer active:scale-90"
                    style={{
                      width: "22px",
                      height: "12px",
                      borderRadius: "6px",
                      background: "linear-gradient(#f2f1ee, #c9c8c4)",
                      boxShadow:
                        "inset 0 1px 0 #fff, 0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  />
                  <span
                    className="pill cursor-pointer active:scale-90"
                    style={{
                      width: "22px",
                      height: "12px",
                      borderRadius: "6px",
                      background: "linear-gradient(#f2f1ee, #c9c8c4)",
                      boxShadow:
                        "inset 0 1px 0 #fff, 0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  />
                  <span className="playbtn text-[9px] text-gray-500">▶</span>
                  <span className="minilabel text-[6px] font-bold tracking-tighter">
                    PLAY
                  </span>
                </div>
              </div>

              {/* Camera Bottom Controls: Jog-Dial Pad */}
              <div
                className="cam-bot"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                  marginTop: "14px",
                }}
              >
                <div className="smallbtns flex flex-col text-[7px] font-bold text-gray-400 gap-1 select-none">
                  <span>MENU</span>
                  <span>DISP</span>
                </div>

                {/* D-Pad */}
                <div className="relative">
                  <div
                    className="pad relative active:scale-[0.98]"
                    style={{
                      width: "110px",
                      height: "110px",
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, transparent 36%, rgba(0,0,0,0.08) 37%, transparent 39%), " +
                        "conic-gradient(#e9e9e7, #b7b6b2, #f5f5f3, #a9a8a4, #e6e6e7, #bdbdb8, #f2f2f0, #ada8a8, #e9e9e7)",
                      boxShadow:
                        "inset 0 2px 2px rgba(255,255,255,0.9), " +
                        "inset 0 -3px 5px rgba(0,0,0,0.22), " +
                        "0 3px 5px rgba(0,0,0,0.25)",
                    }}
                  >
                    <button
                      className="absolute text-xl text-neutral-500/50 w-6 h-6 flex items-center justify-center cursor-pointer"
                      style={{
                        left: "50%",
                        top: "6px",
                        transform: "translateX(-50%)",
                      }}
                      aria-label="Previous photo"
                    >
                      •
                    </button>
                    <button
                      className="absolute text-xl text-neutral-500/50 w-6 h-6 flex items-center justify-center cursor-pointer"
                      style={{
                        left: "50%",
                        bottom: "6px",
                        transform: "translateX(-50%)",
                      }}
                      aria-label="Previous photo"
                    >
                      •
                    </button>
                    
                    {/* Prev Button */}
                    <button
                      type="button"
                      onClick={prevPhoto}
                      className="arr prev absolute text-base w-6 h-6 flex items-center justify-center cursor-pointer"
                      style={{
                        left: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: colors.accent,
                      }}
                      aria-label="Previous photo"
                    >
                      ◀
                    </button>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={nextPhoto}
                      className="arr next absolute text-base w-6 h-6 flex items-center justify-center cursor-pointer"
                      style={{
                        right: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: colors.accent,
                      }}
                      aria-label="Next photo"
                    >
                      ▶
                    </button>
                  </div>
                  {/* Center OK Button */}
                  <button
                    type="button"
                    onClick={triggerReleaseBalloons}
                    className="ok absolute flex items-center justify-center font-bold cursor-pointer active:scale-95 transition-all"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "radial-gradient(circle at 40% 30%, #fff, #d8d7d3 60%, #b5b4b0)",
                      boxShadow:
                        "inset 0 -2px 3px rgba(0,0,0,0.2), 0 2px 3px rgba(0,0,0,0.3)",
                      fontWeight: "bold",
                      fontSize: "11px",
                      border: "1px solid #8a8985",
                      color: colors.accent,
                    }}
                    aria-label="OK"
                  >
                    OK
                  </button>
                </div>

                <div className="rightbits select-none">
                  <span className="strap w-2 h-4 rounded-full bg-gray-300 block shadow-xs" />
                </div>
              </div>

              {/* Decorative Gems */}
              <span
                className="gem left absolute"
                style={{
                  zIndex: 3,
                  width: "18px",
                  rotate: "-15deg",
                  filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25))",
                  pointerEvents: "none",
                  left: "10px",
                  top: "50%",
                }}
              />
              <span
                className="gem right absolute"
                style={{
                  zIndex: 3,
                  width: "18px",
                  rotate: "15deg",
                  filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25))",
                  pointerEvents: "none",
                  right: "10px",
                  top: "50%",
                }}
              />
            </div>
          </div>
        </ZoomIn>

        {/* ─── MINI POLAROID PRINTS GALLERY ─── */}
        <div className="w-full pt-6 flex flex-col items-center">
          <FadeIn delay={0.05}>
            <div className="capline-host text-center mb-2">
              <p
                className="capline font-serif font-extrabold text-sm"
                style={{ color: colors.text }}
              >
                <b className="mr-1" style={{ color: colors.accent }}>
                  Yay!
                </b>
                <span>{displayAge} နှစ် ပြည့်ပြီ</span>
              </p>
            </div>
          </FadeIn>

          <div
            className="prints grid grid-cols-3 sm:grid-cols-6 gap-2 w-full max-w-[330px] pt-1"
            role="group"
            aria-label="Polaroid Prints"
          >
            {photos.slice(0, 6).map((photo, i) => {
              const rotAngles = [
                "-5deg",
                "3deg",
                "-2deg",
                "5deg",
                "4deg",
                "-3deg",
              ];
              const rot = rotAngles[i % rotAngles.length];
              const isSelected = activePhotoIdx === i;
              const isPrintRevealed = Boolean(revealedPhotos[i]);
              return (
                <PopUp key={i} delay={0.05 + i * 0.06} duration={0.45}>
                  <button
                    type="button"
                    onClick={() => setActivePhotoIdx(i)}
                    className={`print bg-white p-1 pb-4 shadow-md border transition-all duration-200 hover:rotate-0 hover:scale-110 cursor-pointer relative ${
                      isSelected ? "ring-2" : "border-gray-200"
                    }`}
                    style={{
                      transform: `rotate(${rot})`,
                      borderColor: isSelected ? colors.accent : undefined,
                      boxShadow: isSelected
                        ? `0 0 0 2px ${colors.accent}`
                        : undefined,
                    }}
                    aria-label={`Photo ${i + 1}`}
                  >
                    <span className="ph block w-full aspect-square overflow-hidden bg-neutral-100 rounded-2xs relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo}
                        alt={`Print ${i + 1}`}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isPrintRevealed
                            ? "filter-none scale-100"
                            : "filter blur-xs brightness-75 scale-110"
                        }`}
                      />
                      {!isPrintRevealed && (
                        <span className="absolute inset-0 bg-black/25 flex items-center justify-center text-[10px] select-none pointer-events-none">
                          🎈
                        </span>
                      )}
                    </span>
                  </button>
                </PopUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── A LITTLE NOTE: LINED PAPER NOTEBOOK LETTER ─── */}
      <section
        className="px-4 mt-8 max-w-xl mx-auto flex flex-col items-center"
        aria-labelledby="pop-note-title"
      >
        <FadeIn delay={0.05}>
          <p
            className="kicker font-serif italic font-bold text-sm mb-1"
            style={{ color: colors.accent }}
          >
            a little note
          </p>
        </FadeIn>

        <SlideUp delay={0.12} duration={0.65}>
          <div className="letterwrap relative w-full max-w-[330px]">
            {/* Bunny Sticker */}
            <img
              src="/img/bd5.png"
              alt="confetti"
              style={{ transform: "rotate(9deg)", animation: "stickerFloat 3.8s ease-in-out infinite", "--rotate": "9deg" } as React.CSSProperties}
              className="ps absolute -right-3 -top-6 w-20 h-20 object-contain select-none z-20 filter drop-shadow-xs pointer-events-none"
            />

            {/* Lined Notebook Paper */}
            <div
              className="letter w-full p-5 pt-6 shadow-lg border relative overflow-hidden"
              style={{
                backgroundColor: "#fff",
                borderColor:
                  theme === "gold"
                    ? "#f0d6a0"
                    : theme === "lavender"
                      ? "#d8c4e0"
                      : "#ede3e5",
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 26px, #f1e0e5 26px, #f1e0e5 27px)",
              }}
            >
              {/* Red left margin line of notebook paper */}
              <div
                className="absolute top-0 bottom-0 left-8 w-0.5"
                style={{
                  backgroundColor:
                    theme === "gold"
                      ? "#d4a574"
                      : theme === "lavender"
                        ? "#d8b4fe"
                        : "#f5c6d3",
                }}
              />

              <div className="pl-6 relative z-10 space-y-3">
                <h3
                  id="pop-note-title"
                  className="font-extrabold text-lg font-['Burmese_Handwriting']"
                  style={{ color: colors.accent }}
                >
                  {data.noteHeader}
                </h3>

                <div className="text-xs text-[#52353e] leading-[27px] font-medium font-['Burmese_Handwriting'] whitespace-pre-line">
                  {data.letterContent}
                </div>

                <p className="from text-xs font-bold text-[#863c50] text-right pt-2 font-['Burmese_Handwriting']">
                  {data.senderName}
                </p>
              </div>
            </div>
          </div>
        </SlideUp>
      </section>

      {/* ─── RELEASE BALLOONS & CELEBRATION SECTION ─── */}
      <section
        className="release px-4 mt-6 max-w-xl mx-auto flex flex-col items-center text-center space-y-3"
        aria-label="Release balloons"
      >
        <PopUp delay={0.05} duration={0.55}>
          <button
            type="button"
            onClick={triggerReleaseBalloons}
            className="go inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer font-['Burmese_Handwriting']"
            style={{
              background:
                theme === "gold"
                  ? "linear-gradient(to right, #f59e0b, #d97706)"
                  : theme === "lavender"
                    ? "linear-gradient(to right, #a855f7, #7c3aed)"
                    : "linear-gradient(to right, #e76686, #da4369)",
            }}
          >
            <span aria-hidden="true">🎈</span>
            <span>ပူဖောင်းတွေ လွှတ်မယ်</span>
          </button>
        </PopUp>

        <Bounce delay={0.15} duration={0.65}>
          <div className="bye pt-2 relative">
            {/* Cat Sticker */}
            <img
              src="/img/bd6.png"
              alt="confetti"
              style={{ transform: "rotate(-5deg)", animation: "stickerFloat 3.3s ease-in-out infinite", "--rotate": "-5deg" } as React.CSSProperties}
              className="absolute -left-12 top-0 w-20 h-20 object-contain select-none z-20 filter drop-shadow-xs pointer-events-none"
            />
            <b className="block font-extrabold text-3xl sm:text-4xl text-[#df2e62] tracking-wide select-none drop-shadow-2xs">
              {data.closingTitle}
            </b>
            <p className="sub text-xs text-[#7e5661] font-semibold mt-1 font-['Burmese_Handwriting']">
              {data.closingSubtitle}
            </p>
          </div>
        </Bounce>

        {/* Share Button */}
        <FadeIn delay={0.25}>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-white text-xs font-bold shadow-sm transition-all cursor-pointer font-['Burmese_Handwriting']"
              style={{
                backgroundColor:
                  theme === "gold"
                    ? "#c6a151"
                    : theme === "lavender"
                      ? "#9384bd"
                      : "#bf214c",
              }}
            >
              <Share2 size={13} />
              <span>{copied ? "လင့်ခ် ကူးယူပြီးပါပြီ" : "မျှဝေမယ်"}</span>
            </button>
          </div>
        </FadeIn>

        {/* Make Your Own CTA Card */}
        {mode !== "editor-preview" && (
          <SlideUp delay={0.3} duration={0.6}>
            <div className="w-full max-w-[320px] bg-white rounded-2xl border border-[#f0dce1] p-5 text-center shadow-xs space-y-2 mt-4">
              <h5 className="font-extrabold text-sm text-[#4b2d36] font-['Burmese_Handwriting']">
                ဒီလိုတစ်ခု လုပ်မယ်
              </h5>
              <p className="text-[11px] text-[#8e767d] leading-relaxed font-['Burmese_Handwriting']">
                ကိုယ်ပိုင် ကိုယ်စား ကိုယ်တိုင်ဖန်တီး အမှတ်တရလက်ဆောင်လေး
                ပို့လိုက်ပါ။
              </p>
              <div className="pt-1">
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-xs font-bold transition-all shadow-xs"
                  style={{
                    backgroundColor: colors.accent,
                  }}
                >
                  စတင်မယ်
                </Link>
              </div>
            </div>
          </SlideUp>
        )}
      </section>
    </div>
  );
}
