"use client"

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-50 bg-black">
      {/* Ultra-crisp 4K architectural grid pattern for high-end tech aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{ 
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", 
          backgroundSize: "80px 80px" 
        }} 
      />
      
      {/* Static, high-performance radial gradient for depth without the lag of blur filters */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.03)_0%,_transparent_40%)]" />
    </div>
  )
}
