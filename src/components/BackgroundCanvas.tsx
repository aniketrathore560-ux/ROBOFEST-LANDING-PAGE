import React, { useEffect, useRef } from 'react';

/**
 * Cosmic Interstellar ambient canvas background.
 * Generates slow-drifting deep starfields, golden accretion photons, and
 * faint gravitational quantum dust.
 */
export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      color: string;
      isGolden: boolean;
    }

    const starCount = Math.min(Math.floor((width * height) / 14000), 80);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const isGolden = Math.random() < 0.25;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.15 + 0.05,
        color: isGolden ? '245, 158, 11' : '226, 232, 240',
        isGolden,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting cosmic stars
      for (const star of stars) {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
};
