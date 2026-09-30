import React from 'react';

interface WatchdogMascotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  status?: 'guarding' | 'alert' | 'secure';
  showCable?: boolean;
}

export const WatchdogMascot: React.FC<WatchdogMascotProps> = ({
  className = '',
  size = 'md',
  status = 'guarding',
  showCable = true,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    hero: 'w-64 h-64 sm:w-80 sm:h-80',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-lime-400/10 rounded-full blur-2xl pointer-events-none transform -translate-y-2 scale-90" />

      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] select-none"
        aria-label="LEASH Robotic Watchdog Mascot"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="40" y1="50" x2="200" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e2430" />
            <stop offset="0.5" stopColor="#141820" />
            <stop offset="1" stopColor="#0c0e13" />
          </linearGradient>

          <linearGradient id="armorLight" x1="80" y1="40" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2e3748" />
            <stop offset="1" stopColor="#171c26" />
          </linearGradient>

          <linearGradient id="limeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#bef264" />
            <stop offset="0.6" stopColor="#a3e635" />
            <stop offset="1" stopColor="#65a30d" />
          </linearGradient>

          <linearGradient id="cableGrad" x1="160" y1="170" x2="230" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a3e635" />
            <stop offset="0.4" stopColor="#4d7c0f" />
            <stop offset="0.8" stopColor="#1e293b" />
          </linearGradient>

          <filter id="visorGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Cable Leash extending outward */}
        {showCable && (
          <g className="transition-all duration-300">
            {/* Cable shadow */}
            <path
              d="M 148 168 C 175 190, 195 160, 220 185 C 235 200, 230 230, 238 238"
              stroke="#000"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
            />
            {/* Cable core */}
            <path
              d="M 148 168 C 175 190, 195 160, 220 185 C 235 200, 230 230, 238 238"
              stroke="url(#cableGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="8 3"
              fill="none"
              className="animate-pulse"
            />
            {/* Leash connection clip */}
            <rect x="142" y="160" width="12" height="12" rx="3" fill="#334155" stroke="#a3e635" strokeWidth="1.5" />
            <circle cx="148" cy="166" r="2.5" fill="#a3e635" />
          </g>
        )}

        {/* Ears */}
        {/* Left Ear */}
        <path
          d="M 72 82 L 48 34 C 47 31, 51 28, 55 30 L 92 62 Z"
          fill="url(#bodyGrad)"
          stroke="#2d3748"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M 58 40 L 76 68 L 64 64 Z" fill="#a3e635" opacity="0.6" />

        {/* Right Ear */}
        <path
          d="M 168 82 L 192 34 C 193 31, 189 28, 185 30 L 148 62 Z"
          fill="url(#bodyGrad)"
          stroke="#2d3748"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M 182 40 L 164 68 L 176 64 Z" fill="#a3e635" opacity="0.6" />

        {/* Head Chassis */}
        <path
          d="M 76 75 L 164 75 L 180 132 L 152 170 L 88 170 L 60 132 Z"
          fill="url(#bodyGrad)"
          stroke="#334155"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Forehead Armor Plate */}
        <path
          d="M 88 78 L 152 78 L 160 102 L 80 102 Z"
          fill="url(#armorLight)"
          stroke="#2a3444"
          strokeWidth="1.5"
        />

        {/* Cyber Visor / Optical Eyes */}
        <g filter="url(#visorGlow)">
          {/* Main Visor Bar */}
          <rect
            x="76"
            y="108"
            width="88"
            height="22"
            rx="5"
            fill="#090d14"
            stroke="#a3e635"
            strokeWidth="1.5"
          />
          {/* Left Eye Segment */}
          <rect x="84" y="113" width="28" height="12" rx="3" fill="url(#limeGrad)" />
          {/* Right Eye Segment */}
          <rect x="128" y="113" width="28" height="12" rx="3" fill="url(#limeGrad)" />
          {/* Center Sensor Dot */}
          <circle cx="120" cy="119" r="2.5" fill="#bef264" />
        </g>

        {/* Snout / Muzzle */}
        <path
          d="M 96 138 L 144 138 L 138 165 L 102 165 Z"
          fill="#111620"
          stroke="#242c3b"
          strokeWidth="2"
        />

        {/* Mechanical Nose / Air Intake */}
        <path
          d="M 112 144 L 128 144 L 124 153 L 116 153 Z"
          fill="#a3e635"
          opacity="0.9"
        />

        {/* Intake Vents */}
        <line x1="106" y1="158" x2="134" y2="158" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="110" y1="162" x2="130" y2="162" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />

        {/* High-Tech Collar with Safety LED */}
        <rect
          x="78"
          y="170"
          width="84"
          height="14"
          rx="4"
          fill="#0c1017"
          stroke="#a3e635"
          strokeWidth="1.5"
        />
        {/* Collar Rivets */}
        <circle cx="86" cy="177" r="2" fill="#64748b" />
        <circle cx="102" cy="177" r="2" fill="#a3e635" />
        <circle cx="120" cy="177" r="2.5" fill="#a3e635" className="animate-pulse" />
        <circle cx="138" cy="177" r="2" fill="#a3e635" />
        <circle cx="154" cy="177" r="2" fill="#64748b" />

        {/* Status Indicator Tag */}
        {status === 'guarding' && (
          <g>
            <circle cx="120" cy="200" r="4" fill="#a3e635" />
            <circle cx="120" cy="200" r="8" stroke="#a3e635" strokeWidth="1" opacity="0.4" className="animate-ping" />
          </g>
        )}
      </svg>
    </div>
  );
};
