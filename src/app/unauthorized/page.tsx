import { Button } from '@nextui-org/react'
import Link from 'next/link'

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Unauthorized Access</h1>
        <p className="text-xl text-gray-600 mb-8">You are not authorized to view this page.</p>
        <div className="flex justify-center">
          <Button
            as={Link}
            href="/"
            color="primary"
            className="px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage