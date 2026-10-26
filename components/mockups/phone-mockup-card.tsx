"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PhoneMockupCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "cherry" | "titanium" | "black" | "white" | "orange" | "purple";
  visibleRatio?: number;
  showDynamicIsland?: boolean;
  screenClassName?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<
  NonNullable<PhoneMockupCardProps["variant"]>,
  {
    outerBezel: string;
    rim: string;
    buttons: string;
    shadow: string;
  }
> = {
  cherry: {
    outerBezel: "bg-[#2d1b22] border-[#4a2e36]",
    rim: "ring-1 ring-[#6b434e]/50",
    buttons: "bg-[#4a2e36]",
    shadow: "shadow-[0_25px_60px_-15px_rgba(217,45,92,0.25)]",
  },
  titanium: {
    outerBezel: "bg-[#242426] border-[#3a3a3c]",
    rim: "ring-1 ring-[#5c5c60]/50",
    buttons: "bg-[#3a3a3c]",
    shadow: "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)]",
  },
  black: {
    outerBezel: "bg-[#111111] border-[#1f1f1f]",
    rim: "ring-1 ring-white/10",
    buttons: "bg-[#222222]",
    shadow: "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]",
  },
  white: {
    outerBezel: "bg-[#f2f2f7] border-[#e5e5ea]",
    rim: "ring-1 ring-[#d1d1d6]",
    buttons: "bg-[#d1d1d6]",
    shadow: "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]",
  },
  orange: {
    outerBezel: "bg-[#361c14] border-[#663524]",
    rim: "ring-1 ring-[#ff7a51]/30",
    buttons: "bg-[#663524]",
    shadow: "shadow-[0_25px_60px_-15px_rgba(255,107,61,0.25)]",
  },
  purple: {
    outerBezel: "bg-[#231b2d] border-[#433358]",
    rim: "ring-1 ring-[#8765b3]/30",
    buttons: "bg-[#433358]",
    shadow: "shadow-[0_25px_60px_-15px_rgba(135,101,179,0.25)]",
  },
};

export function PhoneMockupCard({
  variant = "cherry",
  visibleRatio = 1,
  showDynamicIsland = true,
  className,
  screenClassName,
  children,
  ...props
}: PhoneMockupCardProps) {
  const currentVariant = variantStyles[variant] || variantStyles.cherry;

  return (
    <div
      className={cn(
        "relative w-[310px] sm:w-[330px] select-none",
        className
      )}
      style={{
        maxHeight: visibleRatio < 1 ? `${visibleRatio * 100}%` : undefined,
      }}
      {...props}
    >
      {/* ─── Hardware Buttons (Left side) ─── */}
      {/* Action Button */}
      <div
        className={cn(
          "absolute -left-[5px] top-[110px] w-[5px] h-[26px] rounded-l-xs",
          currentVariant.buttons
        )}
      />
      {/* Volume Up */}
      <div
        className={cn(
          "absolute -left-[5px] top-[152px] w-[5px] h-[50px] rounded-l-xs",
          currentVariant.buttons
        )}
      />
      {/* Volume Down */}
      <div
        className={cn(
          "absolute -left-[5px] top-[214px] w-[5px] h-[50px] rounded-l-xs",
          currentVariant.buttons
        )}
      />

      {/* ─── Hardware Button (Right side - Power) ─── */}
      <div
        className={cn(
          "absolute -right-[5px] top-[170px] w-[5px] h-[72px] rounded-r-xs",
          currentVariant.buttons
        )}
      />

      {/* ─── Phone Outer Chassis ─── */}
      <div
        className={cn(
          "relative w-full h-[640px] sm:h-[660px] p-[10px] rounded-[52px] border-[5px]",
          currentVariant.outerBezel,
          currentVariant.rim,
          currentVariant.shadow
        )}
      >
        {/* Subtle metallic antenna bands */}
        <div className="absolute top-[85px] left-0 right-0 h-[2px] bg-black/30 pointer-events-none" />
        <div className="absolute bottom-[85px] left-0 right-0 h-[2px] bg-black/30 pointer-events-none" />

        {/* ─── Inner Display Bezel ─── */}
        <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-black flex flex-col">
          {/* Speaker Ear-piece Notch */}
          <div className="absolute hidden top-1 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1a1a1a] rounded-full z-40 pointer-events-none" />

          {/* Dynamic Island */}
          {showDynamicIsland && (
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 h-[26px] w-[110px] bg-black rounded-full z-40 pointer-events-none flex items-center justify-between px-3 shadow-md border border-white/5">
              {/* Front Camera Lens */}
              <div className="w-[11px] h-[11px] rounded-full bg-[#0a0a14] border border-[#1b1b2f] flex items-center justify-center">
                <div className="w-[4px] h-[4px] rounded-full bg-[#1e2348]" />
              </div>
              {/* Sensor */}
              <div className="w-[7px] h-[7px] rounded-full bg-[#0d0d12]" />
            </div>
          )}

          {/* ─── Screen Content Slot ─── */}
          <div
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            onWheel={(e) => e.stopPropagation()}
            className={cn(
              "w-full h-full overflow-y-auto overscroll-contain select-text pt-0",
              screenClassName
            )}
          >
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/30 backdrop-blur-md rounded-full pointer-events-none z-30" />
        </div>
      </div>
    </div>
  );
}

export default PhoneMockupCard;
