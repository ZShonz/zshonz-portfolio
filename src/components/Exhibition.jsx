import GlassCover from './GlassCover';
import { useEffect, useRef, useState } from 'react';
export default function Exhibition({projects,active,setActive,onOpen,allColor,setAllColor}) {
  const stage=useRef(null);
  const gesture=useRef({sum:0,last:0,locked:0,startX:0,startY:0,dragged:false});
  const [indexOpen,setIndexOpen]=useState(false);
  const choose=index=>setActive((index+projects.length)%projects.length);
  useEffect(()=>{
    const node=stage.current;
    const wheel=e=>{
      if(e.ctrlKey || indexOpen) return;
      const g=gesture.current, now=performance.now();
      const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
      e.preventDefault();
      if(now<g.locked) return;
      if(now-g.last>160 || Math.sign(delta)!==Math.sign(g.sum)) g.sum=0;
      g.last=now; g.sum+=delta*(e.deltaMode===1?16:1);
      if(Math.abs(g.sum)>45){const direction=Math.sign(g.sum);setActive(i=>(i+direction+projects.length)%projects.length);g.sum=0;g.locked=now+620;}
    };
    node.addEventListener('wheel',wheel,{passive:false});
    return ()=>node.removeEventListener('wheel',wheel);
  },[projects.length,setActive,indexOpen]);
  return <section className={`exhibition ${allColor?'all-color':''}`} aria-label="品牌作品空间展厅">
    <div className="exhibition-heading"><p className="eyebrow">SELECTED BRAND WORK</p></div>
    <div className="gallery-stage" ref={stage} tabIndex={0} aria-label="作品展板。滚动或按左右方向键切换，回车打开当前作品。"
      onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End','Enter'].includes(e.key)){e.preventDefault();if(e.key==='Enter')onOpen(projects[active]);else choose(e.key==='Home'?0:e.key==='End'?projects.length-1:active+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1));}}}
      onPointerDown={e=>{gesture.current.startX=e.clientX;gesture.current.startY=e.clientY;gesture.current.dragged=false;}}
      onPointerUp={e=>{const g=gesture.current,dx=e.clientX-g.startX,dy=e.clientY-g.startY;if(e.pointerType==='touch'&&Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){g.dragged=true;choose(active+(Math.abs(dx)>Math.abs(dy)?(dx<0?1:-1):(dy<0?1:-1)));}}}>
      <div className="gallery-floor" aria-hidden="true"/><div className="gallery-horizon" aria-hidden="true"/>
      <div className="panels">{projects.map((p,i)=>{const raw=(i-active+projects.length)%projects.length,d=raw>projects.length/2?raw-projects.length:raw,v=Math.abs(d)<=3;return <button key={p.title} className={`exhibit-panel ${p.glass ? 'is-glass' : ''} ${d===0?'is-current':''}`} data-depth={Math.abs(d)} tabIndex={d===0?0:-1} aria-hidden={!v} aria-label={`${p.title}，${d===0?'查看案例':'切换到此作品'}`} style={{zIndex:10-Math.abs(d),'--distance':d,'--depth':Math.abs(d),'--turn':d===0?0:d>0?-24:24,opacity:v?1:0,pointerEvents:v?'auto':'none'}} onPointerUp={e=>{const g=gesture.current;if(e.pointerType==='touch'&&Math.hypot(e.clientX-g.startX,e.clientY-g.startY)<10){g.dragged=true;e.preventDefault();d===0?onOpen(p):choose(i);}}} onClick={()=>{if(gesture.current.dragged){gesture.current.dragged=false;return;}d===0?onOpen(p):choose(i);}}>{p.glass ? <GlassCover project={p} /> : <div className="panel-picture"><img src={p.cover||p.image} alt={`${p.title}品牌视觉`} draggable="false" fetchPriority={i===0?'high':'auto'}/><span className="panel-view">查看案例 ↗</span></div>}<div className="panel-reflection" aria-hidden="true" style={{backgroundImage:`url("${p.cover||p.image}")`}}/></button>;})}</div>
      
    </div>
    <footer className="exhibition-toolbar">
      <div className="toolbar-project"><div className="project-number"><span>{String(active+1).padStart(2,'0')}</span><small>/ {String(projects.length).padStart(2,'0')}</small></div><div className="project-label" aria-live="polite" aria-atomic="true"><p>{projects[active].field}</p><h2>{projects[active].title}</h2></div></div>
      <div className="gallery-progress" aria-label={`第 ${active+1} 个作品，共 ${projects.length} 个`}>{projects.map((p,i)=><button key={p.title} aria-label={`选中${p.title}`} aria-pressed={i===active} onClick={()=>choose(i)}><span/></button>)}</div>
      <button className="toolbar-index" onClick={()=>setIndexOpen(!indexOpen)} aria-expanded={indexOpen} aria-controls="work-index">{indexOpen?'关闭目录 −':'作品目录 +'}</button>
    </footer>
    {indexOpen&&<div className="work-index" id="work-index"><div className="index-heading"><h2>作品目录</h2><button onClick={()=>setIndexOpen(false)}>收起 −</button></div>{projects.map((p,i)=><a key={p.title} href={`#project-${p.index}`}><span>{String(i+1).padStart(2,'0')}</span><strong>{p.title}</strong><small>{p.field}</small><span>↗</span></a>)}</div>}
  </section>;
}






