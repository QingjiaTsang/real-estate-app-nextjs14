'use client'

import { HomeModernIcon } from '@heroicons/react/24/solid'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import {
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
import { useState } from 'react'

interface NavBarProps {
  children: React.ReactNode
}

export default function NavBar({ children }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { isAuthenticated } = useKindeBrowserClient()

  const menuItems = isAuthenticated
    ? [
      {
        textValue: 'Profile',
        href: '/user/profile',
      },
      {
        textValue: 'Properties',
        href: '/user/properties',
      },
      {
        textValue: 'Log Out',
        href: '/api/auth/logout',
      },

    ]
    : [
      {
        textValue: 'Log In',
        href: '/api/auth/login',
      },
      {
        textValue: 'Sign Up',
        href: '/api/auth/register',
      },
    ]

  return (
    <Navbar
      isBordered
      className="shadow"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            href="/"
            className="flex items-center gap-2 text-primary-400 hover:text-primary-600 transition-colors"
          >
            <HomeModernIcon className="w-10 md:w-12" />
            <p className="font-bold text-inherit">Real Estate</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* desktop menu */}
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div>{children}</div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              {menuItems.map(item => (
                <DropdownItem key={item.textValue} textValue={item.textValue} href={item.href}>
                  {item.textValue}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      {/* mobile menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.textValue}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.textValue}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
