'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "수술 전",
  afterAlt = "수술 후"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] overflow-hidden rounded-2xl cursor-ew-resize select-none shadow-2xl"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={afterImage} 
          alt={afterAlt} 
          fill 
          className="object-cover pointer-events-none"
        />
        <span className="absolute bottom-4 right-6 text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm z-0">
          AFTER
        </span>
      </div>

      {/* Before Image (Foreground, Clipped) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || '100vw' }}>
          {/* We use a nested div matching the container width so the image doesn't squish when clipped */}
          <div className="absolute top-0 left-0 h-full w-[100vw] max-w-4xl">
            <Image 
              src={beforeImage} 
              alt={beforeAlt} 
              fill 
              className="object-cover pointer-events-none"
            />
          </div>
        </div>
        <span className="absolute bottom-4 left-6 text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          BEFORE
        </span>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
