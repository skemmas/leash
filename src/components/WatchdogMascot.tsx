import React from 'react';

interface WatchdogMascotProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'emblem' | 'illustration';
}

export const WatchdogMascot: React.FC<WatchdogMascotProps> = ({
  className = '',
  size = 'md',
  variant = 'emblem',
}) => {
  const sizeMap = {
    xs: 'w-5 h-5',
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  if (variant === 'emblem') {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeMap[size]} ${className} flex-shrink-0 select-none`}
        aria-label="LEASH Watchdog Emblem"
      >
        {/* Chassis frame */}
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#20231F" />
        {/* Left ear */}
        <path d="M7 6L11 12H7V6Z" fill="#697255" />
        {/* Right ear */}
        <path d="M25 6L21 12H25V6Z" fill="#697255" />
        {/* Head plate */}
        <polygon points="9,11 23,11 25,18 20,24 12,24 7,18" fill="#F3F1EA" />
        {/* Optical Sensor Bar / Eye Visor */}
        <rect x="11" y="14" width="10" height="3" rx="1" fill="#D65A31" />
        {/* Muzzle vent */}
        <rect x="13" y="19" width="6" height="2" rx="0.5" fill="#20231F" />
        {/* Collar clip line */}
        <line x1="12" y1="24" x2="20" y2="24" stroke="#D65A31" strokeWidth="1.5" />
        {/* Cable tether point */}
        <circle cx="16" cy="27" r="1.5" fill="#D65A31" />
      </svg>
    );
  }

  // Illustration variant used sparingly in narrative or hero
  return (
    <div className={`inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
        aria-label="LEASH Watchdog Technical Illustration"
      >
        {/* Technical grid lines */}
        <circle cx="60" cy="60" r="54" stroke="#D5D1C3" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="60" y1="6" x2="60" y2="114" stroke="#D5D1C3" strokeWidth="0.75" />
        <line x1="6" y1="60" x2="114" y2="60" stroke="#D5D1C3" strokeWidth="0.75" />

        {/* Cable leash tether loop */}
        <path
          d="M 60 88 C 75 98, 92 88, 102 100"
          stroke="#D65A31"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="102" cy="100" r="3" fill="#D65A31" />

        {/* Main Body Chassis */}
        <polygon
          points="32,46 88,46 96,72 80,90 40,90 24,72"
          fill="#20231F"
          stroke="#20231F"
          strokeWidth="1.5"
        />

        {/* Angular Ears */}
        <polygon points="32,46 22,22 42,40" fill="#697255" />
        <polygon points="88,46 98,22 78,40" fill="#697255" />

        {/* Brow Plate */}
        <polygon points="40,46 80,46 84,58 36,58" fill="#F3F1EA" />

        {/* Primary Sensor Visor (Safety Orange) */}
        <rect x="42" y="60" width="36" height="9" rx="2" fill="#D65A31" />
        <circle cx="48" cy="64.5" r="2" fill="#FFFFFF" opacity="0.9" />
        <circle cx="72" cy="64.5" r="2" fill="#FFFFFF" opacity="0.9" />

        {/* Lower Jaw & Muzzle */}
        <polygon points="48,74 72,74 68,84 52,84" fill="#697255" />
        <rect x="54" y="78" width="12" height="2" rx="0.5" fill="#20231F" />

        {/* Mechanical Collar */}
        <rect x="42" y="86" width="36" height="5" rx="1.5" fill="#D65A31" />
        <circle cx="60" cy="88.5" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
