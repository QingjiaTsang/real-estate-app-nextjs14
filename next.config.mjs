/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: {
      displayName: false,
    },
    env: {
      KINDE_SITE_URL: process.env.KINDE_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
      KINDE_POST_LOGOUT_REDIRECT_URL:
        process.env.KINDE_POST_LOGOUT_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}`,
      KINDE_POST_LOGIN_REDIRECT_URL:
        process.env.KINDE_POST_LOGIN_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}/api/auth/success`
    }
  },
}

export default nextConfig
