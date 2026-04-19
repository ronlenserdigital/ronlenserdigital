"use client"
import FadeIn from "@/components/fade-in"

export default function PrivacyPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl text-neutral-300">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-[family-name:var(--font-outfit)]">Privacy Policy</h1>
          <div className="space-y-6 font-light leading-relaxed">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Ron Lenser Digital ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
              Identity Data (first name, last name), Contact Data (email address, telephone numbers), and Technical Data (IP address, browser type).
            </p>
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">2. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              Where we need to perform the contract we are about to enter into or have entered into with you. Where it is necessary for our legitimate interests.
            </p>
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">3. Contact Details</h2>
            <p>
              Our full details are:<br/>
              Ron Lenser Digital<br/>
              Studio Location: Fredericksburg, VA<br/>
              Email: hello@ronlenserdigital.com
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
