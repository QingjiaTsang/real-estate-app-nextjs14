/* eslint node/prefer-global/process: [error] */

import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  KINDE_CLIENT_ID: z.string().min(1, 'KINDE_CLIENT_ID is required'),
  KINDE_CLIENT_SECRET: z.string().min(1, 'KINDE_CLIENT_SECRET is required'),
  KINDE_ISSUER_URL: z.string().min(1, 'KINDE_ISSUER_URL is required'),
  KINDE_SITE_URL: z.string().min(1, 'KINDE_SITE_URL is required'),
  KINDE_POST_LOGOUT_REDIRECT_URL: z.string().min(1, 'KINDE_POST_LOGOUT_REDIRECT_URL is required'),
  KINDE_POST_LOGIN_REDIRECT_URL: z.string().min(1, 'KINDE_POST_LOGIN_REDIRECT_URL is required'),

  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_URL is required'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),

  // TODO: add stripe
  // NEXT_PUBLIC_STRIPE_PUBLICSHABLE_KEY: z.string().min(1, 'NEXT_PUBLIC_STRIPE_PUBLICSHABLE_KEY is required'),
  // STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY is required'),

  PIXELS_API_KEY: z.string().min(1, 'PIXELS_API_KEY is required'),
})

function envParse() {
  const envVars = {
    DATABASE_URL: process.env.DATABASE_URL,

    KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
    KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
    KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
    KINDE_SITE_URL: process.env.KINDE_SITE_URL,
    KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
    KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL,

    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

    PIXELS_API_KEY: process.env.PIXELS_API_KEY,
  }

  const parsed = envSchema.safeParse(envVars)

  if (!parsed.success) {
    console.error(
      '❌ Environment variables validation failed:',
      JSON.stringify(parsed.error.flatten().fieldErrors, null, 2),
    )
    throw new Error('Environment variables validation failed')
  }

  return parsed.data
}

export const env = envParse()
