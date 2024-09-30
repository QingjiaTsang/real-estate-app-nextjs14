import type { NextRequest } from 'next/server'
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware'

export default function middleware(req: NextRequest) {
  return withAuth(req, {
    isReturnToCurrentPage: true,
  })
}
export const config = {
  matcher: ['/user/:path*'],
}
