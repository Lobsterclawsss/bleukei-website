/**
 * Provider-agnostic analytics shim.
 *
 * The site does not currently ship an analytics provider. Rather than hard-wire
 * one, every tracked event is fanned out to whichever provider happens to be
 * present on `window` at call time, and no-ops safely when none is.
 *
 * To start collecting, add exactly one of the following to app/layout.tsx and
 * the events below begin flowing with no further code changes:
 *   - Google Analytics 4  -> window.gtag
 *   - Google Tag Manager  -> window.dataLayer
 *   - Plausible           -> window.plausible
 *   - Umami               -> window.umami
 *
 * A `bleukei:analytics` CustomEvent is always dispatched on `window` as well,
 * so anything else (a Cloudflare Worker beacon, a test harness) can subscribe
 * without touching this file.
 */

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

type GtagFn = (command: string, eventName: string, params?: AnalyticsProps) => void;
type PlausibleFn = (eventName: string, options?: { props?: AnalyticsProps }) => void;
type UmamiApi = { track?: (eventName: string, props?: AnalyticsProps) => void };

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: Array<Record<string, unknown>>;
    plausible?: PlausibleFn;
    umami?: UmamiApi;
  }
}

/** Strip undefined values so providers do not receive empty keys. */
function clean(props: AnalyticsProps): AnalyticsProps {
  return Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined)
  ) as AnalyticsProps;
}

/**
 * Send an event to every analytics provider present on the page.
 * Never throws: analytics must not be able to break a booking.
 */
export function track(eventName: string, props: AnalyticsProps = {}): void {
  if (typeof window === 'undefined') return;

  const payload = clean(props);

  try {
    window.gtag?.('event', eventName, payload);
  } catch {
    /* provider failure must not surface to the user */
  }

  try {
    window.dataLayer?.push({ event: eventName, ...payload });
  } catch {
    /* noop */
  }

  try {
    window.plausible?.(eventName, { props: payload });
  } catch {
    /* noop */
  }

  try {
    window.umami?.track?.(eventName, payload);
  } catch {
    /* noop */
  }

  try {
    window.dispatchEvent(
      new CustomEvent('bleukei:analytics', { detail: { event: eventName, ...payload } })
    );
  } catch {
    /* noop */
  }
}

/**
 * Read UTM parameters and referrer from the current page so a booking can be
 * attributed to the campaign that produced it.
 */
export function getAttribution(): AnalyticsProps {
  if (typeof window === 'undefined') return {};

  try {
    const params = new URLSearchParams(window.location.search);
    return clean({
      utm_source: params.get('utm_source') ?? undefined,
      utm_medium: params.get('utm_medium') ?? undefined,
      utm_campaign: params.get('utm_campaign') ?? undefined,
      utm_content: params.get('utm_content') ?? undefined,
      utm_term: params.get('utm_term') ?? undefined,
      referrer: document.referrer || undefined,
      landing_path: window.location.pathname,
    });
  } catch {
    return {};
  }
}
