import { CardSignInButton } from '../form/Buttons'
import { fetchFavoriteId } from '@/utils/actions'
import FavoriteToggleForm from './FavoriteToggleForm'
import { auth } from '@clerk/nextjs/server'
// import { useAuth } from '@clerk/nextjs'

async function FavoriteToggleButton({ productId }: { productId: string }) {
  const { userId } = await auth()

  if (!userId) return <CardSignInButton />
  const favoriteId = await fetchFavoriteId({ productId })

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />
}
export default FavoriteToggleButton
