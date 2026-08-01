import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — BLEUKEI',
  robots: { index: false },
};

export default function Privacy() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-24 text-white/70 leading-relaxed">
      <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-white/40 mb-10">Effective: June 2026</p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">What we collect</h2>
      <p className="mb-4">
        When you submit our contact form, we collect the information you provide: your name,
        email address, company name, and message. If you book a call, scheduling is handled
        by Cal.com under their own privacy policy, and the booking form is displayed on our
        site inside an embedded frame served by Cal.com.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">How we use it</h2>
      <p className="mb-4">
        We use your contact information solely to respond to your inquiry and, where relevant,
        to discuss working together. We do not sell, rent, or share your personal information
        with third parties for their marketing purposes.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Service providers</h2>
      <p className="mb-4">
        Contact form submissions are processed by Formspree (formspree.io), which transmits
        them to our email. Our site is hosted on Cloudflare Pages. These providers process
        data under their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Data retention and your rights</h2>
      <p className="mb-4">
        We keep inquiry emails for as long as needed to handle the conversation. You can
        request access to or deletion of your information at any time by emailing{' '}
        <a href="mailto:hello@bleukei.com" className="text-teal-400 hover:text-teal-300">
          hello@bleukei.com
        </a>.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">Cookies and analytics</h2>
      <p className="mb-4">
        This site does not set marketing cookies. Our hosting provider may collect standard
        server logs (such as IP address and browser type) for security and performance.
      </p>

      <p className="mt-12 text-sm text-white/40">
        Questions about this policy: hello@bleukei.com
      </p>
    </main>
  );
}
