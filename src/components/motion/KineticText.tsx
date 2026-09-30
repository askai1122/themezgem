import React from 'react';

interface KineticTextProps {
  text: string;
  className?: string;
  highlightWord?: string;
  delay?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  highlightWord = '',
  delay = 0,
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <span
            key={i}
            className={`inline-block mr-[0.25em] transition-all duration-700 ease-out ${
              isHighlight ? 'text-[var(--ember)] drop-shadow-[0_0_12px_rgba(217,98,43,0.35)]' : ''
            }`}
            style={{
              animationDelay: `${delay + i * 80}ms`,
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};
