import PageHeader from '@/app/components/PageHeader'

function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <PageHeader title="Profile" />
      {children}
    </div>
  )
}

export default ProfileLayout
