import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check touch device or reduced motion
    if (typeof window !== 'undefined') {
      if (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.innerWidth < 1024
      ) {
        setIsTouch(true);
        return;
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [data-cursor]');
        if (interactive) {
          setIsHovered(true);
          const customLabel = interactive.getAttribute('data-cursor');
          setCursorText(customLabel || '');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.body.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.body.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[99999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-200 border ${
          isHovered
            ? 'w-10 h-10 bg-[var(--ember)]/15 border-[var(--ember)] text-[9px] font-bold text-[var(--flour)] tracking-wider backdrop-blur-[1px]'
            : 'w-2.5 h-2.5 bg-[var(--ember)] border-transparent shadow-[0_0_8px_rgba(217,98,43,0.6)]'
        }`}
      >
        {isHovered && cursorText && <span className="uppercase">{cursorText}</span>}
      </div>
    </div>
  );
};
