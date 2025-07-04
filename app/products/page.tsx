import ProductsContainer from '@/components/products/ProductsContainer'

async function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string }
}) {
  const { layout: _layout, search: _search } = await searchParams
  const layout = _layout || 'grid'
  const search = _search || ''
  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  )
}
export default ProductsPage
