import React, { useState } from 'react';
import { Button } from './Button';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { useToast } from './ToastContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { showToast } = useToast();

  const validate = (): boolean => {
    const next: FormErrors = {};
    const name = formData.name.trim();
    if (name.length < 2) next.name = 'Please enter at least 2 characters';
    if (!EMAIL_REGEX.test(formData.email.trim())) next.email = 'Please enter a valid email';
    const msg = formData.message.trim();
    if (msg.length < 10) next.message = 'Message must be at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitted(true);
      showToast('Your message has been sent. We will respond within 24 hours.', 'success');
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-50 min-h-screen pt-32 pb-20 animate-fadeIn">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            Correspondence
          </span>
          <h1 className="text-5xl md:text-6xl text-brand-950 font-serif">Get in Touch</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="bg-brand-100 p-10 md:p-16 border border-brand-200 h-fit">
            <h3 className="text-2xl font-serif text-brand-950 mb-8 italic">The Concierge</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-brand-200 rounded-full flex items-center justify-center text-brand-800 group-hover:bg-brand-950 group-hover:text-brand-50 transition-colors">
                  <Mail size={18} aria-hidden />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-brand-500 mb-1">Email</span>
                  <p className="text-brand-900 font-light">concierge@vinebreak.com</p>
                  <p className="text-brand-900 font-light">press@vinebreak.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-brand-200 rounded-full flex items-center justify-center text-brand-800 group-hover:bg-brand-950 group-hover:text-brand-50 transition-colors">
                  <MapPin size={18} aria-hidden />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-brand-500 mb-1">Atelier</span>
                  <p className="text-brand-900 font-light">12 Route des Vignes</p>
                  <p className="text-brand-900 font-light">33000 Bordeaux, France</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-brand-200 rounded-full flex items-center justify-center text-brand-800 group-hover:bg-brand-950 group-hover:text-brand-50 transition-colors">
                  <Phone size={18} aria-hidden />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-brand-500 mb-1">Phone</span>
                  <p className="text-brand-900 font-light">+33 5 56 00 00 00</p>
                  <p className="text-brand-400 text-xs mt-1">Mon - Fri, 9am - 6pm CET</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            {submitted ? (
              <div className="h-full flex flex-col justify-center items-center text-center p-12 bg-brand-100 border border-brand-200 animate-fadeIn">
                <span className="text-4xl mb-4 block" aria-hidden>✉️</span>
                <h3 className="text-2xl font-serif text-brand-950 mb-4">Message Sent</h3>
                <p className="text-brand-800 font-light mb-8">
                  Thank you for reaching out. Our concierge will review your message and respond within 24 hours.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-brand-500 block">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none transition-colors font-light ${
                        errors.name ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'
                      }`}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="text-red-600 text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-brand-500 block">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none transition-colors font-light ${
                        errors.email ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'
                      }`}
                      placeholder="Your email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="text-red-600 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-xs uppercase tracking-widest text-brand-500 block">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-brand-300 py-3 text-brand-900 focus:outline-none focus:border-brand-800 transition-colors font-light appearance-none cursor-pointer"
                    aria-label="Subject"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Assistance">Order Assistance</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Press">Press</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-brand-500 block">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-transparent border-b py-3 text-brand-900 focus:outline-none transition-colors font-light resize-none ${
                      errors.message ? 'border-red-600' : 'border-brand-300 focus:border-brand-800'
                    }`}
                    placeholder="How can we assist you?"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-red-600 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
