'use client'
import { Prisma, } from '@prisma/client'

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Pagination, Spinner, } from '@nextui-org/react';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';


type PropertyTableProps = {
  properties: Prisma.PropertyGetPayload<{
    include: {
      type: true
      status: true
    }
  }>[],
  totalPage: number,
  page: number
}


const PropertyTable = ({ properties, totalPage, page }: PropertyTableProps) => {
  const router = useRouter()
  const [loadingState, setLoadingState] = useState<"idle" | "loading">("idle");


  const handlePageChange = (page: number) => {
    setLoadingState("loading");
    router.push(`/user/properties?page=${page}`, { scroll: true });
  }

  useEffect(() => {
    setLoadingState("idle");
  }, [properties]);

  return (
    <div className='container mx-auto p-2 md:p-4 flex flex-col gap-1'>
      <div className="md:hidden">
        {
          properties.map((property) => (
            <MobilePropertyCard key={property.id} {...property} />
          ))
        }
      </div>

      <div className='hidden md:block mb-4'>
        <Table aria-label="Property Table" >
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody loadingState={loadingState} loadingContent={<Spinner />}>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>{property.name}</TableCell>
                <TableCell>{property.price.toString()}</TableCell>
                <TableCell>{property.type.value}</TableCell>
                <TableCell>{property.status.value}</TableCell>
                <TableCell className='flex items-center gap-2'>
                  <Tooltip content="View Details" >
                    <Link href={`/properties/${property.id}`}>
                      <EyeIcon className="w-4 h-4 cursor-pointer mr-2 hover:text-primary transition-colors duration-200" />
                    </Link>
                  </Tooltip>

                  <Tooltip content="Edit Property" >
                    <Link href={`/user/properties/${property.id}/edit`}>
                      <PencilIcon className="w-4 h-4 cursor-pointer mr-2 hover:text-success transition-colors duration-200" />
                    </Link>
                  </Tooltip>

                  <Tooltip content="Delete Property" >
                    <Link href={`/user/properties/${property.id}/delete`}>
                      <TrashIcon className="w-4 h-4 cursor-pointer hover:text-danger transition-colors duration-200" />
                    </Link>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className='flex justify-center'>
        <Pagination
          showShadow
          showControls
          total={totalPage}
          initialPage={1}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default PropertyTable


const MobilePropertyCard = (property: PropertyTableProps['properties'][0]) => (
  <div key={property.id} className="bg-white p-4 rounded-lg mb-4 shadow-md border border-gray-200">
    <h3 className="font-bold">{property.name}</h3>
    <p>Price: {property.price.toString()}</p>
    <p>Type: {property.type.value}</p>
    <p>Status: {property.status.value}</p>
    <div className="flex items-center gap-2 mt-2">
      <Link href={`/user/properties/${property.id}`}>
        <EyeIcon className="w-5 h-5 cursor-pointer mr-2" />
      </Link>
      <Link href={`/user/properties/${property.id}/edit`}>
        <PencilIcon className="w-5 h-5 cursor-pointer mr-2" />
      </Link>
      <Link href={`/user/properties/${property.id}/delete`}>
        <TrashIcon className="w-5 h-5 cursor-pointer hover:text-danger transition-colors duration-200" />
      </Link>
    </div>
  </div>
);
