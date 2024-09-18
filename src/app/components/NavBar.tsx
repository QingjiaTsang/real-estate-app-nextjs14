'use client'

import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
} from '@nextui-org/react'
import { HomeModernIcon } from '@heroicons/react/24/solid'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


interface NavBarProps {
  children: React.ReactNode
}

export default function NavBar({ children }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { isAuthenticated } = useKindeBrowserClient();


  const menuItems = isAuthenticated ? [
    {
      textValue: 'Profile',
      href: '/profile'
    },
    {
      textValue: 'Dashboard',
      href: '/dashboard'
    },
    {
      textValue: 'Log Out',
      href: '/api/auth/logout'
    }
  ] : [
    {
      textValue: 'Log In',
      href: '/api/auth/login'
    },
    {
      textValue: 'Sign Up',
      href: '/api/auth/signup'
    }
  ];

  return (
    <Navbar
      isBordered
      className='shadow'
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

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div>{children}</div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              <DropdownItem key="dashboard" textValue="Dashboard" href="/dashboard">Dashboard</DropdownItem>
              <DropdownItem key="profile" textValue="Profile" href="/profile">Profile</DropdownItem>
              {/* api/auth/logout route from kinde provider */}
              <DropdownItem key="logout" textValue="Log Out" href="api/auth/logout">Log Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>


      <NavbarMenu >
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
