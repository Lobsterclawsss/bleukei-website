import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BookingEmbed from './BookingEmbed';

export const metadata: Metadata = {
  title: 'Book a Call — BLEUKEI',
  description:
    'Pick a time that works for you. Fifteen minutes to ask a question, thirty to talk through your business, an hour to go deep on a build.',
  alternates: {
    canonical: '/book',
  },
  openGraph: {
    type: 'website',
    url: 'https://bleukei.com/book',
    title: 'Book a Call — BLEUKEI',
    description:
      'Pick a time that works for you. Fifteen minutes to ask a question, thirty to talk through your business, an hour to go deep on a build.',
    siteName: 'BLEUKEI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Call — BLEUKEI',
    description: 'Pick a time that works for you.',
  },
};

const GUIDE = [
  {
    length: '15 minutes',
    use: 'You have one specific question and want a straight answer.',
  },
  {
    length: '30 minutes',
    use: 'You want to talk through your business and find out whether we are a fit.',
  },
  {
    length: '60 minutes',
    use: 'You already know roughly what you want built and want to scope it properly.',
  },
];

export default function BookPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="px-4 pt-16 pb-10 md:pt-24">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to BLEUKEI
          </Link>

          <h1 className="text-4xl md:text-6xl font-bold mb-5 text-balance">
            Book a <span className="gradient-text-teal">call</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            No pitch and no pressure. Pick the length that matches what you actually need,
            and if it turns out we are not the right fit, you will hear that on the call
            rather than three weeks later.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {GUIDE.map((item) => (
              <div key={item.length} className="glass rounded-xl p-5">
                <dt className="text-sm font-semibold text-teal-400 mb-2">{item.length}</dt>
                <dd className="text-sm text-white/60 leading-relaxed">{item.use}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-4xl">
          <BookingEmbed />

          <p className="text-xs text-white/35 mt-6 text-center">
            Scheduling is handled by Cal.com. Times shown are in your local timezone.
          </p>
        </div>
      </section>
    </main>
  );
}
