import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen, ChevronRight, HelpCircle } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductDetail } from '@/components/product-detail'
import { ProductCard } from '@/components/product-card'
import { categories, getProductArticle, getProductBySlug, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  const article = getProductArticle(slug)
  return {
    title: `${product.name} chính hãng | Mayanhvietnam`,
    description: article?.intro ?? product.description,
    keywords: [product.name, product.brand, 'chính hãng', 'giá tốt', 'Mayanhvietnam'],
    openGraph: {
      title: `${product.name} chính hãng | Mayanhvietnam`,
      description: article?.intro ?? product.description,
      images: [product.image],
      type: 'article',
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const article = getProductArticle(slug)
  const category = categories.find((c) => c.slug === product.categorySlug)
  const related = products
    .filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug)
    .concat(products.filter((p) => p.slug !== product.slug && p.categorySlug !== product.categorySlug))
    .slice(0, 4)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Trang chủ
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">
                  <ChevronRight className="size-3" />
                </li>
                <li>
                  <Link
                    href={`/danh-muc/${category.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">
              <ChevronRight className="size-3" />
            </li>
            <li aria-current="page" className="font-medium text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>

        <ProductDetail product={product} />

        {/* SEO article — dedicated content for this product */}
        {article && (
          <article aria-labelledby="article-heading" className="mt-16 lg:mt-20">
            <div className="mx-auto max-w-3xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <BookOpen className="size-4" aria-hidden="true" />
                Bài viết đánh giá chi tiết
              </p>
              <h2
                id="article-heading"
                className="mt-3 text-balance text-2xl font-bold sm:text-3xl"
              >
                {article.title}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {article.intro}
              </p>

              <div className="mt-8 flex flex-col gap-8">
                {article.sections.map((section) => (
                  <section key={section.heading}>
                    <h3 className="flex items-center gap-2 text-lg font-bold">
                      <span
                        aria-hidden="true"
                        className="h-5 w-1 rounded-full bg-primary"
                      />
                      {section.heading}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-muted-foreground">{section.body}</p>
                  </section>
                ))}
              </div>

              {article.faqs && article.faqs.length > 0 && (
                <section aria-labelledby="faq-heading" className="mt-10">
                  <h3
                    id="faq-heading"
                    className="flex items-center gap-2 text-lg font-bold"
                  >
                    <HelpCircle className="size-5 text-primary" aria-hidden="true" />
                    Câu hỏi thường gặp
                  </h3>
                  <dl className="mt-4 flex flex-col gap-3">
                    {article.faqs.map((faq) => (
                      <div
                        key={faq.q}
                        className="rounded-2xl border border-border bg-card p-5"
                      >
                        <dt className="font-semibold">{faq.q}</dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {faq.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>
          </article>
        )}

        {/* Related products */}
        <section aria-labelledby="related-heading" className="mt-16">
          <h2 id="related-heading" className="mb-6 text-2xl font-bold">
            Có thể bạn quan tâm
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
