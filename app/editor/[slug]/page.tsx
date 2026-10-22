import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { templates } from "@/lib/templates";
import EditorForm from "./EditorForm";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

async function EditorContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EditorForm slug={slug} />;
}

export default function EditorPage(props: PageProps<"/editor/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex items-center gap-2 text-sm text-[#88757a]">
            <LoaderCircle size={20} className="animate-spin text-[#d92d5c]" />
            <span>Loading editor…</span>
          </div>
        </div>
      }
    >
      <EditorContent params={props.params} />
    </Suspense>
  );
}
