import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useUIStore } from '../stores';

export const ContactPage: React.FC = () => {
  const { addToast } = useUIStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Save locally
    const submissions = JSON.parse(localStorage.getItem('mez_contact_submissions') || '[]');
    submissions.unshift({
      id: `msg-${Date.now()}`,
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('mez_contact_submissions', JSON.stringify(submissions));

    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'MESSAGE RECEIVED',
      message: 'Thank you! The Mez team has received your message.',
    });
  };

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase font-bold tracking-widest text-[var(--gold-line)] mb-2">
            WE ARE HERE IN FORT ERIE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
            CONTACT & VISIT US
          </h1>
          <p className="text-sm text-[var(--smoke)] mt-2">
            Have questions about catering, group bookings, or menu ingredients? Reach out directly.
          </p>
        </div>

        {/* 2-Column Info & Working Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Verified Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8 bg-[#2B1D14] p-8 border border-white/10">
            <h2 className="text-xl font-bold uppercase font-display text-[var(--flour)] border-b border-white/10 pb-4">
              RESTAURANT DETAILS
            </h2>

            <div className="space-y-6 text-xs text-[var(--smoke)]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--ember)] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold uppercase text-[var(--flour)]">Location & Address</div>
                  <p className="mt-1 leading-relaxed text-[var(--flour)]/80">
                    #9 – 1267 Garrison Road <br />
                    Fort Erie, Ontario, Canada, L2A 1P2
                  </p>
                  <a
                    href="https://maps.google.com/?q=1267+Garrison+Road+Fort+Erie+ON"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--ember)] font-bold mt-2 hover:underline"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[var(--gold-line)] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold uppercase text-[var(--flour)]">Operating Hours</div>
                  <p className="mt-1 leading-relaxed text-[var(--flour)]/80">
                    Daily: 12:00 PM – 10:00 PM <br />
                    Kitchen Flat-Top sears until 9:45 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--ember)] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold uppercase text-[var(--flour)]">Direct Telephone</div>
                  <a
                    href="tel:2893209866"
                    className="mt-1 block text-base font-bold font-mono text-[var(--flour)] hover:text-[var(--ember)] transition-colors"
                  >
                    289-320-9866
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[var(--ember)] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold uppercase text-[var(--flour)]">Official Email</div>
                  <a
                    href="mailto:info@themez.ca"
                    className="mt-1 block text-sm font-medium text-[var(--flour)] hover:text-[var(--ember)] transition-colors"
                  >
                    info@themez.ca
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Working Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#2B1D14] p-8 border border-white/10">
            <h2 className="text-xl font-bold uppercase font-display text-[var(--flour)] border-b border-white/10 pb-4 mb-6">
              SEND A MESSAGE
            </h2>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold uppercase font-display text-[var(--flour)]">
                  MESSAGE SENT
                </h3>
                <p className="text-xs text-[var(--smoke)] max-w-sm mx-auto">
                  Thank you for reaching out. We will get back to you promptly during our regular hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tabath C."
                      className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="289-555-0199"
                      className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tabath@example.com"
                    className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                  >
                    <option value="General Inquiry">General Dining Inquiry</option>
                    <option value="Large Group / Party Booking">Large Group / Party Booking</option>
                    <option value="Catering / Special Events">Catering & Patio Events</option>
                    <option value="Feedback for Kitchen">Kitchen & Service Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help make your visit to The Mez unforgettable?"
                    className="w-full bg-[#15100C] border border-white/15 p-3 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[var(--ember)] hover:bg-[var(--ember-deep)] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
