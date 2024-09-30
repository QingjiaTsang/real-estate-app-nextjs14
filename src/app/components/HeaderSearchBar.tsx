'use client'
import { cn, Input } from '@nextui-org/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { parseAsString, useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


import VConsole from 'vconsole';


const HeaderSearchBar = () => {
  const router = useRouter()

  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''))

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value)
  }, 500)

  useEffect(() => {
    // Note: refresh the first page data from server component
    router.refresh()
  }, [search])


  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      let vConsole: VConsole;
      const loadVConsole = async () => {
        const VConsole = (await import('vconsole')).default;
      };
      loadVConsole();
      return () => {
        if (vConsole) vConsole.destroy();
      };
    }
  }, [])



  return (
    <div
      className="flex items-center justify-between p-4 bg-primary-400"
    >
      <Input
        type="text"
        startContent={<MagnifyingGlassIcon className="w-5 h-5" />}
        placeholder="Search"
        defaultValue={search}
        onChange={(e) => debouncedSearch(e.target.value)}
        className="w-56 sm:w-96 mx-auto"
      />
    </div>
  )
}

export default HeaderSearchBar