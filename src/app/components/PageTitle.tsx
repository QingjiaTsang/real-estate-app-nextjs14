'use client'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { cn } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface PageTitleProps {
  title: string
  backCaption?: string
  backHref?: string
  backIcon?: React.ReactNode
  className?: string
  rightContent?: React.ReactNode
}

function PageTitle({
  title,
  backCaption,
  backHref,
  backIcon = <ArrowLeftIcon className="h-6 w-6 md:h-7 md:w-7" />,
  className,
  rightContent,
}: PageTitleProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    }
    else {
      router.back()
    }
  }

  return (
    <div>
      <div
        className={cn(
          'flex items-center justify-between p-4 bg-primary-400',
          className,
        )}
      >
        <button
          onClick={handleBack}
          className="text-lg font-bold text-white md:text-xl"
        >
          {backIcon}
        </button>
        <h1 className="text-xl font-bold md:text-2xl text-white ml-10 md:ml-0">{title}</h1>
        <div>{rightContent}</div>
      </div>
    </div>

    // <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-4">
    //   <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
    //   {backCaption && backHref && (
    //     <div className="flex cursor-pointer items-center gap-1">
    //       <div>{backIcon}</div>
    //       <Link
    //         href={backHref}
    //         className="text-lg font-bold text-black md:text-xl"
    //       >
    //         {backCaption}
    //       </Link>
    //     </div>
    //   )}
    // </div>
  )
}

export default PageTitle
