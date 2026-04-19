"use client"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { MouseEvent } from "react"

import { ReactNode } from "react"

interface ServiceCardProps {
  title: string;
  desc: string;
  tags?: string[];
  icon?: ReactNode;
  delay?: number;
}

export default function ServiceCard({ title, desc, tags = [], icon, delay = 0 }: ServiceCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl border border-white/10 bg-neutral-950/50 p-8 overflow-hidden hover:bg-neutral-900/50 transition-colors duration-500"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10">
        {icon && <div className="mb-6">{icon}</div>}
        <h3 className="text-2xl font-medium text-white mb-4">{title}</h3>
        <p className="text-neutral-400 font-light leading-relaxed mb-8">
          {desc}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-black/50 text-xs font-medium text-neutral-300 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
