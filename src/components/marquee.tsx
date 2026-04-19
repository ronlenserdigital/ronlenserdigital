"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function Marquee({ children, speed = 40 }: { children: ReactNode, speed?: number }) {
  return (
    <div className="w-full overflow-hidden flex relative group">
      {/* Edge Gradients for smooth fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex shrink-0 items-center gap-12 md:gap-24 px-6 md:px-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
