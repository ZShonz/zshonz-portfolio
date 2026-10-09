import { useEffect, useRef } from 'react';
import './Entrance.css';

export default function Entrance() {
  const stage = useRef(null);
  const video = useRef(null);
  const progress = useRef(null);
  useEffect(() => {
    const root = stage.current, node = video.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let target = 0, frame = 0, touchY = null, leaving = false, finishTimer = null;
    const tick = () => {
      frame = 0;
      if (leaving || !Number.isFinite(node.duration)) return;
      const end = Math.max(0, node.duration - .06);
      const desired = target * end;
      if (!node.seeking && Math.abs(desired - node.currentTime) > .025) {
        node.currentTime += (desired - node.currentTime) * .35;
      }
      if (target >= 1 && Math.abs(node.currentTime - end) < .08 && !node.seeking) {
        leaving = true;
        root.classList.add('is-entering');
        finishTimer = setTimeout(() => { window.location.hash = 'work'; }, 300);
        return;
      }
      if (node.seeking || Math.abs(desired - node.currentTime) > .025) frame = requestAnimationFrame(tick);
    };
    const move = delta => {
      if (leaving || !Number.isFinite(node.duration)) return;
      target = Math.max(0, Math.min(1, target + delta / 1800));
      progress.current.style.transform = `scaleX(${target})`;
      if (reduced.matches) {
        if (target >= 1) window.location.hash = 'work';
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const wheel = event => {
      if (event.ctrlKey) return;
      event.preventDefault();
      move(event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1));
    };
    const start = event => { touchY = event.touches[0]?.clientY ?? null; };
    const touch = event => {
      const next = event.touches[0]?.clientY;
      if (touchY !== null && next !== undefined) { event.preventDefault(); move((touchY - next) * 3); }
      touchY = next ?? null;
    };
    root.addEventListener('wheel', wheel, { passive: false });
    root.addEventListener('touchstart', start, { passive: true });
    root.addEventListener('touchmove', touch, { passive: false });
    return () => {
      cancelAnimationFrame(frame); clearTimeout(finishTimer);
      root.removeEventListener('wheel', wheel);
      root.removeEventListener('touchstart', start);
      root.removeEventListener('touchmove', touch);
    };
  }, []);
  return <section ref={stage} className="film-entrance" aria-label="滚动旋转器皿，进入展厅">
    <video ref={video} className="entrance-film" src={`${import.meta.env.BASE_URL}assets/designer-rotation.mp4`} poster={`${import.meta.env.BASE_URL}assets/designer-avatar.jpg`} muted playsInline preload="auto" aria-label="器皿旋转展示" />
    <div className="film-entry-bar"><span>向下滚动，旋转入场</span><a href="#work">进入展厅 ↗</a></div>
    <div className="film-progress" aria-hidden="true"><span ref={progress} /></div>
  </section>;
}
