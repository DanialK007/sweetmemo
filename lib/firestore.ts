import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Order, OrderStatus } from "@/types/order";
import type { PublicCardPage, CardData } from "@/types/card";

// ==========================================
// 1. User Profiles
// ==========================================

export async function syncUserProfile(user: {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}) {
  if (!user.uid) return;
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || "User",
      email: user.email || "",
      photoURL: user.photoURL || null,
      isAdmin: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    await updateDoc(userRef, {
      displayName: user.displayName || snap.data().displayName,
      photoURL: user.photoURL || snap.data().photoURL,
      updatedAt: serverTimestamp(),
    });
  }
}

// ==========================================
// 2. Orders & Payments
// ==========================================

export async function createOrder(data: {
  userId: string;
  templateSlug: string;
  templateTitle?: string;
  price: number;
  paymentMethod: "kpay" | "wavepay";
  paymentPhone: string;
  cardData: CardData;
}): Promise<string> {
  const ordersRef = collection(db, "orders");
  const newOrderDoc = doc(ordersRef);

  const newOrder: Record<string, any> = {
    id: newOrderDoc.id,
    userId: data.userId,
    templateSlug: data.templateSlug,
    templateTitle: data.templateTitle || "",
    status: "pending" as OrderStatus,
    price: data.price,
    paymentMethod: data.paymentMethod,
    paymentPhone: data.paymentPhone,
    screenshotURL: null,
    cardData: data.cardData,
    pageSlug: null,
    adminNote: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(newOrderDoc, newOrder);
  return newOrderDoc.id;
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const orderRef = doc(db, "orders", orderId);
  const snap = await getDoc(orderRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Order;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const ordersRef = collection(db, "orders");
  const q = query(
    ordersRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnap = await getDocs(q);
  return querySnap.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Order[];
}

export async function updateOrderPaymentProof(
  orderId: string,
  screenshotURL: string,
  paymentPhone?: string
) {
  const orderRef = doc(db, "orders", orderId);
  const updates: Record<string, any> = {
    screenshotURL,
    updatedAt: serverTimestamp(),
  };
  if (paymentPhone) {
    updates.paymentPhone = paymentPhone;
  }
  await updateDoc(orderRef, updates);
}

// ==========================================
// 3. Public Card Pages
// ==========================================

export async function getPublicCard(slug: string): Promise<PublicCardPage | null> {
  const pageRef = doc(db, "pages", slug);
  const snap = await getDoc(pageRef);
  if (!snap.exists()) return null;
  return snap.data() as PublicCardPage;
}
