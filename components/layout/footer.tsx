import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">FreelanceHub</span>
            </div>
            <p className="text-background/80 mb-4">
              Connecting talented freelancers with businesses worldwide. Build your career or grow your business with
              us.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-background/60 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-background transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-background transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/categories/programming" className="hover:text-background transition-colors">
                  Programming & Tech
                </Link>
              </li>
              <li>
                <Link href="/categories/design" className="hover:text-background transition-colors">
                  Graphics & Design
                </Link>
              </li>
              <li>
                <Link href="/categories/marketing" className="hover:text-background transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/categories/writing" className="hover:text-background transition-colors">
                  Writing & Translation
                </Link>
              </li>
              <li>
                <Link href="/categories/video" className="hover:text-background transition-colors">
                  Video & Animation
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/help" className="hover:text-background transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/trust-safety" className="hover:text-background transition-colors">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-background transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-background transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/about" className="hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-background transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-background transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2024 FreelanceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
