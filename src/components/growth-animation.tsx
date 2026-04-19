"use client"
import { motion, useMotionTemplate, useMotionValue, useTransform, useSpring, useInView } from "framer-motion"
import { MouseEvent, useEffect, useState, useRef } from "react"
import { Code2, BarChart3, Globe, ShieldCheck } from "lucide-react"

export default function GrowthAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D Tilt calculations
  const rotateX = useTransform(mouseY, [0, 800], [10, -10])
  const rotateY = useTransform(mouseX, [0, 800], [-10, 10])
  
  const springConfig = { damping: 20, stiffness: 100 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
    // For tilt we need center-relative coordinates
    const centerX = left + width / 2
    const centerY = top + height / 2
    // We map mouse position relative to center to a rotation value
    // Actually the useTransform above assumes 0-800, let's just pass clientX directly 
    // for simplicity or update the transform. 
  }

  // Simplified tilt logic for reliability
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)
  const tiltX = useTransform(mouseYSpring, [0, 1], [15, -15])
  const tiltY = useTransform(mouseXSpring, [0, 1], [-15, 15])

  function handlePointerMove(e: MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
    
    // Spotlight
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handlePointerLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  const chartPath = "M0,50 C20,50 40,20 60,30 C80,40 100,10 120,5 C140,0 160,25 200,10"

  return (
    <div 
      ref={containerRef}
      className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 glass-panel group [perspective:1000px]"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black p-8 flex flex-col justify-center items-center gap-6 opacity-90">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      </div>
      
      {/* 3D Container */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Center Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[340px] h-[240px] rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl relative p-6 flex flex-col"
          style={{ transform: "translateZ(30px)" }}
        >
           <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
             <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-white/20" />
               <div className="w-2 h-2 rounded-full bg-white/20" />
               <div className="w-2 h-2 rounded-full bg-white/20" />
             </div>
             <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-[family-name:var(--font-outfit)]">System Status</span>
           </div>

           <div className="flex-1 relative">
             <span className="text-white text-sm font-medium">Performance Metrics</span>
             <svg className="absolute inset-0 w-full h-full pt-6" viewBox="0 0 200 60" preserveAspectRatio="none">
               <motion.path 
                 d={chartPath}
                 fill="none"
                 stroke="#fff"
                 strokeWidth="2"
                 initial={{ pathLength: 0 }}
                 animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                 transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
               />
               <motion.path 
                 d={`M0,60 L0,50 C20,50 40,20 60,30 C80,40 100,10 120,5 C140,0 160,25 200,10 L200,60 Z`}
                 fill="url(#gradient)"
                 initial={{ opacity: 0 }}
                 animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                 transition={{ duration: 2, delay: 0.5 }}
               />
               <defs>
                 <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                   <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                 </linearGradient>
               </defs>
             </svg>
           </div>

        {/* Floating Card 1: Code/Speed */}
        <motion.div 
          className="absolute -top-4 -left-4 md:-top-6 md:-left-6 lg:-top-8 lg:-left-8 w-[140px] md:w-[180px] p-3 md:p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md shadow-xl z-20"
          style={{ transform: "translateZ(60px)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
           <div className="flex items-center gap-2 mb-2">
             <Code2 className="w-4 h-4 text-white" />
             <span className="text-[10px] text-white font-medium uppercase tracking-wider">Fast Code</span>
           </div>
           {mounted && (
             <div className="text-[8px] text-neutral-400 font-mono space-y-1">
               <motion.div initial={{ width: 0 }} animate={isInView ? { width: "100%" } : { width: 0 }} className="h-1 bg-white/30 rounded-full overflow-hidden" />
               <motion.div initial={{ width: 0 }} animate={isInView ? { width: "80%" } : { width: 0 }} transition={{ delay: 0.2 }} className="h-1 bg-white/20 rounded-full overflow-hidden" />
               <motion.div initial={{ width: 0 }} animate={isInView ? { width: "60%" } : { width: 0 }} transition={{ delay: 0.4 }} className="h-1 bg-white/10 rounded-full overflow-hidden" />
             </div>
           )}
        </motion.div>

        {/* Floating Card 2: Security/Trust */}
        <motion.div 
          className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 lg:-bottom-8 lg:-right-8 w-[160px] md:w-[200px] p-3 md:p-4 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md shadow-xl flex items-center gap-3 md:gap-4 z-20"
          style={{ transform: "translateZ(80px)" }}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
             <ShieldCheck className="w-4 h-4 text-black" />
           </div>
           <div>
             <div className="text-white text-xs font-bold font-[family-name:var(--font-outfit)]">SSL Secured</div>
             <div className="text-[10px] text-neutral-300">Absolute Trust</div>
           </div>
        </motion.div>

         </motion.div>
      </motion.div>
    </div>
  )
}
