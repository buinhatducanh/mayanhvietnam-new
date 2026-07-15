import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductDetail } from '@/components/product-detail'
import { ProductCard } from '@/components/product-card'
import { categories, getProductBySlug, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — Mayanhvietnam`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const category = categories.find((c) => c.slug === product.categorySlug)
  const related = products
    .filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug)
    .concat(products.filter((p) => p.slug !== product.slug && p.categorySlug !== product.categorySlug))
    .slice(0, 4)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-6 sm:pt-8 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3" />
            </li>
            {category && (
              <>
                <li>
                  <Link
                    href={`/danh-muc/${category.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3" />
                </li>
              </>
            )}
            <li aria-current="page" className="font-medium text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>

        <ProductDetail product={product} />

        <section aria-labelledby="related-heading" className="mt-20">
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
