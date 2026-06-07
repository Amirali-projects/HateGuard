import { Link } from 'react-router-dom';

// Custom lightweight SVG vectors matching your dark UI theme
const FEATURE_ICONS = {
  ml: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffd60a] w-4 h-4">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="M12 6v12M6 12h12"/>
    </svg>
  ),
  bolt: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffd60a] w-4 h-4">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  chart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffd60a] w-4 h-4">
      <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffd60a] w-4 h-4">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" x2="22" y1="12" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
};

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 text-center relative overflow-hidden w-full m-auto max-w-4xl">

      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[280px]
                      bg-[radial-gradient(ellipse_at_center,rgba(255,214,10,0.06)_0%,transparent_70%)]
                      blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="animate-fade-up inline-flex items-center gap-2 mb-6 sm:mb-8
                      bg-[#ffd60a12] border border-[#ffd60a30] text-[#ffd60a]
                      text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-3.5 sm:px-4 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd60a] animate-pulse" />
        ML-Model Detection System
      </div>

      {/* Title */}
      <h1 className="animate-fade-up-1 font-display text-[clamp(2.25rem,6.5vw,4.5rem)]
                     tracking-wider text-gray-100 leading-[1.1] mb-6 max-w-3xl font-extrabold uppercase">
        Hate Speech
        <span className="block text-[#ffd60a]">Detection</span>
      </h1>

      {/* Subtitle */}
      <p className="animate-fade-up-2 max-w-xl text-sm sm:text-base text-gray-400 leading-relaxed mb-8 sm:mb-12 px-2">
        An intelligent system that analyzes text content and identifies hate speech
        in real time — helping make online platforms safer and more inclusive for everyone.
      </p>

      {/* Actions (Swapped buttons to safe browser Route Links) */}
      <div className="animate-fade-up-3 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-16 sm:mb-20 px-4 sm:px-0">
        <Link
          to="/detect"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded w-full sm:w-auto
                     bg-[#ffd60a] text-black font-bold text-sm transition-all duration-200
                     hover:bg-[#ffe033] hover:-translate-y-0.5
                     hover:shadow-[0_8px_32px_rgba(255,214,10,0.25)]"
        >
          Try Detection
        </Link>
        <Link
          to="/about"
          className="px-7 py-3.5 rounded text-sm font-medium text-gray-400 w-full sm:w-auto text-center
                     border border-[#1f1f1f] bg-[#0b0b0b] transition-all duration-200
                     hover:text-gray-100 hover:border-[#ffd60a40] hover:bg-[#ffd60a0a]"
        >
          Learn More
        </Link>
      </div>

      {/* Stats Divider Dashboard Container */}
      <div className="animate-fade-up-4 w-full max-w-2xl mx-auto grid grid-cols-3 gap-2 sm:gap-6 items-center justify-center mb-16 border-t border-b border-[#1f1f1f] py-6 px-2">
        {[
          { value: '80%+', label: 'Accuracy' },
          { value: '<0.5s', label: 'Response Time' },
          { value: 'ML Core', label: 'Powered Engine' },
        ].map((stat, i) => (
          <div 
            key={stat.label} 
            className={`text-center flex flex-col justify-center h-full
              ${i < 2 ? 'border-r border-[#1f1f1f]' : ''}`}
          >
            <span className="block font-display text-xl sm:text-3xl text-[#ffd60a] tracking-wider font-bold">
              {stat.value}
            </span>
            <span className="text-[9px] sm:text-xs text-gray-500 uppercase tracking-widest font-medium mt-1.5 block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* 🛠️ RESTYLED STRUCTURAL FEATURE CHIPS GRID */}
      <div className="animate-fade-up-5 w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">
        {[
          { icon: FEATURE_ICONS.ml, label: 'Machine Learning Classification' },
          { icon: FEATURE_ICONS.bolt, label: 'Real-time Vector Analysis' },
          { icon: FEATURE_ICONS.chart, label: 'Confidence Score Distribution' },
          { icon: FEATURE_ICONS.globe, label: 'Deterministic English Text Ingestion' },
        ].map((chip) => (
          <div
            key={chip.label}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
                       bg-[#111111] border border-[#1f1f1f] text-gray-400 text-xs sm:text-sm font-medium
                       transition-all duration-200 text-left
                       hover:border-[#ffd60a30] hover:bg-[#151515] hover:text-gray-200"
          >
            <div className="p-1.5 bg-[#ffd60a0a] border border-[#ffd60a15] rounded-lg flex-shrink-0">
              {chip.icon}
            </div>
            <span className="tracking-wide">{chip.label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}