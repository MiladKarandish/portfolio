'use client';

import React, { useEffect, useRef } from 'react';
import styles from './intro.module.scss';
import Effect from './Effect';

interface Props {
  callback?: () => void;
}

const Intro = ({ callback }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const text: string[] = ['Hello'];
  const changeTime: number = 2;
  let effect = useRef<any>(null!);
  let ctx = useRef<any>(null!);
  const animation = useRef<any>(null!);

  useEffect(() => {
    // The canvas context
    ctx.current = canvasRef.current.getContext('2d', {
      willReadFrequently: true,
    });
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    // Effect
    effect.current = new Effect(
      ctx.current,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // Animation and change the text every {changeTime} seconds
    let lastIntervalTimestamp: number = 0;
    let counter: number = 0;
    const render = (now: number) => {
      if (counter <= text.length) {
        animation.current = requestAnimationFrame(render);
      }

      ctx.current?.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      effect.current.render();

      if (
        !lastIntervalTimestamp ||
        now - lastIntervalTimestamp >= changeTime * 1000
      ) {
        lastIntervalTimestamp = now;
        if (text[counter]) {
          ctx.current?.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          console.log(text[counter]);
          effect.current.wrapText(text[counter]);
        } else {
          callback && callback();
        }

        counter++;
      }
    };

    if (canvasRef.current && effect)
      animation.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animation.current);
    };
  }, []);

  return (
    <div className={styles.intro}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
};

export default Intro;
