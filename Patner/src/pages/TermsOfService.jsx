// pages/TermsOfService.js
import React from 'react';
import { Link } from 'react-router-dom';

function TermsOfService() {
  return (
    <div className="min-h-screen pt-32 px-[6%] pb-20 bg-gradient-to-br from-[#fff9f5] to-[#f7f0ff]">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#5e3d8c] mb-8 hover:text-[#e879a0] transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-4">Terms of Service</h1>
        <p className="text-[#6b5b7a] mb-8">Last updated: March 29, 2025</p>
        
        <div className="bg-white rounded-xl p-8 shadow-md space-y-6">
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">1. Acceptance of Terms</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              By accessing or using Companion Connect, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">2. Platform Purpose</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              Companion Connect is a professional social companionship platform connecting individuals for platonic activities including shopping, travel, events, dining, and entertainment. The platform is strictly for professional, social companionship only.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">3. Prohibited Activities</h2>
            <p className="text-[#6b5b7a] leading-relaxed mb-3">
              The following activities are strictly prohibited:
            </p>
            <ul className="list-disc pl-6 text-[#6b5b7a] space-y-2">
              <li>Any sexual, romantic, or intimate activities</li>
              <li>Illegal activities of any kind</li>
              <li>Harassment, abuse, or inappropriate behavior</li>
              <li>Solicitation or promotion of other services</li>
              <li>Misrepresentation of identity or services</li>
            </ul>
            <p className="text-[#6b5b7a] leading-relaxed mt-3">
              Violation will result in immediate account termination and may be reported to authorities.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">4. User Eligibility</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              You must be at least 18 years old to use Companion Connect. All users must provide accurate, truthful information during registration and verification.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">5. Bookings and Payments</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              All bookings must be made through the platform. Payments are processed securely through our payment partners. Any direct payments or arrangements outside the platform are strictly prohibited and void our guarantee.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">6. Cancellation Policy</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              Cancellations made 24+ hours before the booking receive a full refund. Cancellations within 24 hours may be subject to a 50% cancellation fee. Companions are expected to provide at least 24 hours notice for cancellations.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">7. Account Termination</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these Terms, engage in prohibited activities, or for any reason at our discretion.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">8. Limitation of Liability</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              Companion Connect facilitates connections between users but is not responsible for interactions between clients and companions. Users are responsible for their own safety and should exercise good judgment.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">9. Changes to Terms</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              We may update these Terms from time to time. Continued use of the platform after changes constitutes acceptance of the new Terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">10. Contact</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              Questions about these Terms? Contact us at legal@companionconnect.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;