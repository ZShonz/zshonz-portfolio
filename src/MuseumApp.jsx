import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { projects } from './projects';
import ProjectDetail from './components/ProjectDetail';
import PackagingDetail, { packagingProjects } from './components/PackagingDetail';
import Exhibition from './components/Exhibition';
import ObjectGallery from './components/ObjectGallery';
import SiteFooter from './components/SiteFooter';
import Entrance from './components/Entrance';
import ScrollPortrait from './components/ScrollPortrait';
const ModelStage = lazy(() => import('./components/ModelStage'));
const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
const rooms = [['work', '品牌展厅', 'BRANDS'], ['objects', '器物展厅', 'OBJECTS'], ['about', '关于', 'ABOUT'], ['contact', '联系', 'CONTACT']];
function readRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  if (hash.startsWith('package-') && packagingProjects[hash.slice(8)]) return { room: 'package', caseKey: hash.slice(8) };
  const match = hash.match(/^project-(\d+)$/);
  if (match && projects[Number(match[1]) - 1]) return { room: 'project', project: projects[Number(match[1]) - 1] };
  return { room: hash === 'home' || rooms.some(([id]) => id === hash) ? hash : 'home' };
}
export default function MuseumApp() {
  const [route, setRoute] = useState(readRoute);
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [allColor, setAllColor] = useState(false);
  const [copied, setCopied] = useState(false);
  const main = useRef(null);
  const menuButton = useRef(null);
  const contactDialog = useRef(null);
  const openContact = () => { setMenu(false); contactDialog.current?.showModal(); };
  useEffect(() => {
    const locked = route.room === 'work' || route.room === 'objects';
    document.documentElement.classList.toggle('gallery-locked', locked);
    return () => document.documentElement.classList.remove('gallery-locked');
  }, [route.room]);
  useEffect(() => {
    const change = () => { setRoute(readRoute()); setMenu(false); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => {
    if (route.project) setActive(route.project.index - 1);
    window.scrollTo(0, 0);
    document.title = `${route.project?.title || (route.room === 'package' ? packagingProjects[route.caseKey].title : '') || rooms.find(([id]) => id === route.room)?.[1] || '序厅'} — ZShonz 个人展览馆`;
    main.current?.focus({ preventScroll: true });
  }, [route]);
  useEffect(() => {
    if (!menu) return;
    const escape = e => { if (e.key === 'Escape') { setMenu(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [menu]);
  useEffect(() => { if (!copied) return; const timer = setTimeout(() => setCopied(false), 2400); return () => clearTimeout(timer); }, [copied]);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText('2731277468@qq.com'); setCopied(true); }
    catch { window.location.href = 'mailto:2731277468@qq.com'; }
  };
  const openProject = project => { window.location.hash = `project-${project.index}`; };
  return <div className="museum">
    <a href="#main" className="skip-link" onClick={e => { e.preventDefault(); main.current?.focus(); }}>跳至主要内容</a>
    <header className="museum-header">
      <a href="#home" className="identity" aria-label="ZShonz 个人展览馆首页">ZShonz<span>个人展览馆</span></a>
      <nav className="room-nav" aria-label="展馆导航">{rooms.map(([id, label, en]) => <a key={id} href={`#${id}`} aria-current={route.room === id || (id === 'work' && route.room === 'project') || (id === 'objects' && route.room === 'package') ? 'page' : undefined}><span>{label}</span><small>{en}</small></a>)}</nav>
      <button className="menu-button" ref={menuButton} aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(!menu)}>{menu ? '收起 −' : '目录 +'}</button>
      <button className="header-contact" onClick={openContact}>聊聊合作 <span aria-hidden="true">↗</span></button>
    </header>
    {menu && <nav id="mobile-navigation" className="mobile-navigation" aria-label="展馆目录">{rooms.map(([id,label,en]) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>{label}<small>{en}</small></a>)}</nav>}
    <main id="main" ref={main} tabIndex={-1}>
      {route.room === 'home' && <Entrance />}
      {route.room === 'package' && <PackagingDetail caseKey={route.caseKey} />}
      {route.room === 'work' && <Exhibition projects={projects} active={active} setActive={setActive} onOpen={openProject} allColor={allColor} setAllColor={setAllColor} />}
      {route.room === 'objects' && <ObjectGallery />}
      {route.room === 'about' && <section className="about-page page-enter"><div className="room-heading"><div><p className="eyebrow">ABOUT THE DESIGNER</p></div></div><div className="about-grid"><div className="portrait-cabinet"><ScrollPortrait /></div><div className="about-text"><p className="role-line">品牌设计 / 视觉系统 / AI 创意</p><p>专注品牌识别与视觉系统。工作覆盖消费品牌、餐饮、空间、智能产品与生活方式，并使用 AI 扩展研究和视觉原型。</p><p>这座展馆收录我的品牌实践与立体习作。从一个想法出发，寻找它在图形、包装和空间中的表达。</p><dl className="practice"><div><dt>策略</dt><dd>问题定义、定位与视觉概念</dd></div><div><dt>系统</dt><dd>标志、字体、图形与影像方向</dd></div><div><dt>延展</dt><dd>包装、空间与数字接触点</dd></div></dl><a className="plain-link" href="#contact">聊聊你的项目 ↗</a></div></div></section>}
      {route.room === 'contact' && <section className="contact-page page-enter"><p className="eyebrow">LET’S MAKE SOMETHING MEANINGFUL</p><h1>下一件作品，<br />从一次对话开始。</h1><div className="contact-line"><a href="mailto:2731277468@qq.com">2731277468@qq.com</a><button onClick={copyEmail} aria-live="polite">{copied ? '已复制 ✓' : '复制邮箱 ↗'}</button></div><p className="contact-wechat">微信号：ZShonz</p><p className="contact-detail">品牌全案 · 视觉识别 · 包装与空间</p></section>}
      {route.room === 'project' && <ProjectDetail key={route.project.index} project={{...route.project,nextTitle:projects[route.project.index % projects.length].title}} onClose={() => {window.location.hash='work';}} onNext={() => openProject(projects[route.project.index % projects.length])} />}
    </main>
    {!['home', 'work', 'objects'].includes(route.room) && <SiteFooter onContact={openContact} />}
    <dialog ref={contactDialog} aria-label="联系设计师" className="contact-dialog" onClick={e => { if (e.target === e.currentTarget) e.currentTarget.close(); }}>
      <div className="contact-dialog-content"><div className="contact-dialog-top"><p className="eyebrow">CONTACT / 联系</p><button autoFocus onClick={() => contactDialog.current.close()} aria-label="关闭联系面板">关闭 ×</button></div><h2>从一次对话开始。</h2><p className="dialog-intro">关于品牌、包装，或一个还在酝酿的想法。</p><a className="dialog-email" href="mailto:2731277468@qq.com">2731277468@qq.com <span aria-hidden="true">↗</span></a><button className="dialog-copy" onClick={copyEmail} aria-live="polite">{copied ? '邮箱已复制 ✓' : '复制邮箱'}</button><dl className="dialog-details"><div><dt>微信号</dt><dd>ZShonz</dd></div><div><dt>合作方向</dt><dd>品牌全案 · 视觉识别 · 包装与空间</dd></div></dl><p className="dialog-hint">来信可附上项目简介、预期时间与预算，方便进一步沟通。</p></div>
    </dialog>
  </div>;
}


