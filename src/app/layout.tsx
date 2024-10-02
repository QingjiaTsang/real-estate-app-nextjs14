import type { Metadata } from 'next'
import NavBar from '@/app/components/NavBar'

import UserAuthPanel from '@/app/components/UserAuthPanel'

import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'

import { SpeedInsights } from "@vercel/speed-insights/next"

import localFont from 'next/font/local'

import './globals.css'


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
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextUIProvider>
          <SpeedInsights />
          <Toaster richColors={true} position="top-center" />
          <NavBar>
            <UserAuthPanel />
          </NavBar>
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}
