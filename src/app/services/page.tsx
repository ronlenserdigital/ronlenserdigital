"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import FadeIn from "@/components/fade-in"
import AnimatedText from "@/components/animated-text"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ServiceCard from "@/components/service-card"

export default function ServicesPage() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <div className="bg-transparent relative min-h-screen pt-32">
      {/* Intro */}
      <section className="container mx-auto px-6 md:px-12 py-20 lg:py-32">
        <div className="max-w-4xl">
          <FadeIn className="mb-8">
             <span className="text-neutral-500 font-medium tracking-widest uppercase text-sm font-[family-name:var(--font-outfit)]">The System</span>
          </FadeIn>
          <AnimatedText
            text="I build systems, not just sites."
            el="h1"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-10 font-[family-name:var(--font-outfit)]"
          />
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-3xl text-neutral-400 font-light max-w-2xl text-balance leading-snug">
              Every website I build is an engine designed to capture local attention, build absolute trust, and book jobs while you're on the clock.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="border-t border-white/5 py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Custom Web Applications",
                desc: "No Wix. No cheap templates. I build blazing fast, custom engineered sites that make your local competitors look outdated.",
                tags: ["Next.js", "React", "Tailwind CSS"],
              },
              {
                title: "AI Booking Integrations",
                desc: "I wire your site directly into automated calendars and AI assistants so leads book jobs without you lifting a finger.",
                tags: ["Scheduling", "AI Agents", "Automations"],
              },
              {
                title: "Local SEO Dominance",
                desc: "Beautiful sites are useless if no one in your city sees them. I build technical SEO directly into the architecture to rank your business higher in local search.",
                tags: ["Local SEO", "Speed Optimization", "Core Web Vitals"],
              },
              {
                title: "Conversion Architecture",
                desc: "Every pixel is placed with a psychological purpose. We guide the user from their first click straight to your checkout or booking form.",
                tags: ["CRO", "Copywriting", "UX/UI Design"],
              },
            ].map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                desc={service.desc}
                tags={service.tags}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Results / Stats */}
      <section ref={targetRef} className="py-32 border-y border-white/10 relative overflow-hidden bg-black/40 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none w-full z-0">
           <span className="text-[20vw] font-bold leading-none tracking-tighter text-center">IMPACT</span>
        </motion.div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
            {[
              { stat: "100%", label: "Custom Engineered" },
              { stat: "0.2s", label: "Average Load Time" },
              { stat: "24/7", label: "Automated Bookings" },
              { stat: "1", label: "Developer You Talk To" },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4 font-[family-name:var(--font-outfit)]">{item.stat}</div>
                  <div className="text-neutral-300 font-light">{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 font-[family-name:var(--font-outfit)]">Ready to build your machine?</h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-medium text-lg hover:scale-105 transition-transform"
          >
            Start Your Build <ArrowRight size={20} />
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
