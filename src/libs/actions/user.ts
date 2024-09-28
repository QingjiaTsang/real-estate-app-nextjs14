'use server'

import { authAction } from "@/libs/actions/safeAction"
import prisma from "@/libs/prisma"
import { uploadAvatar } from "@/libs/upload"
import { flattenValidationErrors } from "next-safe-action"

import { z } from "zod"
import { zfd } from "zod-form-data";

// const avatarSchema = z.object({
//   avatar: z.custom<File>((v) => v instanceof File, {
//     message: "Avatar must be a file",
//   })
// })

// use zfd to handle form data instead of zod File type
const avatarSchema = zfd.formData({
  avatar: zfd.file(),
})

export const getDbUser = authAction.action(async ({ ctx }) => ctx.user)

// upload file through next-safe-action
// https://next-safe-action.dev/docs/recipes/upload-files
export const updateUserAvatar = authAction
  .schema(avatarSchema, {
    handleValidationErrorsShape: (errors) => flattenValidationErrors(errors).fieldErrors
  })
  .action(async ({ ctx, parsedInput: { avatar } }) => {
    const userId = ctx.user.id

    const avatarUrl = await uploadAvatar(avatar)

    if (!avatarUrl) {
      throw new Error("Failed to upload avatar")
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
      include: {
        properties: true,
      },
    })

    if (!updatedUser) {
      throw new Error("Failed to update user avatar")
    }

    return updatedUser
  })