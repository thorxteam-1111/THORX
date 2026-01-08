
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  compact?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', compact = false }) => {
  // Determine text size classes
  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-6xl md:text-8xl'
  };

  // Default padding if not overridden by w-full/h-full in className
  const paddingClass = className.includes('h-full') ? '' : (
     size === 'sm' ? 'px-3 py-1' :
     size === 'md' ? 'px-6 py-2' :
     size === 'lg' ? 'px-8 py-3' : 'px-12 py-6'
  );

  return (
    <div className={`relative group overflow-hidden bg-black text-white inline-flex items-center justify-center font-black tracking-tighter select-none border-2 border-black ${paddingClass} ${className}`}>
      {/* Sleek Background Hover Layer */}
      <div className="absolute inset-0 bg-[#FF5722] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform" />

      {/* Text Content */}
      <span className={`relative z-10 flex items-center gap-0.5 ${textSizes[size]} group-hover:text-black transition-colors duration-300`}>
        {compact ? (
             <>T<span className="text-[#FF5722] group-hover:text-white transition-colors duration-300">.</span></>
        ) : (
             <>THORX<span className="text-[#FF5722] group-hover:text-white transition-colors duration-300">.</span></>
        )}
      </span>
    </div>
  );
};

export default Logo;
