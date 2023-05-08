import { useEffect, useRef, useState } from 'react';
import styles from './scrollbar.module.scss';
import useScrollbar from '@/hooks/useScrollbar';

interface Props {
  slidesCount: number;
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
}

export default function Scrollbar({
  activeSlide,
  setActiveSlide,
  slidesCount,
}: Props) {
  useScrollbar(activeSlide, setActiveSlide, slidesCount);
  const [thumbStyles, setThumbStyles] = useState({
    height: 0,
    top: 0,
  });
  const scrollbarRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const height = scrollbarRef.current.getBoundingClientRect().height;
    setThumbStyles(() => ({
      top: activeSlide * (height / slidesCount),
      height: height / slidesCount,
    }));
  }, [activeSlide, slidesCount]);

  return (
    <div className={styles['_']} ref={scrollbarRef}>
      <div
        className={styles['_thumb']}
        style={{
          top: `${thumbStyles.top}px`,
          height: `${thumbStyles.height}px`,
        }}></div>
    </div>
  );
}
