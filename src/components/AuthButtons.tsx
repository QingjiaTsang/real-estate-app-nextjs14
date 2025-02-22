'use client'

import { Button, NavbarContent, NavbarItem } from '@nextui-org/react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AuthButtons() {
  return (
    <NavbarContent justify="end" className="gap-4 hidden sm:flex">
      <NavbarItem>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          whileHover={{
            scale: 1.05,
          }}
        >
          <Button
            as={Link}
            href="/api/auth/login"
            className="bg-transparent hover:bg-primary/10 text-foreground border-2 border-primary/20
                  hover:border-primary/40 font-medium transition-all duration-300"
            variant="bordered"
          >
            Login
          </Button>
        </motion.div>
      </NavbarItem>
      <NavbarItem>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          whileHover={{
            scale: 1.05,
          }}
        >
          <Button
            as={Link}
            href="/api/auth/register"
            className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium
                  shadow-lg hover:shadow-blue-500/25 hover:opacity-90
                  transition-all duration-300"
            variant="flat"
          >
            Sign up
          </Button>
        </motion.div>
      </NavbarItem>
    </NavbarContent>
  )
}
