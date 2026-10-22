import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import SignInClient from "./SignInClient";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex items-center gap-2 text-sm text-[#88757a]">
            <LoaderCircle size={20} className="animate-spin text-[#d92d5c]" />
            <span>Loading sign in…</span>
          </div>
        </div>
      }
    >
      <SignInClient />
    </Suspense>
  );
}
