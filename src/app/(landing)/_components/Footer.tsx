import { Link } from '@nextui-org/react'

function Footer() {
  return (
    <footer id="contact" className="relative bg-gradient-to-b from-gray-50/80 to-gray-100/90 dark:bg-gradient-to-b dark:from-zinc-800/60 dark:to-zinc-900/80 py-10 w-dvw backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">EstateHub</h3>
          <p className="text-foreground/60 mb-4">Your gateway to premium real estate</p>
          <div className="flex justify-center gap-4 mb-8">
            <Link href="#" className="text-primary hover:text-primary/80">
              Privacy Policy
            </Link>
            <Link href="#" className="text-primary hover:text-primary/80">
              Terms of Service
            </Link>
            <Link href="#" className="text-primary hover:text-primary/80">
              Contact Us
            </Link>
          </div>
          <p className="text-sm text-foreground/50">© 2023 EstateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
