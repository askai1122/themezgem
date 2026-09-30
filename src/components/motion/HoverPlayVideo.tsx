import React, { useEffect, useRef, useState } from 'react';

interface HoverPlayVideoProps {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  autoPlayInView?: boolean;
}

export const HoverPlayVideo: React.FC<HoverPlayVideoProps> = ({
  src,
  poster,
  alt = 'The Mez Kitchen Footage',
  className = '',
  autoPlayInView = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!autoPlayInView || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoPlayInView]);

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleMouseLeave = () => {
    if (autoPlayInView) return;
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Poster Image (always mounted to prevent flash) */}
      <img
        src={poster}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
      />

      {/* Video Loop */}
      {!hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Subtle Warm Grain & Vignette */}
      <div className="video-overlay-grain opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--char)]/70 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};
