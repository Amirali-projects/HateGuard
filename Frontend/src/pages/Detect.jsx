export default function Detect() {
  // ⚙️ Dynamically fetch the client ID from your Vite frontend environment variables
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID || '1512351729004318740'
  
  // Construct the secure OAuth2 URL using your clean environment template literal
  const DISCORD_INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=268527616&integration_type=0&scope=bot`

  const handleRedirect = () => {
    window.open(DISCORD_INVITE_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 flex flex-col items-center justify-center text-center min-h-[70vh]">
      
      {/* Structural Header */}
      <header className="mb-8 animate-fade-up flex flex-col items-center">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase
                         tracking-[0.14em] text-[#ffd60a] mb-4
                         before:content-[''] before:block before:w-6 before:h-0.5 before:bg-[#ffd60a]
                         after:content-[''] after:block after:w-6 after:h-0.5 after:bg-[#ffd60a]">
          Automated Enforcement
        </span>

        <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-gray-100 mb-3 font-bold tracking-tight">
          DISCORD CHAT PROTECTION
        </h1>

        <p className="text-base text-gray-400 max-w-xl leading-relaxed">
          HateGuard runs directly inside active community channels. Real-time text parsing, 
          linguistic data analysis, and immediate content filtering occur instantly via our automated bot worker layer.
        </p>
      </header>

      {/* Simplified Clear Action Card */}
      <div className="animate-fade-up-1 bg-[#111111] border border-[#1f1f1f] rounded-2xl p-8 max-w-lg w-full
                      shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex flex-col items-center">
        
        <div className="w-12 h-12 bg-[#ffd60a10] border border-[#ffd60a20] rounded-full flex items-center justify-center text-xl mb-4">
          🛡️
        </div>

        <h3 className="text-gray-100 text-lg font-semibold mb-2">Secure Your Server</h3>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Bring the predictive accuracy of our natural language microservices straight into your server channels.
        </p>

        <button
          onClick={handleRedirect}
          className="w-full sm:w-auto px-8 py-3 bg-[#ffd60a] text-black font-bold rounded-lg 
                     transition-all duration-200 hover:bg-[#e6c008] hover:scale-[1.01] active:scale-[0.99]"
        >
          Invite to Discord →
        </button>
      </div>

      {/* Small informative banner footer */}
      <div className="mt-6 flex items-start gap-2 max-w-md text-left bg-[#11111105] border border-[#1f1f1f40]
                      rounded-md px-4 py-3 text-xs text-gray-600 animate-fade-up-2">
        <span>
          Looking for architectural performance breakdowns or log telemetry metrics? Navigate over to the **About** and **History** tabs in the top dashboard navbar.
        </span>
      </div>

    </main>
  )
}