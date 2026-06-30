export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#0e1c2e]">
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop"
        alt="About Bytech"
        className="h-[600px] w-full object-cover object-center brightness-[0.25] saturate-[0.6]"
      />

      <div className="pointer-events-none absolute bottom-[-100px] left-0 z-[1] h-[400px] w-[400px] rounded-full bg-[#2F88C4]/[0.08] blur-[80px] [animation:aboutOrb2_13s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,#0e1c2e_0%,rgba(14,28,46,0.4)_60%)]" />

      <div className="absolute bottom-[110px] left-0 right-0 z-[2] px-6 lg:px-[60px]">
        <div className="max-w-[720px]">
          <div className="about-reveal mb-6 inline-flex items-center gap-2 rounded-[20px] border border-[#F57A24]/20 bg-[#F57A24]/[0.08] px-[14px] py-[6px]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#F57A24] shadow-[0_0_0_6px_rgba(245,122,36,0.08)] [animation:aboutPulse_2s_infinite]" />

            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#F57A24]">
              Our Story
            </span>
          </div>

          <h1 className="about-reveal about-delay-1 mb-5 max-w-[620px] text-[42px] font-black leading-[1.05] tracking-[-2px] text-white sm:text-[56px] lg:text-[58px]">
            More than{" "}
            <span className="bg-[linear-gradient(90deg,#F57A24,#F9B307)] bg-clip-text text-transparent">
              software.
            </span>
          </h1>

          <p className="about-reveal about-delay-2 max-w-[600px] text-[15px] leading-[1.78] text-white/50 sm:text-base">
            Bytech was built on one belief — great digital products come from
            connected teams, not disconnected vendors. We build ecosystems, not
            isolated services.
          </p>
        </div>
      </div>
    </section>
  );
}
