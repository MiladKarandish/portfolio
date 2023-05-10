import { useEffect, useState } from 'react';

export default function useScrollbar(
  activeSlide: number,
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>,
  slidesCount: number
): number[] {
  useEffect(() => {
    setActiveSlide(0);

    // Wheel
    const scrollHandler = (e: WheelEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.classList.contains('has-scroll') &&
        target.scrollHeight > target.clientHeight
      ) {
        return;
      }

      if (e.deltaY > 0) {
        setActiveSlide((prev) => (prev < slidesCount - 1 ? prev + 1 : prev));
      } else {
        setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    // Touch
    let start: number = null!;
    let changed: boolean = false;
    const touchStartScrollHandler = (e: TouchEvent) => {
      start = e.touches[0].screenY;
      changed = false;

      window.addEventListener('touchend', touchEndScrollHandler);
      window.addEventListener('touchmove', touchScrollHandler);
    };

    const touchEndScrollHandler = () => {
      window.removeEventListener('touchend', touchEndScrollHandler);
      window.removeEventListener('touchmove', touchScrollHandler);
    };

    const touchScrollHandler = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains('has-scroll') &&
        target.scrollHeight > target.clientHeight
      ) {
        return;
      }

      const now = start - e.touches[0].screenY;
      if (now > 10 && !changed) {
        setActiveSlide((prev) => (prev < slidesCount - 1 ? prev + 1 : prev));
        changed = true;
      } else if (!changed && now < -10) {
        setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
        changed = true;
      }

      start = e.touches[0].screenY;
    };

    // Key
    const keydownScrollHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setActiveSlide((prev) => (prev < slidesCount - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        setActiveSlide((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('wheel', scrollHandler);
    window.addEventListener('keydown', keydownScrollHandler);
    window.addEventListener('touchstart', touchStartScrollHandler);

    return () => {
      window.removeEventListener('wheel', scrollHandler);
      window.removeEventListener('keydown', keydownScrollHandler);
      window.removeEventListener('touchstart', touchStartScrollHandler);
      window.removeEventListener('touchend', touchEndScrollHandler);
      window.removeEventListener('touchmove', touchScrollHandler);
    };
  }, [slidesCount]);

  return [activeSlide];
}
