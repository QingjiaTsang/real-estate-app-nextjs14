'use client'

import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type ThemeToggleProps = {
  onToggle?: () => void
}

export default function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleToggle = () => {
    onToggle && onToggle()
    if (document.startViewTransition) {
      document.startViewTransition(() => switchTheme())
      return
    }
    switchTheme()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Button
        size="sm"
        variant="light"
        isIconOnly
        onClick={handleToggle}
        className="hover:bg-default-100"
      > {theme === 'dark'
          ? (
              <Sun className="h-5 w-5" />
            )
          : (
              <Moon className="h-5 w-5" />
            )}
      </Button>
    </motion.div>

  )
}
