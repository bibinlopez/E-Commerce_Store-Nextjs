'use server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { imageSchema, productSchema, validateWithZodSchema } from './schemas'
import { uploadImage } from './supabase'

const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) redirect('/')
  return user
}

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : 'an error occured',
  }
}

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  })
  return products
}

export const fetchAllProducts = async ({ search = '' }: { search: string }) => {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const fetchSingleProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) {
    redirect('/products')
  }
  return product
}

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get('image') as File
    const validatedFields = validateWithZodSchema(productSchema, rawData)

    const validateFile = validateWithZodSchema(imageSchema, { image: file })

    const fullPath = await uploadImage(validateFile.image)

    await prisma.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    })
  } catch (error) {
    return renderError(error)
  }

  redirect('/admin/products')
}
