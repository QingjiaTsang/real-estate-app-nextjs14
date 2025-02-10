/* eslint node/prefer-global/process: [error] */
// @ts-check // tells TS to type check this file as well, despite it is a JS file
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
// use dotenv for running seeding scripts
// import dotenv from 'dotenv'

// dotenv.config()

export const env = createEnv({
  /**
   * Environment variables available on both client and server
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },

  /**
   * Environment variables only available on server
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    KINDE_CLIENT_ID: z.string().min(1),
    KINDE_CLIENT_SECRET: z.string().min(1),
    KINDE_ISSUER_URL: z.string().min(1),
    KINDE_SITE_URL: z.string().min(1),
    KINDE_POST_LOGOUT_REDIRECT_URL: z.string().min(1),
    KINDE_POST_LOGIN_REDIRECT_URL: z.string().min(1),
    PIXELS_API_KEY: z.string().min(1),
  },

  /**
   * Pass environment variables to validation 
   */
  runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
    KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
    KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
    KINDE_SITE_URL: process.env.KINDE_SITE_URL,
    KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
    KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
    PIXELS_API_KEY: process.env.PIXELS_API_KEY,
  },
})
