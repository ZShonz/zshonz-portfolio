import { useEffect, useRef } from 'react';

export default function ScrollPortrait() {
  const video = useRef(null);
  useEffect(() => {
    const node = video.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let target = 0, frame = 0, previous = 0, touchY = null;
    const visible = () => {
      const rect = node.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };
    const tick = now => {
      frame = 0;
      if (node.seeking) { frame = requestAnimationFrame(tick); return; }
      if (now - previous < 32) { frame = requestAnimationFrame(tick); return; }
      previous = now;
      const gap = target - node.currentTime;
      if (Math.abs(gap) < .035) return;
      node.currentTime += gap * .28;
      frame = requestAnimationFrame(tick);
    };
    const move = delta => {
      if (reduced.matches || document.hidden || !visible() || !Number.isFinite(node.duration)) return;
      target = Math.max(0, Math.min(node.duration - .05, target + delta * node.duration / 1500));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const wheel = event => {
      if (!event.ctrlKey) move(event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1));
    };
    const start = event => { touchY = event.touches[0]?.clientY ?? null; };
    const touch = event => {
      const next = event.touches[0]?.clientY;
      if (touchY !== null && next !== undefined) move(touchY - next);
      touchY = next ?? null;
    };
    window.addEventListener('wheel', wheel, { passive: true });
    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchmove', touch, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('touchstart', start);
      window.removeEventListener('touchmove', touch);
    };
  }, []);
  return <video ref={video} className="designer-avatar" src={`${import.meta.env.BASE_URL}assets/designer-rotation-${window.matchMedia('(max-width: 640px)').matches ? '640' : '960'}.mp4`} poster={`${import.meta.env.BASE_URL}assets/designer-avatar.jpg`} muted playsInline preload="auto" aria-label="随滚动旋转的器皿头像" />;
}
