import "./BytechLoader.css";

export default function BytechLoader() {
  return (
    <div className="loader-screen">
      <div className="loader-logo">

        <div className="logo-mark">

          <div className="logo-ripple r1"></div>
          <div className="logo-ripple r2"></div>

          <svg viewBox="0 0 60 60">

            <defs>
              <radialGradient id="g1" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#F9B307" />
                <stop offset="100%" stopColor="#F57A24" />
              </radialGradient>

              <radialGradient id="g2" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#6CC2E9" />
                <stop offset="100%" stopColor="#2F88C4" />
              </radialGradient>
            </defs>

            <circle
              className="step step1"
              cx="22"
              cy="20"
              r="16"
              fill="url(#g1)"
            />

            <circle
              className="step step2"
              cx="22"
              cy="40"
              r="16"
              fill="url(#g2)"
            />

            <ellipse
              className="step step3"
              cx="22"
              cy="30"
              rx="8"
              ry="10"
              fill="rgba(14,28,46,.55)"
            />

            <circle
              className="step step4"
              cx="34"
              cy="30"
              r="10"
              fill="#405264"
            />

            <text
              className="step step5"
              x="34"
              y="34"
              textAnchor="middle"
              fontFamily="Poppins"
              fontSize="9"
              fontWeight="800"
              fill="#fff"
            >
              CH
            </text>

          </svg>
        </div>

        <div className="logo-text">
          <span className="byte">Byte</span>
          <span className="ch">CH</span>
        </div>
      </div>
    </div>
  );
}