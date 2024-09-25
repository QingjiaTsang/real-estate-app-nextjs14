'use client'
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { PencilIcon } from "@heroicons/react/24/solid"
import FileInput from "@/app/components/FileInput";
import { updateUserAvatar } from "@/libs/actions/user";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";


const UploadAvatarButton = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [avatar, setAvatar] = useState<File | undefined>();

  const router = useRouter()

  const { execute: updateAvatar, isExecuting, result } = useAction(updateUserAvatar, {
    onSuccess: () => {
      toast.success("Avatar updated")
      router.refresh()
      onClose()
    },
    onError: (error) => {
      toast.error("Failed to update avatar")
    }
  })

  const onSubmit = async () => {
    if (!avatar) {
      onClose()
      return;
    }

    const formData = new FormData()
    formData.append('avatar', avatar!)

    updateAvatar(formData)
  }


  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer" onClick={onOpen}>
        <PencilIcon className="w-4 h-4" />
        <span className="text-sm text-slate-500 font-sans">Upload</span>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form action={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">Upload Avatar</ModalHeader>

              <ModalBody>
                <FileInput
                  lablText="Select Avatar"
                  accept="image/*"
                  image={avatar}
                  onChange={(e) => setAvatar(e?.target?.files?.[0])}
                />
                {
                  avatar && (
                    <Image
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="w-full h-full object-cover"
                      width={0}
                      height={0}
                    />
                  )
                }
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isExecuting}
                  isDisabled={isExecuting}
                >
                  Change Avatar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default UploadAvatarButton