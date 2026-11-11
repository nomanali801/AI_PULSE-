type AdBannerProps = {
  slot: string;
  className?: string;
};

export function AdBanner({ slot, className = "" }: AdBannerProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isConfigured = Boolean(client && /^\d+$/.test(slot));

  return (
    <div
      aria-label="Advertisement"
      className={`relative flex min-h-24 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center ${className}`}
      role="complementary"
      suppressHydrationWarning
    >
      {isConfigured ? (
        <ins
          className="adsbygoogle block min-h-24 w-full"
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Advertisement
          </p>
          <p className="text-xs text-slate-400">Ad placement preview</p>
        </div>
      )}
    </div>
  );
}
