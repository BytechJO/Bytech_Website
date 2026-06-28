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
    <div className="overflow-hidden border-y border-white/[0.07] bg-[rgba(10,24,40,0.5)] py-3">
      <div className="flex whitespace-nowrap animate-[ticker_25s_linear_infinite]">
        {repeatedTicker.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-2.5 px-9 text-[11px] font-semibold text-white/30"
          >
            {item}
            <span className="text-[#F57A24]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
