import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
  
  const discordInviteUrl = clientId 
    ? `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=268527616&integration_type=0&scope=bot` 
    : "#";

  // Shared design style definitions for desktop elements
  const linkStyles = ({ isActive }) =>
    `px-4 py-1.5 rounded text-sm font-medium border transition-all duration-200 ${
      isActive
        ? 'text-[#ffd60a] border-[#ffd60a50] bg-[#ffd60a15]'
        : 'text-gray-400 border-transparent hover:text-gray-100 hover:border-[#2a2a2a] hover:bg-[#181818]'
    }`;

  // Shared design style definitions for mobile dropdown elements
  const mobileLinkStyles = ({ isActive }) =>
    `w-full py-2.5 rounded text-center text-sm font-medium border transition-all ${
      isActive
        ? 'text-[#ffd60a] border-[#ffd60a50] bg-[#ffd60a15]'
        : 'text-gray-400 border-transparent bg-[#121212]'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0ad8] backdrop-blur-md border-b border-[#1f1f1f]">
      {/* Navbar Container */}
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 h-16 max-w-7xl mx-auto">
        
        {/* Logo (Clicking redirects cleanly to home) */}
        <NavLink to="/" className="flex items-center gap-3 select-none z-50">
          <div className="w-8 h-8 bg-[#ffd60a] rounded-md flex items-center justify-center text-base">
            🛡️
          </div>
          <span className="font-display text-xl tracking-widest text-gray-100">
            HATE<span className="text-[#ffd60a]">GUARD</span>
          </span>
        </NavLink>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-gray-100 focus:outline-none z-50 p-2"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Links & CTA */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={linkStyles}>Home</NavLink>
          <NavLink to="/about" className={linkStyles}>About</NavLink>
          <NavLink to="/history" className={linkStyles}>History</NavLink>
          <NavLink to="/detect" className={linkStyles}>Detect</NavLink>

          <a
            href={discordInviteUrl}
            target={clientId ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!clientId) {
                e.preventDefault();
                alert("Configuration Error: VITE_DISCORD_CLIENT_ID is not defined in your frontend .env file!");
              }
            }}
            className="ml-2 px-5 py-1.5 rounded text-sm font-bold bg-[#ffd60a] text-black
                       border border-[#ffd60a] transition-all duration-200 block text-center
                       hover:bg-[#ffe033] hover:shadow-[0_0_24px_rgba(255,214,10,0.3)]
                       hover:-translate-y-0.5"
          >
            Try Detection →
          </a>
        </div>
      </div>

      {/* Mobile Drawer/Menu Container */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full bg-[#0a0a0ae6] backdrop-blur-lg border-b border-[#1f1f1f] transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-5 pointer-events-none'
        }`}
        style={{ paddingTop: '4rem' }}
      >
        <div className="flex flex-col gap-3 p-6">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Home</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>About</NavLink>
          <NavLink to="/history" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>History</NavLink>
          <NavLink to="/detect" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Detect</NavLink>

          <a
            href={discordInviteUrl}
            target={clientId ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!clientId) {
                e.preventDefault();
                alert("Configuration Error: VITE_DISCORD_CLIENT_ID is not defined in your frontend .env file!");
              }
            }}
            className="w-full py-2.5 mt-2 rounded text-sm font-bold bg-[#ffd60a] text-black border border-[#ffd60a] block text-center"
          >
            Try Detection →
          </a>
        </div>
      </div>
    </nav>
  );
}