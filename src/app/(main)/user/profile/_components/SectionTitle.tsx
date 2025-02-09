import { cn, Divider } from '@nextui-org/react'

interface SectionTitleProps {
  title: string
  className?: string
}

function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <>
      <h2 className={cn('text-lg md:text-xl font-bold text-slate-500', className)}>{title}</h2>
      <Divider className="mb-3" />
    </>
  )
}

export default SectionTitle
