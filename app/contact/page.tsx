"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  message: string;
}

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('https://formspree.io/f/xqedgjon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Let's <span className="text-teal-400">Talk</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to transform your business? Book a free consultation or send us a message.
          </p>
        </motion.div>
      </section>

      {/* Booking Calendar */}
      <section className="py-12 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">Book a Free Consultation</h2>
            <p className="text-gray-300">Choose a time that works for you. No commitment required.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-white/10 rounded-2xl p-10 text-center space-y-6"
            style={{ background: 'linear-gradient(135deg, rgba(45,212,191,0.05) 0%, rgba(0,0,0,0) 100%)' }}
          >
            <div className="text-5xl">📅</div>
            <div>
              <p className="text-white text-xl font-semibold mb-2">15, 30 or 60 minutes</p>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Pick the length that matches what you need. Fifteen minutes for a single
                question, thirty to talk through your business, an hour to scope a build.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-[1.02]"
              >
                <span>📆</span> See available times
              </Link>
            </div>
            <p className="text-gray-500 text-xs">No commitment required</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
            
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6 text-center"
              >
                <p className="text-green-400 font-semibold">✓ Message sent successfully!</p>
                <p className="text-gray-300 text-sm mt-1">We'll get back to you within 24 hours.</p>
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-center"
              >
                <p className="text-red-400 font-semibold">✗ Something went wrong</p>
                <p className="text-gray-300 text-sm mt-1">Please try again or email us directly.</p>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Business Name *</label>
                <input
                  {...register('businessName', { required: 'Business name is required' })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors"
                  placeholder="Your business name"
                />
                {errors.businessName && <p className="text-red-400 text-sm mt-1">{errors.businessName.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-teal-400 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-500/50 text-white font-semibold py-4 rounded-lg transition-all hover:scale-[1.02] disabled:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Direct Contact */}
      <section className="py-12 px-4 bg-gradient-to-b from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Or Reach Out Directly</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a 
              href="mailto:NB@noaberger.com" 
              className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>✉️</span> NB@noaberger.com
            </a>
            <Link
              href="https://www.linkedin.com/in/noabberger/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>💼</span> LinkedIn
            </Link>
            <Link
              href="https://www.instagram.com/noableu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>📸</span> Instagram
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
