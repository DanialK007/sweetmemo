import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

export interface PageData {
  slug: string;
  templateSlug: string;
  recipientName: string;
  senderName: string;
  occasionDate: string | null;
  message: string;
  theme: string;
  birthdayData?: any;
  userId: string;
  createdAt: any;
  updatedAt?: any;
}

/**
 * Save a page to Firestore (uses 'pages' collection to match existing data model)
 */
export async function savePageToFirestore(
  userId: string,
  pageData: Omit<PageData, "userId" | "createdAt" | "updatedAt">
): Promise<string> {
  const pageRef = doc(collection(db, "pages"));
  const pageWithMeta: PageData = {
    ...pageData,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(pageRef, pageWithMeta);
  return pageRef.id;
}

/**
 * Fetch a page by slug from Firestore
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  const pagesRef = collection(db, "pages");
  const q = query(pagesRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return doc.data() as PageData;
}

/**
 * Fetch all pages for a specific user
 */
export async function getUserPages(userId: string): Promise<PageData[]> {
  const pagesRef = collection(db, "pages");
  const q = query(pagesRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data() as PageData);
}
