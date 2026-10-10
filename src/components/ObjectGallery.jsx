import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import './ObjectGallery.css';
const ModelStage = lazy(() => import('./ModelStage'));
const exhibits = [
  ['richchoc', '浓浓黑巧', 'richchoc-thick', [0.12, -0.30, 0]],
  ['lucky-cider', '今日宜', 'lucky-cider', [0, -0.1, 0]],
  ['red-land', '红色江山', 'red-land', [0.08, -0.30, 0]],
  ['fengtai', '丰泰云鼎', 'fengtai', [0.18, -0.20, 0]],
  ['arhats', '十八罗汉', 'arhats', [0.08, -0.25, 0]]
];

export default function ObjectGallery() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(() => new Set());
  const stage = useRef(null);
  const gesture = useRef({ sum: 0, last: 0, locked: 0, x: 0, y: 0, dragged: false });
  const choose = i => setActive((i + exhibits.length) % exhibits.length);
  const open = i => { window.location.hash = `package-${exhibits[i][0]}`; };
  useEffect(() => {
    const node = stage.current.closest('section');
    const wheel = e => {
      if (e.ctrlKey) return;
      e.preventDefault();
      const g = gesture.current, now = performance.now();
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? node.clientHeight : 1);
      if (now < g.locked) return;
      if (now - g.last > 160 || Math.sign(delta) !== Math.sign(g.sum)) g.sum = 0;
      g.last = now; g.sum += delta;
      if (Math.abs(g.sum) > 45) {
        const direction = Math.sign(g.sum);
        setActive(i => (i + direction + exhibits.length) % exhibits.length);
        g.sum = 0; g.locked = now + 620;
      }
    };
    node.addEventListener('wheel', wheel, { passive: false });
    return () => node.removeEventListener('wheel', wheel);
  }, []);
  return <section className="object-salon" aria-label="器物展厅">
    <div className="exhibition-heading salon-heading"><p className="eyebrow">OBJECT COLLECTION</p></div>
    <div className="salon-stage" ref={stage} tabIndex={0} aria-label="滚轮或左右方向键切换展品，回车查看案例"
      onKeyDown={e => {
        if (e.target !== e.currentTarget) return;
        if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','Enter'].includes(e.key)) {
          e.preventDefault();
          if (e.key === 'Enter') open(active);
          else choose(e.key === 'Home' ? 0 : e.key === 'End' ? exhibits.length - 1 : active + (['ArrowRight','ArrowDown'].includes(e.key) ? 1 : -1));
        }
      }}
      onPointerDown={e => { Object.assign(gesture.current, {x:e.clientX, y:e.clientY, dragged:false}); }}
      onPointerUp={e => {
        const g = gesture.current, dx = e.clientX - g.x, dy = e.clientY - g.y;
        if (e.pointerType === 'touch' && Math.max(Math.abs(dx),Math.abs(dy)) > 40) {
          g.dragged = true; choose(active + (Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 1 : -1) : (dy < 0 ? 1 : -1)));
        }
      }}>
      <div className="salon-floor" aria-hidden="true" />
      <div className="salon-frame" aria-hidden="true">
        <span className="salon-lamp" />
        <span className="salon-vitrine" />
        <span className="salon-plinth" />
      </div>
      {exhibits.map(([id,title,model,rotation],i) => {
        const raw = (i-active+exhibits.length)%exhibits.length;
        const d = raw > exhibits.length/2 ? raw-exhibits.length : raw;
        return <button type="button" className={`salon-bay${d===0?' is-active':''}`} key={id}
          style={{'--distance':d,'--depth':Math.abs(d),'--turn':d===0?'0deg':d>0?'-18deg':'18deg',zIndex:5-Math.abs(d)}}
          tabIndex={d===0?0:-1} aria-label={`${title}，${d===0?'查看案例':'切换到此展品'}`}
          onClick={() => { if(gesture.current.dragged){gesture.current.dragged=false;return;} d===0?open(i):choose(i); }}>
          <span className="salon-exhibit">
            {Math.abs(d) <= 1 && (d === 0 || ready.has(active)) && <Suspense fallback={<span className="salon-loading">展品载入中</span>}>
              <ModelStage src={`${import.meta.env.BASE_URL}assets/models/${model}-optimized.glb`} label={`${title}三维展品`} fit={1.65} rotation={rotation} cameraZ={4.3} speed={0} sway={0.08} active={d === 0} onReady={() => setReady(previous => previous.has(i) ? previous : new Set([...previous, i]))} />
            </Suspense>}
          </span>
        </button>;
      })}
    </div>
    <footer className="salon-controls"><div aria-live="polite"><span>{String(active+1).padStart(2,'0')} / 05</span><strong>{exhibits[active][1]}</strong></div><div className="gallery-progress">{exhibits.map(([id,title],i)=><button key={id} aria-label={`选中${title}`} aria-pressed={i===active} onClick={()=>choose(i)}><span /></button>)}</div></footer>
  </section>;
}
