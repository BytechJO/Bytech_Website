const tickerItems = [
  "Web Platforms",
  "Mobile Applications",
  "LMS Systems",
  "Interactive Content",
  "Media Production",
  "Digital Growth",
  "AI Solutions",
];

export default function Ticker() {
  const repeatedTicker = [...tickerItems, ...tickerItems];

  return (
    <>
      <style>{`
        .ticker-track {
          animation: ticker 25s linear infinite;
        }

        @media (max-width: 640px) {
          .ticker-track {
            animation-duration: 7s;
          }
        }
      `}</style>

      <div className="overflow-hidden border-y border-white/[0.07] bg-[rgba(10,24,40,0.5)] py-3">
        <div className="ticker-track flex whitespace-nowrap">
          {repeatedTicker.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-2 px-6 text-[10px] font-semibold text-white/30 sm:gap-2.5 sm:px-9 sm:text-[11px]"
            >
              {item}
              <span className="text-[#F57A24]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
