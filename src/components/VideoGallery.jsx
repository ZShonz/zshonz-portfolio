import { useRef, useState } from 'react';
import { films } from '../films';
import './VideoGallery.css';

const mediaUrl = path => !path ? undefined : /^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function VideoGallery({ items = films }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const player = useRef(null);
  const film = items[active];
  const choose = index => {
    player.current?.pause();
    setFailed(false);
    setActive((index + items.length) % items.length);
  };
  return <section className="video-gallery" aria-label="AI 影厅">
    <div className="exhibition-heading"><p className="eyebrow">AI FILM COLLECTION</p></div>
    <div className="cinema-stage">
      <div className="cinema-screen">
        {film ? <>
          <video key={film.id} ref={player} controls playsInline preload="none" poster={mediaUrl(film.poster)} src={mediaUrl(film.src)} aria-label={film.title} onError={() => setFailed(true)}>
            {film.captions && <track kind="captions" src={mediaUrl(film.captions)} srcLang="zh" label="中文" default />}
            你的浏览器暂不支持视频播放。
          </video>
          {failed && <p className="cinema-error" role="alert">视频暂时无法加载。<a href={mediaUrl(film.src)} target="_blank" rel="noreferrer">单独打开视频 ↗</a></p>}
        </> : <div className="cinema-empty">
          <span className="cinema-mark" aria-hidden="true">▷</span>
          <h1>AI 影厅</h1><p>影像作品，即将放映</p>
        </div>}
      </div>
    </div>
    <div className="cinema-toolbar">
      <div className="cinema-caption" aria-live="polite"><span className="cinema-number">{film ? `${String(active + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}` : '00'}</span><div><h2>{film?.title || '等待开场'}</h2><p>{film?.description || '关于想象、运动与生成影像。'}</p></div></div>
      {items.length > 1 && <div className="cinema-switch"><button onClick={() => choose(active - 1)} aria-label="上一部视频">←</button><button onClick={() => choose(active + 1)} aria-label="下一部视频">→</button></div>}
    </div>
    {items.length > 1 && <nav className="cinema-list" aria-label="视频目录">{items.map((item, index) => <button key={item.id} aria-current={index === active ? 'true' : undefined} onClick={() => choose(index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</button>)}</nav>}
  </section>;
}
