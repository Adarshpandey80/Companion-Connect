// pages/ContactUs.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-32 px-[6%] pb-20 bg-gradient-to-br from-[#fff9f5] to-[#f7f0ff]">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#5e3d8c] mb-8 hover:text-[#e879a0] transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-4">Contact Us</h1>
        <p className="text-[#6b5b7a] text-lg mb-8">
          Have questions or need assistance? We're here to help. Reach out to us and we'll get back to you within 24 hours.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">📍</div>
              <h2 className="text-lg font-bold text-[#2d1b4e] mb-2">Visit Us</h2>
              <p className="text-[#6b5b7a]">123 Companion Street,<br />Mumbai, Maharashtra 400001<br />India</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">📧</div>
              <h2 className="text-lg font-bold text-[#2d1b4e] mb-2">Email Us</h2>
              <p className="text-[#6b5b7a]">support@companionconnect.com<br />partners@companionconnect.com</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">📞</div>
              <h2 className="text-lg font-bold text-[#2d1b4e] mb-2">Call Us</h2>
              <p className="text-[#6b5b7a]">+91 22 1234 5678<br />Mon-Fri, 9am-6pm IST</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-['Playfair_Display',serif] text-[#2d1b4e] mb-6">Send a Message</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">
                ✅ Thank you for reaching out! We'll get back to you shortly.
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[0.8rem] font-semibold text-[#5e3d8c] mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-xl border border-[#e0d4f0] bg-[#faf8ff] focus:outline-none focus:border-[#e879a0]"
                />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-[#5e3d8c] mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 rounded-xl border border-[#e0d4f0] bg-[#faf8ff] focus:outline-none focus:border-[#e879a0]"
                />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-[#5e3d8c] mb-2">Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-3 rounded-xl border border-[#e0d4f0] bg-[#faf8ff] focus:outline-none focus:border-[#e879a0]"
                />
              </div>
              <div>
                <label className="block text-[0.8rem] font-semibold text-[#5e3d8c] mb-2">Message</label>
                <textarea 
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 rounded-xl border border-[#e0d4f0] bg-[#faf8ff] focus:outline-none focus:border-[#e879a0] resize-vertical"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#e879a0] to-[#b355e0] text-white py-3 rounded-xl font-semibold hover:translate-y-[-2px] transition-transform"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;