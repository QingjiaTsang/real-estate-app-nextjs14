'use client'

import { Button } from '@nextui-org/react'
// @ts-expect-error ignore it
import { useFormStatus } from 'react-dom'

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      color="danger"
      isLoading={pending}
      className="w-full py-2 text-sm font-medium text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      {pending ? 'Deleting...' : 'Delete'}
    </Button>
  )
}

export default DeleteButton
