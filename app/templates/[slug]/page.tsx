import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { templates } from "@/lib/templates";
import { notFound } from "next/navigation";
import DesignClientView from "./DesignClientView";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

async function TemplateDesignContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    notFound();
  }

  return <DesignClientView template={template} />;
}

export default function TemplateDesignPage(
  props: PageProps<"/templates/[slug]">
) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex items-center gap-2 text-sm text-[#88757a]">
            <LoaderCircle size={20} className="animate-spin text-[#d92d5c]" />
            <span>Loading template preview…</span>
          </div>
        </div>
      }
    >
      <TemplateDesignContent params={props.params} />
    </Suspense>
  );
}
