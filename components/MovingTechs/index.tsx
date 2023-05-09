'use client';
import { useEffect, useRef } from 'react';
import TechGenerator from './TechGenerator';
import styles from './moving-techs.module.scss';

const techs = [
  { path: './icons/without-text/html.svg', name: 'html', label: 'Html' },
  { path: './icons/without-text/css.svg', name: 'css', label: 'Css' },
  { path: './icons/without-text/react.svg', name: 'react', label: 'React' },
  {
    path: './icons/without-text/webpack.svg',
    name: 'webpack',
    label: 'Webpack',
  },
  {
    path: './icons/without-text/bootstrap.svg',
    name: 'bootstrap',
    label: 'Bootstrap',
  },
  { path: './icons/without-text/nodejs.svg', name: 'nodejs', label: 'Nodejs' },
];

export default function MovingTechs() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const techLablesRef = useRef<HTMLUListElement>(null!);
  const techGenerator = useRef<any>(null!);
  const ctx = useRef<any>(null!);
  const animation = useRef<any>(null!);

  useEffect(() => {
    let size = containerRef.current.getBoundingClientRect();
    let techLabelsHeight = techLablesRef.current.getBoundingClientRect().height;

    // The canvas context
    ctx.current = canvasRef.current.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;

    const setCanvasSize = () => {
      canvasRef.current.width = size.width;
      canvasRef.current.height = size.height / 1.5 - techLabelsHeight;
    };

    setCanvasSize();

    techGenerator.current = new TechGenerator(
      ctx.current,
      canvasRef.current.width,
      canvasRef.current.height,
      techs
    );

    techGenerator.current.generate();
    techGenerator.current.init(canvasRef.current);

    const animate = () => {
      if (canvasRef.current) {
        ctx.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        techGenerator.current.update();
      }

      animation.current = window.requestAnimationFrame(animate);
    };

    if (canvasRef.current && techGenerator.current) {
      animation.current = window.requestAnimationFrame(animate);
    }

    const resizeHandler = () => {
      size = containerRef.current.getBoundingClientRect();
      canvasRef.current.width = size.width;
      canvasRef.current.height = size.height / 1.5 - techLabelsHeight;
      techGenerator.current.resize(
        canvasRef.current.width,
        canvasRef.current.height
      );
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      cancelAnimationFrame(animation.current);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles['_']}>
      <ul ref={techLablesRef} className={styles['_tech-labels']}>
        {techs.map((tech) => (
          <li key={tech.name} id={tech.name}>
            {tech.label}
          </li>
        ))}
      </ul>

      <canvas className={styles['canvas']} ref={canvasRef}></canvas>
    </div>
  );
}
