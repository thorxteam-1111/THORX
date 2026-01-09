
import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "100%", 
  className = "", 
  delay = 0, 
  direction = "up",
  duration = 700 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "50px" });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12"
  };

  return (
    <div
      ref={ref}
      style={{ 
        width, 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
      className={`transition-all ease-[cubic-bezier(0.2,0.65,0.3,0.9)] will-change-transform ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${transforms[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
