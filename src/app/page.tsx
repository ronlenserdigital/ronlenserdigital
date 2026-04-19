"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, CheckCircle2, TrendingUp, CalendarDays, Code2 } from "lucide-react"
import FadeIn from "@/components/fade-in"
import AnimatedText from "@/components/animated-text"
import InteractiveDemo from "@/components/interactive-demo"
import GrowthAnimation from "@/components/growth-animation"
import ServiceCard from "@/components/service-card"
import Marquee from "@/components/marquee"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div ref={containerRef} className="bg-transparent relative">

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            <FadeIn delay={0.1} className="mb-6">
              <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase text-neutral-300">
                Stop losing clients to bad design
              </span>
            </FadeIn>

            <AnimatedText
              text="I build websites that actually book clients."
              el="h1"
              className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white mb-6"
            />
            
            <FadeIn delay={0.6} duration={1} className="max-w-2xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide text-balance">
                I build automated websites that capture leads for local businesses, contractors, and service pros. 
                Stop missing out on clients while you're on the job.
              </p>
            </FadeIn>

            <FadeIn delay={0.8} className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-white text-black rounded-full font-medium text-lg overflow-hidden flex items-center gap-3 transition-transform hover:scale-105"
              >
                <span className="relative z-10">Book a Strategy Call</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="group px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium text-lg flex items-center gap-3 hover:bg-white/5 transition-all"
              >
                <span>See How I Build</span>
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="tracking-widest uppercase text-[10px]">Scroll</span>
          <div className="w-[1px] h-12 bg-neutral-800 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
              animate={{ top: ["-50%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Strip - Infinite Marquee */}
      <section className="relative z-10 py-12 border-y border-white/10 bg-black/40 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex flex-col items-center">
          <p className="text-xs tracking-widest uppercase text-neutral-500 mb-8 font-medium font-[family-name:var(--font-outfit)]">Building Machines For Local Businesses</p>
          <div className="w-full opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <Marquee speed={30}>
              {[ 
                "Contractors", "Plumbers", "Roofers", "MedSpas", 
                "Consultants", "Landscapers", "Electricians", "HVAC", 
                "Law Firms", "Dentists" 
              ].map((brand, i) => (
                <div 
                  key={i} 
                  className="text-2xl md:text-4xl font-bold tracking-tighter text-white uppercase font-[family-name:var(--font-outfit)] shrink-0 px-4"
                >
                  {brand}
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Showreel Section */}
      <section className="relative z-10 py-32 bg-transparent">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-[family-name:var(--font-outfit)]">
                  <span className="text-neutral-500">Stop relying on word of mouth. <br className="hidden md:block" />
                  You need a</span> <span className="text-white">real website.</span>
                </h2>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.4} className="mt-12">
            <InteractiveDemo />
          </FadeIn>
        </div>
      </section>

      {/* Signature Services - Glass Separator */}
      <section className="relative z-10 py-32 bg-black/40 backdrop-blur-md border-y border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-white">
                How I Build Growth.
              </h2>
              <p className="text-xl text-neutral-400 font-light">
                I don't just build pretty pages. I engineer automated ecosystems that capture leads and close deals.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="w-8 h-8 mb-6 text-white" />,
                title: "Custom Web Development",
                desc: "Built from scratch for speed, conversion, and total brand authority. No cheap templates.",
              },
              {
                icon: <CalendarDays className="w-8 h-8 mb-6 text-white" />,
                title: "AI Booking Integrations",
                desc: "Automated scheduling and lead capture built directly into your site so you never miss a client.",
              },
              {
                icon: <TrendingUp className="w-8 h-8 mb-6 text-white" />,
                title: "High-Octane SEO",
                desc: "Optimized technical architecture so your business dominates local and global search results.",
              },
            ].map((service, i) => (
              <ServiceCard 
                key={i}
                title={service.title}
                desc={service.desc}
                icon={service.icon}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us / Differentiation */}
      <section className="relative z-10 py-32 bg-transparent">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 font-[family-name:var(--font-outfit)]">
                  <span className="text-neutral-500">Not an overpriced agency.</span> <br />
                  <span className="text-white">A local growth partner.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Zero generic templates. Everything is custom-engineered to convert.",
                    "I work directly with you. You're never passed to a junior developer.",
                    "Obsessive attention to detail that builds instant trust with your customers.",
                    "Built for performance, automated for scale.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-white shrink-0 mt-1" />
                      <p className="text-lg text-neutral-300 font-light">{item}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.3}>
              <GrowthAnimation />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-40 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter text-white mb-8">
              Ready for a real website?
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto font-light">
              Stop relying on word of mouth or broken templates. Let's build a machine that works for you 24/7.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-medium text-lg hover:scale-105 transition-transform"
            >
              Book Your Build <ArrowRight size={20} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
