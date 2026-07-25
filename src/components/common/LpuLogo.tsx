import React from 'react';

interface LpuLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export const LpuLogo: React.FC<LpuLogoProps> = ({ className = 'h-10', showSubtitle = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-10 h-10 shrink-0 drop-shadow-sm transition-transform hover:scale-105 duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lovely Professional University Logo"
      >
        <defs>
          <linearGradient id="lpuGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="lpuMaroon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Seal */}
        <circle cx="60" cy="60" r="56" fill="url(#lpuMaroon)" stroke="url(#lpuGold)" strokeWidth="3" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Sun Rays */}
        <g stroke="url(#lpuGold)" strokeWidth="1.5" opacity="0.8">
          <line x1="60" y1="22" x2="60" y2="15" />
          <line x1="75" y1="26" x2="80" y2="20" />
          <line x1="88" y1="36" x2="95" y2="31" />
          <line x1="95" y1="50" x2="102" y2="48" />
          <line x1="45" y1="26" x2="40" y2="20" />
          <line x1="32" y1="36" x2="25" y2="31" />
          <line x1="25" y1="50" x2="18" y2="48" />
        </g>

        {/* Rising Sun */}
        <circle cx="60" cy="46" r="14" fill="url(#lpuGold)" filter="url(#glow)" />

        {/* Open Knowledge Book */}
        <path
          d="M 30 75 Q 45 68 60 75 Q 75 68 90 75 L 90 92 Q 75 84 60 90 Q 45 84 30 92 Z"
          fill="#FFFFFF"
          stroke="#D97706"
          strokeWidth="1.5"
        />
        <path d="M 60 75 L 60 90" stroke="#B45309" strokeWidth="1.5" />
        <path d="M 38 78 Q 48 73 56 78" stroke="#94A3B8" strokeWidth="1" />
        <path d="M 64 78 Q 72 73 82 78" stroke="#94A3B8" strokeWidth="1" />

        {/* Gear / Technology Motif Center */}
        <circle cx="60" cy="62" r="5" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />

        {/* Star Accents */}
        <polygon points="60,28 62,32 66,33 63,36 64,40 60,37 56,40 57,36 54,33 58,32" fill="#FEF08A" />
      </svg>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold tracking-tight text-base sm:text-lg bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 dark:from-amber-400 dark:via-orange-400 dark:to-amber-200 bg-clip-text text-transparent">
            LPU
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
            Resume Builder
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 ml-1">
            PWA
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-tight hidden sm:block">
            Lovely Professional University • Offline Ready
          </span>
        )}
      </div>
    </div>
  );
};
