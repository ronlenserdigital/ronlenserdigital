import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex flex-col mb-6 group">
              <span className="text-3xl font-bold tracking-tight text-white font-[family-name:var(--font-outfit)] leading-none group-hover:opacity-80 transition-opacity">
                RON LENSER
              </span>
              <span className="text-xs font-medium tracking-[0.4em] text-white/90 font-[family-name:var(--font-outfit)] mt-1.5 ml-1 group-hover:opacity-80 transition-opacity">
                DIGITAL
              </span>
            </Link>
            <p className="text-neutral-300 max-w-sm text-balance mb-6">
              Building high converting websites and automated booking systems for ambitious businesses.
            </p>
            <p className="text-neutral-400 text-sm mb-2">
              Studio in Fredericksburg, VA
            </p>
            <a href="tel:+15403956493" className="text-neutral-300 text-sm hover:text-white transition-colors">
              (540) 395-6493
            </a>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6">Socials</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://www.facebook.com/remakerony" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ron-lenser-09b0a83bb" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Ron Lenser Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
             <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
