"use client"
import FadeIn from "@/components/fade-in"

export default function PrivacyPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl text-neutral-300">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-[family-name:var(--font-outfit)]">Privacy Policy</h1>
          <div className="space-y-6 font-light leading-relaxed">
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
            <p>
              Ron Lenser Digital ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We may collect, use, store, and transfer different kinds of personal data about you. When you submit inquiries through our contact forms, we collect Identity Data (first name, last name), Contact Data (email address, telephone numbers), and details regarding your project budget and business needs. We also collect Technical Data (IP address, browser type, location) automatically via cookies to improve site performance.
            </p>
            
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">2. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to your inquiries and project requests.</li>
              <li>Perform the contract we are about to enter into or have entered into with you.</li>
              <li>Improve our website, services, and marketing via analytics.</li>
            </ul>
            
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">3. Cookies</h2>
            <p>
              Our website uses cookies to distinguish you from other users of our website. This helps us provide you with a good experience when you browse our website and also allows us to improve our site. You can set your browser to refuse all or some browser cookies.
            </p>

            <h2 className="text-2xl text-white font-medium mt-8 mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>

            <h2 className="text-2xl text-white font-medium mt-8 mb-4">5. Contact Details</h2>
            <p>
              Our full details are:<br/>
              Ron Lenser Digital<br/>
              Studio Location: Fredericksburg, Virginia, USA<br/>
              Email: hello@ronlenserdigital.com
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
