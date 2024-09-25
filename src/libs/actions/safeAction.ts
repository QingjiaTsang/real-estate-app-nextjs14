import prisma from "@/libs/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { redirect } from "next/navigation";

export class ActionError extends Error { }

export const action = createSafeActionClient({
  handleServerError: (error) => {
    console.log("error from safeAction", error)
    if (error instanceof ActionError) {
      return error.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  }
})

export const authAction = action.use(async ({ ctx, next }) => {
  const { isAuthenticated, getUser } = await getKindeServerSession()

  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    // redirect('/api/auth/login')
    throw new ActionError('Unauthorized')
  }

  const kindeUser = await getUser()

  const user = await prisma.user.findUnique({
    where: {
      id: kindeUser.id
    }
  })

  if (!user) {
    throw new ActionError('User not found')
  }

  return next({ ctx: { ...ctx, user } })
})