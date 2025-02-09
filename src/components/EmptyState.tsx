import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface EmptyStateProps {
  title?: string
  description?: string
  showAddButton?: boolean
}

function EmptyState({
  title = 'No Properties Found',
  description = 'There are no properties available at the moment. Start adding or check back later.',
  showAddButton = false,
}: EmptyStateProps) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center justify-center p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl blur opacity-25 animate-pulse" />
          <div className="relative flex items-center justify-center w-full h-full bg-white dark:bg-zinc-900 rounded-xl">
            <span className="text-4xl">🏠</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
          {title}
        </h3>

        <p className="text-foreground/70 mb-8 max-w-md">
          {description}
        </p>

        {showAddButton && (
          <Link href="/user/properties/add">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg
              hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
            >
              Add Property
            </Button>
          </Link>
        )}
      </motion.div>
    </div>
  )
}

export default EmptyState
