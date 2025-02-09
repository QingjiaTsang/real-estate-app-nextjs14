import Footer from '@/app/(landing)/_components/Footer'
import Header from '@/components/Header'
import UserAuthPanel from '@/components/UserAuthPanel'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { NextUIProvider } from '@nextui-org/react'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      <AuroraBackground>
        <div className="min-h-screen flex flex-col">
          <Header>
            <UserAuthPanel />
          </Header>
          {children}
          <Footer />
        </div>
      </AuroraBackground>
    </NextUIProvider>
  )
}
