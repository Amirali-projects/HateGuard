// Professional, custom SVG Icon Components (Kept isolated and clean)
function TargetIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function BrainIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M12 5v14M12 12h6M12 12H6" />
    </svg>
  )
}

function ShieldAlertIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l7-2a1 1 0 0 1 .48 0l7 2A1 1 0 0 1 20 6Z" />
      <line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  )
}

function BarChartIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  )
}

const cards = [
  {
    icon: <TargetIcon className="w-6 h-6 text-[#ffd60a]" />,
    title: 'Our Purpose',
    body: 'HateGuard provides high-throughput, automated content moderation across digital touchpoints, intercepting toxic interactions at the ingestion layer before they propagate and impact communities.',
  },
  {
    icon: <BrainIcon className="w-6 h-6 text-[#ffd60a]" />,
    title: 'Advanced NLP Core',
    body: 'Utilizing vectorized linguistic patterns and semantic token classification, the system performs deep contextual analysis to accurately differentiate high-tempered debate from true policy violations.',
  },
  {
    icon: <ShieldAlertIcon className="w-6 h-6 text-[#ffd60a]" />,
    title: 'Scalable Enforcement',
    body: 'Manual moderation cannot scale with modern chat volume. HateGuard shifts moderation from reactive reporting to proactive, near-zero latency mitigation to actively shield online spaces.',
  },
  {
    icon: <BarChartIcon className="w-6 h-6 text-[#ffd60a]" />,
    title: 'Deterministic Auditing',
    body: 'Every request yields granular confidence distributions and structured data payloads, feeding directly into both live real-time web dashboards and persistent logging layers.',
  },
]

const steps = [
  { num: '01', title: 'Ingestion Layers (Web / Chat)', desc: 'Text data is ingested in real-time through either the React frontend interface or the automated Discord server message listener.' },
  { num: '02', title: 'Secure API Ingestion & Pre-processing', desc: 'The Node.js and Express.js backend validates payload constraints, filters empty strings, and structures clean telemetry tokens for the processing pipeline.' },
  { num: '03', title: 'NLP Model Analysis', desc: 'An unlinked Python Flask microservice bridges the text into a trained NLP text classifier (scikit-learn & NLTK) to analyze semantic metrics and calculate contextual weight.' },
  { num: '04', title: 'Threshold Enforcement & Database Auditing', desc: 'The system evaluates the resulting vectors against a strict 50% confidence rule override, pushes immutable incident records into MongoDB, and dispatches real-time web metrics.' },
  { num: '05', title: 'Instant Chat Moderation', desc: 'If an infraction occurs in a chat channel, the Discord Bot executes immediate text deletion alongside a self-cleaning notification warning to secure users without creating clutter.' },
]

const techs = ['MongoDB', 'Express.js', 'React', 'Node.js', 'Vite', 'Python', 'Flask', 'scikit-learn', 'NLTK', 'REST API']

export default function About() {
  return (
    <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
      {/* Header */}
      <header className="mb-12 animate-fade-up">
        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#ffd60a] mb-3">
          Project Overview
        </span>
        <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] text-gray-100 mb-4">
          ABOUT THE SYSTEM
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed border-l-[3px] border-[#ffd60a] pl-5 mt-6">
          HateGuard is an AI-powered hate speech detection tool designed to make
          online spaces safer. It uses machine learning to analyze text and flag
          harmful content in under a second.
        </p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 animate-fade-up-1">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative bg-[#111111] border border-[#1f1f1f] rounded-xl p-7
                       transition-all duration-200 overflow-hidden flex flex-col items-start
                       hover:border-[#2a2a2a] hover:bg-[#181818] hover:-translate-y-0.5
                       hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#ffd60a]
                            scale-x-0 origin-left transition-transform duration-300
                            group-hover:scale-x-100" />
            
            {/* 🛠️ FIX: Added an isolated bounding wrapper container with precise padding values */}
            <div className="p-2 bg-[#ffd60a10] border border-[#ffd60a20] rounded-lg mb-4 flex items-center justify-center">
              {card.icon}
            </div>
            
            {/* 🛠️ FIX: Tightened heading tracking and forced direct block alignment */}
            <h3 className="font-display text-xl font-semibold text-gray-100 mb-2 tracking-wide block leading-none">
              {card.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mt-1">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <section className="mt-12 animate-fade-up-2">
        <h2 className="font-display text-3xl text-gray-100 mb-6 tracking-wide">HOW IT WORKS</h2>
        <div className="flex flex-col divide-y divide-[#1f1f1f] rounded-xl overflow-hidden border border-[#1f1f1f]">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex items-start gap-5 bg-[#111111] px-6 py-5
                         transition-colors duration-200 hover:bg-[#181818]"
            >
              <span className="font-mono text-xs font-bold text-[#ffd60a]
                               bg-[#ffd60a15] border border-[#ffd60a30]
                               px-2 py-0.5 rounded flex-shrink-0 mt-0.5 tracking-wider">
                {step.num}
              </span>
              <div>
                <strong className="block text-sm font-semibold text-gray-100 mb-0.5">{step.title}</strong>
                <span className="text-sm text-gray-400">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="mt-12 animate-fade-up-3">
        <h2 className="font-display text-3xl text-gray-100 mb-6 tracking-wide">TECH STACK</h2>
        <div className="flex flex-wrap gap-2">
          {techs.map((t) => (
            <span
              key={t}
              className="font-mono text-xs font-bold text-gray-400
                         bg-[#111111] border border-[#1f1f1f] px-4 py-2 rounded
                         transition-all duration-200
                         hover:text-[#ffd60a] hover:border-[#ffd60a40] hover:bg-[#ffd60a10]"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}