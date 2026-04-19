import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description: "Custom web development, AI booking integrations, local SEO, and conversion architecture — all from one builder.",
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
