import BreadCrumbs from '@/components/single-product/BreadCrumbs'
import Image from 'next/image'
import { formatCurrency } from '@/utils/format'
import FavoriteToggleButton from '@/components/products/FavoriteToggleButton'
import AddToCart from '@/components/single-product/AddToCart'
import ProductRating from '@/components/single-product/ProductRating'
import ShareButton from '@/components/single-product/ShareButton'
import SubmitReview from '@/components/reviews/SubmitReview'
import ProductReview from '@/components/reviews/ProductReview'
import { fetchSingleProduct, findExistingReview } from '@/utils/actions'
import { auth } from '@clerk/nextjs/server'
import ProductReviews from '@/components/reviews/ProductReview'

async function SingleProductPage({ params }: any) {
  const { id: _id } = await params
  const product = await fetchSingleProduct(_id)
  const { name, image, company, description, price } = product
  const dollarsAmount = formatCurrency(price)
  const { userId } = await auth()
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, product.id))
  return (
    <section>
      <BreadCrumbs name={product.name} />
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE FIRST COL */}
        <div className='relative h-full'>
          <Image
            src={image}
            alt={name}
            fill
            sizes='(max-width:768px) 100vw,(max-width:1366px) 50vw,33vw'
            priority
            className='w-full rounded-md object-cover'
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className='flex gap-x-8 items-center'>
            <h1 className='capitalize text-3xl font-bold'>{name}</h1>

            <div className='flex items-center gap-x-2'>
              <FavoriteToggleButton productId={_id} />
              <ShareButton name={product.name} productId={product.id} />
            </div>
          </div>
          <ProductRating productId={_id} />
          <h4 className='text-xl mt-2'>{company}</h4>
          <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
            {dollarsAmount}
          </p>
          <p className='mt-6 leading-8 text-muted-foreground'>{description}</p>
          <AddToCart productId={_id} />
        </div>
      </div>
      <ProductReviews productId={params.id} />
      {reviewDoesNotExist && <SubmitReview productId={params.id} />}
    </section>
  )
}
export default SingleProductPage
