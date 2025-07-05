import type { Metadata } from 'next'
import { Inter, Inconsolata, Roboto } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Container from '@/components/global/Container'
import Provider from './provider'

import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })
const inconsolata = Inconsolata({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Next Storefront',
  description: 'A nifty store build with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body>
          <Provider>
            <Navbar />
            <Container className='py-20'>{children}</Container>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
