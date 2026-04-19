import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Let's build your website. I reply within 24 hours.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
