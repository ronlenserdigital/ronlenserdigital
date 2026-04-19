"use client"
import FadeIn from "@/components/fade-in"

export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl text-neutral-300">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-[family-name:var(--font-outfit)]">Terms of Service</h1>
          <div className="space-y-6 font-light leading-relaxed">
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
            <p>
              Please read these terms and conditions carefully before using our services or website. By accessing or using the Service, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl text-white font-medium mt-8 mb-4">1. Scope of Services</h2>
            <p>
              Ron Lenser Digital provides custom web development, digital design, and SEO services. All projects are subject to an individual statement of work or proposal outlining specific deliverables, timelines, and payment structures.
            </p>

            <h2 className="text-2xl text-white font-medium mt-8 mb-4">2. Payment Terms</h2>
            <p>
              Unless otherwise specified in a formal proposal, a standard non-refundable deposit is required before any development work begins. The remaining balance is due upon project completion or predetermined milestones. We reserve the right to suspend services or withhold final deliverables if payments are not made according to the agreed schedule.
            </p>

            <h2 className="text-2xl text-white font-medium mt-8 mb-4">3. Intellectual Property</h2>
            <p>
              Upon final payment of all outstanding invoices, the intellectual property rights to the final delivered website, design, and code will be transferred to the client. Ron Lenser Digital retains the right to display the completed project in our portfolio and marketing materials unless a non-disclosure agreement (NDA) has been explicitly signed. We retain full ownership of any pre-existing code libraries, internal tools, or base architectures used during development.
            </p>

            <h2 className="text-2xl text-white font-medium mt-8 mb-4">4. Revisions and Scope Creep</h2>
            <p>
              Each project includes a specified number of revision rounds. Requests that fall outside the original scope of work will be billed at our standard hourly rate or quoted as a separate phase of the project.
            </p>

            <h2 className="text-2xl text-white font-medium mt-8 mb-4">5. Limitation of Liability</h2>
            <p>
              Notwithstanding any damages that you might incur, the entire liability of Ron Lenser Digital and its suppliers under any provision of these Terms, and your exclusive remedy for all of the foregoing, shall be limited to the amount actually paid by you for the specific service in dispute. We are not liable for any indirect, incidental, or consequential business losses.
            </p>

            <h2 className="text-2xl text-white font-medium mt-8 mb-4">6. Governing Law</h2>
            <p>
              The laws of the Commonwealth of Virginia, United States, excluding its conflicts of law rules, shall govern these Terms and your use of the Service. Any disputes arising from this agreement shall be resolved in the courts located in Virginia.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
