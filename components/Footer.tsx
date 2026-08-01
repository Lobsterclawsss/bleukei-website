import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-white/10 text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <p className="text-xl font-bold mb-2">BLEUKEI</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Stop wasting time. Start growing your business.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.linkedin.com/in/noabberger/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/noableu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="mailto:hello@bleukei.com"
                className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
              >
                Email
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Pages</p>
            <div className="space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/still-curious', label: 'Still Curious?' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Ready to grow?</p>
            <p className="text-gray-400 text-sm mb-4">
              Book a free consultation. No pitch, no pressure.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors"
            >
              Book Free Consultation
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BLEUKEI. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with AI-powered operations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
