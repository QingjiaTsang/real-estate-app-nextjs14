import PageTitle from '@/app/components/PageTitle'

function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <PageTitle title="Profile" />
      {children}
    </div>
  )
}

export default ProfileLayout
