import prisma from '@/libs/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

// Note: after login, the redirect action will call the api/auth/success route by GET request instead of POST request
export async function GET() {
  const { getUser } = await getKindeServerSession()
  const kindeUser = await getUser()

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        id: kindeUser?.id ?? '',
      },
    })

    if (!dbUser) {
      await prisma.user.create({
        data: {
          id: kindeUser.id,
          email: kindeUser.email ?? '',
          firstName: kindeUser.given_name ?? '',
          lastName: kindeUser.family_name ?? '',
          avatarUrl: kindeUser.picture,
        },
      })
    }

    return NextResponse.redirect('http://localhost:3000/')
  }
  catch (error) {
    console.error('error', error)
    // logout from kinde provider if db user creation fails
    return NextResponse.redirect('http://localhost:3000/api/auth/logout')
  }
}
