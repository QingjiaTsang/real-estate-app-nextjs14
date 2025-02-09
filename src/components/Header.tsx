'use client'

import { HomeModernIcon } from '@heroicons/react/24/solid'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import {
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

function GradientHomeIcon({ className }: { className?: string }) {
  return (
    <div className="relative">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#2563eb' }} />
            <stop offset="100%" style={{ stopColor: '#818cf8' }} />
          </linearGradient>
        </defs>
      </svg>
      <HomeModernIcon
        className={className}
        style={{ fill: 'url(#blue-gradient)' }}
      />
    </div>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated } = useKindeBrowserClient()
  const pathname = usePathname()

  const isLandingPage = pathname === '/'

  const menuItems = isAuthenticated
    ? [
        {
          textValue: 'Properties',
          href: '/properties',
        },
        {
          textValue: 'My profile',
          href: '/user/profile',
        },
        {
          textValue: 'My properties',
          href: '/user/properties',
        },
        {
          textValue: 'Log Out',
          href: '/api/auth/logout',
          className: 'text-danger',
        },
      ]
    : [
        {
          textValue: 'Properties',
          href: '/properties',
        },
        {
          textValue: 'Log In',
          href: '/api/auth/login',
        },
        {
          textValue: 'Sign Up',
          href: '/api/auth/register',
        },
      ]

  const navItems = ['Features', 'Testimonials', 'Contact']

  return (
    <Navbar
      isBordered
      shouldHideOnScroll={true}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-background/70 backdrop-blur-md border-b border-slate-100/20"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-primary-400 hover:text-primary-600 transition-colors"
            >
              <GradientHomeIcon className="w-10 md:w-12" />
              <span className="text-2xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                  EstateHub
                </span>
              </span>
            </Link>
          </motion.div>
        </NavbarBrand>
      </NavbarContent>

      {/* desktop navigation */}
      <NavbarContent
        className={cn(
          'hidden sm:flex gap-4',
          !isLandingPage && 'sm:hidden',
        )}
        justify="center"
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <NavbarItem>
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            </NavbarItem>
          </motion.div>
        ))}
      </NavbarContent>

      {/* desktop user menu */}
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div>{children}</div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions">
                {menuItems.map(item => (
                  <DropdownItem
                    key={item.textValue}
                    href={item.href}
                    className={cn(
                      'w-full',
                      item?.className,
                    )}
                  >
                    {item.textValue}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </motion.div>
        </NavbarItem>
      </NavbarContent>

      {/* mobile menu */}
      <NavbarMenu>
        {/* mobile navigation */}
        {isLandingPage && navItems.map(item => (
          <NavbarMenuItem key={item}>
            <div
              className="text-foreground/80 hover:text-primary transition-colors w-full"
              onClick={() => {
                setIsMenuOpen(false)
                router.push(`#${item.toLowerCase()}`)
              }}
            >
              {item}
            </div>
          </NavbarMenuItem>
        ))}

        {/* mobile user menu */}
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.textValue}-${index}`}>
            <div
              className={cn(
                'w-full cursor-pointer',
                item?.className,
              )}
              onClick={() => {
                setIsMenuOpen(false)
                router.push(item.href)
              }}
            >
              {item.textValue}
            </div>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
