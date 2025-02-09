import { Link } from '@nextui-org/react'

function Footer() {
  return (
    <footer id="contact" className="bg-gray-100 py-10 w-dvw">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">EstateHub</h3>
          <p className="text-gray-600 mb-4">Your gateway to premium real estate</p>
          <div className="flex justify-center gap-4 mb-8">
            <Link href="#" color="primary">
              Privacy Policy
            </Link>
            <Link href="#" color="primary">
              Terms of Service
            </Link>
            <Link href="#" color="primary">
              Contact Us
            </Link>
          </div>
          <p className="text-sm text-gray-500">© 2023 EstateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
