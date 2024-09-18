'use server'

import { authAction } from "@/libs/actions/safeAction"

export const getDbUser = authAction.action(async ({ ctx }) => ctx.user)