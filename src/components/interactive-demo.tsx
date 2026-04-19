"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Zap, Bell, CheckCircle2, Search, MapPin, Star, AlignLeft, BarChart } from "lucide-react"
import Image from "next/image"

export default function InteractiveDemo() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const runSequence = () => {
      timeout = setTimeout(() => {
        setStep(1);
        timeout = setTimeout(() => {
          setStep(2);
          timeout = setTimeout(() => {
            setStep(3);
            timeout = setTimeout(() => {
              setStep(0);
              runSequence();
            }, 4000);
          }, 1500);
        }, 2000);
      }, 1200);
    };

    runSequence();
    return () => clearTimeout(timeout);
  }, [])

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col bg-[#F5F5F7] border border-white/10">
      {/* Sleek Browser Frame */}
      <div className="w-full bg-neutral-900 border-b border-white/10 h-12 flex items-center px-4 gap-4 shrink-0 shadow-lg relative z-20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-inner" />
        </div>
        <div className="flex-1 max-w-md mx-auto h-7 bg-black rounded-md flex items-center px-3 border border-white/5">
          <Search className="w-3 h-3 text-neutral-600 mr-2" />
          <span className="text-[10px] text-neutral-500 font-mono tracking-widest">ronlenser.com/client-site</span>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative overflow-hidden bg-white">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black"
              >
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Zap className="w-10 h-10 text-white" />
                </motion.div>
                <p className="text-white text-xs mt-6 uppercase tracking-widest font-[family-name:var(--font-outfit)]">Optimizing Assets</p>
              </motion.div>
            )}

            {(step === 1 || step === 2 || step === 3) && (
              <motion.div 
                key="website"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col"
              >
                {/* Mock Website Header */}
                <div className="h-14 bg-white/80 backdrop-blur-md shadow-sm border-b border-neutral-100 flex items-center justify-between px-8 shrink-0 z-50 absolute top-0 w-full">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center shadow-md shadow-blue-500/20">
                       <MapPin className="w-3 h-3 text-white" />
                     </div>
                     <div className="text-black font-bold tracking-tighter text-lg font-[family-name:var(--font-outfit)]">Apex Roofing</div>
                   </div>
                   <div className="flex gap-6 hidden md:flex items-center">
                     <span className="text-xs font-medium text-neutral-500 hover:text-black">Services</span>
                     <span className="text-xs font-medium text-neutral-500 hover:text-black">About Us</span>
                     <span className="text-xs font-medium text-neutral-500 hover:text-black">Reviews</span>
                     <div className="px-4 py-1.5 bg-black text-white text-xs font-bold rounded-full">Call Now</div>
                   </div>
                </div>
                   
                {/* Mock Website Hero */}
                <div className="flex-1 flex flex-col md:flex-row items-center pt-20 pb-8 px-8 lg:px-16 gap-12 bg-white relative overflow-hidden h-full">
                   
                   {/* Background Decorative Graphic */}
                   <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                   
                   {/* Left Side (Copy & Form) */}
                   <div className="flex-1 space-y-6 relative z-10 max-w-lg mt-8">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-neutral-600 ml-2 font-bold tracking-tight">150+ 5-Star Local Reviews</span>
                      </div>
                      
                      <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight font-[family-name:var(--font-outfit)]">
                          The #1 Roofing Experts in the Tri-State Area.
                        </h1>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
                          Don't let a small leak turn into a massive repair. Get a free, instant estimate from our certified contractors today.
                        </p>
                      </div>
                      
                      <div className="pt-2 max-w-sm flex flex-col gap-3">
                         <div className="h-14 w-full bg-white rounded-xl shadow-sm border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 flex items-center px-4 relative overflow-hidden transition-all">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={step >= 2 ? { width: "100%" } : { width: 0 }}
                             transition={{ duration: 0.5 }}
                             className="overflow-hidden whitespace-nowrap text-sm text-slate-800 font-semibold"
                           >
                             john@example.com
                           </motion.div>
                           {step < 2 && (
                             <span className="text-xs text-slate-400 absolute left-4 font-medium">Enter your email address...</span>
                           )}
                         </div>
                         <motion.div 
                           className="h-14 w-full bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30 cursor-pointer"
                           whileTap={{ scale: 0.98 }}
                           animate={step >= 2 ? { scale: [1, 0.98, 1], backgroundColor: ["#2563EB", "#1D4ED8", "#2563EB"] } : {}}
                           transition={{ duration: 0.3 }}
                         >
                           {step >= 3 ? <CheckCircle2 className="w-5 h-5 text-white" /> : "Get Free Estimate"}
                         </motion.div>
                         <p className="text-[10px] text-slate-400 font-medium text-center mt-1 uppercase tracking-wider">No Credit Card Required</p>
                      </div>
                   </div>
                   
                   {/* Right Side (Visual Detail - Realistic Dashboard/Image Card) */}
                   <div className="flex-1 h-full max-h-[340px] w-full hidden md:flex items-center justify-center relative z-10 perspective-1000 mt-8">
                      <motion.div 
                        className="w-full h-full bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 flex flex-col"
                        initial={{ rotateY: -10, rotateX: 5 }}
                        animate={{ rotateY: [-5, 0, -5], rotateX: [2, 0, 2] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                         <div className="h-10 border-b border-slate-800 flex items-center px-4 justify-between bg-slate-950/50">
                           <span className="text-xs font-semibold text-slate-300">Project Estimation Tool</span>
                           <BarChart className="w-4 h-4 text-blue-400" />
                         </div>
                         <div className="p-6 flex-1 flex flex-col gap-4">
                           <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                               <AlignLeft className="w-5 h-5 text-blue-400" />
                             </div>
                             <div>
                               <div className="text-slate-200 font-bold text-sm">Roof Replacement</div>
                               <div className="text-slate-500 text-xs mt-1">Total Square Footage: 2,400 sqft</div>
                             </div>
                           </div>
                           <div className="h-px w-full bg-slate-800 my-2" />
                           <div className="space-y-3">
                             <div className="flex justify-between items-center text-xs">
                               <span className="text-slate-400">Materials (Architectural Shingles)</span>
                               <span className="text-slate-200 font-mono">$4,200.00</span>
                             </div>
                             <div className="flex justify-between items-center text-xs">
                               <span className="text-slate-400">Labor & Installation</span>
                               <span className="text-slate-200 font-mono">$3,800.00</span>
                             </div>
                             <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800/50">
                               <span className="text-slate-300 font-bold">Estimated Total</span>
                               <span className="text-blue-400 font-mono font-bold">$8,000.00</span>
                             </div>
                           </div>
                         </div>
                      </motion.div>
                      
                      {/* Scanning animation to simulate "high tech quote generation" */}
                      {step === 1 && (
                        <motion.div 
                          className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent"
                          initial={{ y: "-100%" }}
                          animate={{ y: "200%" }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        />
                      )}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Notification */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-8 right-8 glass-panel p-4 rounded-xl border border-white/20 flex items-center gap-4 bg-black/90 shadow-2xl z-50"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 shrink-0">
                <Bell className="w-5 h-5 text-green-400" />
              </div>
              <div className="pr-4">
                <h4 className="text-white text-sm font-bold font-[family-name:var(--font-outfit)]">New Lead Captured</h4>
                <p className="text-neutral-400 text-xs">John D. requested an estimate</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  )
}
