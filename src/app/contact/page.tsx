"use client"

import { useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Mail, MapPin, CheckCircle2, Phone } from "lucide-react"
import FadeIn from "@/components/fade-in"

// Animated Letters Component
const AnimatedLetters = ({ text }: { text: string }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 12, stiffness: 200 },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: { type: "spring" as const, damping: 12, stiffness: 200 },
    },
  };

  return (
    <motion.h1
      className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-8 font-[family-name:var(--font-outfit)] flex flex-wrap"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden className="flex flex-wrap">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {Array.from(word).map((letter, letterIndex) => (
              <motion.span variants={child} key={letterIndex} className="inline-block">
                {letter}
              </motion.span>
            ))}
            <span className="inline-block w-3 md:w-4">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </motion.h1>
  );
};

// Custom Brand Icons
const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState("submitting")

    const formData = new FormData(e.currentTarget)
    // Using the hardcoded Web3Forms access key as provided
    formData.append("access_key", "696c9f6c-786a-4a42-8c40-31d94aa00f27")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      
      const data = await response.json()
      if (data.success) {
        setFormState("success")
      } else {
        console.error("Form submission failed", data)
        setFormState("idle")
      }
    } catch (error) {
      console.error("Error submitting form", error)
      setFormState("idle")
    }
  }

  // 3D Tilt Logic
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const springConfig = { damping: 20, stiffness: 100 }
  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)
  
  // Notice we use a very subtle tilt so typing isn't annoying
  const rotateX = useTransform(mouseYSpring, [0, 1], [5, -5])
  const rotateY = useTransform(mouseXSpring, [0, 1], [-5, 5])

  function handlePointerMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }
  function handlePointerLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <div className="bg-transparent min-h-screen relative pt-28 lg:pt-32">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pb-20 lg:pb-32 pt-4 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32">
          
          {/* Left Column - Intro & Info */}
          <div>
            <FadeIn className="mb-6">
               <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase text-neutral-300">
                 Initiate
               </span>
            </FadeIn>
            
            <AnimatedLetters text="Let's build the extraordinary." />
            
            <FadeIn delay={0.8}>
              <p className="text-xl text-neutral-400 font-light mb-16 max-w-md">
                Currently accepting 3 new client builds this month. I reply to every inquiry within 24 hours.
              </p>
            </FadeIn>

            <FadeIn delay={1}>
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">Phone</h4>
                    <a href="tel:+15403956493" className="text-xl text-white hover:text-neutral-300 transition-colors block mb-1">
                      (540) 395-6493
                    </a>
                    <span className="text-sm text-neutral-500">Call or text — fastest way to reach me</span>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">Email</h4>
                    <a href="mailto:hello@ronlenserdigital.com" className="text-xl text-white hover:text-neutral-300 transition-colors">
                      hello@ronlenserdigital.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">Studio</h4>
                    <p className="text-xl text-white">
                      Fredericksburg, VA<br />
                      <span className="text-neutral-500 text-lg">Remote Worldwide</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <LinkedinIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">LinkedIn</h4>
                    <a href="https://linkedin.com/in/ron-lenser" target="_blank" rel="noopener noreferrer" className="text-xl text-white hover:text-neutral-300 transition-colors">
                      Ron Lenser
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <FacebookIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">Facebook</h4>
                    <a href="https://facebook.com/ron.lenser" target="_blank" rel="noopener noreferrer" className="text-xl text-white hover:text-neutral-300 transition-colors">
                      Ron Lenser
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - 3D Form */}
          <FadeIn delay={0.4} direction="up" className="lg:mt-12 [perspective:1000px]">
            <motion.div 
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="p-8 md:p-12 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl relative shadow-2xl"
            >
              {/* Highlight Glow following mouse inside form */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{
                  background: useTransform(
                    [mouseXSpring, mouseYSpring],
                    ([latestX, latestY]) => `radial-gradient(600px circle at ${Number(latestX) * 100}% ${Number(latestY) * 100}%, rgba(255,255,255,0.05), transparent 80%)`
                  )
                }}
              />

              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ transform: "translateZ(30px)" }}
                  className="flex flex-col items-center justify-center text-center py-20 relative z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-medium text-white mb-4">Inquiry Received</h3>
                  <p className="text-neutral-400 font-light">
                    Our team will review your project details and get back to you within 24 hours to schedule an introductory call.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10 group" style={{ transform: "translateZ(20px)" }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group/input">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer"
                        placeholder=" "
                      />
                      <label htmlFor="name" className="absolute left-0 top-4 text-neutral-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white">
                        Full Name
                      </label>
                    </div>
                    <div className="relative group/input">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer"
                        placeholder=" "
                      />
                      <label htmlFor="email" className="absolute left-0 top-4 text-neutral-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white">
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="relative group/input">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer"
                      placeholder=" "
                    />
                    <label htmlFor="company" className="absolute left-0 top-4 text-neutral-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white">
                      Company / Brand
                    </label>
                  </div>

                  <div className="relative group/input">
                    <select
                      id="budget"
                      name="budget"
                      required
                      defaultValue=""
                      className="w-full bg-transparent border-b border-white/20 py-4 text-neutral-500 focus:text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden>Select Project Budget</option>
                      <option value="starter" className="bg-neutral-900">Starter ($1k - $3k)</option>
                      <option value="growth" className="bg-neutral-900">Growth ($3k - $7k)</option>
                      <option value="scale" className="bg-neutral-900">Scale ($7k - $15k)</option>
                      <option value="enterprise" className="bg-neutral-900">Enterprise ($15k+)</option>
                    </select>
                  </div>

                  <div className="relative group/input">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer resize-none"
                      placeholder=" "
                    ></textarea>
                    <label htmlFor="message" className="absolute left-0 top-4 text-neutral-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white">
                      Project Details
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full py-5 bg-white text-black font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-70 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    {formState === "submitting" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Submit Inquiry <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
