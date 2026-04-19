"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-black/70 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-end">

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path
            return (
              <Link
                key={link.name}
                href={link.path}
                className="relative group text-sm font-medium"
              >
                <span
                  className={`transition-colors duration-200 ${
                    isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
                  }`}
                >
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            )
          })}
          <Link
            href="/contact"
            className="ml-4 px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-neutral-200 transition-colors"
          >
            Start a Project
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 right-0 h-screen bg-black z-40 flex flex-col justify-center items-center space-y-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <Link
                    href={link.path}
                    className={`text-4xl font-medium tracking-tighter ${
                      pathname === link.path ? "text-white" : "text-neutral-500"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="pt-8"
              >
                <Link
                  href="/contact"
                  className="px-8 py-4 text-lg font-medium text-black bg-white rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start a Project
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
