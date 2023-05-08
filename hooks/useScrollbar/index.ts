import { useEffect, useState } from 'react';

export default function useScrollbar(
  activeSlide: number,
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>,
  slidesCount: number
): number[] {
  useEffect(() => {
    setActiveSlide(0);

    const scrollHandler = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setActiveSlide((prev) => (prev < slidesCount - 1 ? prev + 1 : prev));
      } else {
        setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('wheel', scrollHandler);

    return () => {
      window.removeEventListener('wheel', scrollHandler);
    };
  }, [slidesCount]);

  return [activeSlide];
}
