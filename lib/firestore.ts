import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
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
 * Update an existing page in Firestore
 */
export async function updatePageInFirestore(
  slug: string,
  pageData: Partial<Omit<PageData, "userId" | "createdAt" | "slug">>
): Promise<void> {
  const pagesRef = collection(db, "pages");
  const q = query(pagesRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Page not found");
  }

  const docRef = querySnapshot.docs[0].ref;
  await setDoc(docRef, {
    ...pageData,
    updatedAt: serverTimestamp(),
  }, { merge: true });
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

/**
 * Move a page to trash (soft delete with 30-day retention)
 */
export async function moveToTrash(slug: string): Promise<void> {
  const pagesRef = collection(db, "pages");
  const q = query(pagesRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Page not found");
  }

  const docRef = querySnapshot.docs[0].ref;
  const pageData = querySnapshot.docs[0].data() as PageData;

  // Move to trash collection
  const trashRef = doc(collection(db, "trash"));
  await setDoc(trashRef, {
    ...pageData,
    deletedAt: serverTimestamp(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  });

  // Delete from pages collection
  await deleteDoc(docRef);
}

/**
 * Restore a page from trash
 */
export async function restoreFromTrash(slug: string): Promise<void> {
  const trashRef = collection(db, "trash");
  const q = query(trashRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Item not found in trash");
  }

  const trashDoc = querySnapshot.docs[0];
  const trashData = trashDoc.data() as PageData & { deletedAt: any; expiresAt: any };

  // Remove trash metadata
  const { deletedAt, expiresAt, ...pageData } = trashData;

  // Restore to pages collection
  const pagesRef = doc(collection(db, "pages"));
  await setDoc(pagesRef, pageData);

  // Delete from trash
  await deleteDoc(trashDoc.ref);
}
