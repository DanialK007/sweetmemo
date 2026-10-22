import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import PublicPageClient from "./PublicPageClient";

async function PublicPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PublicPageClient slug={slug} />;
}

export default function PublicPage(props: PageProps<"/p/[slug]">) {
  return (
    <Suspense
      fallback={
        <main className="page-public">
          <div className="card error-state">
            <span className="empty-mark">
              <LoaderCircle size={23} className="spin" />
            </span>
            <h2>Finding your little page…</h2>
            <p className="muted">Just a moment while the feeling arrives.</p>
          </div>
        </main>
      }
    >
      <PublicPageContent params={props.params} />
    </Suspense>
  );
}
