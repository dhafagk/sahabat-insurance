// app/(app)/news/[slug]/page.tsx
import { cache } from "react";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import type { SerializedEditorState } from "lexical";
import Navbar from "../../components/Navbar";
import ArticleHeader from "../../components/ArticleHeader";
import ArticleBody from "../../components/ArticleBody";
import LatestNews from "../../components/LatestNews";
import { getLocale } from "../../lib/locale";
import type { NewsItem } from "../../components/LatestNews";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPayloadInstance = cache(async () => getPayload({ config }) as any);

const fetchArticle = cache(async (slug: string, locale: string) => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: "news",
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
    },
    limit: 1,
    depth: 2,
    locale,
  });
  return result.docs[0] ?? null;
});

const fetchRelated = cache(async (excludeId: number, locale: string) => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: "news",
    where: { id: { not_equals: excludeId }, status: { equals: "published" } },
    sort: "-date",
    limit: 4,
    depth: 1,
    locale,
  });
  return result.docs;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const article = await fetchArticle(slug, locale);
  if (!article) return {};
  return {
    title: `${article.title} | Sahabat Insurance`,
    description: article.excerpt ?? undefined,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = await fetchArticle(slug, locale);
  if (!article) notFound();

  const relatedDocs = await fetchRelated(article.id, locale);

  // Resolve image URL (depth:2 resolves image to Media object)
  const imageUrl: string =
    typeof article.image === "object" && article.image?.url
      ? article.image.url
      : "/assets/3.png";

  // Resolve tags (depth:2 resolves to Tag objects)
  const tags: { id: string | number; name: string }[] = (article.tags ?? [])
    .filter((t: unknown) => typeof t === "object" && t !== null)
    .map((t: { id: number; name: string }) => ({ id: t.id, name: t.name }));

  // Map related docs to NewsItem shape
  const relatedNews: NewsItem[] = relatedDocs.map(
    (doc: {
      id: number;
      title: string;
      excerpt?: string | null;
      date: string;
      slug?: string | null;
      tags?: ({ id: number; name: string } | number)[] | null;
      image?: { url?: string | null } | number | null;
    }) => ({
      id: String(doc.id),
      title: doc.title,
      excerpt: doc.excerpt ?? "",
      date: doc.date,
      slug: doc.slug ?? null,
      tags: (doc.tags ?? [])
        .filter((t) => typeof t === "object")
        .map((t) => ({
          id: String((t as { id: number; name: string }).id),
          name: (t as { id: number; name: string }).name,
        })),
      image:
        typeof doc.image === "object" && doc.image !== null
          ? { url: doc.image.url ?? null }
          : null,
    }),
  );

  return (
    <>
      <Navbar />
      <main className="bg-bg min-h-screen py-16 md:py-20">
        <ArticleHeader
          title={article.title}
          date={article.date}
          tags={tags}
          imageUrl={imageUrl}
          imageAlt={article.title}
        />

        {article.content && (
          // article.content matches SerializedEditorState at runtime — Payload guarantees this shape
          <ArticleBody
            content={article.content as SerializedEditorState}
            tags={tags}
          />
        )}

        {relatedNews.length > 0 && (
          <div className="mt-16">
            <LatestNews
              news={relatedNews}
              sectionMeta={{ badge: "Berita", heading: "Berita Terkait" }}
            />
          </div>
        )}
      </main>
    </>
  );
}
