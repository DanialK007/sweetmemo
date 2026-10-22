"use client";

import {
  Heart,
  Flower2,
  Sparkles,
  Mail,
  Star,
  HeartHandshake,
} from "lucide-react";
import type { TemplateIcon } from "@/lib/templates";

export function IconFor({
  icon,
  size = 26,
}: {
  icon: TemplateIcon;
  size?: number;
}) {
  const props = { size, strokeWidth: 1.5 };
  if (icon === "flower") return <Flower2 {...props} />;
  if (icon === "sparkles") return <Sparkles {...props} />;
  if (icon === "mail") return <Mail {...props} />;
  if (icon === "star") return <Star {...props} />;
  if (icon === "ring") return <HeartHandshake {...props} />;
  return <Heart {...props} />;
}
