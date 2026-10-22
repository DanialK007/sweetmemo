import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import FadeContent from "@/components/FadeContent";

export default function DesignNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex items-center justify-center p-6">
        <FadeContent effect="mist" duration={1.5} trigger="mount">
          <div className="bg-white rounded-3xl border border-[#f4e6e9] p-8 sm:p-12 text-center max-w-md w-full shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-[#fbe8ed] text-[#cb3159] flex items-center justify-center mx-auto mb-4">
              <Heart size={26} />
            </div>
            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#512b38]">
              That design wandered off.
            </h1>
            <p className="text-xs text-[#8e7c81] mt-2 mb-6">
              Take a look through the lovely templates we have ready for you.
            </p>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d92d5c] hover:bg-[#bf214c] text-white font-bold text-xs shadow-sm transition-all"
            >
              <ArrowLeft size={14} />
              <span>Browse templates</span>
            </Link>
          </div>
        </FadeContent>
      </main>
      <Footer />
    </div>
  );
}
