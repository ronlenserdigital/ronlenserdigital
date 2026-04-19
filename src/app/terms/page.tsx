"use client"
import FadeIn from "@/components/fade-in"

export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl text-neutral-300">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-[family-name:var(--font-outfit)]">Terms of Service</h1>
          <div className="space-y-6 font-light leading-relaxed">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Please read these terms and conditions carefully before using Our Service.
            </p>
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">1. Acknowledgment</h2>
            <p>
              These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. 
              These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
            </p>
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">2. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Ron Lenser Digital 
              and its licensors. The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.
            </p>
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">3. Limitation of Liability</h2>
            <p>
              Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this 
              Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service.
            </p>
            <h2 className="text-2xl text-white font-medium mt-8 mb-4">4. Governing Law</h2>
            <p>
              The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. 
              Studio Location: Fredericksburg, VA.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
