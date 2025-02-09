export const metadata = {
  title: 'EstateHub',
  description: 'EstateHub, easy to find your dream house',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
}
