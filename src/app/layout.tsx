import type { Metadata } from 'next'

import { NextUIProvider } from '@nextui-org/react'

import { SpeedInsights } from '@vercel/speed-insights/next'
import ReactLenis from 'lenis/react'

import localFont from 'next/font/local'

import { Toaster } from 'sonner'

import '@/app/globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'EstateHub',
  description: 'EstateHub, easy to find your dream house',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactLenis root>
          <NextUIProvider>
            <SpeedInsights />
            <Toaster richColors={true} position="top-center" />
            {children}
          </NextUIProvider>
        </ReactLenis>
      </body>
    </html>
  )
}
