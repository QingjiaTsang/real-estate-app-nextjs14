import Header from '@/components/Header'
import UserAuthPanel from '@/components/UserAuthPanel'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header>
        <UserAuthPanel />
      </Header>
      {children}
    </>
  )
}
