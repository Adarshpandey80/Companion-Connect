// pages/PrivacyPolicy.js
import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 px-[6%] pb-20 bg-gradient-to-br from-[#fff9f5] to-[#f7f0ff]">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#5e3d8c] mb-8 hover:text-[#e879a0] transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-4">Privacy Policy</h1>
        <p className="text-[#6b5b7a] mb-8">Last updated: March 29, 2025</p>
        
        <div className="bg-white rounded-xl p-8 shadow-md space-y-6">
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">Information We Collect</h2>
            <p className="text-[#6b5b7a] leading-relaxed mb-3">
              We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include:
            </p>
            <ul className="list-disc pl-6 text-[#6b5b7a] space-y-2">
              <li>Name, email address, phone number, and location</li>
              <li>Profile information including photos, bio, and service preferences</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Communication history and booking details</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">How We Use Your Information</h2>
            <p className="text-[#6b5b7a] leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-[#6b5b7a] space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process bookings and payments</li>
              <li>Verify user identities and ensure platform safety</li>
              <li>Communicate with you about your account and bookings</li>
              <li>Send you updates, promotions, and important notices</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">Data Security</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              We implement industry-standard security measures to protect your personal information. All data is encrypted during transmission using SSL/TLS protocols. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">Information Sharing</h2>
            <p className="text-[#6b5b7a] leading-relaxed mb-3">
              We do not sell, trade, or rent your personal information to third parties. We may share information:
            </p>
            <ul className="list-disc pl-6 text-[#6b5b7a] space-y-2">
              <li>With your consent or at your direction</li>
              <li>To comply with legal obligations</li>
              <li>To protect the rights and safety of our users and platform</li>
              <li>With service providers who assist in our operations (payment processing, hosting, etc.)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">Your Rights</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              You have the right to access, correct, or delete your personal information. You can manage your account settings or contact us at privacy@companionconnect.com to exercise these rights.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-3">Contact Us</h2>
            <p className="text-[#6b5b7a] leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at privacy@companionconnect.com or at our registered address.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;