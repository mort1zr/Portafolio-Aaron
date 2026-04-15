import { useRef, useEffect, useCallback } from 'react';
import './HexGrid.css';

const HEX_SIZE = 46;
const GAP = 4;
const HOVER_R = 170;

interface Hex { cx: number; cy: number; intensity: number }

function hexPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  offsetY = 0
) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = cx + r * Math.cos(angle);
    const y = cy + offsetY + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export default function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const hexes = useRef<Hex[]>([]);

  const buildGrid = useCallback((w: number, h: number) => {
    const s = HEX_SIZE;
    const colStep = s * 1.5;
    const rowStep = s * Math.sqrt(3);
    const cols = Math.ceil(w / colStep) + 3;
    const rows = Math.ceil(h / rowStep) + 3;
    const grid: Hex[] = [];
    for (let col = -1; col < cols; col++) {
      const cx = col * colStep;
      const rowOffset = col % 2 !== 0 ? rowStep / 2 : 0;
      for (let row = -1; row < rows; row++) {
        grid.push({ cx, cy: row * rowStep + rowOffset, intensity: 0 });
      }
    }
    hexes.current = grid;
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width: W, height: H } = canvas;
    ctx.clearRect(0, 0, W, H);

    const drawR = HEX_SIZE - GAP;
    const { x: mx, y: my } = mouseRef.current;

    for (const hex of hexes.current) {
      const d = Math.hypot(mx - hex.cx, my - hex.cy);
      hex.intensity = d < HOVER_R ? 1 - d / HOVER_R : 0;
    }

    /* Canvas background → visible as the "line" colour */
    ctx.fillStyle = 'rgba(0, 210, 230, 0.18)';
    ctx.fillRect(0, 0, W, H);

    /* Pass 1 — base hexes black */
    for (const { cx, cy } of hexes.current) {
      hexPath(ctx, cx, cy, drawR);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.94)';
      ctx.fill();
    }

    /* Pass 2 — glow shadow under active hexes */
    for (const { cx, cy, intensity } of hexes.current) {
      if (intensity <= 0) continue;
      ctx.save();
      ctx.shadowColor = `rgba(0, 247, 255, ${intensity * 0.9})`;
      ctx.shadowBlur = 30 + intensity * 25;
      ctx.shadowOffsetY = intensity * 12;
      hexPath(ctx, cx, cy, drawR * (1 + intensity * 0.07), -intensity * 14);
      ctx.fillStyle = `rgba(0, 247, 255, ${intensity * 0.05})`;
      ctx.fill();
      ctx.restore();
    }

    /* Pass 3 — lifted active hexes (dark-to-cyan tint) */
    for (const { cx, cy, intensity } of hexes.current) {
      if (intensity <= 0) continue;
      hexPath(ctx, cx, cy, drawR * (1 + intensity * 0.07), -intensity * 14);
      ctx.fillStyle = `rgba(0, ${Math.round(30 + intensity * 60)}, ${Math.round(40 + intensity * 80)}, 0.96)`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrid(canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Listen on window so hovering text/buttons also triggers the effect
    const section = canvas.closest('section') ?? canvas.parentElement;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener('mousemove', onMove);
    section?.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      section?.removeEventListener('mouseleave', onLeave);
    };
  }, [buildGrid, render]);

  return <canvas ref={canvasRef} className="hexgrid" aria-hidden="true" />;
}
