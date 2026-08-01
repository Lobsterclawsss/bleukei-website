'use client';

import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight } from 'lucide-react';
import { track, getAttribution } from '@/lib/analytics';

/** cal.com username. Rendering the profile link shows all published event types. */
export const CAL_LINK = 'bleukei';
export const CAL_PROFILE_URL = `https://cal.com/${CAL_LINK}`;

/** Namespace keeps this embed's config isolated from any other embed added later. */
const CAL_NAMESPACE = 'bleukei-book';

/** Brand tokens, kept in sync with tailwind.config.js and globals.css. */
const BRAND = '#40e0d0';

/**
 * Reserved height for the embed. Prevents the page collapsing to nothing while
 * the iframe loads, and stops a layout shift when it arrives.
 */
const EMBED_MIN_HEIGHT = 'min-h-[760px] sm:min-h-[700px]';

/**
 * If the embed has not reported ready by this point, assume it is blocked and
 * show the direct link instead. Without this, a blocked script leaves the
 * visitor staring at an empty box with no way to book.
 */
const LOAD_TIMEOUT_MS = 10000;

export default function BookingEmbed() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');

  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setStatus((current) => (current === 'ready' ? current : 'failed'));
      }
    }, LOAD_TIMEOUT_MS);

    (async () => {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });
        if (cancelled) return;

        cal('ui', {
          theme: 'dark',
          cssVarsPerTheme: {
            dark: {
              'cal-brand': BRAND,
              'cal-bg': '#000000',
              'cal-bg-emphasis': 'rgba(255,255,255,0.06)',
              'cal-border': 'rgba(255,255,255,0.10)',
              'cal-border-emphasis': 'rgba(255,255,255,0.18)',
              'cal-text': '#ffffff',
              'cal-text-emphasis': '#ffffff',
              'cal-text-subtle': 'rgba(255,255,255,0.60)',
            },
            light: {
              'cal-brand': BRAND,
            },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });

        cal('on', {
          action: 'linkReady',
          callback: () => {
            if (!cancelled) setStatus('ready');
          },
        });

        cal('on', {
          action: 'linkFailed',
          callback: () => {
            if (!cancelled) setStatus('failed');
          },
        });

        cal('on', {
          action: 'eventTypeSelected',
          callback: () => {
            track('booking_event_type_selected', getAttribution());
          },
        });

        cal('on', {
          action: 'bookingSuccessfulV2',
          callback: (event) => {
            const detail = (event as CustomEvent).detail?.data ?? {};
            track('booking_completed', {
              ...getAttribution(),
              booking_uid: detail.uid,
              event_type_id: detail.eventTypeId,
              event_title: detail.title,
              start_time: detail.startTime,
            });
          },
        });
      } catch {
        if (!cancelled) setStatus('failed');
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  if (status === 'failed') {
    return (
      <div className="glass rounded-2xl p-10 text-center space-y-5">
        <AlertCircle className="w-8 h-8 text-royal-400 mx-auto" />
        <div>
          <p className="text-xl font-semibold mb-2">The calendar did not load</p>
          <p className="text-white/60 max-w-md mx-auto">
            A browser extension or network policy is most likely blocking it. The booking
            page works fine on its own.
          </p>
        </div>
        <a
          href={CAL_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('booking_fallback_clicked', getAttribution())}
          className="inline-flex items-center gap-2 bg-white text-black font-semibold px-7 py-4 rounded-xl hover:bg-white/90 transition-colors"
        >
          Open the booking page
          <ArrowUpRight className="w-5 h-5" />
        </a>
      </div>
    );
  }

  return (
    <div className={`relative ${EMBED_MIN_HEIGHT}`}>
      {status === 'loading' && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 glass rounded-2xl animate-pulse flex items-center justify-center"
        >
          <span className="sr-only">Loading available times</span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: status === 'ready' ? 1 : 0, y: status === 'ready' ? 0 : 16 }}
        transition={{ duration: 0.5 }}
        className={`glass rounded-2xl overflow-hidden ${EMBED_MIN_HEIGHT}`}
      >
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={CAL_LINK}
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          config={{ layout: 'month_view', theme: 'dark' }}
        />
      </motion.div>
    </div>
  );
}
