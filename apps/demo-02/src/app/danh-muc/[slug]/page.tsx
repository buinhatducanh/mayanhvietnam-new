import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CategoryListing } from '@/components/category-listing'
import { categories, getProductsByCategory, products } from '@/lib/products'

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) return {}
  return {
    title: `${category.name} chính hãng | Mayanhvietnam`,
    description: `Mua ${category.name.toLowerCase()} chính hãng, giá tốt, bảo hành toàn quốc tại Mayanhvietnam.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  const categoryProducts = getProductsByCategory(slug)
  // For empty categories, still show the listing UI with all products as suggestions
  const listing = categoryProducts.length > 0 ? categoryProducts : products

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3" />
            </li>
            <li aria-current="page" className="font-medium text-foreground">
              {category.name}
            </li>
          </ol>
        </nav>

        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Danh mục</p>
          <h1 className="mt-1 text-3xl font-bold text-balance sm:text-4xl">{category.name}</h1>
          {categoryProducts.length === 0 && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Danh mục đang được cập nhật thêm sản phẩm. Dưới đây là các sản phẩm nổi bật khác bạn
              có thể quan tâm.
            </p>
          )}
        </header>

        <CategoryListing allProducts={listing} />
      </main>
      <SiteFooter />
    </>
  )
}
