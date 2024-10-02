'use client'

import { deletePropertyById } from '@/libs/actions/property'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { toast } from 'sonner'


// Note: the path to the [id]/delete segment can use the (.) matcher rather than (..), since @modal is a slot and not a segment.
// so we can use the (.)[id] matcher to match the [id]/delete route and pass it to the modal.
// reference: https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#modals

interface DeleteModalParallelPageProps {
  params: {
    id: string
  }
}

function DeleteModalParallelPage({ params }: DeleteModalParallelPageProps) {
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { execute: deletePropertyByIdAction, isExecuting } = useAction(deletePropertyById, {
    onSuccess: () => {
      onClose()
      router.back()
      // Note: make sure the page is refreshed after the router.back()
      setTimeout(() => {
        router.refresh()
      }, 50)
      toast.success('Property deleted')
    },
    onError: (error) => {
      console.log('error', error)
      toast.error('Failed to delete property')
      router.back()
    },
  })

  const handleDeleteProperty = async () => {
    await deletePropertyByIdAction({ id: params.id })
  }

  const handleCancel = () => {
    router.back()
  }

  useEffect(() => {
    onOpen()
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleCancel}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Delete Property</ModalHeader>
            <ModalBody>
              <p className="text-center text-gray-600">
                Are you sure you want to delete this property?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleCancel}
              >
                Cancel
              </Button>
              <Button color="primary" onPress={handleDeleteProperty} isLoading={isExecuting}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DeleteModalParallelPage
