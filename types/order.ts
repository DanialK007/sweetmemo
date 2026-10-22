import { CardData } from "./card";

export type OrderStatus = "pending" | "confirmed" | "rejected" | "expired";
export type PaymentMethod = "kpay" | "wavepay";

export interface Order {
  id: string;
  userId: string;
  userEmail?: string;
  userName?: string;
  templateSlug: string;
  templateTitle?: string;
  status: OrderStatus;
  price: number; // in MMK (Myanmar Kyats)
  paymentMethod: PaymentMethod;
  paymentPhone: string;
  screenshotURL?: string | null;
  cardData: CardData;
  pageSlug?: string | null;
  adminNote?: string | null;
  createdAt: any; // Firestore Timestamp or string
  updatedAt: any;
  confirmedAt?: any | null;
}

export interface PaymentInfo {
  kpayNumber: string;
  kpayName: string;
  waveNumber: string;
  waveName: string;
}
