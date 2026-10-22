export type Theme = "rose" | "lavender" | "gold";

export interface CardData {
  recipientName: string;
  senderName: string;
  message: string;
  occasionDate: string | null;
  photoURL?: string | null;
  theme: Theme;
  musicURL?: string | null;
  extra?: Record<string, any>;
}

export interface PublicCardPage {
  slug: string;
  orderId: string;
  userId: string;
  templateSlug: string;
  cardData: CardData;
  qrCodeDataURL?: string;
  shareURL: string;
  viewCount: number;
  isActive: boolean;
  createdAt: string; // ISO date string or Firestore Timestamp
  expiresAt?: string | null;
}
